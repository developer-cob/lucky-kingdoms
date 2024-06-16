tag @s remove ready
tag @s remove teamRed
tag @s remove teamBlue
tp @s 1016 -46 588
clear @s
gamemode a @s
scoreboard players set @s bounty 0
xp -1000L
title @s times 5 40 5
replaceitem entity @s slot.hotbar 4 lucky_kingdoms:ready_up 1 0 {"item_lock": { "mode": "lock_in_slot" }}