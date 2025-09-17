// export const formatDateFromDatePicker = (date) => {
//     //Định dạng lại 
//     const newdate = new Date(date);

//     // Đổi sang giờ Việt Nam (UTC+7)
//     const formatted = newdate.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
//     return formatted;
// }

export const formatDateFromApi = (isoString) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const formatTimeFromApi = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  // format: thêm số 0 nếu < 10
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = mins.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}


