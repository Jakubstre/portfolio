const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const body = document.body;

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("loadingScreen");

    if (!loader) return;

    /*
     * Show loader only on the first index visit
     * during this browser session.
     */
    const hasLoaded = sessionStorage.getItem("indexLoaderShown");

    if (hasLoaded) {
      loader.remove();
      return;
    }

    sessionStorage.setItem("indexLoaderShown", "true");

    /*
     * Keep the loader visible briefly,
     * then slide it upward.
     */
    setTimeout(function () {
      loader.classList.add("is-done");

      /*
       * Remove it completely after the animation.
       */
      setTimeout(function () {
        loader.remove();
      }, 900);

    }, 1000);

  });

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
  duration: 2,
  smoothWheel: true,
  touchMultiplier: 1
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

const pages = [
  { title: "Adults Are Definitely Very Weird [M,S]", url: "featured-work/tc-adults-are-definitely-very-weird.html" },
  { title: "Resume [O]", url: "resume.html" },
  { title: "Discography [M,S,D]", url: "full-discography.html" },
  { title: "Contact [O]", url: "contact.html" },
	  { title: "Graphic Design [D]", url: "design.html" },
		{ title: "Web Design [D]", url: "web-design.html" },
		{ title: "Raster Design [D]", url: "raster-design.html" },
		{ title: "Video Design [D]", url: "video-design.html" },
	{ title: "Vector Design [D]", url: "vector-design.html" },
  { title: "Detective [M,S]", url: "featured-work/tc-detective.html" },
  { title: "Cigáni Idú Do Neba [P,D]", url: "featured-work/ep-cigani-idu-do-neba.html" },
	  { title: "Communication Strategy Brochure [D]", url: "featured-work/gd-brochure-plan.html" },
	{ title: "Personal Portfolio [D]", url: "featured-work/gd-personal-portfolio.html" },
  { title: "Midheaven's Website [D]", url: "featured-work/gd-midheaven-website.html" },
	{ title: "Event Promotion [P,D]", url: "event-promotion.html" },
	{ title: "Na Skle Maľované [P,D]", url: "featured-work/ep-na-skle-malovane.html" },
	{ title: "Animated Birthday Invitation [D]", url: "featured-work/gd-invitation.html" },
		{ title: "LARP ID Cards [D]", url: "featured-work/gd-id-cards.html" },
		{ title: "Dolné Skaly [D]", url: "featured-work/gd-information-board.html" },
	{ title: "Contents [O]", url: "legend.html" },
	{ title: "Theatre Compositions [M,S]", url: "theatre-compositions.html" },
	{ title: "Home [O]", url: "index.html" },
		{ title: "Database [O]", url: "databases.html" },
	{ title: "About me [O]", url: "aboutme.html" }
];

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


if (searchInput) {
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (value.length === 0) {
      if (quickLinks) quickLinks.style.display = "grid";
      return;
    }

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

// PORTFOLIO AUDIO PLAYER

const audio = document.getElementById("portfolioAudio");
const playButton = document.getElementById("audioPlay");
const audioIcon = document.getElementById("audioIcon");
const progress = document.getElementById("audioProgress");
const currentTime = document.getElementById("audioCurrent");
const duration = document.getElementById("audioDuration");

if (audio && playButton) {

  function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  playButton.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    audioIcon.innerHTML =
      '<path d="M7 5H10V19H7Z M14 5H17V19H14Z" fill="currentColor"/>';
    playButton.setAttribute("aria-label", "Pause");
  });

  audio.addEventListener("pause", () => {
    audioIcon.innerHTML =
      '<path d="M8 5L19 12L8 19V5Z" fill="currentColor"/>';
    playButton.setAttribute("aria-label", "Play");
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audio.currentTime);

    if (Number.isFinite(audio.duration)) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  progress.addEventListener("input", () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = (progress.value / 100) * audio.duration;
    }
  });

  audio.addEventListener("ended", () => {
    progress.value = 0;
    currentTime.textContent = "0:00";
  });
}

// HERO TAGS - FLOATING IMAGE PREVIEW

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

  const heroTags = document.querySelectorAll(".hero-tags a");
  const cursorPreview = document.getElementById("cursorPreview");
  const previewImage = cursorPreview?.querySelector("img");

  if (cursorPreview && previewImage) {

    heroTags.forEach((tag) => {

      tag.addEventListener("mouseenter", () => {
        const image = tag.dataset.preview;

        if (image) {
          previewImage.src = image;
          cursorPreview.classList.add("active");
        }
      });

      tag.addEventListener("mousemove", (e) => {
        const offset = 150;

        const previewWidth = cursorPreview.offsetWidth;
        const previewHeight = cursorPreview.offsetHeight;

        let x = e.clientX + offset;
        let y = e.clientY + offset;

        if (x + previewWidth > window.innerWidth) {
          x = e.clientX - previewWidth - offset;
        }

        if (y + previewHeight > window.innerHeight) {
          y = e.clientY - previewHeight - offset;
        }

        cursorPreview.style.left = `${x}px`;
        cursorPreview.style.top = `${y}px`;
      });

      tag.addEventListener("mouseleave", () => {
        cursorPreview.classList.remove("active");
      });

    });
  }
}
// MENU - FLOATING IMAGE PREVIEW

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {

  document.addEventListener("DOMContentLoaded", () => {

    const menuImageLayer = document.getElementById("menuImageLayer");
    const menuImageElement = document.getElementById("menuImageElement");

    const menuImageLinks = document.querySelectorAll(
      ".menu-content a[data-menu-image]"
    );

    if (!menuImageLayer || !menuImageElement) return;

    menuImageLinks.forEach(link => {

      link.addEventListener("mouseenter", event => {
        const imagePath = link.getAttribute("data-menu-image");

        if (!imagePath) return;

        menuImageElement.src = imagePath;
        menuImageLayer.classList.add("menu-image-visible");

        updateMenuImagePosition(event);
      });

      link.addEventListener("mousemove", updateMenuImagePosition);

      link.addEventListener("mouseleave", () => {
        menuImageLayer.classList.remove("menu-image-visible");
      });

    });

    function updateMenuImagePosition(event) {
      const gap = 20;

      const imageWidth = menuImageLayer.offsetWidth;
      const imageHeight = menuImageLayer.offsetHeight;

      let left = event.clientX + gap;
      let top = event.clientY + gap;

      if (left + imageWidth > window.innerWidth - 15) {
        left = event.clientX - imageWidth - gap;
      }

      if (top + imageHeight > window.innerHeight - 15) {
        top = event.clientY - imageHeight - gap;
      }

      left = Math.max(15, left);
      top = Math.max(15, top);

      menuImageLayer.style.left = `${left}px`;
      menuImageLayer.style.top = `${top}px`;
    }

  });
}

