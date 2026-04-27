import { useId } from "react";
import clsx from "clsx";
import style from "./TextInput.module.scss";

type TextInputStatus = "default" | "error" | "success";

type BaseTextInputProps = {
  label: string;
  helperText?: string;
  errorText?: string;
  status?: TextInputStatus;
  multiline?: boolean;
  className?: string;
};

type TextInputProps = BaseTextInputProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement> &
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "className"
  >;

export const TextInput = ({
  id,
  label,
  helperText,
  errorText,
  status = "default",
  multiline = false,
  disabled,
  className,
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const message = errorText ?? helperText;
  const hasMessage = Boolean(message);
  const fieldStatus = errorText ? "error" : status;
  const messageId = hasMessage ? `${inputId}-message` : undefined;

  const inputClassName = clsx(
    style.control,
    multiline && style.textarea,
    fieldStatus === "error" && style.controlError,
    fieldStatus === "success" && style.controlSuccess,
  );

  return (
    <div className={clsx(style.field, className)}>
      <label className={style.label} htmlFor={inputId}>
        {label}
      </label>

      <div className={style.controlWrap}>
        {multiline ? (
          <textarea
            id={inputId}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={fieldStatus === "error"}
            aria-describedby={messageId}
            {...props}
          />
        ) : (
          <input
            id={inputId}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={fieldStatus === "error"}
            aria-describedby={messageId}
            {...props}
          />
        )}

        {(fieldStatus === "error" || fieldStatus === "success") && (
          <span
            className={clsx(
              style.statusIcon,
              fieldStatus === "error" && style.statusIconError,
              fieldStatus === "success" && style.statusIconSuccess,
            )}
            aria-hidden="true"
          />
        )}
      </div>

      {hasMessage && (
        <p
          id={messageId}
          className={clsx(
            style.message,
            fieldStatus === "error" && style.messageError,
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
