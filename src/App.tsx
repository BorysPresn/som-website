import "./app/styles/globals.scss";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import { TopBar } from "./sections/TopBar/TopBar";

function App() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
    </>
  );
}

export default App;
