import "./app/styles/globals.scss";
import { About } from "./sections/About/About";
import { FAQ } from "./sections/FAQ/FAQ";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { Owner } from "./sections/Owner/Owner";
import { Process } from "./sections/Process/Process";
import { Reviews } from "./sections/Reviews/Reviews";
import { Services } from "./sections/Services/Services";
import { TopBar } from "./sections/TopBar/TopBar";

function App() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Services />
      <About />
      <Process />
      <Reviews />
      <Owner />
      <FAQ />
    </>
  );
}

export default App;
