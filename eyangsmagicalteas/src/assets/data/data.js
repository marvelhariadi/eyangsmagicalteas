// Import all images from the images index file
import {
  hero1,
  attractWealth,
  beauty,
  protection,
  talktoanimals,
  universalantidote,
  summonspirits,
  // placeholder,
  copperPot,
  silverpot,
  claypot,
  protectBag,
  spiritBag

} from '../images';


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

// Categories for the shop
export const categories = [
  {
    id: 1,
    name: "Magic Tea Leaves",
    description: "Our finest selection of enchanted tea leaves",
    sectionId: "magic-tea-leaves"
  },
  {
    id: 2,
    name: "Enchanted Tea Pots",
    description: "Magical tea pots for brewing your enchanted teas",
    sectionId: "tea-pots"
  },
  {
    id: 3,
    name: "Magic Tea Bags",
    description: "Convenient pre-packaged magical tea bags",
    sectionId: "magic-tea-bags"
  }
];

// Products organized by category
export const products = {
  "magic-tea-leaves": [
    {
      id: 1,
      name: "Animal Communication Tea",
      price: 19.98,
      desc: "Using herbs harvested by fox spirits at sunrise, this tea blend lets you understand the language of earthly beasts. Steep for 5 minutes and 55 seconds.",
      cover: talktoanimals,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    },
    {
      id: 2,
      name: "Wealth Attraction Tea",
      price: 15.99,
      desc: "A Han Chinese tea blend that attracts wealth and abundance. Cold brew for 8 days and 8 nights before drinking for best results",
      cover: attractWealth,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    },
    {
      id: 3,
      name: "Glamour Spell Tea",
      price: 69.69,
      desc: "A rose and jasmine-based tea that enhances your natural beauty. Drink in the morning before 9am.",
      cover: beauty,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    },
    {
      id: 2,
      name: "Divine Protection Tea",
      price: 15.99,
      desc: "Infused with iron will of the Black Toirtoise God, this tea will protect you from all physical, psychological, or spiritual harm. Boil for 10 minutes for best results",
      cover: protection,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    },
    {
      id: 2,
      name: "Grandmother's Universal Antidote",
      price: 15.99,
      desc: "A Eyang's Magical Teas exclusive tea that cures any poison or disease. Boil for 4 minutes for best results",
      cover: universalantidote,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    },
    {
      id: 2,
      name: "Spirit Summoner Tea",
      price: 15.99,
      desc: "A necromantic tea that summons spirits of the dead. Drink in the night before 12am",
      cover: summonspirits,
      size: ["50mg", "100mg", "200mg"],
      category: "magic-tea-leaves"
    }
  ],
  "tea-pots": [
    {
      id: 3,
      name: "Enchanted Copper Teapot",
      price: 89.99,
      desc: "A copper teapot that enhances the magical properties of any tea brewed tenfold.",
      cover: copperPot, // Reusing image for now
      size: ["100ml", "250ml", "500ml"],
      category: "tea-pots"
    },
    {
      id: 4,
      name: "Moonlight Silver Teapot",
      price: 129.99,
      desc: "A silver teapot that absorbs moonlight energy to enhance your magical brews.",
      cover: silverpot,
      size: ["100ml", "250ml", "500ml"],
      category: "tea-pots"
    },
    {
      id: 4,
      name: "Sacred Volcanic Clay Teapot",
      price: 69.99,
      desc: "A clay teapot made from sacred volcanic ash clay from the sacred Mt. Agung in Bali, Indonesia.",
      cover: claypot, 
      size: ["100ml", "250ml", "500ml"],
      category: "tea-pots"
    }
  ],
  "magic-tea-bags": [
    {
      id: 5,
      name: "Protection Tea Bags",
      price: 12.10,
      desc: "Pre-packaged tea bags that protect you from harm. Brew for 10 minutes for best results.",
      cover: protectBag,
      size: ["Box of 10", "Box of 20", "Box of 30"],
      category: "magic-tea-bags"
    },
    {
      id: 6,
      name: "Spirit Summoning Tea Bags",
      price: 14.00,
      desc: "Pre-packaged tea bags that provide necromantic powers to summon spirits of the dead. Best consumed under a full moon.",
      cover: spiritBag,
      size: ["Box of 5", "Box of 10", "Box of 15"],
      category: "magic-tea-bags"
    }
  ]
};

// DONT NEED THIS SHIT ANYMORE I TRIED TOO HARD TO MAKE IT FANCY
// export const product = [
//   ...products["magic-tea-leaves"],
//   ...products["tea-pots"],
//   ...products["magic-tea-bags"]
// ];

// export const flashproduct = [
//   {
//     id: 1,
//     name: "Calm The Seas",
//     price: 34.88,
//     discount: 30,
//     cover: flash_CalmTheSeas
//   },
//   {
//     id: 2,
//     name: "Truth Reveal Tea",
//     price: 24.99,
//     discount: 20,
//     cover: flash_TruthReveal
//   }
// ];

// export const offerImgproduct = [
//   {
//     id: 1,
//     name: "AttractWealth",
//     price: 14.88,
//     cover: "https://via.placeholder.com/200x200?text=Category+6"
//   },
//   {
//     id: 2,
//     name: "CalmTheSeas",
//     price: 11.11,
//     cover: "https://via.placeholder.com/200x200?text=Category+6"
//   },
//   {
//     id: 3,
//     name: "TalkToAnimals",
//     price: 50.69,
//     cover: "https://via.placeholder.com/200x200?text=Category+6"
//   },
//   {
//     id: 4,
//     name: "TruthReveal",
//     price: 42.91,
//     cover: "https://via.placeholder.com/200x200?text=Category+6"
//   }
// ];

export const footer = {
// TO FILL IN SOME DAY LOL
};
