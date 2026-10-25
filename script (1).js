(() => {
  const pages = [...document.querySelectorAll(".page")];
  const counter = document.getElementById("counter");
  const progress = document.getElementById("progress");
  let current = 0;

  function goTo(n) {
    current = Math.max(0, Math.min(pages.length - 1, n));

    pages.forEach((page, i) => {
      page.classList.toggle("active", i === current);
      page.setAttribute("aria-hidden", i === current ? "false" : "true");
    });

    counter.textContent =
      `${String(current + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;

    progress.style.width =
      `${((current + 1) / pages.length) * 100}%`;

    pages[current].scrollTop = 0;
  }

  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => goTo(current + 1));
  });

  const reasons = [
    {
      emoji: "🫶",
      title: "Your heart",
      copy: "The way you care for people, even in the smallest ways."
    },
    {
      emoji: "☀️",
      title: "Your sunshine",
      copy: "You have a way of making an ordinary day feel brighter."
    },
    {
      emoji: "😂",
      title: "Your laugh",
      copy: "It is the kind of happiness that makes other people smile too."
    },
    {
      emoji: "🌷",
      title: "Your strength",
      copy: "You keep finding your way through things, even when they are hard."
    },
    {
      emoji: "🤍",
      title: "Your softness",
      copy: "You make the people around you feel safe and understood."
    },
    {
      emoji: "✨",
      title: "Your magic",
      copy: "There is nobody quite like you, Boori. Never forget that."
    }
  ];

  let reasonIndex = 0;

  const loveEmoji = document.getElementById("loveEmoji");
  const loveTitle = document.getElementById("loveTitle");
  const loveCopy = document.getElementById("loveCopy");
  const loveCount = document.getElementById("loveCount");
  const dots = [...document.querySelectorAll("#loveDots span")];

  function renderReason() {
    const r = reasons[reasonIndex];

    loveEmoji.textContent = r.emoji;
    loveTitle.textContent = r.title;
    loveCopy.textContent = r.copy;
    loveCount.textContent =
      `${String(reasonIndex + 1).padStart(2, "0")} / 06`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("selected", i === reasonIndex);
    });

    document.getElementById("loveNext").innerHTML =
      reasonIndex === reasons.length - 1
        ? 'That’s why you’re special <span>→</span>'
        : 'One more thing <span>→</span>';
  }

  document.getElementById("loveNext").addEventListener("click", () => {
    if (reasonIndex < reasons.length - 1) {
      reasonIndex++;
      renderReason();
    } else {
      goTo(2);
    }
  });

  document.getElementById("lovePrev").addEventListener("click", () => {
    reasonIndex =
      (reasonIndex - 1 + reasons.length) % reasons.length;
    renderReason();
  });

  document.querySelectorAll(".reason-tile").forEach(tile => {
    tile.addEventListener("click", () => {
      tile.classList.toggle("selected");
    });
  });

  // Birthday cake interaction
  const cakeButton = document.getElementById("cakeButton");
  const wishReveal = document.getElementById("wishReveal");

  cakeButton.addEventListener("click", () => {
    cakeButton.classList.add("blown");
    wishReveal.hidden = false;

    document.getElementById("cakeHint").textContent =
      "Your wish is on its way ✨";

    celebrate(35);
  });

  // Five-heart challenge
  let hearts = 0;
  const heartButtons = [
    ...document.querySelectorAll("#challengeHearts button")
  ];

  heartButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.classList.contains("done")) return;

      button.classList.add("done");
      button.textContent = "♥";
      hearts++;

      document.getElementById("challengeMeter").style.width =
        `${hearts * 20}%`;

      document.getElementById("challengeText").textContent =
        hearts === 5
          ? "All the love has been sent. 💗"
          : `${5 - hearts} more ${
              5 - hearts === 1 ? "heart" : "hearts"
            } to go…`;

      if (hearts === 5) {
        document.getElementById("challengeContinue").disabled = false;
        celebrate(24);
      }
    });
  });

  document
    .getElementById("challengeContinue")
    .addEventListener("click", () => goTo(6));

  // Open and close the birthday letter
  const envelopeButton = document.getElementById("envelopeButton");

  envelopeButton.addEventListener("click", () => {
    envelopeButton.classList.toggle("open");

    const isOpen = envelopeButton.classList.contains("open");

    document.getElementById("letter").hidden = !isOpen;

    document.getElementById("envelopeHint").textContent =
      isOpen
        ? "A note, from the heart. ♡"
        : "Tap the envelope to open your letter.";
  });

  // Confetti animation
  function celebrate(amount = 45) {
    const layer = document.getElementById("confettiLayer");

    const colors = [
      "#ee70b5",
      "#f7c5df",
      "#c6a6ed",
      "#fff1a8",
      "#ffffff",
      "#d7b5f2"
    ];

    for (let i = 0; i < amount; i++) {
      const bit = document.createElement("span");

      bit.className = "confetti-bit";
      bit.style.left = `${Math.random() * 100}%`;

      bit.style.background =
        colors[Math.floor(Math.random() * colors.length)];

      bit.style.animationDelay = `${Math.random() * 0.7}s`;

      bit.style.animationDuration =
        `${2 + Math.random() * 1.7}s`;

      bit.style.transform =
        `rotate(${Math.random() * 180}deg)`;

      layer.appendChild(bit);

      setTimeout(() => bit.remove(), 4300);
    }
  }

  document
    .getElementById("confettiButton")
    .addEventListener("click", () => celebrate(110));

  // Replay the birthday experience
  document.getElementById("replayButton").addEventListener("click", () => {
    reasonIndex = 0;
    renderReason();

    cakeButton.classList.remove("blown");
    wishReveal.hidden = true;

    document.getElementById("cakeHint").textContent =
      "Tap the cake to blow them out ✨";

    hearts = 0;

    heartButtons.forEach(button => {
      button.classList.remove("done");
      button.textContent = "♡";
    });

    document.getElementById("challengeMeter").style.width = "0%";

    document.getElementById("challengeText").textContent =
      "Tap all five hearts to fill this page with love.";

    document.getElementById("challengeContinue").disabled = true;

    envelopeButton.classList.remove("open");
    document.getElementById("letter").hidden = true;

    goTo(0);
  });

  // Floating sparkles on the final purple screen
  const finalStars = document.querySelector(".final-stars");

  if (finalStars) {
    for (let i = 0; i < 18; i++) {
      const s = document.createElement("span");

      s.textContent = i % 2 ? "✧" : "·";

      s.style.cssText =
        `position:absolute;left:${Math.random() * 100}%;` +
        `top:${Math.random() * 100}%;` +
        `font-size:${9 + Math.random() * 13}px;` +
        `color:#f6d6ef;opacity:${0.2 + Math.random() * 0.5};` +
        `animation:float ${3 + Math.random() * 4}s ease-in-out infinite`;

      finalStars.appendChild(s);
    }
  }

  renderReason();
  goTo(0);
})();
