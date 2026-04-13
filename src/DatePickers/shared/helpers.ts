export const getPopperModifiers = (disableFlipping: boolean) => [
  {
    name: "flip",
    enabled: !disableFlipping,
  },
];
