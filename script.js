const revealItems = document.querySelectorAll(".reveal, .hero-copy, .hero-panel, .page-hero, .column-heading, .section-heading, .story-card, .values-card, .contact-card, .map-card");
const meterFills = document.querySelectorAll(".meter-fill");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const mapCard = document.querySelector(".map-card");

window.addEventListener("load", () => {
  document.body.classList.add("page-ready");

  if (mapCard) {
    setTimeout(() => {
      mapCard.classList.add("map-active");
    }, 250);
  }
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const meterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.style.width = entry.target.dataset.width || "0%";
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.35
  }
);

meterFills.forEach((fill) => meterObserver.observe(fill));

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });
}
