// Placeholder data for components
import hero1 from '../images/heroBanners/hero_1.png';
// import hero2 from '../images/heroBanners/hero_2.png';
import offer_AttractWealth from '../images/offer/offer_AttractWealth.png';
import offer_CalmTheSeas from '../images/offer/offer_CalmTheSeas.png';
import offer_TalkToAnimals from '../images/offer/offer_TalkToAnimals.png';
import offer_TruthReveal from '../images/offer/offer_TruthReveal.png';
import flash_CalmTheSeas from '../images/offer/flash_CalmTheSeas.png';
import flash_TruthReveal from '../images/offer/flash_TruthReveal.png';

// change slide content for the hero header
export const slide = [
  {
    id: 1,
    image: hero1,
    title: "Premium Tea Selection",
    desc: "Discover our magical collection of hand-enchanted teas"
  },
  // {
  //   id: 2,
  //   image: hero2,
  //   title: "Organic Herbal Blends",
  //   desc: "Experience the healing power of nature in every cup"
  // }
];

export const categories = [
  {
    id: 1,
    name: "Category 1",
    description: "Description for category 1",
    image: "https://via.placeholder.com/200x200?text=Category+1"
  },
  {
    id: 2,
    name: "Category 2",
    description: "Description for category 2",
    image: "https://via.placeholder.com/200x200?text=Category+2"
  },
  {
    id: 3,
    name: "Category 3",
    description: "Description for category 3",
    image: "https://via.placeholder.com/200x200?text=Category+3"
  },
  {
    id: 4,
    name: "Category 4",
    description: "Description for category 4",
    image: "https://via.placeholder.com/200x200?text=Category+4"
  },
  {
    id: 5,
    name: "Category 5",
    description: "Description for category 5",
    image: "https://via.placeholder.com/200x200?text=Category+5"
  },
  {
    id: 6,
    name: "Category 6",
    description: "Description for category 6",
    image: "https://via.placeholder.com/200x200?text=Category+6"
  }
];

export const product = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    desc: "Description for product 1",
    cover: "https://via.placeholder.com/300x300?text=Product+1",
    size: ["S", "M", "L"],
    colors: ["Red", "Blue", "Green"]
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    desc: "Description for product 2",
    cover: "https://via.placeholder.com/300x300?text=Product+2",
    size: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray"]
  }
];

export const flaseproduct = [
  {
    id: 1,
    name: "Calm The Seas",
    price: 34.88,
    discount: 30,
    cover: flash_CalmTheSeas
  },
  {
    id: 2,
    name: "Truth Reveal Tea",
    price: 24.99,
    discount: 20,
    cover: flash_TruthReveal
  }
];

export const offerImgproduct = [
  {
    id: 1,
    name: "AttractWealth",
    price: 14.88,
    cover: "https://via.placeholder.com/200x200?text=Category+6"
  },
  {
    id: 2,
    name: "CalmTheSeas",
    price: 11.11,
    cover: "https://via.placeholder.com/200x200?text=Category+6"
  },
  {
    id: 3,
    name: "TalkToAnimals",
    price: 50.69,
    cover: "https://via.placeholder.com/200x200?text=Category+6"
  },
  {
    id: 4,
    name: "TruthReveal",
    price: 42.91,
    cover: "https://via.placeholder.com/200x200?text=Category+6"
  }
];

export const footer = {
  social: [
    { id: 1, name: "Facebook", link: "#" },
    { id: 2, name: "Instagram", link: "#" },
    { id: 3, name: "Twitter", link: "#" },
    { id: 4, name: "YouTube", link: "#" }
  ],
  contact: [
    { id: 1, value: "Email: support@example.com", link: "mailto:support@example.com" },
    { id: 2, value: "Phone: +1 (123) 456-7890", link: "tel:+11234567890" },
    { id: 3, value: "Address: 123 Main St, City", link: "#" }
  ],
  brand: [
    { id: 1, name: "About Us", link: "#" },
    { id: 2, name: "Careers", link: "#" },
    { id: 3, name: "Store Locations", link: "#" }
  ],
  shop: [
    { id: 1, name: "Tea Collections", link: "#" },
    { id: 2, name: "Accessories", link: "#" },
    { id: 3, name: "Gift Cards", link: "#" },
    { id: 4, name: "Sale", link: "#" }
  ],
  support: [
    { id: 1, name: "Contact Us", link: "#" },
    { id: 2, name: "FAQs", link: "#" },
    { id: 3, name: "Shipping & Returns", link: "#" },
    { id: 4, name: "Order Tracking", link: "#" }
  ]
};
