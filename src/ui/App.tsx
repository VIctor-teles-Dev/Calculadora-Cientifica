import { useState, type FC } from "react";
import Numpad from "./components/numpad/Numpad";
import Display from "./components/display/Display"; // 1. Importa o novo componente Display

import "./App.css";

const App: FC = () => {
  const [display, setDisplay] = useState<string>("");

  const handleButtonClick = (value: string): void => {
    if (value === "AC") {
      setDisplay("");
    } else if (value === "DEL") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        const expression = display.replace(/X/g, "*").replace(/÷/g, "/");
        const result = String(eval(expression));
        setDisplay(result);
      } catch (error) {
        setDisplay("Error");
      }
    } else {
      
      if (
        (value === "0" && display === "") ||
        (["X", "÷", "+", "-"].includes(value) && display === "")
      ) {
        return;
      }
      setDisplay(display + value);
    }
  };

  return (

    <div className="calculator-container">
     
        <Display value={display || "0"} />
        <Numpad onButtonClick={handleButtonClick} />
     
    </div>
   
  );
};

export default App;
