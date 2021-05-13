export default function currentTime(time) {
  if (!time) return "";
  let date = new Date(time);
  let getMonth =
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  let getDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let getHours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let getMinutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let getSeconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return (
    date.getFullYear() +
    "-" +
    getMonth +
    "-" +
    getDate +
    " " +
    getHours +
    ":" +
    getMinutes +
    ":" +
    getSeconds
  );
}
