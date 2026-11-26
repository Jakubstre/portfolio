const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const body = document.body;

const openSearch = document.getElementById("openSearch");
const openSearchDesktop = document.getElementById("openSearchDesktop");
const closeSearch = document.getElementById("closeSearch");

const searchOverlay = document.getElementById("searchOverlay");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const quickLinks = document.querySelector(".quick-links");


function initLoadingScreen() {

  const loader = document.getElementById("loadingScreen");

  if (!loader) return;

  const hasLoaded = sessionStorage.getItem("indexLoaderShown");

  if (hasLoaded) {
    loader.remove();
    return;
  }

  sessionStorage.setItem("indexLoaderShown", "true");

  setTimeout(() => {

    loader.classList.add("is-done");

    setTimeout(() => {
      loader.remove();
    }, 900);

  }, 1000);
}

function closeMenu() {

  if (!menu || !toggle) return;

  menu.classList.remove("active");
  body.classList.remove("menu-open");
  toggle.classList.remove("open");

  const menuImageLayer = document.getElementById("menuImageLayer");

  if (menuImageLayer) {
    menuImageLayer.classList.remove("menu-image-visible");
  }
}


function closeSearchOverlay() {

  if (!searchOverlay) return;

  searchOverlay.classList.remove("active");
  body.classList.remove("search-open");

  if (searchInput) {
    searchInput.blur();
  }
}


function openMenu() {

  if (!menu || !toggle) return;

  closeSearchOverlay();

  menu.classList.add("active");
  body.classList.add("menu-open");
  toggle.classList.add("open");
}


function openSearchOverlay() {

  if (!searchOverlay) return;

  if (searchOverlay.classList.contains("active")) {
    closeSearchOverlay();
    return;
  }

  closeMenu();

  if (searchInput) {
    searchInput.value = "";
  }

  if (searchResults) {
    searchResults.innerHTML = "";
  }

  if (quickLinks) {
    quickLinks.style.display = "grid";
  }

  searchOverlay.classList.add("active");
  body.classList.add("search-open");

  setTimeout(() => {

    if (searchInput) {
      searchInput.focus();
    }

  }, 350);
}


if (toggle && menu) {

  toggle.addEventListener("click", () => {

    if (menu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }

  });

}

if (openSearch) {
  openSearch.addEventListener("click", openSearchOverlay);
}

if (openSearchDesktop) {
  openSearchDesktop.addEventListener("click", openSearchOverlay);
}


if (closeSearch) {
  closeSearch.addEventListener("click", closeSearchOverlay);
}


document.addEventListener("pointerdown", (e) => {

  const clickedNav = e.target.closest("nav");

  if (
    menu
    && menu.classList.contains("active")
    && (
      e.target === menu
      || (!menu.contains(e.target) && !clickedNav)
    )
  ) {
    closeMenu();
  }

  if (
    searchOverlay
    && searchOverlay.classList.contains("active")
    && !searchOverlay.contains(e.target)
    && !clickedNav
  ) {
    closeSearchOverlay();
  }

});


document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    closeMenu();
    closeSearchOverlay();
  }

});


