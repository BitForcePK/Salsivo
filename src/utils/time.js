export const getTime = (duration) => {
  // duration in seconds

  // return mints if greater then 60 and less than 3600
  if (duration >= 60 && duration < 3600) {
    return `${Math.floor(duration / 60)} min`;
  }

  // return hours if greater then 3600
  if (duration >= 3600) {
    return `${Math.floor(duration / 3600)} hr`;
  }

  return `${duration} sec`;
};
