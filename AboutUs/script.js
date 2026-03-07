const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  {threshold: 0.1},
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  obs.observe(el);
});

const scrollSpeed = 1;
let scrollInterval;

function setupCarousels(containerSelector, direction = 1) {
  const containers = document.querySelectorAll(containerSelector);
  return Array.from(containers).map((container) => {
    const carousel = container.querySelector(".carousel");
    carousel.innerHTML += carousel.innerHTML;
    const halfWidth = carousel.scrollWidth / 2;
    if (direction === -1) {
      container.scrollLeft = halfWidth;
    }
    return {container, halfWidth, direction};
  });
}

function startAutoScroll() {
  const rightCarousels = setupCarousels(".lazy-scrolling-container.right", 1);
  const leftCarousels = setupCarousels(".lazy-scrolling-container.left", -1);

  scrollInterval = setInterval(() => {
    rightCarousels.forEach((c) => {
      c.container.scrollLeft += scrollSpeed;
      if (c.container.scrollLeft >= c.halfWidth) {
        c.container.scrollLeft = 0;
      }
    });
    leftCarousels.forEach((c) => {
      c.container.scrollLeft -= scrollSpeed;
      if (c.container.scrollLeft <= 0) {
        c.container.scrollLeft = c.halfWidth;
      }
    });
  }, 16);
}
startAutoScroll();
