/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import {
  cardStyle,
  sectionDescriptionStyle,
  sectionTitleStyle,
} from "./styles";

interface SectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Section = ({ title, description, children }: SectionProps) => {
  return (
    <section style={cardStyle}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      <p style={sectionDescriptionStyle}>{description}</p>
      {children}
    </section>
  );
};
