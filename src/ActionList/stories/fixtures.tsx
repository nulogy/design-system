import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "300px" }}>
      {children}
    </div>
  );
}

export { Container };
