import "./app/styles/globals.scss";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { Services } from "./sections/Services/Services";
import { TopBar } from "./sections/TopBar/TopBar";
import { WhyUs } from "./sections/WhyUs/WhyUs";

function App() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Services />
      <WhyUs />
    </>
  );
}

export default App;
