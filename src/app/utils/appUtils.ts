export function getRandomId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getCurrentDate(): string {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${day} ${month} ${year} ${hours}:${formattedMinutes} ${ampm}`;
}

export function getOTP(): number {
  return Math.floor(100000 + Math.random() * 900000);
}