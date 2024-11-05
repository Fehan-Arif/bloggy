document.addEventListener("DOMContentLoaded", () => {
  // Set active class based on current path
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

  // Toggle the navbar visibility on hamburger click
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".navbar").classList.toggle("active");
  });

  // Add click event listeners to nav links to toggle the 'active' class
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // Remove 'active' class from all links
      navLinks.forEach(nav => nav.classList.remove("active"));
      // Add 'active' class to the clicked link
      link.classList.add("active");
    });
  });
});
