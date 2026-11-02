function setLanguage(language) {

    if (!translations[language]) return;


    // Translate page content
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;
        const translation = translations[language][key];

        if (translation !== undefined) {
            element.textContent = translation;
        }

    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.dataset.i18nPlaceholder;
        const translation = translations[language][key];

        if (translation !== undefined) {
            element.placeholder = translation;
        }

    });

    // Update language buttons
    document.querySelectorAll(".language-option").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.lang === language
        );

    });

    // Update HTML language
    document.documentElement.lang = language;

    // Save preference globally
    localStorage.setItem("portfolioLanguage", language);

}


// ========================================
// LANGUAGE SWITCH BUTTONS
// ========================================

document.addEventListener("click", function(event) {

    const button = event.target.closest(".language-option");

    if (!button) return;

    setLanguage(button.dataset.lang);

});


// ========================================
// LOAD SAVED LANGUAGE
// ========================================

document.addEventListener("DOMContentLoaded", function() {

    const savedLanguage =
        localStorage.getItem("portfolioLanguage") || "en";

    setLanguage(savedLanguage);

});


// ========================================
// FIRST-TIME SLOVAK TRANSLATION NOTICE
// ========================================

const translationNotice = document.getElementById("translationNotice");
const closeTranslationNotice = document.getElementById("closeTranslationNotice");

function showTranslationNotice() {

  if (!translationNotice) return;

  // Has the visitor already seen the notice?
  if (localStorage.getItem("translationNoticeShown")) return;

  // Remember that the notice has been shown
  localStorage.setItem("translationNoticeShown", "true");

  // Show notification
  setTimeout(() => {
    translationNotice.classList.add("show");
  }, 300);

  // Automatically hide after 7 500 seconds
  setTimeout(() => {
    translationNotice.classList.remove("show");
  }, 7500);

}

// Close button
if (closeTranslationNotice) {

  closeTranslationNotice.addEventListener("click", () => {
    translationNotice.classList.remove("show");
  });

}
