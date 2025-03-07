import { createCanvas } from 'canvas';
import GIFEncoder from 'gifencoder';

export default function handler(req, res) {
  const targetDate = new Date("Mar 31, 2025 00:00:00");
  const currentTime = new Date();
  const remainingTime = targetDate - currentTime;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Create the GIF encoder
  const encoder = new GIFEncoder(400, 100); // width and height of GIF
  encoder.createReadStream().pipe(res); // Output the GIF to the response
  encoder.start();
  encoder.setRepeat(0); // 0 for infinite loop
  encoder.setDelay(1000); // 1 second delay between frames
  encoder.setQuality(10); // Quality of the GIF

  // Create canvas for drawing the countdown
  const canvas = createCanvas(400, 100);
  const ctx = canvas.getContext('2d');

  function drawCountdown() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background and text color
    ctx.fillStyle = '#000'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFF'; // White text
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw the countdown
    ctx.fillText(`Days: ${days} Hours: ${hours} Minutes: ${minutes} Seconds: ${seconds}`, canvas.width / 2, canvas.height / 2);

    // Add this frame to the GIF
    encoder.addFrame(ctx);
  }

  // Generate frames for the GIF
  for (let i = 0; i < 60; i++) {
    drawCountdown();
    days--;
    if (days < 0) {
      break;
    }
  }

  encoder.finish();
}
