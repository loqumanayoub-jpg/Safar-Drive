/* cars.js - Vehicle database. Edit or duplicate car objects here.
   Each entry is a plain object in the CARS array.
*/
window.CARS = [
  {
    id: 1,
    brand: "Volkswagen",
    model: "Golf 7",
    year: 2018,
    price: 145000,
    mileage: 95000,
    fuel: "Diesel",
    transmission: "Manual",
    city: "Casablanca",
    description: "Well-maintained Golf with full service history. Comfortable, economical, and reliable.",
    image: "images/cars/golf7-1.jpg",
    gallery: [
      "images/cars/golf7-1.jpg",
      "images/cars/golf7-2.jpg",
      "images/cars/golf7-3.jpg"
    ],
    featured: true,
    status: "available"
  },
  {
    id: 2,
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 185000,
    mileage: 42000,
    fuel: "Petrol",
    transmission: "Automatic",
    city: "Rabat",
    description: "Low-mileage Corolla with excellent fuel economy and safety features.",
    image: "images/cars/corolla-1.jpg",
    gallery: [
      "images/cars/corolla-1.jpg",
      "images/cars/corolla-2.jpg"
    ],
    featured: false,
    status: "available"
  },
  {
    id: 3,
    brand: "BMW",
    model: "320i",
    year: 2017,
    price: 210000,
    mileage: 110000,
    fuel: "Petrol",
    transmission: "Automatic",
    city: "Tangier",
    description: "Sporty 3-series in good condition. Smooth driving and premium interior.",
    image: "images/cars/bmw320-1.jpg",
    gallery: [
      "images/cars/bmw320-1.jpg",
      "images/cars/bmw320-2.jpg",
      "images/cars/bmw320-3.jpg"
    ],
    featured: false,
    status: "available"
  }
];
