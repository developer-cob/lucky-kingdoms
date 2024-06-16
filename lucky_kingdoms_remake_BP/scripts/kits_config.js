export const classKits = {
  knight: {
    bounty: 100,
    armor: {
      helmet: "diamond_helmet",
      chestplate: "diamond_chestplate",
      leggings: "diamond_leggings",
      boots: "diamond_boots",
    },
    items: {
      sword: "diamond_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 3]],
      leggings: [["protection", 3]],
      boots: [["protection", 3]],
      sword: [["sharpness", 3]],
      bow: [["power", 3]],
    },
    rarity: {
      title: "§bKnight",
      subtitle: "1 in 2",
      weight: 32,
    },
  },
  king: {
    bounty: 300,
    armor: {
      helmet: "netherite_helmet",
      chestplate: "diamond_chestplate",
      leggings: "diamond_leggings",
      boots: "netherite_boots",
    },
    items: {
      sword: "diamond_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 3]],
      leggings: [["protection", 3]],
      boots: [["protection", 3]],
      sword: [["sharpness", 3]],
      bow: [["power", 3]],
    },
    rarity: {
      title: "§eKing",
      subtitle: "1 in 3",
      weight: 24,
    },
  },
  archer: {
    bounty: 400,
    armor: {
      helmet: "diamond_helmet",
      chestplate: "iron_chestplate",
      leggings: "iron_leggings",
      boots: "diamond_boots",
    },
    items: {
      sword: "iron_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 4]],
      leggings: [["protection", 4]],
      boots: [["protection", 3]],
      sword: [["sharpness", 5]],
      bow: [
        ["power", 5],
        ["punch", 1],
      ],
    },
    rarity: {
      title: "§2Archer",
      subtitle: "1 in 4",
      weight: 16,
    },
  },
  assassin: {
    bounty: 500,
    armor: {
      helmet: "netherite_helmet",
      chestplate: "iron_chestplate",
      leggings: "iron_leggings",
      boots: "netherite_boots",
    },
    items: {
      sword: "diamond_sword",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 4]],
      leggings: [["protection", 4]],
      boots: [["protection", 3]],
      sword: [["sharpness", 3]],
    },
    rarity: {
      title: "§4Assassin",
      subtitle: "1 in 5",
      weight: 12,
    },
  },
  jester: {
    bounty: 600,
    armor: {
      helmet: "iron_helmet",
      chestplate: "diamond_chestplate",
      leggings: "diamond_leggings",
      boots: "iron_boots",
    },
    items: {
      sword: "netherite_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 2]],
      leggings: [["protection", 2]],
      boots: [["protection", 3]],
      sword: [["sharpness", 4]],
      bow: [["power", 3]],
    },
    rarity: {
      title: "§bJester",
      subtitle: "1 in 8",
      weight: 6,
    },
  },
  healer: {
    bounty: 750,
    armor: {
      helmet: "netherite_helmet",
      chestplate: "chainmail_chestplate",
      leggings: "iron_leggings",
      boots: "iron_boots",
    },
    items: {
      sword: "iron_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 4]],
      leggings: [["protection", 3]],
      boots: [["protection", 3]],
      sword: [["sharpness", 5]],
      bow: [["power", 3]],
    },
    rarity: {
      title: "§cHealer",
      subtitle: "1 in 6",
      weight: 8,
    },
  },
  mage: {
    bounty: 1000,
    armor: {
      helmet: "diamond_helmet",
      chestplate: "iron_chestplate",
      leggings: "iron_leggings",
      boots: "diamond_boots",
    },
    items: {
      sword: "diamond_sword"
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 4]],
      leggings: [["protection", 4]],
      boots: [["protection", 3]],
      sword: [["sharpness", 3]],
    },
    rarity: {
      title: "§gMage",
      subtitle: "1 in 16",
      weight: 2,
    },
  },
  queen: {
    bounty: 1000,
    armor: {
      helmet: "netherite_helmet",
      chestplate: "netherite_chestplate",
      leggings: "netherite_leggings",
      boots: "netherite_boots",
    },
    items: {
      sword: "netherite_sword",
      bow: "bow",
    },
    enchants: {
      helmet: [["protection", 3]],
      chestplate: [["protection", 3]],
      leggings: [["protection", 3]],
      boots: [["protection", 3]],
      sword: [["sharpness", 3]],
      bow: [["power", 3]],
    },
    rarity: {
      title: "§dQueen",
      subtitle: "1 in 12",
      weight: 4,
    },
  },
};

export const defaultTools = {
  items: {},
  enchants: null,
};

export const defaultEnchants = {
  tools: [
    ["vanishing", 1],
  ],
  armor: [
    ["binding", 1],
    ["vanishing", 1]
  ]
}
