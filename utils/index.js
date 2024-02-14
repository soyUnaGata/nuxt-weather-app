const PRESSURE_UNIT = 0.750062;

export const capitalizeFirstLetter = (str) => {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPressureMm = (hpa) => {
  return Math.round(hpa * PRESSURE_UNIT);
};

export const sleep = (duration) =>
  new Promise((res) => setTimeout(res, duration));

export const fahrenheitToCelsius = (temp) => {
  return temp ? Math.round(parseInt(temp - 32) * (5 / 9)) : 0;
};
