const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const body = document.body;

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  body.classList.toggle("menu-open");
  toggle.classList.toggle("open");
});

menu.addEventListener("click", (e) => {
  if (e.target === menu) {
    menu.classList.remove("active");
    body.classList.remove("menu-open");
    toggle.classList.remove("open");
  }
});

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 1.5
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf);

const openSearch = document.getElementById("openSearch");
const openSearchDesktop = document.getElementById("openSearchDesktop");
const closeSearch = document.getElementById("closeSearch");

const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const quickLinks = document.querySelector(".quick-links");


// =========================
// DATA
// =========================
const pages = [
  { title: "Adults Are Definitely Very Weird [M,S]", url: "featured-work/tc-adults-are-definitely-very-weird.html" },
  { title: "Resume [O]", url: "resume.html" },
  { title: "Discography [M,S,D]", url: "full-discography.html" },
  { title: "Contact [O]", url: "contact.html" },
	  { title: "Graphic Design [D]", url: "design.html" },
		{ title: "Web Design [D]", url: "web-design.html" },
  { title: "Detective [M,S]", url: "featured-work/tc-detective.html" },
  { title: "Cigáni Idú Do Neba [P,D]", url: "featured-work/ep-cigani-idu-do-neba.html" },
	{ title: "Personal Portfolio [D]", url: "featured-work/gd-personal-portfolio.html" },
  { title: "Midheaven's Website [D]", url: "featured-work/gd-midheaven-website.html" },
	{ title: "Event Promotion [P,D]", url: "event-promotion.html" },
	{ title: "Na Skle Maľované [P,D]", url: "featured-work/ep-na-skle-malovane.html" },
	{ title: "Contents [O]", url: "legend.html" },
	{ title: "Raster Design [D]", url: "raster-design.html" },
	{ title: "Theatre Compositions [M,S]", url: "theatre-compositions.html" },
	{ title: "Home [O]", url: "index.html" },
	{ title: "About me [O]", url: "aboutme.html" }
];


// =========================
// OPEN SEARCH
// =========================
function openSearchOverlay() {
  searchOverlay.classList.add("active");

  searchInput.value = "";
  searchResults.innerHTML = "";

  if (quickLinks) {
    quickLinks.style.display = "grid";
  }

  setTimeout(() => {
    searchInput.focus();
  }, 100);
}

if (openSearch) openSearch.addEventListener("click", openSearchOverlay);
if (openSearchDesktop) openSearchDesktop.addEventListener("click", openSearchOverlay);


if (closeSearch) {
  closeSearch.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
    searchInput.blur();
  });
}


// =========================
// SEARCH INPUT
// =========================
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    // EMPTY INPUT → SHOW QUICK LINKS
    if (value.length === 0) {
      if (quickLinks) quickLinks.style.display = "grid";
      return;
    }

    // TYPING → HIDE QUICK LINKS
    if (quickLinks) quickLinks.style.display = "none";

    const matches = pages.filter(page =>
      page.title.toLowerCase().includes(value)
    );

    matches.forEach(page => {
      const link = document.createElement("a");
      link.className = "search-result";
      link.href = page.url;
      link.textContent = page.title;
      searchResults.appendChild(link);
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

});
document.querySelectorAll(".video-item").forEach((video) => {

  video.addEventListener("click", () => {

    const videoId = video.dataset.videoId;

    video.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
        title="YouTube video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;

  }, { once: true });

});
