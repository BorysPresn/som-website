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
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (!window.location.hash) return;

    const id = window.location.hash.replace("#", "");

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
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
