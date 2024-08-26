export const convertDatetime = (data) => {
  const date = new Date(data);
  const formattedDate = date.toLocaleString("vi-VN");
  return formattedDate;
};
