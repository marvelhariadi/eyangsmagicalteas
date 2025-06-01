// Placeholder data for components
import hero1 from '../images/heroBanners/hero_1.png';
// import hero2 from '../images/heroBanners/hero_2.png';
// import offer_AttractWealth from '../images/offer/offer_AttractWealth.png';
// import offer_CalmTheSeas from '../images/offer/offer_CalmTheSeas.png';
// import offer_TalkToAnimals from '../images/offer/offer_TalkToAnimals.png';
// import offer_TruthReveal from '../images/offer/offer_TruthReveal.png';
import flash_CalmTheSeas from '../images/offer/flash_CalmTheSeas.png';
import flash_TruthReveal from '../images/offer/flash_TruthReveal.png';
import attractWealth from '../images/product_teas/attractWealth.png';
import beauty from '../images/product_teas/beauty.png';
import protection from '../images/product_teas/protection.png';
import talktoanimals from '../images/product_teas/talktoanimals.png';
import universalantidote from '../images/product_teas/universalantidote.png';
import summonspirits from '../images/product_teas/summonspirits.png';


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

//delete this
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
    name: "Animal Communication Tea",
    price: 19.98,
    desc: "A tea that lets you understand the language of earthly beasts. Steep for 5 minutes and 55 seconds.",
    cover: talktoanimals,
    size: ["50mg", "100mg", "200mg"]
  },
  {
    id: 2,
    name: "Universal Poison Antidote",
    price: 29.99,
    desc: "A tea that neutralizes any poison in your body. Do not brew under a blood moon",
    cover: universalantidote,
    size: ["50mg", "100mg", "200mg"]
 },
 {
  id: 3,
  name: "Wealth Attraction Tea",
  price: 15.99,
  desc: "A tea that attracts wealth and abundance. Cold brew for 8 days and 8 nights before drinking for best results",
  cover: attractWealth,
  size: ["50mg", "100mg", "200mg"]
},
{
  id: 4,
  name: "Beauty Glamour Tea",
  price: 22.14,
  desc: "A tea that enhances your natural beauty for a day. Brew for 2 minutes and 22 seconds under a full moon for best results",
  cover: beauty,
  size: ["50mg", "100mg", "200mg"]
},
{
  id: 5,
  name: "Protection Tea",
  price: 42.10,
  desc: "A tea that protects you from harm. Brew for 10 minutes for best results.",
  cover: protection,
  size: ["50mg", "100mg", "200mg"]
},
{
  id: 5,
  name: "Summon Spirits",
  price: 62.00,
  desc: "A tea that provides you necromantic powers to summons spirits of the dead. Best consumed under a full moon.",
  cover: summonspirits,
  size: ["50mg", "100mg", "200mg"]
}
];

export const flashproduct = [
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
