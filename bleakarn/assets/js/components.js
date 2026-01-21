async function loadComponent(selector, file) {
  const el = document.querySelector(selector);
  if (!el) return;

  const res = await fetch(file);
  if (!res.ok) throw new Error(`Cannot load ${file}`);

  el.innerHTML = await res.text();

  // Ініціалізація мобільного меню після завантаження хедера
  initMobileMenu();
  
  if (window.loadCurrentLanguage) window.loadCurrentLanguage();
}

// Функція для ініціалізації мобільного меню
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (hamburgerBtn && mobileNav) {
    // Видалити стару кнопку та додати нову (щоб уникнути дублікатів обробників)
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
    
    // Додати обробник кліку на гамбургер
    newBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      this.classList.toggle('active');
      
      const isOpen = mobileNav.classList.contains('active');
      this.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
      this.setAttribute('aria-expanded', isOpen);
    });
    
    // Закривати меню при кліку на посилання
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        newBtn.classList.remove('active');
        newBtn.setAttribute('aria-label', 'Відкрити меню');
        newBtn.setAttribute('aria-expanded', false);
      });
    });
  }
}

// header
loadComponent("#header", "components/header.html").then(() => {
  const btn = document.getElementById("langToggle");
  if (btn) btn.addEventListener("click", window.toggleLanguage);
});

// footer
loadComponent("#footer-container", "components/footer.html");


