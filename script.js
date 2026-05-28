document.documentElement.classList.add("js");

// Main page elements used by the menu, contact form, and scroll animations.
const menuButton = document.querySelector(".nav-toggle");
const menu = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contact-form");

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
