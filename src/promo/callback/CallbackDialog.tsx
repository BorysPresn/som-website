import clsx from "clsx";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { privacyPolicyUrl } from "../../app/site.data";
import { Button } from "../../components/ui/Button/Button";
import { TextInput } from "../../components/ui/TextInput/TextInput";
import {
  contactFullNameMaxLength,
  formatPolishPhoneForSubmit,
  formatPolishPhoneInput,
  validateContactDetails,
  type ContactFormErrors,
} from "../../sections/Contact/contact.validation";
import { callbackCopy } from "./callback.data";
import style from "./CallbackDialog.module.scss";

type Status = "idle" | "loading" | "success" | "error";

export const CallbackDialog = ({ onClose }: { onClose: () => void }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const titleId = useId();
  const [values, setValues] = useState({
    fullName: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const body = document.body;
    const rootOverflow = root.style.overflow;
    const bodyOverflow = body.style.overflow;
    const bodyPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;

    dialog.showModal();
    root.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    }
    dialog
      .querySelector<HTMLInputElement>('input[name="fullName"]')
      ?.focus({ preventScroll: true });

    return () => {
      requestRef.current?.abort();
      dialog.close();
      root.style.overflow = rootOverflow;
      body.style.overflow = bodyOverflow;
      body.style.paddingRight = bodyPadding;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestRef.current || status === "success") return;
    const nextErrors = validateContactDetails(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const field = nextErrors.fullName ? "fullName" : "phone";
      dialogRef.current
        ?.querySelector<HTMLInputElement>(`input[name="${field}"]`)
        ?.focus();
      return;
    }
    if (values.website.trim()) {
      setStatus("success");
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      setStatus("error");
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setStatus("loading");
    try {
      const response = await fetch(
        `${apiUrl.replace(/\/$/, "")}/api/callback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            fullName: values.fullName.trim(),
            phone: formatPolishPhoneForSubmit(values.phone),
            website: values.website,
          }),
        },
      );
      const data: unknown = await response.json();
      if (
        !response.ok ||
        !data ||
        typeof data !== "object" ||
        !("ok" in data) ||
        data.ok !== true
      ) {
        throw new Error("Callback request failed");
      }
      if (dialogRef.current?.open) setStatus("success");
    } catch {
      if (dialogRef.current?.open) setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      requestRef.current = null;
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={style.dialog}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className={style.header}>
        <h2 id={titleId} className={style.title}>
          {callbackCopy.title}
        </h2>
        <button type="button" className={style.close} onClick={onClose}>
          {callbackCopy.close}
        </button>
      </div>
      <form
        className={style.form}
        onSubmit={submit}
        noValidate
        aria-busy={status === "loading"}
      >
        <fieldset
          className={style.fields}
          disabled={status === "loading" || status === "success"}
        >
          <TextInput
            name="fullName"
            label={callbackCopy.fullName}
            autoComplete="given-name"
            required
            maxLength={contactFullNameMaxLength}
            value={values.fullName}
            errorText={errors.fullName}
            onChange={(event) => {
              const fullName = event.currentTarget.value;
              setValues((current) => ({ ...current, fullName }));
              setErrors((current) => ({ ...current, fullName: undefined }));
              setStatus("idle");
            }}
          />
          <TextInput
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            label={callbackCopy.phone}
            placeholder={callbackCopy.phonePlaceholder}
            required
            value={values.phone}
            errorText={errors.phone}
            onChange={(event) => {
              const phone = formatPolishPhoneInput(event.currentTarget.value);
              setValues((current) => ({ ...current, phone }));
              setErrors((current) => ({ ...current, phone: undefined }));
              setStatus("idle");
            }}
          />
        </fieldset>
        <div className={style.honeypot} aria-hidden="true">
          <label htmlFor={`${titleId}-website`}>Website</label>
          <input
            id={`${titleId}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => {
              const website = event.currentTarget.value;
              setValues((current) => ({ ...current, website }));
            }}
          />
        </div>
        <p className={style.privacy}>
          {callbackCopy.privacy}{" "}
          <a href={privacyPolicyUrl} target="_blank" rel="noopener noreferrer">
            {callbackCopy.privacyLink}
          </a>
        </p>
        <Button
          variant="primary"
          type="submit"
          text={callbackCopy.submit}
          iconName="arrow-right"
          disabled={status === "loading" || status === "success"}
        />
        <p
          role="status"
          aria-live="polite"
          className={clsx(
            style.message,
            status === "success" && style.success,
            status === "error" && style.error,
          )}
        >
          {status === "idle" ? "" : callbackCopy[status]}
        </p>
      </form>
    </dialog>,
    document.body,
  );
};
