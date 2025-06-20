const products = [
  // magic-tea-leaves
  {
    id: 1,
    name: "Animal Communication Tea",
    basePrice: 19.98,
    desc: "Using herbs harvested by fox spirits at sunrise, this tea blend lets you understand the language of earthly beasts. Steep for 5 minutes and 55 seconds.",
    cover: "talktoanimals",
    sizes: [
      { name: "50mg", price: 19.98, stock: 0 }, //to show out of stock functionality
      { name: "100mg", price: 29.98, stock: 100 },
      { name: "200mg", price: 39.98, stock: 100 }
    ],
    category: ["magic-tea-leaves", "best-sellers"]
  },
  {
    id: 2,
    name: "Wealth Attraction Tea",
    basePrice: 12.29,
    desc: "A Han Chinese tea blend that attracts wealth and abundance. Cold brew for 8 days and 8 nights before drinking for best results.",
    cover: "attractWealth",
    sizes: [
      { name: "50mg", price: 12.29, stock: 100 },
      { name: "100mg", price: 25.29, stock: 100 },
      { name: "200mg", price: 35.29, stock: 100 }
    ],
    category: ["magic-tea-leaves"]
  },
  {
    id: 3,
    name: "Glamour Spell Tea",
    basePrice: 69.69,
    desc: "A rose and jasmine-based tea that enhances your natural beauty. Drink in the morning before 9am.",
    cover: "beauty",
    sizes: [
      { name: "50mg", price: 69.69, stock: 100 },
      { name: "100mg", price: 89.69, stock: 100 },
      { name: "200mg", price: 109.69, stock: 100 }
    ],
    category: ["magic-tea-leaves", "best-sellers"]
  },
  {
    id: 4,
    name: "Divine Protection Tea",
    basePrice: 15.99,
    desc: "Infused with the iron will of the Black Toirtoise God, this tea will protect you from all physical, psychological, or spiritual harm. Boil for 10 minutes for best results.",
    cover: "protection",
    sizes: [
      { name: "50mg", price: 15.99, stock: 100 },
      { name: "100mg", price: 25.99, stock: 100 },
      { name: "200mg", price: 35.99, stock: 100 }
    ],
    category: ["magic-tea-leaves"]
  },
  {
    id: 5,
    name: "Grandmother's Universal Antidote",
    basePrice: 81.23,
    desc: "A Eyang's Magical Teas exclusive tea that cures any poison or disease. Boil for 4 minutes for best results.",
    cover: "universalantidote",
    sizes: [
      { name: "50mg", price: 81.23, stock: 100 },
      { name: "100mg", price: 181.23, stock: 100 },
      { name: "200mg", price: 201.23, stock: 100 }
    ],
    category: ["magic-tea-leaves"]
  },
  {
    id: 6,
    name: "Spirit Summoning Tea",
    basePrice: 10.11,
    desc: "A Eyang's Magical Teas exclusive tea that lets you summon spirits of the dead. Steep for 30 minutes for best results.",
    cover: "summonspirits",
    sizes: [
      { name: "50mg", price: 10.11, stock: 100 },
      { name: "100mg", price: 15.11, stock: 100 },
      { name: "200mg", price: 25.11, stock: 100 }
    ],
    category: ["magic-tea-leaves"]
  },
  {
    id: 7,
    name: "Enchanted Copper Teapot",
    basePrice: 89.99,
    desc: "A copper teapot that enhances the magical properties of any tea brewed tenfold.",
    cover: "copperPot",
    sizes: [
      { name: "100ml", price: 89.99, stock: 100 },
      { name: "250ml", price: 119.99, stock: 100 },
      { name: "500ml", price: 149.99, stock: 100 }
    ],
    category: ["tea-pots"]
  },
  {
    id: 8,
    name: "Moonlight Silver Teapot",
    basePrice: 129.99,
    desc: "A silver teapot that absorbs moonlight energy to enhance your magical brews.",
    cover: "silverpot",
    sizes: [
      { name: "100ml", price: 129.99, stock: 100 },
      { name: "250ml", price: 159.99, stock: 100 },
      { name: "500ml", price: 189.99, stock: 100 }
    ],
    category: ["tea-pots", "best-sellers"]
  },
  {
    id: 9,
    name: "Sacred Volcanic Clay Teapot",
    basePrice: 69.99,
    desc: "A clay teapot made from sacred volcanic ash clay from the sacred Mt. Agung in Bali, Indonesia.",
    cover: "claypot",
    sizes: [
      { name: "100ml", price: 69.99, stock: 100 },
      { name: "250ml", price: 89.99, stock: 100 },
      { name: "500ml", price: 109.99, stock: 100 }
    ],
    category: ["tea-pots"]
  },
  {
    id: 10,
    name: "Protection Tea Bags",
    basePrice: 12.10,
    desc: "Pre-packaged tea bags that protect you from harm. Brew for 10 minutes for best results.",
    cover: "protectBag",
    sizes: [
      { name: "Box of 10", price: 12.10, stock: 100 },
      { name: "Box of 20", price: 22.10, stock: 100 },
      { name: "Box of 30", price: 30.10, stock: 100 }
    ],
    category: ["magic-tea-bags", "best-sellers"]
  },
  {
    id: 11,
    name: "Spirit Summoning Tea Bags",
    basePrice: 14.00,
    desc: "Pre-packaged tea bags that provide necromantic powers to summon spirits of the dead. Best consumed under a full moon.",
    cover: "spiritBag",
    sizes: [
      { name: "Box of 5", price: 14.00, stock: 100 },
      { name: "Box of 10", price: 26.00, stock: 100 },
      { name: "Box of 15", price: 36.00, stock: 100 }
    ],
    category: ["magic-tea-bags"]
  }
];

export default products;