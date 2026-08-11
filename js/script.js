const config = {
  companyName: 'Safar Drive',
  whatsappNumber: '212645823515',
  whatsappDisplay: '+212 645 823 515',
  phone: '+212 645 823 515',
  email: 'contact@safardrive.ma',
  address: 'Marrakech, Maroc',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10457.539197346508!2d-7.99337120320754!3d31.629472683582596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdae5d6be34a9d73%3A0x4fe2f2ed56c35d05!2sMarrakech%2C%20Maroc!5e0!3m2!1sfr!2sus!4v1700000000000!5m2!1sfr!2sus',
  social: {
    instagram: '#',
    facebook: '#',
    tiktok: '#',
    whatsapp: 'https://wa.me/212645823515'
  }
};

const vehicles = [
  {
    name: 'Dacia Logan',
    category: 'Berline',
    transmission: 'Manuelle',
    seats: 5,
    price: 250,
    image: 'assets/images/dacia-logan.jpg',
    alt: 'Dacia Logan prête à partir'
  },
  {
    name: 'Dacia Duster',
    category: 'SUV',
    transmission: 'Manuelle',
    seats: 5,
    price: 350,
    image: 'assets/images/dacia-duster.jpg',
    alt: 'Dacia Duster en extérieur'
  },
  {
    name: 'Peugeot 208',
    category: 'Citadine',
    transmission: 'Manuelle',
    seats: 5,
    price: 300,
    image: 'assets/images/peugeot-208.jpg',
    alt: 'Peugeot 208 stationnée'
  },
  {
    name: 'Renault Clio',
    category: 'Citadine',
    transmission: 'Manuelle',
    seats: 5,
    price: 300,
    image: 'assets/images/renault-clio.jpg',
    alt: 'Renault Clio prête à conduire'
  },
  {
    name: 'Hyundai Tucson',
    category: 'SUV',
    transmission: 'Automatique',
    seats: 5,
    price: 500,
    image: 'assets/images/hyundai-tucson.jpg',
    alt: 'Hyundai Tucson sur la route'
  },
  {
    name: 'Volkswagen Golf',
    category: 'Compacte',
    transmission: 'Manuelle',
    seats: 5,
    price: 350,
    image: 'assets/images/vw-golf.jpg',
    alt: 'Volkswagen Golf prête à partir'
  }
];

const whatsappBase = `https://wa.me/${config.whatsappNumber}`;
const contactPhone = document.getElementById('contact-phone');
const contactWhatsapp = document.getElementById('contact-whatsapp');
const contactEmail = document.getElementById('contact-email');
const contactAddress = document.getElementById('contact-address');
const footerPhone = document.getElementById('footer-phone');
const footerWhatsapp = document.getElementById('footer-whatsapp');
const footerEmail = document.getElementById('footer-email');
const footerAddress = document.getElementById('footer-address');
const footerYear = document.getElementById('footer-year');
const footerBrand = document.getElementById('footer-brand');
const socialInstagram = document.getElementById('social-instagram');
const socialFacebook = document.getElementById('social-facebook');
const socialTiktok = document.getElementById('social-tiktok');
const socialWhatsapp = document.getElementById('social-whatsapp');
const brandName = document.getElementById('brand-name');
const navToggle = document.getElementById('nav-toggle');
const navbar = document.getElementById('navbar');
const searchForm = document.getElementById('search-form');
const resetFiltersButton = document.getElementById('reset-filters');
const vehicleGrid = document.getElementById('vehicleGrid');
const mapFrame = document.getElementById('map-frame');

