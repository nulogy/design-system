const convertTimeToMinutes = (time) => {
  if (time) {
    const timeArr = time.split(":").map(Number);
    const hours = timeArr[0];
    const minutes = timeArr[1];
    return hours * 60 + minutes;
  }
  return null;
};

export const getDuration = (start, end) => {
  return convertTimeToMinutes(end) - convertTimeToMinutes(start);
};
