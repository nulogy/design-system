import React from "react";
import { useTheme } from "styled-components";

interface ReconciledIconProps {
  variant?: "standard" | "flagged";
  size?: number;
}

export const ReconciledIcon: React.FC<ReconciledIconProps> = ({ variant = "standard", size = 25 }) => {
  const theme = useTheme();
  const height = (size * 13) / 25; // Maintain aspect ratio

  // Standard: both checkmarks green (#008059)
  // Flagged: first checkmark grey, second checkmark green
  const firstPathColor = variant === "flagged" ? theme.colors.grey : "#008059";
  const secondPathColor = "#008059";

  return (
    <svg width={size} height={height} viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.7003 12.025L10.5 8.825L11.925 7.4L13.7003 9.175L22.8753 0L24.3003 1.425L13.7003 12.025Z"
        fill={firstPathColor}
      />
      <path
        d="M5.7 12.025L0 6.325L1.425 4.9L5.7 9.175L14.875 0L16.3 1.425L5.7 12.025Z"
        fill={secondPathColor}
      />
    </svg>
  );
};

