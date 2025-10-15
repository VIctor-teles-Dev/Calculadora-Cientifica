import React, { type FC } from "react";
import "./Numpad.css"; // O CSS não muda

// 1. Definimos uma interface para as props do componente
interface NumpadProps {
  onButtonClick: (value: string) => void; // A prop é uma função que recebe uma string e não retorna nada
}

// 2. Tipamos o componente funcional com React.FC e passamos a interface de props
const Numpad: FC<NumpadProps> = ({ onButtonClick }) => {
  const buttons: string[][] = [
    ["7", "8", "9", "DEL", "AC"],
    ["4", "5", "6", "X", "÷"],
    ["1", "2", "3", "+", "-"],
    ["0", ".", "♡", "ANS", "="],
  ];

  return (
    <div className="numpad">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="numpad-row">
          {row.map((button, colIndex) => (
            <div
              key={colIndex}
              className={`numpad-button ${
                isNaN(Number(button)) && button !== "." ? "operator" : ""
              }`}
              onClick={() => onButtonClick(button)}
            >
              {button}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Numpad;
