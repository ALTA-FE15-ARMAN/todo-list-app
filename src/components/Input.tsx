import React, { FC } from "react";

interface InputProps {
  id: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({
  id,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light bg-white"
      />
    </div>
  );
};

export default Input;