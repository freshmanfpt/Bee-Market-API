// DD-MM-YYYY
const monthNames = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, "0");
const year = dateObj.getFullYear();
const getDDMMYYYY = day + "/" + month + "/" + year;

// HH-MM DD-MM-YYYY

let date_ob = new Date();

// current hours
let hours1 = date_ob.getHours();

// current minutes
let minutes1 = date_ob.getMinutes();

// prints date & time in YYYY-MM-DD HH:MM:SS format

const getHHMMDDMMYYY = `${hours1} giờ ${minutes1} ngày:${day} tháng : ${month} năm : ${year} `;

module.exports = { getDDMMYYYY, getHHMMDDMMYYY };
