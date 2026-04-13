/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { inputStyle } from "./styles";

interface TextInputProps {
  value: string;
  placeholder: string;
  maxLength?: number;
  onChange: (value: string) => void;
}

export const TextInput = ({
  value,
  placeholder,
  maxLength,
  onChange,
}: TextInputProps) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      style={inputStyle}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
