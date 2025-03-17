import React from "react";

export default function NulogyLogo({ width = 8, height = 8, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.75004 0.290783L8 0.872348V6.10892C8 7.23335 6.80591 7.43084 5.99989 7.56333C6.4609 7.43084 6.7526 7.28197 6.75004 6.10892V1.45441L5.50008 0.872348L6.75004 0.290783ZM1.49987 7.27255V4.07344C1.49987 3.7514 1.70755 3.38717 1.95959 3.26163L3.25007 2.61655V4.65104L4.50003 5.52785C4.75207 5.67671 5.25017 5.68019 5.25017 5.23657V4.36373L4.74951 4.07245V0L0.938216 1.63404C0.420065 1.85585 0 2.55502 0 3.2001V8L1.49987 7.27255Z"
        fill="white"
      />
    </svg>
  );
}
