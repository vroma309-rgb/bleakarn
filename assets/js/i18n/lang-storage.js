window.langStorage = {
  get() {
    return localStorage.getItem("lang");
  },
  set(lang) {
    localStorage.setItem("lang", lang);
  }
};
