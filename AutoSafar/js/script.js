/* script.js - main behavior for AutoSafar
   - Reads window.AUTOSAFAR_CONFIG and window.CARS
   - Renders dynamic content (logo, hero, latest cars, modal, search)
   - Keeps HTML free of hardcoded vehicles
*/

(function(){
  // Helper: format price
  function formatPrice(val){
    return new Intl.NumberFormat(undefined, {notation: 'standard'}).format(val) + ' MAD';
  }

  // DOM refs
  const dealerNameEl = document.getElementById('dealer-name');
  const logoEl = document.getElementById('site-logo');
  const heroEl = document.querySelector('.hero');
  const carsGrid = document.getElementById('cars-grid');
  const footerYear = document.getElementById('footer-year');
  const footerDealer = document.getElementById('footer-dealer');
  const footerContact = document.getElementById('footer-contact');
  const footerSocials = document.getElementById('footer-socials');
  const dealerContact = document.getElementById('dealer-contact');
  const dealerSocials = document.getElementById('dealer-socials');
  const dealerMap = document.getElementById('dealer-map');

  // Search inputs
  const brandSelect = document.getElementById('filter-brand');
  const modelSelect = document.getElementById('filter-model');
  const citySelect = document.getElementById('filter-city');
  const searchForm = document.getElementById('search-form');

  // Modal refs
  const modal = document.getElementById('car-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalSpecs = document.getElementById('modal-specs');
  const modalDesc = document.getElementById('modal-desc');
  const modalMainImage = document.getElementById('modal-main-image');
  const modalThumbs = document.getElementById('modal-thumbs');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const callBtn = document.getElementById('call-btn');
  const slidePrev = document.getElementById('slide-prev');
  const slideNext = document.getElementById('slide-next');

  let currentGallery = [];
  let currentIndex = 0;

  // Load config and cars from globals
  const cfg = window.AUTOSAFAR_CONFIG || {};
  const cars = window.CARS || [];

  // Initialize dealer info
  function initDealer(){
    dealerNameEl.textContent = cfg.dealerName || 'AutoSafar';
    logoEl.src = cfg.logoPath || 'images/logo/logo.png';
    logoEl.alt = (cfg.dealerName || 'AutoSafar') + ' logo';
    heroEl.style.background = `url('${cfg.heroImage || 'images/hero/hero.jpg'}') center/cover no-repeat`;

    footerYear.textContent = new Date().getFullYear();
    footerDealer.textContent = cfg.dealerName || 'AutoSafar';

    const contactHtml = [];
    if(cfg.phone) contactHtml.push(`<div>Phone: <a href=\"tel:${cfg.phone}\">${cfg.phone}</a></div>`);
    if(cfg.email) contactHtml.push(`<div>Email: <a href=\"mailto:${cfg.email}\">${cfg.email}</a></div>`);
    if(cfg.address) contactHtml.push(`<div>Address: ${cfg.address}</div>`);
    footerContact.innerHTML = contactHtml.join('');

    const socials = [];
    if(cfg.facebook) socials.push(`<a href=\"${cfg.facebook}\" target=\"_blank\">Facebook</a>`);
    if(cfg.instagram) socials.push(`<a href=\"${cfg.instagram}\" target=\"_blank\">Instagram</a>`);
    footerSocials.innerHTML = socials.join(' | ');

    dealerContact.innerHTML = contactHtml.join('');
    dealerSocials.innerHTML = socials.join(' | ');

    if(cfg.mapsLink){
      dealerMap.innerHTML = `<a href=\"${cfg.mapsLink}\" target=\"_blank\">View on Google Maps</a>`;
    }

    // Call and WhatsApp button behaviors default setup
    whatsappBtn.addEventListener('click', function(e){
      // href set when opening modal
    });
    callBtn.addEventListener('click', function(e){
      if(cfg.phone){
        window.location.href = `tel:${cfg.phone}`;
      }
    });
  }

  // Utility: get unique values for select options
  function uniqueValues(arr, key){
    const s = new Set();
    arr.forEach(a => { if(a[key]) s.add(a[key]); });
    return Array.from(s).sort();
  }

  // Populate filter selects
  function initFilters(){
    const brands = uniqueValues(cars, 'brand');
    const models = uniqueValues(cars, 'model');
    const cities = uniqueValues(cars, 'city');

    brands.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; brandSelect.appendChild(o); });
    models.forEach(m => { const o = document.createElement('option'); o.value = m; o.textContent = m; modelSelect.appendChild(o); });
    cities.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; citySelect.appendChild(o); });

    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      const b = brandSelect.value;
      const m = modelSelect.value;
      const c = citySelect.value;
      const filtered = cars.filter(car => {
        return (b ? car.brand === b : true) && (m ? car.model === m : true) && (c ? car.city === c : true);
      });
      renderCars(filtered);
    });
  }

  // Render car cards
  function renderCars(list){
    carsGrid.innerHTML = '';
    if(!list || list.length === 0){
      carsGrid.innerHTML = '<p>No cars found.</p>';
      return;
    }
    list.forEach(car => {
      const card = document.createElement('article');
      card.className = 'car-card';
      card.innerHTML = `
        <img src="${car.image || 'images/cars/placeholder.jpg'}" alt="${car.brand} ${car.model}" />
        <div class="car-body">
          <div>
            <h3>${car.brand} ${car.model}</h3>
            <div class="car-meta"><span>${car.year}</span><span>${car.mileage ? car.mileage + ' km' : ''}</span><span>${car.city || ''}</span></div>
          </div>
          <div class="car-meta">
            <div class="price">${formatPrice(car.price)}</div>
            <a href="#details" class="btn-details" data-id="${car.id}">Details</a>
          </div>
        </div>
      `;
      carsGrid.appendChild(card);
    });

    // Attach details handlers
    document.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const id = Number(this.dataset.id);
        const car = cars.find(c => c.id === id);
        if(car) openModal(car);
      });
    });
  }

  // Modal open -> populate content
  function openModal(car){
    modal.setAttribute('aria-hidden', 'false');
    currentGallery = Array.isArray(car.gallery) && car.gallery.length ? car.gallery.slice() : [car.image];
    currentIndex = 0;
    updateModalImage();

    modalTitle.textContent = `${car.brand} ${car.model} (${car.year})`;
    modalPrice.textContent = formatPrice(car.price);
    modalDesc.textContent = car.description || '';

    modalSpecs.innerHTML = '';
    const specs = [
      ['Mileage', car.mileage ? car.mileage + ' km' : 'N/A'],
      ['Fuel', car.fuel || 'N/A'],
      ['Transmission', car.transmission || 'N/A'],
      ['City', car.city || 'N/A']
    ];
    specs.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `${s[0]}: ${s[1]}`;
      modalSpecs.appendChild(li);
    });

    // Thumbnails
    modalThumbs.innerHTML = '';
    currentGallery.forEach((g, idx) => {
      const t = document.createElement('img');
      t.src = g;
      t.alt = `Thumbnail ${idx+1}`;
      t.addEventListener('click', ()=>{ currentIndex = idx; updateModalImage(); });
      modalThumbs.appendChild(t);
    });

    // WhatsApp and Call links use config
    if(cfg.whatsapp){
      const waNumber = cfg.whatsapp.replace(/[^\d+]/g, '');
      const msg = encodeURIComponent(`Hello ${cfg.dealerName || ''}, I'm interested in the ${car.brand} ${car.model} (${car.year}) listed on your site.`);
      whatsappBtn.href = `https://wa.me/${waNumber.replace(/^\+/, '')}?text=${msg}`;
    } else {
      whatsappBtn.href = '#';
    }
    if(cfg.phone) callBtn.href = `tel:${cfg.phone}`;

    // Keyboard focus handling
    modal.focus();
  }

  function updateModalImage(){
    const src = currentGallery[currentIndex] || '';
    modalMainImage.src = src;
    // highlight thumb
    Array.from(modalThumbs.children).forEach((t, idx) => {
      t.style.opacity = idx === currentIndex ? '1' : '0.6';
      t.style.outline = idx === currentIndex ? '2px solid var(--primary)' : 'none';
    });
  }

  // Modal controls
  modalClose.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); });
  slidePrev.addEventListener('click', ()=>{ currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; updateModalImage(); });
  slideNext.addEventListener('click', ()=>{ currentIndex = (currentIndex + 1) % currentGallery.length; updateModalImage(); });
  modal.addEventListener('click', function(e){ if(e.target === modal) modal.setAttribute('aria-hidden','true'); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') modal.setAttribute('aria-hidden','true'); });

  // Initialize navigation toggle for small screens
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle.addEventListener('click', function(){
    if(mainNav.style.display === 'block') mainNav.style.display = '';
    else mainNav.style.display = 'block';
  });

  // Start
  initDealer();
  initFilters();

  // Show featured cars first, otherwise first N
  const featured = cars.filter(c => c.featured);
  renderCars(featured.length ? featured : cars);

})();