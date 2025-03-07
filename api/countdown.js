export default function handler(req, res) {
  const targetDate = new Date("Mar 31, 2025 00:00:00");
  const currentTime = new Date();
  const remainingTime = targetDate - currentTime;
  
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
  res.status(200).json({ days, hours, minutes, seconds });
}
