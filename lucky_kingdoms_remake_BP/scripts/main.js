import { world, system } from "@minecraft/server";

import { config, helpList } from "./global.js";
import {
  showCommand,
  configItem,
  runFunction,
  reloadMap,
  chooseTeams,
  randomClass,
  giveKit,
} from "./functions.js";

console.warn("Scripts Reloaded");

let timeUntilGameStarts = -1;
let gameInProgress = false;

const bounty = world.scoreboard.getObjective("bounty");
const cycleClass = world.scoreboard.getObjective("cycleClass");

system.runInterval(() => {
  if (timeUntilGameStarts > 0) {
    timeUntilGameStarts--;
    if (
      timeUntilGameStarts % 20 == 0 &&
      timeUntilGameStarts / 20 <= 3 &&
      timeUntilGameStarts != 0
    ) {
      readyPlayers.forEach((player) => {
        player.runCommandAsync(`title @s title ${timeUntilGameStarts / 20}`);
        player.runCommandAsync("playsound note.pling");
      });
    }
    if (timeUntilGameStarts == 0) {
      timeUntilGameStarts = -1;
      readyPlayers.forEach((player) => {
        player.runCommandAsync("function start_game");
      });
      reloadMap();
      system.runTimeout(() => {
        chooseTeams(readyPlayers);
      }, 100);
    }
  }

  world.getAllPlayers().forEach((player) => {
    if (player.hasTag("teamBlue") && player.nameTag != `§b§l${player.name}§r`) {
      player.nameTag = `§b§l${player.name}§r`;
    }
    if (player.hasTag("teamRed") && player.nameTag != `§c§l${player.name}§r`) {
      player.nameTag = `§c§l${player.name}§r`;
    }
    if (
      !player.hasTag("teamRed") &&
      !player.hasTag("teamBlue") &&
      player.nameTag != player.name
    ) {
      player.nameTag = player.name;
    }

    if (player.hasTag("developer") && !player.hasTag("givenDeveloperTag")) {
    }
  });

  world
    .getPlayers({ scoreOptions: [{ objective: "cycleClass", minScore: 0 }] })
    .forEach((player) => {
      cycleClass.addScore(player, -1);
      if (
        cycleClass.getScore(player) % 3 == 0 &&
        cycleClass.getScore(player) != 0
      ) {
        const chosenClass = randomClass();
        player.onScreenDisplay.setTitle(chosenClass.title);
        player.onScreenDisplay.updateSubtitle(chosenClass.subtitle);
        player.playSound("note.xylophone");
      } else if (cycleClass.getScore(player) == 0) {
        const chosenClass = randomClass();
        player.onScreenDisplay.setTitle(chosenClass.title);
        player.onScreenDisplay.updateSubtitle(chosenClass.subtitle);
        player.playSound("random.levelup");
        world.sendMessage(
          `${player.nameTag} §ehas become a ${chosenClass.title} §6(${chosenClass.bounty})`
        );
        bounty.setScore(player, chosenClass.bounty);
        giveKit(player, chosenClass.name);
      }
    });
}, 1);

world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
  if (
    event.player.hasTag("developer") ||
    event.player.getGameMode() == "creative" ||
    event.block.typeId == "minecraft:stone_button"
  ) {
    return;
  }
  event.cancel = true;
});

world.beforeEvents.playerPlaceBlock.subscribe((event) => {
  if (
    event.player.hasTag("developer") ||
    event.player.getGameMode() == "creative"
  ) {
    return;
  }
  if (event.block.location.y >= -51) {
    event.cancel = true;
  }
});

world.beforeEvents.playerBreakBlock.subscribe((event) => {
  if (
    event.player.hasTag("developer") ||
    event.player.getGameMode() == "creative"
  ) {
    return;
  }
  if (
    event.block.typeId == "lucky_kingdoms:lootbox" ||
    event.block.typeId == "lucky_kingdoms:powerup_box" ||
    event.block.typeId == "minecraft:deepslate_bricks"
  ) {
    return;
  }
  event.cancel = true;
});

world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  player.onScreenDisplay.setHudVisibility(0, [8]);
  if (!initialSpawn || player.hasTag("developer")) return;
  player.runCommandAsync("function rejoin");
});

world.afterEvents.entityDie.subscribe(({ deadEntity }) => {
  const cycleClass = world.scoreboard.getObjective("cycleClass");
  if (deadEntity.typeId == "minecraft:player") {
    cycleClass.setScore(deadEntity, 45);
  }
});

world.afterEvents.itemUse.subscribe((ev) => {
  if (ev.itemStack.typeId === "lucky_kingdoms:ready_up") {
    ev.source.runCommand("function ready_up");
    readyPlayers = world.getPlayers({ tags: ["ready"] });
    world.sendMessage(
      `§e${ev.source.nameTag}§b is ready (${readyPlayers.length}/${config.minRequiredPlayers})`
    );

    if (gameInProgress == false) {
      if (
        readyPlayers.length >= config.minRequiredPlayers &&
        timeUntilGameStarts == -1
      ) {
        timeUntilGameStarts = setStartTime * 20;
        world.sendMessage(
          `Enough players are ready, starting game in ${
            timeUntilGameStarts / 20
          } seconds`
        );
      }
    }
  }
});

world.beforeEvents.chatSend.subscribe((event) => {
  if (!event.sender.hasTag("developer")) return;
  if (event.message.charAt(0) == "!") {
    const commandArgs = event.message.split(" ");
    switch (commandArgs[0]) {
      case "!help":
        event.cancel = true;
        if (commandArgs[1] == "list") {
          for (let command in helpList) {
            event.sender.sendMessage(
              `§a${command}\nuse: ${helpList[command].use}\nsyntax: ${helpList[command].syntax}\n\n`
            );
          }
          break;
        }
        showCommand(event.sender, commandArgs[1]);
        break;
      case "!config":
        event.cancel = true;
        if (commandArgs[1] == "list") {
          event.sender.sendMessage(
            "§aVariables: minRequiredPlayers, setStartTime"
          );
          break;
        }
        configItem(event.sender, commandArgs[1], commandArgs[2]);
        break;
      case "!function":
        event.cancel = true;
        if (commandArgs[1] == "list") {
          event.sender.sendMessage("§aFunctions: reloadMap, spawnLootboxes");
          break;
        }
        runFunction(event.sender, commandArgs[1]);
        break;
      default:
        break;
    }
  }
});
