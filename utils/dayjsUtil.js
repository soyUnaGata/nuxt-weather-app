import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatTime = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("h:mm a");
};

export const formatDay = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("DD");
};

export const formatMonth = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("MMMM");
};

export const formatYear = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("YY");
};

export const formatWeekday = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("dddd");
};

export const getTime = (t, timezone = 0) => {
  return dayjs
    .utc(new Date(t * 1000))
    .add(timezone, "s")
    .format("h:mm a");
};

export const getDateTime = (t, timezone = 0) => {
  return dayjs
    .utc(new Date(t * 1000))
    .add(timezone, "s")
    .format("ddd");
};
