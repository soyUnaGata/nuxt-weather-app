import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatTime = (timezone) => {
  const utcNow = dayjs().utc();
  return utcNow.add(timezone, "s").format("h:mm a");
};
