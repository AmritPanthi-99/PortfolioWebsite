document.documentElement.classList.add("js");

// Main page elements used by the menu, contact form, and scroll animations.
const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");
const certificateTrigger = document.querySelector(".certificate-zoom-trigger");
const certificateModal = document.querySelector("#certificate-modal");
const modalClose = document.querySelector(".modal-close");

year.textContent = new Date().getFullYear();

// Mobile menu: opens and closes the navigation links on smaller screens.
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  menu.classList.toggle("open", !open);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
  });
});

// Certificate popup: lets visitors enlarge the BTL1 certificate without leaving the page.
const closeCertificateModal = () => {
  certificateModal.classList.remove("open");
  certificateModal.setAttribute("aria-hidden", "true");
};

certificateTrigger.addEventListener("click", () => {
  certificateModal.classList.add("open");
  certificateModal.setAttribute("aria-hidden", "false");
});

modalClose.addEventListener("click", closeCertificateModal);

certificateModal.addEventListener("click", (event) => {
  if (event.target === certificateModal) {
    closeCertificateModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && certificateModal.classList.contains("open")) {
    closeCertificateModal();
  }
});

// Contact form: opens the visitor's email app with a pre-filled message to you.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const message = data.get("message").trim();
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:amritpanthi99@gmail.com?subject=${subject}&body=${body}`;
});

// Scroll reveal: fades sections in as visitors move down the page.
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.13 }
  );

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("visible"));
}
