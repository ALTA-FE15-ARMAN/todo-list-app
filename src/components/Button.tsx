import React, { FC } from "react";

interface ButtonProps {
  id: string;
  label?: string;
  onClick?: React.MouseEventHandler;
}

const Button: FC<ButtonProps> = ({ id, label, onClick }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 hover:border-none focus:outline-none rounded-md text-white font-semibold"
    >
      {label}
    </button>
  );
};

export default Button;