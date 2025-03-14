import dayjs from "dayjs";
import "dayjs/locale/vi";

dayjs.locale("vi");

export const formatViDate = (date) => {
  return dayjs(date).format("DD MMMM, YYYY");
};

export const getDaysDifference = (startDate, endDate) => {
  return dayjs(endDate).diff(dayjs(startDate), "day");
};

export const getRemainingDays = (endDate) => {
  return dayjs(endDate).diff(dayjs(), "day");
};

export const isExpired = (endDate) => {
  return dayjs().isAfter(endDate);
};
