import "./app/styles/globals.scss";
import { Button } from "./components/ui/Button/Button";

function App() {
  return (
    <div>
      <h1>SOM Serwis</h1>
      <Button
        text="hello world"
        iconName="arrow-right"
        variant="primary"
        href="#"
      />
      <br />
      <Button text="Zadzwon teraz" variant="call" href="tel:+48729449643" />
    </div>
  );
}

export default App;
