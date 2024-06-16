import { classKits, defaultEnchants } from "./kits_config.js";
import {
  world,
  system,
  ItemStack,
  ItemComponentTypes,
  EquipmentSlot,
  EnchantmentType,
  EntityComponentTypes,
  Player,
} from "@minecraft/server";
import {} from "./global.js";

/**
 * Shows basic usage of command to player
 *
 * @export
 * @param {Player} player Player to show command to
 * @param {string} command Command to return usage for
 * @returns {void}
 */
export function showCommand(player, command) {
  let formattedCommand = command;
  if (command.charAt(0) != "!") {
    formattedCommand = `!${command}`;
  }
  player.sendMessage(
    `§a${formattedCommand}\nuse: ${helpList[formattedCommand].use}\nsyntax: ${helpList[formattedCommand].syntax}`
  );
}

/**
 * Lets players with the developer tag modify the configuration
 *
 * @export
 * @param {Player} player
 * @param {string} item
 * @param {string} value
 * @returns {void}
 */
export function configItem(player, item, value) {
  try {
    config[item] = value;
    player.sendMessage(`§aSet ${item} to ${value}`);
  } catch (error) {
    player.sendMessage(`§cCommand failed to execute`);
  }
}

/**
 * Lets players with the developer tag run a function
 * @see functionParser
 *
 * @export
 * @param {Player} player Developer attempting to run a function
 * @param {string} functionToRun Function user is trying to run
 * @returns {void}
 */
export function runFunction(player, functionToRun) {
  try {
    const parsedFunction = functionParser(functionToRun);
    if (parsedFunction == undefined) {
      player.sendMessage("§cFunction not found");
      return;
    }
    system.run(() => {
      parsedFunction;
    });
    player.sendMessage(`§aSuccessfully run function ${functionToRun}`);
  } catch (error) {
    player.sendMessage(`§cCommand failed to execute`);
  }
}

/**
 * Clears and spawns lootboxes on the map
 *
 * @export
 * @returns {void}
 */
export function spawnLootboxes() {
  const structure = world.structureManager;
  const overworld = world.getDimension("overworld");
  const lootboxCoordinates = [
    { x: 531, y: -60, z: 554 },
    { x: 512, y: -60, z: 554 },
    { x: 512, y: -60, z: 641 },
    { x: 531, y: -60, z: 641 },
  ];

  for (let coordinates of lootboxCoordinates) {
    structure.place("mystructure:clear_lootboxes", overworld, coordinates);
    structure.place("mystructure:lootboxes", overworld, coordinates, {
      includeBlocks: true,
      integrity: 0.1,
      integritySeed: Math.floor(Math.random() * 10000).toString(),
    });
  }
}

/**
 * Reloads the map, placing the map and refreshing the lootboxes.
 *
 * @export
 * @returns {void}
 */
export function reloadMap() {
  const structure = world.structureManager;
  const overworld = world.getDimension("overworld");
  const mapSectionCoordinates = [
    { x: 495, y: -64, z: 495 },
    { x: 495, y: -64, z: 559 },
    { x: 495, y: -64, z: 623 },
    { x: 495, y: -64, z: 687 },
    { x: 495, y: -64, z: 751 },
  ];

  overworld.getEntities({ type: "minecraft:item" }).forEach((entity) => {
    entity.runCommandAsync("kill @s");
  });

  let i = 1;
  for (let coordinates of mapSectionCoordinates) {
    structure.place(`mystructure:map_section_${i}`, overworld, coordinates);
    i++;
  }
  spawnLootboxes();
}

// thank you stack exchange
/**
 * Shuffles an array and assigns the array to the shuffled value
 *
 * @export
 * @param {array} array Array to shuffle
 * @returns {void}
 */
export function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

/**
 * Randomly assigns player teams
 *
 * @export
 * @param {array} players Array containing in-game players
 * @returns {void}
 */
export function chooseTeams(players) {
  let teamRedCount = Math.floor(players.length / 2);
  let teamBlueCount = Math.ceil(players.length / 2);

  shuffle(players);

  players.forEach((player) => {
    if (teamRedCount > 0) {
      player.sendMessage("§eYou are on §c§lRed Team");
      player.addTag("teamRed");
      teamRedCount--;
      return;
    } else if (teamBlueCount > 0) {
      player.sendMessage("§eYou are on §b§lBlue Team");
      player.addTag("teamBlue");
      teamBlueCount--;
      return;
    }
  });
}

