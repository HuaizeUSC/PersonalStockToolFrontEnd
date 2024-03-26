export function checkMarketStatus() {
  const now = new Date();
  const laTimeZone = "America/Los_Angeles";

  const luxon = require("luxon");
  const localDateTime = luxon.DateTime.fromJSDate(now, { zone: laTimeZone });

  const currentHour = localDateTime.hour;
  const currentMinute = localDateTime.minute;
  const currentSecond = localDateTime.second;
  const currentWeekday = localDateTime.weekday;

  const isWeekend = currentWeekday === 6 || currentWeekday === 7;
  const isSunday = currentWeekday === 7;

  let isOpen = false;
  let message = "";

  if (!isWeekend && currentHour >= 6 && currentHour < 13) {
    isOpen = true;
    message = "Market is open";
  } else {
    let lastClose = localDateTime.set({ hour: 13, minute: 0, second: 0, millisecond: 0 });

    if (currentHour < 13 || isWeekend) {
      lastClose = lastClose.minus({ days: 1 });
    }
    if (isSunday) {
      lastClose = lastClose.minus({ days: 1 });
    }

    isOpen = false;
    const closeTime = `${lastClose.hour}:${lastClose.minute < 10 ? "0" + lastClose.minute : lastClose.minute}:${lastClose.second < 10 ? "0" + lastClose.second : lastClose.second}`;
    message = "Market closed on " + lastClose.toLocaleString();
    message += ` ${closeTime}`;
  }

  return { open: isOpen, message: message };
}

export function convertTimestampToLosAngelesTime(timestamp) {
  const milliseconds = timestamp * 1000;

  const laTimeZone = "America/Los_Angeles";
  const date = new Date(milliseconds);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: laTimeZone,
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const laDateTime = formatter.format(date);

  return laDateTime;
}

export function convertTimestampToString(timestamp) {
  const date = new Date(timestamp * 1000);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const dateString = `${month} ${day}, ${year}`;

  return dateString;
}
