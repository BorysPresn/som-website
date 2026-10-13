import "../app/styles/globals.scss";
import { useState } from "react";
import style from "../App.module.scss";
import { CookieConsent } from "../components/CookieConsent/CookieConsent";
import { Button } from "../components/ui/Button/Button";
import { ContactLayout } from "../sections/Contact/ContactLayout";
import { ContactMethods } from "../sections/Contact/ContactMethods";
import { Footer } from "../sections/Footer/Footer";
import { Header } from "../sections/Header/Header";
import { Hero } from "../sections/Hero/Hero";
import { Reviews } from "../sections/Reviews/Reviews";
import { Services } from "../sections/Services/Services";
import { TopBar } from "../sections/TopBar/TopBar";
import { CallbackDialog } from "./callback/CallbackDialog";
import { callbackCopy, type CallbackSource } from "./callback/callback.data";
import promoStyle from "./PromoPage.module.scss";
import { FloatingCallButton } from "./FloatingCallButton/FloatingCallButton";

export const PromoPage = () => {
  const [callbackSource, setCallbackSource] = useState<CallbackSource | null>(
    null,
  );

  return (
    <div className={promoStyle.page}>
      <TopBar />
      <Header />
      <main className={style.main}>
        <Hero onCtaClick={() => setCallbackSource("hero")} />
        <Services carousel>
          <div className={promoStyle.cta}>
            <Button
              variant="primary"
              text={callbackCopy.cta}
              iconName="arrow-right"
              onClick={() => setCallbackSource("services")}
            />
          </div>
        </Services>
        <Reviews carousel />
        <ContactLayout>
          <div className={promoStyle.cta}>
            <Button
              variant="primary"
              text={callbackCopy.cta}
              iconName="arrow-right"
              onClick={() => setCallbackSource("contact")}
            />
          </div>
          <ContactMethods />
        </ContactLayout>
      </main>
      <Footer />
      <FloatingCallButton />
      <CookieConsent className={promoStyle.cookieBanner} />
      {callbackSource && (
        <CallbackDialog
          source={callbackSource}
          onClose={() => setCallbackSource(null)}
        />
      )}
    </div>
  );
};
