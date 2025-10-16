import  { type FC } from "react";
import "./Display.css"; // Importa a estilização própria do componente

// Interface para definir as props que o componente espera
interface DisplayProps {
  value: string;
}

const Display: FC<DisplayProps> = ({ value }) => {
  return (
    <div className="display-container">
      <div className="display-text">{value}</div>
    </div>
  );
};

export default Display;
