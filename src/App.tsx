import { useEffect } from "react";
import "./app/styles/globals.scss";
import style from "./App.module.scss";
import { About } from "./sections/About/About";
import { Contact } from "./sections/Contact/Contact";
import { FAQ } from "./sections/FAQ/FAQ";
import { Footer } from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { Owner } from "./sections/Owner/Owner";
import { Process } from "./sections/Process/Process";
import { Reviews } from "./sections/Reviews/Reviews";
import { Services } from "./sections/Services/Services";
import { TopBar } from "./sections/TopBar/TopBar";

function App() {
  useEffect(() => {
    let frameId: number | undefined;
    let timeoutId: number | undefined;

    const clearPendingScroll = () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };

    const scrollToHash = (attempt = 0) => {
      const hash = window.location.hash;

      if (!hash) {
        return;
      }

      const element = document.getElementById(hash.slice(1));

      if (!element && attempt < 10) {
        timeoutId = window.setTimeout(() => scrollToHash(attempt + 1), 100);
        return;
      }

      if (!element) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        element.scrollIntoView({
          behavior: attempt === 0 ? "smooth" : "auto",
          block: "start",
        });
      });
    };

    const handleHashChange = () => {
      clearPendingScroll();
      scrollToHash();
    };

    timeoutId = window.setTimeout(() => scrollToHash(), 200);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      clearPendingScroll();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      <TopBar />
      <Header />
      <main className={style.main}>
        <Hero />
        <Services />
        <About />
        <Process />
        <Reviews />
        <Owner />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
