/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  //     reset: true
});

sr.reveal(".home__data, .about__img, .skills__subtitle, .skills__text", {});
sr.reveal(".home__img, .about__subtitle, .about__text, .skills__img", {
  delay: 400,
});
sr.reveal(".home__social-icon", { interval: 200 });
sr.reveal(".skills__data, .work__img, .contact__input", { interval: 200 });

const currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;

// Skill data
const skills = [
  { icon: "bx bxl-nodejs", name: "NodeJS" },
  { icon: "bx bxl-go-lang", name: "Golang" },
  { icon: "bx bxl-javascript", name: "JAVASCRIPT" },
  { icon: "bx bxl-html5", name: "HTML5" },
  { icon: "bx bxl-css3", name: "CSS3" },
  { icon: "bx bxl-tailwind-css", name: "tailwind-css" },
];

const generateSkillsHTML = (skills) => {
  return skills
    .map(
      (skill) => `
    <div class="skills__data">
      <div class="skills__names">
        <i class="${skill.icon} skills__icon"></i>
        <span class="skills__name">${skill.name}</span>
      </div>
    </div>
  `
    )
    .join("");
};

const skillsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillsContainer = document.querySelector(
          ".skills__container-data"
        );
        skillsContainer.innerHTML = generateSkillsHTML(skills);
        observer.disconnect();
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector(".skills");
  skillsObserver.observe(skillsSection);
});