/**
 * Parses function for !commands, running the specified command.
 *
 * @export
 * @param {string} functionToParse
 * @returns {any | undefined}
 */
export function functionParser(functionToParse) {
  switch (functionToParse) {
    case "reloadMap":
      return reloadMap();
    case "spawnLootboxes":
      return spawnLootboxes();
    default:
      return undefined;
  }
}

/**
 * Description: Parser for kits_config.js, returning appropriate equipment slot
 * @author vy /switzr@tuta.io
 * @param {string} equipment
 * @returns {string} Associated EquipmentSlot
 */
export function equipmentSlotParser(equipment) {
  switch (equipment) {
    case "helmet":
      return EquipmentSlot.Head;
    case "chestplate":
      return EquipmentSlot.Chest;
    case "leggings":
      return EquipmentSlot.Legs;
    case "boots":
      return EquipmentSlot.Feet;
    default:
      return undefined;
  }
}

/**
 * Selects a random class and returns information for it
 *
 * @export
 * @returns {Object} kit Object with kit information
 * @returns {string} kit.name Name of kit
 * @returns {string} kit.title Displayed title for kit (/title)
 * @returns {string} kit.subtitle Displayed subtitle for kit (/title)
 * @returns {number} kit.bounty Bounty of kit
 */
export function randomClass() {
  let cumulativeWeight = 0;
  let weightedList = [];
  for (let item in classKits) {
    cumulativeWeight += classKits[item].rarity.weight;
    let kitInfo = {
      kitName: item,
      cumulativeWeight: cumulativeWeight,
      kitTitle: classKits[item].rarity.title,
      kitSubtitle: classKits[item].rarity.subtitle,
      kitBounty: classKits[item].bounty,
    };
    weightedList.push(kitInfo);
  }
  const rand = Math.random() * cumulativeWeight;
  for (let item of weightedList) {
    if (rand < item.cumulativeWeight) {
      return {
        name: item.kitName,
        title: item.kitTitle,
        subtitle: item.kitSubtitle,
        bounty: item.kitBounty,
      };
    }
  }
}

/**
 * Give a player a kit based on kit name
 *
 * @export
 * @param {object} player
 * @param {string} kitName
 * @returns {*}
 */
export function giveKit(player, kitName) {
  const kitObject = classKits[kitName];
  let armor = {};
  let tools = {};
  for (let item in kitObject.armor) {
    let armorPiece = kitObject.armor[item];
    armor[item] = new ItemStack(armorPiece, 1);
  }
  for (let item in kitObject.items) {
    let tool = kitObject.items[item];
    tools[item] = new ItemStack(tool, 1);
  }

  for (let item in armor) {
    if (!kitObject.enchants[item]) {
      continue;
    }
    const armorEnchants = kitObject.enchants[item].concat(
      defaultEnchants.armor
    );
    armorEnchants.forEach((enchant) => {
      // foreach and for loop combo what an epic collab
      armor[item].getComponent(ItemComponentTypes.Enchantable).addEnchantment({
        type: new EnchantmentType(enchant[0]),
        level: enchant[1],
      });
    });
  }
  for (let item in tools) {
    if (!kitObject.enchants[item]) {
      continue;
    }
    const toolEnchants = kitObject.enchants[item].concat(defaultEnchants.tools);
    toolEnchants.forEach((enchant) => {
      tools[item].getComponent(ItemComponentTypes.Enchantable).addEnchantment({
        type: new EnchantmentType(enchant[0]),
        level: enchant[1],
      });
    });
  }

  const equipment = player.getComponent(EntityComponentTypes.Equippable);
  // using two for loops for the same thing isnt ideal but oh well
  for (let item in armor) {
    equipment.setEquipment(equipmentSlotParser(item), armor[item]);
  }
  const inventory = player.getComponent("minecraft:inventory");
  if (inventory === undefined || inventory.container === undefined) {
    return;
  }
  let slot = 0;
  for (let item in tools) {
    inventory.container.setItem(slot, tools[item]);
    slot += 1;
  }
}
