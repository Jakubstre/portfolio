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

// ========================================
// LANGUAGE SWITCH
// ========================================

const translations = {

  en: {
    openToWork: "Open to Work",

    heroMusician: "Musician",
    heroComposer: "Composer",
    heroDesigner: "Designer",

    graphicDesign: "* Graphic Design",
    theatreCompositions: "* Theatre Compositions",
    alternativeMusic: "* Alternative Music",
    eventPromotion: "* Event Promotion",

    heroDescription: "is a Slovak musician, composer, sound engineer and graphic designer creating independent music, original theatre compositions, sound design, visual identities, websites and promotional work.",

    featuredWorkLink: "* Featured Work",
    designedBy: "→ Designed by Jakub Hudaček",

    introductionLabel: "→ Introduction",
    introductionTitle: "Hi, my name is Jakub and I'm a...",
    introductionText: "Multidisciplinary independent artist who combines songwriting, composition, production, design, and technology. I'm motivated by building meaningful, cohesive work that lasts, and I'm willing to invest significant time refining both the artistic and technical sides of my projects rather than settling for something merely good enough.",
    continueReading: "→ Continue Reading",

    newestWorkTitle: "* Newest Work",
    newestWorkDescription: "→ Selected project, 'Na Skle Maľované' is an official promo work that I'm currently working on for an upcoming musical production.",

    featuredWorkTitle: "* Featured Work",
    featuredWorkDescription: "→ Selected projects showcasing some of my most recent and favourite creative work across music, design, and visual media.",

    birthdayInvitation: "* Animated Birthday Invitation",
    birthdayInvitationTags: "[Graphic Design] · [Motion Graphics] · [Event Promotion]",

    dolneSkalyTags: "[Graphic Design] · [Branding]",

    personalPortfolio: "* Personal Portfolio",
    personalPortfolioTags: "[Graphic Design] · [Branding]",

    adultsAreWeirdTags: "[Theatre Composition] · [Sound Engineering] · [Graphic Design]",

    resumeLabel: "→ Resume",
    resumeTitle: "Seven years of multidisciplinary creative experience.",
    resumeText: "From composing theatre soundtracks and producing independent music to designing visual identities, websites and promotional campaigns, I've built experience across multiple creative disciplines. Explore my professional background, selected projects, technical skills and work history in my complete resume.",
    viewResume: "→ View Resume",

    recognitionTitle: "* Recognition & Highlights",
    recognitionDescription: "→ A selection of productions, releases and projects that represent my work across theatre, music and design.",

    musicCompositions: "MUSIC COMPOSITIONS",

    milestoneAdults: "Original soundtrack and sound design created for an award-winning theatre performance.",

    visualIdentity: "Visual Identity",
    milestoneVisualIdentity: "Branding, promotional materials and websites for musical and cultural projects.",

    milestoneAlbum: "Debut studio album written, produced, recorded and engineered independently.",

    milestoneChudaczek: "Original soundtrack and sound design created for a theatre performance played across Slovakia and Czech Republic.",

    stillLearning: "* Still learning",
    skillsDescription: "A snapshot of the tools, disciplines, and skills I currently use across my creative work.",

    musicComposition: "Music Composition",
    audioProduction: "Audio Production",
    soundEngineering: "Sound Engineering",
    webDevelopment: "Web Development",
    projectDevelopment: "Project Development",
    communication: "Communication",

    collaborationLabel: "→ Collaboration",
    collaborationTitle: "Looking to get in touch for collaborations in music, design, or anything in between?",
    collaborationText: "I'm available for commissions and collaborations across theatre composition, music production, graphic design, branding, websites, and promotional campaigns. Whether you're starting with a rough idea or a finished concept, I'd be glad to discuss how I can contribute to your project.",
    getInTouch: "→ Get in touch",

    menuHome: "→ Home",
    menuMidheaven: "→ Midheaven",
    menuTheatre: "→ Theatre Compositions",
    menuGraphicDesign: "→ Graphic Design",
    menuEventPromotion: "→ Event Promotion",
    menuDiscography: "→ Discography",
    menuResume: "→ Resume",
    menuAbout: "→ About me",
    menuContact: "→ Contact",

    letsTalk: "Let's talk.",
    slovakia: "Slovakia",

    legendMusic: "[M] Music Composition",
    legendDesign: "[D] Graphic Design",
    legendSound: "[S] Sound Engineering",
    legendPromotion: "[P] Event Promotion",
    legendOthers: "[O] Others",
    legendContents: "→ Contents",

    searchPlaceholder: "Search...",
    quickLinks: "Quick → Links",
    quickGraphicDesign: "Graphic Design [D]",
    quickAdults: "Adults Are Definitely Very Weird [M,S]",
    quickCigani: "Cigáni Idú Do Neba [P,D]",
    quickResume: "Resume [O]",
    quickContact: "Contact [O]"
  },


  sk: {

    heroMusician: "Hudobník",
    heroComposer: "Skladateľ",
    heroDesigner: "Grafik",

	  
    graphicDesign: "Grafický dizajn",
	  graphicDesignStar: "* Grafický Dizajn",
    theatreCompositions: "* Divadelná Tvorba",
    alternativeMusic: "* Alternatívna Hudba",
    eventPromotion: "* Propagácia Podujatí",

    heroDescription: "je slovenský hudobník, skladateľ, zvukový technik a grafický dizajnér. Venuje sa nezávislej hudbe, autorskej divadelnej tvorbe, zvukovému dizajnu, vizuálnym identitám, webovým stránkam a propagačným projektom.",

    featuredWorkLink: "* Vybraná Tvorba",
    designedBy: "→ Dizajn: Jakub Hudaček",

    introductionLabel: "→ Predstavenie",
    introductionTitle: "Ahoj, volám sa Jakub a som...",
    introductionText: "Multidisciplinárny nezávislý umelec, ktorý prepája písanie piesní, komponovanie, produkciu, dizajn a technológie. Mojou motiváciou je vytvárať zmysluplné a ucelené diela, ktoré pretrvajú. Som ochotný venovať značné množstvo času zdokonaľovaniu umeleckej aj technickej stránky svojich projektov a neuspokojiť sa s niečím, čo je iba dostatočne dobré.",
    continueReading: "→ Čítať ďalej",

    newestWorkTitle: "* Najnovšia tvorba",
    newestWorkDescription: "→ Vybraný projekt „Na skle maľované“ je oficiálna propagačná tvorba, na ktorej momentálne pracujem pre pripravovanú muzikálovú inscenáciu.",

    featuredWorkTitle: "* Vybraná tvorba",
    featuredWorkDescription: "→ Výber projektov, ktoré predstavujú moju najnovšiu a najobľúbenejšiu tvorbu v oblasti hudby, dizajnu a vizuálnych médií.",

    birthdayInvitation: "* Animovaná narodeninová pozvánka",
    birthdayInvitationTags: "[Grafický dizajn] · [Pohyblivá grafika] · [Propagácia podujatí]",

    dolneSkalyTags: "[Grafický dizajn] · [Branding]",

    personalPortfolio: "* Osobné portfólio",
    personalPortfolioTags: "[Grafický dizajn] · [Branding]",

    adultsAreWeirdTags: "[Divadelná hudba] · [Zvuková réžia] · [Grafický dizajn]",

    resumeLabel: "→ Životopis",
    resumeTitle: "Sedem rokov skúseností naprieč kreatívnymi disciplínami.",
    resumeText: "Od komponovania divadelných soundtrackov a produkcie nezávislej hudby až po tvorbu vizuálnych identít, webových stránok a propagačných kampaní som získal skúsenosti v rôznych kreatívnych oblastiach. V kompletnom životopise nájdeš moje pracovné skúsenosti, vybrané projekty, technické zručnosti a profesijné zameranie.",
    viewResume: "→ Zobraziť životopis",

    recognitionTitle: "* Ocenenia a významné projekty",
    recognitionDescription: "→ Výber inscenácií, vydaných diel a projektov, ktoré reprezentujú moju tvorbu v oblasti divadla, hudby a dizajnu.",

    musicCompositions: "HUDBA A KOMPOZÍCIA",

    milestoneAdults: "Autorský soundtrack a zvukový dizajn vytvorený pre ocenenú divadelnú inscenáciu.",

    visualIdentity: "Vizuálna identita",
    milestoneVisualIdentity: "Branding, propagačné materiály a webové stránky pre hudobné a kultúrne projekty.",

    milestoneAlbum: "Debutový štúdiový album, ktorý vznikol v nezávislej réžii od prvotného nápadu až po produkciu, nahrávanie a zvukovú realizáciu.",

    milestoneChudaczek: "Autorský soundtrack a zvukový dizajn vytvorený pre divadelnú inscenáciu uvádzanú na Slovensku a v Českej republike.",

    stillLearning: "* Neustále sa učím",
    skillsDescription: "Prehľad nástrojov, oblastí a zručností, ktoré momentálne využívam vo svojej tvorbe.",

    musicComposition: "Hudobná kompozícia",
    audioProduction: "Audio produkcia",
    soundEngineering: "Zvuková réžia",
    webDevelopment: "Tvorba webových stránok",
    projectDevelopment: "Rozvoj projektov",
    communication: "Komunikácia",

    collaborationLabel: "→ Spolupráca",
    collaborationTitle: "Hľadáš spoluprácu v oblasti hudby, dizajnu alebo čohokoľvek medzi tým?",
    collaborationText: "Som otvorený zákazkám a spolupráci v oblasti divadelnej kompozície, hudobnej produkcie, grafického dizajnu, brandingu, webových stránok a propagačných kampaní. Či už začínaš s prvotným nápadom alebo hotovým konceptom, rád prediskutujem, ako môžem prispieť k tvojmu projektu.",
    getInTouch: "→ Kontaktovať ma",

    menuHome: "→ Domov",
    menuMidheaven: "→ Midheaven",
    menuTheatre: "→ Divadelná tvorba",
    menuGraphicDesign: "→ Grafický dizajn",
    menuEventPromotion: "→ Propagácia podujatí",
    menuDiscography: "→ Diskografia",
    menuResume: "→ Životopis",
    menuAbout: "→ O mne",
    menuContact: "→ Kontakt",

    letsTalk: "Ozvi sa mi.",
    slovakia: "Slovensko",

    legendMusic: "[M] Hudobná kompozícia",
    legendDesign: "[D] Grafický dizajn",
    legendSound: "[S] Zvuková réžia",
    legendPromotion: "[P] Propagácia podujatí",
    legendOthers: "[O] Ostatné",
    legendContents: "→ Obsah",

    searchPlaceholder: "Hľadať...",
    quickLinks: "Rýchle → Odkazy",
    quickGraphicDesign: "Grafický dizajn [D]",
    quickAdults: "Adults Are Definitely Very Weird [M,S]",
    quickCigani: "Cigáni Idú Do Neba [P,D]",
    quickResume: "Životopis [O]",
    quickContact: "Kontakt [O]"
  }

};


// ========================================
// APPLY LANGUAGE
// ========================================

function setLanguage(language) {

  if (!translations[language]) return;

  // Translate regular text
  document.querySelectorAll("[data-i18n]").forEach(element => {

    const key = element.getAttribute("data-i18n");

    if (translations[language][key]) {
      element.textContent = translations[language][key];
    }

  });

  // Translate placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

    const key = element.getAttribute("data-i18n-placeholder");

    if (translations[language][key]) {
      element.setAttribute("placeholder", translations[language][key]);
    }

  });

  // Update active language button
  document.querySelectorAll(".language-option").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.lang === language
    );

  });

  // Update document language
  document.documentElement.lang = language;

  // Save selected language
  localStorage.setItem("portfolioLanguage", language);

}


// ========================================
// LANGUAGE BUTTON EVENTS
// ========================================

document.querySelectorAll(".language-option").forEach(button => {

  button.addEventListener("click", () => {

    const language = button.dataset.lang;

    setLanguage(language);
	  
	  if (language === "sk") {
  showTranslationNotice();
}

  });

});


// ========================================
// INITIALIZE SAVED LANGUAGE
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const savedLanguage = localStorage.getItem("portfolioLanguage") || "en";

  setLanguage(savedLanguage);

});