const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useFormatDate = (createdAt) => {
  const parsedDate = Date.parse(createdAt);
  const localDate = new Date(parsedDate).toLocaleString();

  const findMonth = months
    .filter((_, index) => {
      return index === Number(localDate.slice(3, 5)) - 1;
    })
    .toString();

  return {
    year: localDate.slice(6, 10),
    month: findMonth,
    day: localDate.slice(0, 2),
    time: localDate.slice(12, 17),
  };
};
