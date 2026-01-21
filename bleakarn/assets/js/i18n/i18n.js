const supportedLangs = ["en", "ua", "pl"];

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
}

async function loadLanguage(lang) {
  const res = await fetch(`locales/${lang}.json`);
  if (!res.ok) throw new Error(`Cannot load locales/${lang}.json`);

  const data = await res.json();

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const value = getNestedValue(data, key);
    if (value) el.textContent = value;
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = lang.toUpperCase();
}

window.toggleLanguage = async () => {
  const current = localStorage.getItem("lang") || "en";
  const next = supportedLangs[(supportedLangs.indexOf(current) + 1) % supportedLangs.length];
  await loadLanguage(next);
};

window.loadCurrentLanguage = async () => {
  await loadLanguage(localStorage.getItem("lang") || "en");
};

window.loadCurrentLanguage();
