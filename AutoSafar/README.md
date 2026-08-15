AutoSafar - Car Dealership Website Template

Overview
--------
AutoSafar is a lightweight, reusable car dealership website template using only HTML5, CSS3, and vanilla JavaScript. The project is designed to be a template you can sell and reuse across different dealerships. All dealership-specific information (logo, contact, cars, images) is editable from dedicated JS files so you don't need to change HTML/CSS/JS logic.

Project Structure
-----------------
AutoSafar/
- index.html
- css/
  - style.css
- js/
  - script.js
  - cars.js      <- vehicles database (edit this)
  - config.js    <- dealership info (edit this)
- images/
  - logo/        <- add logo file here
  - cars/        <- add car images here
  - hero/        <- add hero image here
  - icons/       <- feature icons
- assets/
- README.md

How to customize
----------------
1. Dealer info: open js/config.js and edit fields like dealerName, phone, whatsapp, email, address, mapsLink, facebook, instagram, logoPath, heroImage.
2. Vehicles: open js/cars.js and add/duplicate objects in the CARS array. Each car object has fields: id, brand, model, year, price, mileage, fuel, transmission, city, description, image, gallery (array), featured (boolean), status.
3. Replace images in images/ (logo, hero, cars, icons). Use the same filenames referenced by config.js and cars.js.
4. No backend necessary. Open index.html in a browser.

Developer notes
---------------
- All dynamic output is generated from js/config.js and js/cars.js — no vehicle data is hardcoded into HTML.
- The modal gallery and search are implemented in vanilla JS and are lightweight to customize.
- CSS variables are used for easy theming.

License
-------
This repository template is provided as-is. Use and modify freely for dealership clients.