function getWhatsappLink(vehicleName = '') {
  const message = vehicleName
    ? `Bonjour, je souhaite réserver la ${vehicleName}. Pouvez-vous me donner les disponibilités et les conditions ?`
    : 'Bonjour, je souhaite réserver une voiture. Pouvez-vous me communiquer les disponibilités ?';
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function renderVehicleCards(list) {
  if (!list.length) {
    vehicleGrid.innerHTML = '<p class="no-results">Aucun véhicule ne correspond à ces critères. Essayez un autre filtre.</p>';
    return;
  }

  vehicleGrid.innerHTML = list
    .map(vehicle => `
      <article class="vehicle-card">
        <img src="${vehicle.image}" alt="${vehicle.alt}" loading="lazy">
        <div class="vehicle-card-content">
          <h3 class="vehicle-title">${vehicle.name}</h3>
          <div class="vehicle-meta">
            <span>${vehicle.category}</span>
            <span>${vehicle.transmission}</span>
            <span>${vehicle.seats} places</span>
          </div>
          <div class="vehicle-price">
            <strong>${vehicle.price} DH</strong>
            <span>/ jour</span>
          </div>
          <div class="card-actions">
            <a href="${getWhatsappLink(vehicle.name)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Réserver ${vehicle.name} sur WhatsApp">Réserver</a>
          </div>
        </div>
      </article>
    `)
    .join('');
}

function getFilterValues() {
  return {
    model: document.getElementById('search-model').value.trim().toLowerCase(),
    category: document.getElementById('search-category').value,
    transmission: document.getElementById('search-transmission').value,
    maxPrice: Number(document.getElementById('search-price').value)
  };
}

function filterVehicles() {
  const { model, category, transmission, maxPrice } = getFilterValues();
  return vehicles.filter(vehicle => {
    const matchesModel = model ? vehicle.name.toLowerCase().includes(model) : true;
    const matchesCategory = category ? vehicle.category === category : true;
    const matchesTransmission = transmission ? vehicle.transmission === transmission : true;
    const matchesPrice = maxPrice > 0 ? vehicle.price <= maxPrice : true;
    return matchesModel && matchesCategory && matchesTransmission && matchesPrice;
  });
}

function resetFilters() {
  searchForm.reset();
  renderVehicleCards(vehicles);
}

function bindEvents() {
  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    renderVehicleCards(filterVehicles());
  });

  resetFiltersButton.addEventListener('click', resetFilters);

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navbar.classList.toggle('open');
  });

  searchForm.addEventListener('input', () => {
    renderVehicleCards(filterVehicles());
  });

  document.body.addEventListener('click', event => {
    const action = event.target.closest('[data-action="whatsapp"]');
    if (action) {
      event.preventDefault();
      window.open(getWhatsappLink(), '_blank', 'noopener,noreferrer');
    }
  });

  document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function populateContactInfo() {
  brandName.textContent = config.companyName;
  contactPhone.textContent = config.phone;
  contactPhone.href = `tel:${config.phone.replace(/\s+/g, '')}`;
  contactWhatsapp.textContent = config.whatsappDisplay;
  contactWhatsapp.href = `https://wa.me/${config.whatsappNumber}`;
  contactEmail.textContent = config.email;
  contactEmail.href = `mailto:${config.email}`;
  contactAddress.textContent = config.address;
  footerPhone.textContent = config.phone;
  footerPhone.href = `tel:${config.phone.replace(/\s+/g, '')}`;
  footerWhatsapp.textContent = config.whatsappDisplay;
  footerWhatsapp.href = `https://wa.me/${config.whatsappNumber}`;
  footerEmail.textContent = config.email;
  footerEmail.href = `mailto:${config.email}`;
  footerAddress.textContent = config.address;
  if (footerBrand) {
    footerBrand.textContent = config.companyName;
  }
  footerYear.textContent = new Date().getFullYear();
  if (socialInstagram) {
    socialInstagram.href = config.social.instagram;
  }
  if (socialFacebook) {
    socialFacebook.href = config.social.facebook;
  }
  if (socialTiktok) {
    socialTiktok.href = config.social.tiktok;
  }
  if (socialWhatsapp) {
    socialWhatsapp.href = config.social.whatsapp || `https://wa.me/${config.whatsappNumber}`;
  }
  if (mapFrame) {
    mapFrame.src = config.mapEmbed;
  }
}

function init() {
  populateContactInfo();
  renderVehicleCards(vehicles);
  bindEvents();
}

window.addEventListener('DOMContentLoaded', init);
