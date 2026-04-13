let realDate;
export const mockDate = (date) => {
  const currentDate = new Date(date);
  realDate = Date;
  global.Date = class extends Date {
    // biome-ignore lint/correctness/noUnreachableSuper: intentional Date mock — args.length===0 branch skips super()
    constructor(...args) {
      if (args.length > 0) {
        // biome-ignore lint/correctness/noConstructorReturn: intentional Date mock
        return super(...args);
      }

      // biome-ignore lint/correctness/noConstructorReturn: intentional Date mock — returns fixed date object
      return currentDate;
    }
  };
};
export const resetDate = () => {
  global.Date = realDate;
};
