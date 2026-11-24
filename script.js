
// HTMLの要素を取得
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");

const formatBtn = document.getElementById("formatBtn");
const themeBtn = document.getElementById("themeBtn");

// 表示設定
let is24Hour = true;

// 時計を更新する関数
function updateClock() {

  // 現在の日付と時刻を取得
  const now = new Date();

  // 時・分・秒を取得
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // 12時間表示に切り替え
  let period = "";

  if (!is24Hour) {
    period = hours >= 12 ? "PM " : "AM ";
    hours = hours % 12 || 12;
  }

  // 数字を2桁にする
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  // 時計を画面に表示
  clock.textContent = period + h + ":" + m + ":" + s;

  // 日付を日本語で表示
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  };

  date.textContent = new Intl.DateTimeFormat(
    "ja-JP",
    options
  ).format(now);

  // 時間帯によってメッセージを変更
  const currentHour = now.getHours();

  if (currentHour >= 5 && currentHour < 11) {
    greeting.textContent = "Good morning!";
  } else if (currentHour >= 11 && currentHour < 17) {
    greeting.textContent = "Have a nice day!";
  } else if (currentHour >= 17 && currentHour < 22) {
    greeting.textContent = "Good evening!";
  } else {
    greeting.textContent = "Have a good night!";
  }
}

// 1秒ごとに時計を更新
updateClock();
setInterval(updateClock, 1000);

// 12時間・24時間表示の切り替え
formatBtn.addEventListener("click", () => {

  is24Hour = !is24Hour;

  formatBtn.textContent = is24Hour
    ? "24時間表示"
    : "12時間表示";

  updateClock();
});

// ダーク・ライトモードの切り替え
themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("light");

  const isLight =
    document.body.classList.contains("light");

  themeBtn.textContent = isLight
    ? "🌙 ダークモード"
    : "☀ ライトモード";
});
