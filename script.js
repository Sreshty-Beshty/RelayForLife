document.addEventListener("DOMContentLoaded", () => {

  const targetDate = new Date("2026-04-18T20:00:00").getTime();
  let lastValues = {};
  let liveTriggeredTime = null;

  function UpdateCountdown() {
    const now = Date.now();
    let diff = targetDate - now;
    const endDate = targetDate + 86400000;
    const diffFromEnd = now - endDate;

    if (diffFromEnd >= 0) {
      if (!liveTriggeredTime) {
        liveTriggeredTime = Date.now();
        showEndedState();
      }
      return;
    }

    if (diff <= 0) {
      if (!liveTriggeredTime) {
        liveTriggeredTime = Date.now();
        showLiveState();
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const days = Math.floor(totalSeconds / 86400);

    SetValue("days", days);
    SetValue("hours", hours);
    SetValue("minutes", minutes);
    SetValue("seconds", seconds);

    const countdownEl = document.getElementById("countdown");

  if (diff <= 86400000) {
    countdownEl?.classList.add("final-glow");
  } else {
    countdownEl?.classList.remove("final-glow");
  }

  }

  function SetValue(id, value) {
    const el = document.getElementById(id);
    if (!el) return;

    const formatted = String(value).padStart(2, "0");

    if (lastValues[id] !== formatted) {
      el.textContent = formatted;
      el.classList.remove("flip");
      void el.offsetWidth;
      el.classList.add("flip");
      lastValues[id] = formatted;
    }
  }

  function showLiveState() {
    const section = document.getElementById("countdown-section");
    if (!section) return;

    const countdownEl = document.getElementById("countdown");
    if (countdownEl) {
      countdownEl.classList.add("countdown-fade-out");
    }

    setTimeout(() => {
      CreateConfetti();
      section.innerHTML = `
        <div class="live-container">
          <h1>RELAY FOR LIFE IS LIVE!</h1>
          <p>Let The Walkathon Begin!</p>
          <a class="live-login-btn" href="MyTeam/dashboard.html">Go to Login</a>
        </div>
      `;
      const liveEl = section.querySelector('.live-container');
      if (liveEl) {
        setTimeout(() => {
          liveEl.classList.add('live-fade-in');
        }, 50);
      }
    }, 700); 
  }

  function showEndedState() {
    const section = document.getElementById("countdown-section");
    if (!section) return;

    const liveEl = section.querySelector('.live-container');
    if (liveEl) {
      liveEl.classList.remove('live-fade-in');
      liveEl.classList.add('countdown-fade-out');
    }

    setTimeout(() => {
      section.innerHTML = `
        <div class="live-container ended-container">
          <h1>RFL HAS ENDED!</h1>
          <p>Thanks for participating in Relay For Life!</p>
        </div>
      `;
      const endedEl = section.querySelector('.ended-container');
      if (endedEl) {
        setTimeout(() => {
          endedEl.classList.add('live-fade-in');
        }, 50);
      }
    }, 700);
  }

  UpdateCountdown();
  setInterval(UpdateCountdown, 1000);
});
