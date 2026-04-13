/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import { buttonStyle, secondaryButtonStyle } from "./styles";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button = ({
  label,
  onClick,
  variant = "primary",
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={variant === "primary" ? buttonStyle : secondaryButtonStyle}
    >
      {label}
    </button>
  );
};
