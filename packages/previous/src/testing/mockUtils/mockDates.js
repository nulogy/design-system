let realDate;
export const mockDate = (date) => {
  const currentDate = new Date(date);
  realDate = Date;
  global.Date = class extends Date {
    constructor(...args) {
      if (args.length > 0) {
        // eslint-disable-next-line constructor-super
        return super(...args);
      }

      return currentDate;
    }
  };
};
export const resetDate = () => {
  global.Date = realDate;
};
