import confetti from "canvas-confetti";

let isRunning = false; // 🔒 prevent auto / repeated triggers

export const triggerFireworks = () => {
  if (isRunning) return; // ⛔ block repeated calls
  isRunning = true;

  const duration = 8 * 1000; // 8 seconds
  const animationEnd = Date.now() + duration;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 50,
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      isRunning = false; // 🔓 unlock after finish
      return;
    }

    const particleCount = Math.floor(40 * (timeLeft / duration));

    // Left side fireworks
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: 0.2 },
    });

    // Right side fireworks
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: 0.2 },
    });
  }, 300);
};