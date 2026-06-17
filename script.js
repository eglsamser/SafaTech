// ===============================
// Portfolio Website JavaScript
// Er. MD SHAMSHER AHAMED
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ---------- Select Common Elements ----------
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");
  const header = document.querySelector(".header");


  // ---------- Active Navbar Link on Scroll ----------
  function activeNavbarOnScroll() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", activeNavbarOnScroll);


  // ---------- Header Shadow Effect ----------
  function headerShadowEffect() {
    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  }

  window.addEventListener("scroll", headerShadowEffect);


  // ---------- Smooth Scroll with Header Adjustment ----------
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Only apply smooth scroll for same-page section links
      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight + 10;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });


  // ---------- Typing Text Effect ----------
  const typingText = document.querySelector(".home-content h2");

  const roles = [
    "Website Designer",
    "Poster Designer",
    "Video Ads Creator",
    "Student Mentor",
    "Logo Maker",
    "Card Designer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();


  // ---------- Scroll Reveal Animation ----------
  const revealElements = document.querySelectorAll(
    ".section-title, .about-content, .skill-box, .service-card, .admission-box, .portfolio-card, .contact-container"
  );

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 120;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
  revealOnScroll();


  // ---------- Mobile Navbar Auto Close ----------
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const navbar = document.querySelector(".navbar");

      if (navbar && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
      }
    });
  });


  // ---------- Contact Button Message ----------
  const callButton = document.querySelector(".contact .btn");

  if (callButton) {
    callButton.addEventListener("click", () => {
      alert("Thank you for contacting SAFA TECH.");
    });
  }


  // ---------- Footer Year Auto Update ----------
  const footerText = document.querySelector(".footer p");

  if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = `© ${currentYear} SAFA TECH | Digital Marketing & Web Services | All Rights Reserved`;
  }


  // ---------- Service Card Hover Glow ----------
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-12px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });


  // ---------- Portfolio Card Hover Glow ----------
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  portfolioCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });


  // ---------- Add CSS Classes Dynamically ----------
  const style = document.createElement("style");

  style.innerHTML = `
    .navbar a.active {
      color: #ffd700;
      text-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
    }

    .sticky-header {
      background: rgba(0, 0, 0, 0.98);
      box-shadow: 0 0 30px rgba(255, 215, 0, 0.25);
    }

    .section-title,
    .about-content,
    .skill-box,
    .service-card,
    .admission-box,
    .portfolio-card,
    .contact-container {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s ease;
    }

    .section-title.show,
    .about-content.show,
    .skill-box.show,
    .service-card.show,
    .admission-box.show,
    .portfolio-card.show,
    .contact-container.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(style);


  // ---------- WhatsApp Contact Form ----------
  const whatsappForm = document.getElementById("whatsappForm");

  if (whatsappForm) {
    whatsappForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const address = document.getElementById("address")?.value.trim() || "";
      const requirement = document.getElementById("requirement")?.value || "";
      const message = document.getElementById("message")?.value.trim() || "No extra message";

      const phoneNumber = "918090365014";

      const whatsappMessage =
        `Hello SAFA TECH,\n\n` +
        `I want to contact you for service.\n\n` +
        `Name: ${name}\n` +
        `Address: ${address}\n` +
        `Requirement: ${requirement}\n` +
        `Message: ${message}\n\n` +
        `Please contact me.`;

      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappURL, "_blank");
    });
  }


  // ---------- Welcome Console Message ----------
  console.log("Welcome to SAFA TECH Portfolio Website");

});