const pages = [

  {
    title: "Adults Are Definitely Very Weird [M,S]",
    url: "featured-work/tc-adults-are-definitely-very-weird.html"
  },
  {
    title: "Resume [O]",
    url: "resume.html"
  },
  {
    title: "Discography [M,S,D]",
    url: "full-discography.html"
  },
  {
    title: "Contact [O]",
    url: "contact.html"
  },

  {
    title: "Graphic Design [D]",
    url: "design.html"
  },
  {
    title: "Web Design [D]",
    url: "web-design.html"
  },
  {
    title: "Raster Design [D]",
    url: "raster-design.html"
  },
  {
    title: "Video Design [D]",
    url: "video-design.html"
  },
  {
    title: "Vector Design [D]",
    url: "vector-design.html"
  },

  {
    title: "Personal Portfolio [D]",
    url: "featured-work/gd-personal-portfolio.html"
  },

  {
    title: "Event Promotion [P,D]",
    url: "event-promotion.html"
  },
  {
    title: "Na Skle Maľované [P,D]",
    url: "featured-work/ep-na-skle-malovane.html"
  },
  {
    title: "Animated Birthday Invitation [D]",
    url: "featured-work/gd-invitation.html"
  },
	
	 {
    title: "Christmas Campaign [D]",
    url: "featured-work/gd-christmas-campaign.html"
  },


  {
    title: "Contents [O]",
    url: "legend.html"
  },
  {
    title: "Theatre Compositions [M,S]",
    url: "theatre-compositions.html"
  },
  {
    title: "Home [O]",
    url: "index.html"
  },
  {
    title: "About me [O]",
    url: "aboutme.html"
  }

];


if (searchInput && searchResults) {

  searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (value.length === 0) {

      if (quickLinks) {
        quickLinks.style.display = "grid";
      }

      return;
    }

    if (quickLinks) {
      quickLinks.style.display = "none";
    }

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


if (typeof Lenis !== "undefined") {

  const lenis = new Lenis({
    duration: 2,
    smoothWheel: true,
    touchMultiplier: 1
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

}


function initRevealAnimations() {

  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
    return;
  }

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

  revealElements.forEach(element => {
    observer.observe(element);
  });

}


document.querySelectorAll(".video-item").forEach(video => {

  video.addEventListener("click", () => {

    const videoId = video.dataset.videoId;

    if (!videoId) return;

    video.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
        title="YouTube video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;

  }, {
    once: true
  });

});


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

    if (audioIcon) {
      audioIcon.innerHTML =
        '<path d="M7 5H10V19H7Z M14 5H17V19H14Z" fill="currentColor"/>';
    }

    playButton.setAttribute("aria-label", "Pause");

  });


  audio.addEventListener("pause", () => {

    if (audioIcon) {
      audioIcon.innerHTML =
        '<path d="M8 5L19 12L8 19V5Z" fill="currentColor"/>';
    }

    playButton.setAttribute("aria-label", "Play");

  });


  audio.addEventListener("loadedmetadata", () => {

    if (duration) {
      duration.textContent = formatTime(audio.duration);
    }

  });


  audio.addEventListener("timeupdate", () => {

    if (currentTime) {
      currentTime.textContent = formatTime(audio.currentTime);
    }

    if (progress && Number.isFinite(audio.duration)) {
      progress.value = (audio.currentTime / audio.duration) * 100;
    }

  });


  if (progress) {

    progress.addEventListener("input", () => {

      if (Number.isFinite(audio.duration)) {
        audio.currentTime = (progress.value / 100) * audio.duration;
      }

    });

  }


  audio.addEventListener("ended", () => {

    if (progress) {
      progress.value = 0;
    }

    if (currentTime) {
      currentTime.textContent = "0:00";
    }

  });

}


if (
  window.matchMedia(
    "(min-width: 1200px) and (hover: hover) and (pointer: fine)"
  ).matches
) {

  const heroTags = document.querySelectorAll(".hero-tags a");
  const cursorPreview = document.getElementById("cursorPreview");
const previewImage = cursorPreview?.querySelector("img");

  if (cursorPreview && previewImage) {

    heroTags.forEach(tag => {

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


/* =========================================
   MENU - FLOATING IMAGE PREVIEW
========================================= */

function initMenuImagePreview() {

  if (
    !window.matchMedia(
      "(min-width: 1200px) and (hover: hover) and (pointer: fine)"
    ).matches
  ) {
    return;
  }

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

}


function initialisePortfolio() {

  initLoadingScreen();
  initRevealAnimations();
  initMenuImagePreview();

}

if (document.readyState === "loading") {

  document.addEventListener("DOMContentLoaded", initialisePortfolio);

} else {

  initialisePortfolio();

}


