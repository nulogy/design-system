// import React from "react";
// import { render, screen } from "@testing-library/react";
// import useMediaQuery from ".";

// const defaultInnerWidth = 800;

// const defaultMediaQuery = `${defaultInnerWidth}px`;

// const Component = ({ query = defaultMediaQuery }) => {
//   const matches = useMediaQuery(query);
//   return (
//     <div className="App">
//       <h1>Media query matched?</h1>
//       <h2>{Boolean(matches).toString()}</h2>
//     </div>
//   );
// };

// describe("useMediaQuery", () => {
//   describe("without window.matchMedia", () => {
//     const originalMatchMedia = window.matchMedia;

//     // Unset window.matchedMedia before test to validate assertions
//     beforeEach(() => {
//       window.matchMedia = undefined;
//     });
//     afterEach(() => {
//       window.matchMedia = originalMatchMedia;
//     });

//     it("should return false if window.matchMedia is not available", () => {
//       render(<Component />);
//       expect(screen.getByText("false")).toBeInTheDocument();
//     });
//   });
// });
