expect.extend({
  toMatchDate(received, date) {
    const pass =
      date.getMonth() === received.getMonth() &&
      date.getYear() === received.getYear() &&
      date.getDay() === received.getDay();
    if (pass) {
      return {
        message: () => `expected ${received} not to match ${date}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to match ${date}`,
        pass: false,
      };
    }
  },
});
