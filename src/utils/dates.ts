import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
// import UpdateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(RelativeTime);
// dayjs.extend(UpdateLocale);

// dayjs.updateLocale("en", {})

export const getFormattedDate = (date: string) => {
  return dayjs(date).fromNow();
};
