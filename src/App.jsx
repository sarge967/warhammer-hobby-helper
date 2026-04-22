// ═══════════════════════════════════════════════════════════════
// WARHAMMER HOBBY HELPER — COMPLETE APP
// ═══════════════════════════════════════════════════════════════
import { useState, useMemo } from "react";

// ─── PAINT DATA ─────────────────────────────────────────────────
const CITADEL_PAINTS = [
  { name:"Abaddon Black",range:"Base",hex:"#231F20"},{ name:"Averland Sunset",range:"Base",hex:"#FDB825"},
  { name:"Balthasar Gold",range:"Base",hex:"#A47552"},{ name:"Bugmans Glow",range:"Base",hex:"#834F44"},
  { name:"Caledor Sky",range:"Base",hex:"#396E9E"},{ name:"Caliban Green",range:"Base",hex:"#00401F"},
  { name:"Castellan Green",range:"Base",hex:"#314821"},{ name:"Celestra Grey",range:"Base",hex:"#90A8A8"},
  { name:"Ceramite White",range:"Base",hex:"#FFFFFF"},{ name:"Daemonette Hide",range:"Base",hex:"#696684"},
  { name:"Death Guard Green",range:"Base",hex:"#848A66"},{ name:"Deathworld Forest",range:"Base",hex:"#5C6730"},
  { name:"Dryad Bark",range:"Base",hex:"#33312D"},{ name:"Grey Seer",range:"Base",hex:"#C1C0BF"},
  { name:"Incubi Darkness",range:"Base",hex:"#0B474A"},{ name:"Jokaero Orange",range:"Base",hex:"#EE3823"},
  { name:"Kantor Blue",range:"Base",hex:"#002151"},{ name:"Khorne Red",range:"Base",hex:"#6A0001"},
  { name:"Leadbelcher",range:"Base",hex:"#888D8F"},{ name:"Macragge Blue",range:"Base",hex:"#0D407F"},
  { name:"Mechanicus Standard Grey",range:"Base",hex:"#3D4B4D"},{ name:"Mephiston Red",range:"Base",hex:"#9A1115"},
  { name:"Mournfang Brown",range:"Base",hex:"#640909"},{ name:"Naggaroth Night",range:"Base",hex:"#3D3354"},
  { name:"Rakarth Flesh",range:"Base",hex:"#A29E91"},{ name:"Ratskin Flesh",range:"Base",hex:"#AD6B4C"},
  { name:"Retributor Armour",range:"Base",hex:"#C39E81"},{ name:"Rhinox Hide",range:"Base",hex:"#493435"},
  { name:"Screamer Pink",range:"Base",hex:"#7C1645"},{ name:"Screaming Bell",range:"Base",hex:"#C16F45"},
  { name:"Steel Legion Drab",range:"Base",hex:"#5E5134"},{ name:"Stegadon Scale Green",range:"Base",hex:"#074863"},
  { name:"The Fang Grey",range:"Base",hex:"#436174"},{ name:"Thousand Sons Blue",range:"Base",hex:"#18ABCC"},
  { name:"Waaagh! Flesh",range:"Base",hex:"#1F5429"},{ name:"Warplock Bronze",range:"Base",hex:"#927D7B"},
  { name:"Wraithbone",range:"Base",hex:"#E8DCBA"},{ name:"XV-88",range:"Base",hex:"#72491E"},
  { name:"Zandri Dust",range:"Base",hex:"#9E915C"},
  { name:"Administratum Grey",range:"Layer",hex:"#949B95"},{ name:"Ahriman Blue",range:"Layer",hex:"#1F8C9C"},
  { name:"Alaitoc Blue",range:"Layer",hex:"#295788"},{ name:"Altdorf Guard Blue",range:"Layer",hex:"#1F56A7"},
  { name:"Auric Armour Gold",range:"Layer",hex:"#E8BC6D"},{ name:"Balor Brown",range:"Layer",hex:"#8B5910"},
  { name:"Baneblade Brown",range:"Layer",hex:"#937F6D"},{ name:"Bestigor Flesh",range:"Layer",hex:"#D38A57"},
  { name:"Brass Scorpion",range:"Layer",hex:"#B7885F"},{ name:"Cadian Fleshtone",range:"Layer",hex:"#C77958"},
  { name:"Calgar Blue",range:"Layer",hex:"#4272B8"},{ name:"Dark Reaper",range:"Layer",hex:"#3B5150"},
  { name:"Dawnstone",range:"Layer",hex:"#70756E"},{ name:"Deathclaw Brown",range:"Layer",hex:"#B36853"},
  { name:"Doombull Brown",range:"Layer",hex:"#5D0009"},{ name:"Elysian Green",range:"Layer",hex:"#748F39"},
  { name:"Emperors Children",range:"Layer",hex:"#B94278"},{ name:"Eshin Grey",range:"Layer",hex:"#4A4F52"},
  { name:"Evil Sunz Scarlet",range:"Layer",hex:"#C2191F"},{ name:"Fenrisian Grey",range:"Layer",hex:"#719BB7"},
  { name:"Fire Dragon Bright",range:"Layer",hex:"#F58652"},{ name:"Flash Gitz Yellow",range:"Layer",hex:"#FFF200"},
  { name:"Flayed One Flesh",range:"Layer",hex:"#F0D9B8"},{ name:"Fulgurite Copper",range:"Layer",hex:"#B08050"},
  { name:"Gehenna's Gold",range:"Layer",hex:"#DBA674"},{ name:"Genestealer Purple",range:"Layer",hex:"#7761AB"},
  { name:"Gorthor Brown",range:"Layer",hex:"#654741"},{ name:"Hashut Copper",range:"Layer",hex:"#B77647"},
  { name:"Hoeth Blue",range:"Layer",hex:"#4C7FB4"},{ name:"Ironbreaker",range:"Layer",hex:"#A1A6A9"},
  { name:"Kabalite Green",range:"Layer",hex:"#038C67"},{ name:"Karak Stone",range:"Layer",hex:"#BB9662"},
  { name:"Kislev Flesh",range:"Layer",hex:"#D6A875"},{ name:"Liberator Gold",range:"Layer",hex:"#D3B587"},
  { name:"Loren Forest",range:"Layer",hex:"#50702D"},{ name:"Lothern Blue",range:"Layer",hex:"#34A2CF"},
  { name:"Moot Green",range:"Layer",hex:"#52B244"},{ name:"Nurgling Green",range:"Layer",hex:"#849C63"},
  { name:"Ogryn Camo",range:"Layer",hex:"#9DA94B"},{ name:"Pallid Wych Flesh",range:"Layer",hex:"#CDCEBE"},
  { name:"Pink Horror",range:"Layer",hex:"#90305D"},{ name:"Runefang Steel",range:"Layer",hex:"#C3CACE"},
  { name:"Runelord Brass",range:"Layer",hex:"#B6A89A"},{ name:"Russ Grey",range:"Layer",hex:"#547588"},
  { name:"Screaming Skull",range:"Layer",hex:"#D2D4A2"},{ name:"Skarsnik Green",range:"Layer",hex:"#5F9370"},
  { name:"Skavenblight Dinge",range:"Layer",hex:"#47413B"},{ name:"Skrag Brown",range:"Layer",hex:"#90490F"},
  { name:"Skullcrusher Brass",range:"Layer",hex:"#F1C78E"},{ name:"Slaanesh Grey",range:"Layer",hex:"#8E8C97"},
  { name:"Sotek Green",range:"Layer",hex:"#0B6974"},{ name:"Squig Orange",range:"Layer",hex:"#AA4F44"},
  { name:"Stormhost Silver",range:"Layer",hex:"#BBC6C9"},{ name:"Stormvermin Fur",range:"Layer",hex:"#736B65"},
  { name:"Straken Green",range:"Layer",hex:"#628126"},{ name:"Sybarite Green",range:"Layer",hex:"#30A56C"},
  { name:"Sycorax Bronze",range:"Layer",hex:"#CBB394"},{ name:"Tallarn Sand",range:"Layer",hex:"#A67610"},
  { name:"Tau Light Ochre",range:"Layer",hex:"#BF6E1D"},{ name:"Teclis Blue",range:"Layer",hex:"#317EC1"},
  { name:"Temple Guard Blue",range:"Layer",hex:"#339A8D"},{ name:"Thunderhawk Blue",range:"Layer",hex:"#417074"},
  { name:"Troll Slayer Orange",range:"Layer",hex:"#F36D2D"},{ name:"Tuskgor Fur",range:"Layer",hex:"#883636"},
  { name:"Ulthuan Grey",range:"Layer",hex:"#C7E0D9"},{ name:"Ungor Flesh",range:"Layer",hex:"#D6A766"},
  { name:"Ushabti Bone",range:"Layer",hex:"#BBBB7F"},{ name:"Warboss Green",range:"Layer",hex:"#3E805D"},
  { name:"Warpfiend Grey",range:"Layer",hex:"#6B6A74"},{ name:"Warpstone Glow",range:"Layer",hex:"#1E7331"},
  { name:"Wazdakka Red",range:"Layer",hex:"#8C0A0C"},{ name:"White Scar",range:"Layer",hex:"#FFFFFF"},
  { name:"Wild Rider Red",range:"Layer",hex:"#EA2F28"},{ name:"Xereus Purple",range:"Layer",hex:"#471F5F"},
  { name:"Yriel Yellow",range:"Layer",hex:"#FFDA00"},{ name:"Zamesi Desert",range:"Layer",hex:"#DDA026"},
  { name:"Agrax Earthshade",range:"Shade",hex:"#5A573F"},{ name:"Athonian Camoshade",range:"Shade",hex:"#6D8E44"},
  { name:"Biel-Tan Green",range:"Shade",hex:"#1BA169"},{ name:"Carroburg Crimson",range:"Shade",hex:"#A82A70"},
  { name:"Casandora Yellow",range:"Shade",hex:"#FECE5A"},{ name:"Coelia Greenshade",range:"Shade",hex:"#0E7F78"},
  { name:"Drakenhof Nightshade",range:"Shade",hex:"#125899"},{ name:"Druchii Violet",range:"Shade",hex:"#7A468C"},
  { name:"Fuegan Orange",range:"Shade",hex:"#C77E4D"},{ name:"Nuln Oil",range:"Shade",hex:"#14100E"},
  { name:"Reikland Fleshshade",range:"Shade",hex:"#CA6C4D"},{ name:"Seraphim Sepia",range:"Shade",hex:"#D7824B"},
  { name:"Astorath Red",range:"Dry",hex:"#DD482B"},{ name:"Changeling Pink",range:"Dry",hex:"#F4AFCD"},
  { name:"Chronus Blue",range:"Dry",hex:"#72A8D1"},{ name:"Eldar Flesh",range:"Dry",hex:"#ECC083"},
  { name:"Etherium Blue",range:"Dry",hex:"#A2BAD2"},{ name:"Golden Griffon",range:"Dry",hex:"#A99058"},
  { name:"Golgfag Brown",range:"Dry",hex:"#C2804F"},{ name:"Hellion Green",range:"Dry",hex:"#84C3AA"},
  { name:"Hexos Palesun",range:"Dry",hex:"#FFF200"},{ name:"Imrik Blue",range:"Dry",hex:"#67AED0"},
  { name:"Kindleflame",range:"Dry",hex:"#F79E86"},{ name:"Longbeard Grey",range:"Dry",hex:"#CECEAF"},
  { name:"Lucius Lilac",range:"Dry",hex:"#B69FCC"},{ name:"Necron Compound",range:"Dry",hex:"#828B8E"},
  { name:"Niblet Green",range:"Dry",hex:"#7DC734"},{ name:"Praxeti White",range:"Dry",hex:"#FFFFFF"},
  { name:"Ryza Rust",range:"Dry",hex:"#EC631A"},{ name:"Sigmarite",range:"Dry",hex:"#CAAD76"},
  { name:"Skink Blue",range:"Dry",hex:"#58C1CD"},{ name:"Stormfang",range:"Dry",hex:"#80A7C1"},
  { name:"Sylvaneth Bark",range:"Dry",hex:"#AC8262"},{ name:"Terminatus Stone",range:"Dry",hex:"#BDB192"},
  { name:"Tyrant Skull",range:"Dry",hex:"#CDC586"},{ name:"Underhive Ash",range:"Dry",hex:"#C0BD81"},
  { name:"Verminlord Hide",range:"Dry",hex:"#A16954"},{ name:"Wrack White",range:"Dry",hex:"#FCFBFA"},
  { name:"Baharroth Blue",range:"Edge",hex:"#58C1CD"},{ name:"Blue Horror",range:"Edge",hex:"#A2BAD2"},
  { name:"Dechala Lilac",range:"Edge",hex:"#B69FCC"},{ name:"Dorn Yellow",range:"Edge",hex:"#FFF200"},
  { name:"Fulgrim Pink",range:"Edge",hex:"#F4AFCD"},{ name:"Gauss Blaster Green",range:"Edge",hex:"#84C3AA"},
  { name:"Krieg Khaki",range:"Edge",hex:"#C0BD81"},{ name:"Lugganath Orange",range:"Edge",hex:"#F79E86"},
  { name:"Aethermatic Blue",range:"Contrast",hex:"#4E90B0"},{ name:"Aggaros Dunes",range:"Contrast",hex:"#B5842A"},
  { name:"Apothecary White",range:"Contrast",hex:"#D6D8D0"},{ name:"Bad Moon Yellow",range:"Contrast",hex:"#E8B800"},
  { name:"Baal Red",range:"Contrast",hex:"#A01818"},{ name:"Black Templar",range:"Contrast",hex:"#1C1C24"},
  { name:"Blood Angels Red",range:"Contrast",hex:"#9A1010"},{ name:"Briar Queen Chill",range:"Contrast",hex:"#8AABB8"},
  { name:"Celestium Blue",range:"Contrast",hex:"#2060A0"},{ name:"Creed Camo",range:"Contrast",hex:"#4A5A30"},
  { name:"Dark Angels Green",range:"Contrast",hex:"#1A4A20"},{ name:"Darkoath Flesh",range:"Contrast",hex:"#B07050"},
  { name:"Doomfire Magenta",range:"Contrast",hex:"#C02080"},{ name:"Fyreslayer Flesh",range:"Contrast",hex:"#C87848"},
  { name:"Garaghaks Sewer",range:"Contrast",hex:"#7A8A4A"},{ name:"Gryph-charger Grey",range:"Contrast",hex:"#507080"},
  { name:"Gryph-hound Orange",range:"Contrast",hex:"#C05020"},{ name:"Guilliman Flesh",range:"Contrast",hex:"#C07858"},
  { name:"Hexwraith Flame",range:"Contrast",hex:"#80C040"},{ name:"Imperial Fist",range:"Contrast",hex:"#C89820"},
  { name:"Ironjawz Yellow",range:"Contrast",hex:"#C08010"},{ name:"Iyanden Yellow",range:"Contrast",hex:"#D8A800"},
  { name:"Leviathan Purple",range:"Contrast",hex:"#602870"},{ name:"Leviadon Blue",range:"Contrast",hex:"#183060"},
  { name:"Magmadroth Flame",range:"Contrast",hex:"#B83010"},{ name:"Militarum Green",range:"Contrast",hex:"#405030"},
  { name:"Nazdreg Yellow",range:"Contrast",hex:"#B88000"},{ name:"Nighthaunt Gloom",range:"Contrast",hex:"#60A890"},
  { name:"Ork Flesh",range:"Contrast",hex:"#3A7030"},{ name:"Plaguebearer Flesh",range:"Contrast",hex:"#8A9A50"},
  { name:"Ratling Grime",range:"Contrast",hex:"#302820"},{ name:"Shyish Purple",range:"Contrast",hex:"#6030A0"},
  { name:"Skeleton Horde",range:"Contrast",hex:"#C0A840"},{ name:"Striking Scorpion Green",range:"Contrast",hex:"#10A040"},
  { name:"Talassar Blue",range:"Contrast",hex:"#0050A0"},{ name:"Terradon Turquoise",range:"Contrast",hex:"#108080"},
  { name:"Ultramarines Blue",range:"Contrast",hex:"#1840A0"},{ name:"Volupus Pink",range:"Contrast",hex:"#C04080"},
  { name:"Warp Lightning",range:"Contrast",hex:"#20A030"},{ name:"Wyldwood",range:"Contrast",hex:"#3A2A18"},
  { name:"'Ardcoat",range:"Technical",hex:"#E2DEDF"},{ name:"Agrellan Earth",range:"Technical",hex:"#9A816B"},
  { name:"Blood for the Blood God",range:"Technical",hex:"#67080B"},{ name:"Lahmian Medium",range:"Technical",hex:"#F5EDE2"},
  { name:"Liquid Green Stuff",range:"Technical",hex:"#3B7A5F"},{ name:"Martian Ironearth",range:"Technical",hex:"#C15A4B"},
  { name:"Nihilakh Oxide",range:"Technical",hex:"#6CB79E"},{ name:"Nurgle's Rot",range:"Technical",hex:"#9B8F22"},
  { name:"Soulstone Blue",range:"Technical",hex:"#004EFA"},{ name:"Typhus Corrosion",range:"Technical",hex:"#463D2B"},
  { name:"Bloodletter",range:"Glaze",hex:"#F37355"},{ name:"Guilliman Blue",range:"Glaze",hex:"#2F9AD6"},
  { name:"Lamenters Yellow",range:"Glaze",hex:"#FFF56B"},{ name:"Waywatcher Green",range:"Glaze",hex:"#6DC066"},
];

// ─── BRUSH DATA ──────────────────────────────────────────────────
const CITADEL_BRUSHES = [
  {name:"Base Brush (Large)",type:"Base",icon:"🖌️",desc:"A wide brush for covering large flat surfaces quickly. Basecoat big armour panels, cloaks, or bases in seconds. Load generously and work in smooth strokes — don't fuss over precision."},
  {name:"Base Brush (Medium)",type:"Base",icon:"🖌️",desc:"Your everyday workhorse. Great for basecoating most infantry models. If you only own one brush, make it this one. Apply thin, even coats rather than one thick glob."},
  {name:"Base Brush (Small)",type:"Base",icon:"🖌️",desc:"For basecoating smaller models or specific areas without getting paint everywhere. Useful for picking out large armour plates on infantry without touching adjacent areas."},
  {name:"Layer Brush (Large)",type:"Layer",icon:"🖌️",desc:"For applying layers over large areas — keeps coverage smooth. Used after your base coat to build up colour and add mid-tones. Thin your paints slightly for best results."},
  {name:"Layer Brush (Medium)",type:"Layer",icon:"🖌️",desc:"The most versatile brush in the range. Used for layering colours to build depth. Comes to a good point for moderate detail work. Keep it clean and it'll serve you well for years."},
  {name:"Layer Brush (Small)",type:"Layer",icon:"🖌️",desc:"Perfect for highlights and layers on smaller areas — faces, hands, weapon shafts. Comes to a fine point. Ideal for beginners learning edge highlighting."},
  {name:"Detail Brush",type:"Detail",icon:"✏️",desc:"A fine-tipped brush for small details — eyes, gems, freehand markings. Rest your hand on the model and breathe slowly. Load with a tiny amount of paint. Less is more."},
  {name:"Fine Detail Brush",type:"Detail",icon:"✏️",desc:"The finest brush in the range. Reserved for tiny details: pupils in eyes, fine script, gem reflections. Build up to this after mastering larger brushes first."},
  {name:"Shade Brush (Large)",type:"Shade",icon:"💧",desc:"Designed to apply washes over large areas quickly. Flood recesses fast. Tip the model sideways to prevent pooling on flat surfaces — let gravity work for you."},
  {name:"Shade Brush (Small)",type:"Shade",icon:"💧",desc:"For targeted shading — applying washes precisely into recesses on faces, hands, and detail areas without flooding flat surfaces. Essential for realistic skin tones."},
  {name:"Dry Brush (Large)",type:"Dry",icon:"⚡",desc:"A stiff, splayed brush for drybrushing large surfaces — rubble bases, fur cloaks, bulk armour. Dab off nearly all paint on a tissue first, then lightly flick across the surface."},
  {name:"Dry Brush (Medium)",type:"Dry",icon:"⚡",desc:"For drybrushing highlights onto infantry models. Ideal for picking out raised edges on cloth, armour, and fur. Remember: nearly all paint off the brush before applying."},
  {name:"Dry Brush (Small)",type:"Dry",icon:"⚡",desc:"For drybrushing precise highlights on small areas — weapon blades, skull details, scrollwork. Also great for weathering small metal parts and chipped armour effects."},
  {name:"Scenery Brush",type:"Scenery",icon:"🏔️",desc:"A large chunky brush for quickly painting terrain and bases. Don't waste your fine brushes on basing — use this to slap on texture paints and base colours efficiently."},
  {name:"Glaze Brush",type:"Glaze",icon:"✨",desc:"For applying glazes — thin translucent coats that add colour tint without hiding detail. Great for OSL (Object Source Lighting) effects and blending colour transitions."},
  {name:"Stippling Brush",type:"Texture",icon:"🎯",desc:"A flat-ended stiff brush for stippling texture onto bases and models. Dab it loaded with paint to create rough, grainy surfaces simulating weathering or fungal growths."},
];

// ─── ARMY UNITS ──────────────────────────────────────────────────
const ARMIES_40K = {
  "Space Marines":["Intercessors","Assault Intercessors","Infiltrators","Incursors","Eliminators","Reivers","Hellblasters","Aggressors","Bladeguard Veterans","Outriders","Inceptors","Eradicators","Suppressors","Desolation Squad","Sternguard Veterans","Vanguard Veterans","Terminator Squad","Assault Terminators","Dreadnought","Redemptor Dreadnought","Brutalis Dreadnought","Ballistus Dreadnought","Repulsor","Repulsor Executioner","Impulsor","Rhino","Razorback","Drop Pod","Land Raider","Predator","Vindicator","Whirlwind","Captain","Librarian","Chaplain","Techmarine","Apothecary","Lieutenant","Ancient"],
  "Chaos Space Marines":["Chaos Space Marines","Chosen","Cultists","Possessed","Greater Possessed","Dark Apostle","Master of Possession","Venomcrawler","Obliterators","Chaos Lord","Sorcerer","Warpsmith","Chaos Rhino","Chaos Predator","Maulerfiend","Forgefiend","Helbrute","Defiler","Warp Talons","Raptors","Havocs"],
  "Tyranids":["Termagants","Hormagaunts","Gargoyles","Ripper Swarms","Warriors","Raveners","Shrikes","Genestealers","Broodlord","Lictor","Deathleaper","Hive Guard","Carnifex","Old One Eye","Tyrannofex","Tervigon","Harpy","Hive Crone","Exocrine","Zoanthropes","Neurothrope","Hive Tyrant","Winged Hive Tyrant","Neurogaunts","Von Ryan's Leapers","Screamer-Killer","Psychophage"],
  "Orks":["Boyz","Gretchin","Nobz","Meganobz","Lootas","Burna Boyz","Tank Bustas","Kommandos","Storm Boyz","Deffkopta","Warbikers","Trukk","Battlewagon","Deff Dread","Killa Kans","Morkanaut","Gorkanaut","Mek Gunz","Flash Gitz","Warboss","Big Mek","Painboy","Weirdboy","Squighog Boyz","Beast Snagga Boyz","Kill Rig"],
  "Necrons":["Necron Warriors","Immortals","Deathmarks","Lychguard","Triarch Praetorians","Flayed Ones","Tomb Blades","Scarab Swarms","Wraiths","Destroyers","Heavy Destroyers","Canoptek Spyder","Doomsday Ark","Ghost Ark","Monolith","Overlord","Lord","Cryptek","Plasmancer","Royal Warden","Skorpekh Lord","Skorpekh Destroyers","Ophydian Destroyers","Triarch Stalker","Silent King"],
  "Tau Empire":["Fire Warriors","Breacher Team","Kroot Carnivores","Kroot Hounds","Vespid Stingwings","Pathfinder Team","Stealth Battlesuits","Crisis Battlesuits","Broadside Battlesuits","Riptide","Ghostkeel","Hammerhead","Sky Ray","Piranha","Devilfish","Commander","Ethereal","Cadre Fireblade","Stormsurge"],
  "Aeldari":["Guardians","Storm Guardians","Rangers","Dire Avengers","Fire Dragons","Howling Banshees","Striking Scorpions","Dark Reapers","Swooping Hawks","Warp Spiders","Shining Spears","Windriders","Vyper","War Walkers","Wraithlord","Wraithguard","Wraithblades","Wraithknight","Falcon","Wave Serpent","Fire Prism","Night Spinner","Crimson Hunter","Avatar of Khaine","Farseer","Warlock","Autarch","Eldrad Ulthran"],
  "Death Guard":["Plague Marines","Poxwalkers","Blightlord Terminators","Deathshroud Terminators","Plague Surgeon","Tallyman","Biologus Putrifier","Foul Blightspawn","Noxious Blightbringer","Lord of Contagion","Malignant Plaguecaster","Daemon Prince","Foetid Bloat-drone","Myphitic Blight-haulers","Plagueburst Crawler","Mortarion"],
  "Thousand Sons":["Rubric Marines","Scarab Occult Terminators","Tzaangors","Tzaangor Enlightened","Exalted Sorcerers","Magnus the Red","Daemon Prince","Sorcerer","Infernal Master","Ahriman"],
  "Astra Militarum":["Infantry Squad","Heavy Weapons Squad","Special Weapons Squad","Command Squad","Veteran Squad","Conscripts","Scions","Rough Riders","Ogryn","Bullgryns","Ratlings","Sentinel","Chimera","Hellhound","Basilisk","Manticore","Wyvern","Leman Russ","Baneblade","Company Commander","Lord Castellan Creed","Commissar","Primaris Psyker"],
  "Adepta Sororitas":["Battle Sisters Squad","Celestian Squad","Dominion Squad","Retributor Squad","Seraphim Squad","Zephyrim Squad","Arco-flagellants","Penitent Engines","Mortifiers","Immolator","Rhino","Exorcist","Castigator","Canoness","Palatine","Dogmata","Celestine","Morvenn Vahl"],
  "Grey Knights":["Strike Squad","Interceptor Squad","Purifier Squad","Purgation Squad","Terminator Squad","Paladin Squad","Dreadknight","Rhino","Land Raider","Brother-Captain","Grand Master","Librarian","Grand Master Voldus"],
  "Drukhari":["Kabalite Warriors","Wyches","Hellions","Reavers","Scourges","Wracks","Grotesques","Talos Pain Engine","Cronos Parasite Engine","Raider","Venom","Ravager","Archon","Succubus","Haemonculus","Drazhar"],
};

// ─── PAINT SCHEMES PER ARMY ─────────────────────────────────────
const ARMY_SCHEMES = {
  "Space Marines":[
    {name:"Ultramarines",desc:"The iconic blue-armoured Chapter of Macragge. Bold, clean, and unmistakable.",colors:["#0D407F","#4272B8","#FFFFFF","#C39E81","#14100E"],paints:[{p:"Macragge Blue",role:"Basecoat all armour"},{p:"Agrax Earthshade",role:"Shade entire model"},{p:"Calgar Blue",role:"Layer highlight armour panels"},{p:"Altdorf Guard Blue",role:"Edge highlight sharp edges"},{p:"Retributor Armour",role:"Gold details & trim"},{p:"Nuln Oil",role:"Shade metalwork"},{p:"Administratum Grey",role:"Final extreme edge highlights"},{p:"Ceramite White",role:"Chapter insignia & eyes"},{p:"Abaddon Black",role:"Weapon casings"},{p:"Leadbelcher",role:"Gun metals"}]},
    {name:"Blood Angels",desc:"Crimson warriors of Baal. Lustrous deep red armour with golden trim and an air of nobility.",colors:["#9A1115","#C2191F","#E8BC6D","#14100E","#C39E81"],paints:[{p:"Mephiston Red",role:"Basecoat all armour"},{p:"Agrax Earthshade",role:"Shade recesses"},{p:"Evil Sunz Scarlet",role:"Layer mid highlights"},{p:"Wild Rider Red",role:"Bright edge highlights"},{p:"Retributor Armour",role:"Gold trim & icons"},{p:"Reikland Fleshshade",role:"Shade the gold"},{p:"Nuln Oil",role:"Shade metal weapons"},{p:"Leadbelcher",role:"Gun barrels & boltguns"},{p:"Ceramite White",role:"Helmet eye lenses"},{p:"Sanguine Base (Contrast)",role:"Quick armour alternative"}]},
    {name:"Space Wolves",desc:"Viking warrior aesthetic. Weathered grey armour with fur pelts and runic markings.",colors:["#436174","#719BB7","#A99058","#CECEAF","#3D4B4D"],paints:[{p:"The Fang Grey",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Shade entire model"},{p:"Russ Grey",role:"Layer highlights"},{p:"Fenrisian Grey",role:"Edge highlights"},{p:"Administratum Grey",role:"Extreme edge highlights"},{p:"Gorthor Brown",role:"Fur pelts basecoat"},{p:"Agrax Earthshade",role:"Shade fur"},{p:"Karak Stone",role:"Highlight fur"},{p:"Retributor Armour",role:"Runes and decoration"},{p:"Leadbelcher",role:"Weapons and metal"}]},
    {name:"Dark Angels",desc:"Secretive and brooding. Deep bottle-green armour with robes and parchment scrollwork.",colors:["#00401F","#1F5429","#BBBB7F","#D2D4A2","#A47552"],paints:[{p:"Caliban Green",role:"Basecoat armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Warpstone Glow",role:"Layer highlights"},{p:"Moot Green",role:"Edge highlights"},{p:"Zandri Dust",role:"Robes and parchment"},{p:"Seraphim Sepia",role:"Shade robes"},{p:"Screaming Skull",role:"Highlight robes"},{p:"Balthasar Gold",role:"Metallic decoration"},{p:"Agrax Earthshade",role:"Shade metals"},{p:"Leadbelcher",role:"Weapons"}]},
  ],
  "Chaos Space Marines":[
    {name:"Iron Warriors",desc:"Utilitarian siege-masters. Battered iron armour with hazard stripes and grime.",colors:["#A1A6A9","#736B65","#FFF200","#231F20","#463D2B"],paints:[{p:"Leadbelcher",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Wash entire model heavily"},{p:"Ironbreaker",role:"Drybrush highlights"},{p:"Runefang Steel",role:"Edge highlights"},{p:"Averland Sunset",role:"Hazard stripe base"},{p:"Abaddon Black",role:"Hazard stripe alternate"},{p:"Typhus Corrosion",role:"Rust and weathering effects"},{p:"Ryza Rust (Dry)",role:"Drybrush rust patches"},{p:"Mournfang Brown",role:"Grime and weathering"},{p:"Agrax Earthshade",role:"Deepen shadows"}]},
    {name:"Night Lords",desc:"Terror-spreading predators. Midnight blue armour covered in lightning bolts and skulls.",colors:["#002151","#1F56A7","#FFF56B","#C3CACE","#231F20"],paints:[{p:"Kantor Blue",role:"Basecoat armour"},{p:"Drakenhof Nightshade",role:"Shade armour"},{p:"Alaitoc Blue",role:"Layer highlights"},{p:"Calgar Blue",role:"Edge highlights"},{p:"Flash Gitz Yellow",role:"Lightning bolt markings"},{p:"Lamenters Yellow (Glaze)",role:"Glaze over yellow"},{p:"Stormhost Silver",role:"Trim and skulls"},{p:"Nuln Oil",role:"Shade metals"},{p:"Ceramite White",role:"Skull details"},{p:"Abaddon Black",role:"Lenses and deep recesses"}]},
    {name:"World Eaters",desc:"Blood-frenzied berserkers. White and blue armour stained with gore and battle damage.",colors:["#FFFFFF","#0D407F","#67080B","#C2191F","#888D8F"],paints:[{p:"Ceramite White",role:"Basecoat white armour panels"},{p:"Macragge Blue",role:"Basecoat blue armour panels"},{p:"Agrax Earthshade",role:"Shade recesses on both"},{p:"White Scar",role:"Layer highlight white areas"},{p:"Calgar Blue",role:"Layer highlight blue areas"},{p:"Blood Angels Red (Contrast)",role:"Blood and gore effects"},{p:"Blood for the Blood God",role:"Dripping blood details"},{p:"Leadbelcher",role:"Weapons and chain teeth"},{p:"Nuln Oil",role:"Shade metalwork"},{p:"Khorne Red",role:"Any trim or brass markings"}]},
    {name:"Death Guard Renegades",desc:"Plague-blessed warriors. Corroded pus-yellow armour dripping with Nurgle's gifts.",colors:["#848A66","#9B8F22","#3B7A5F","#C15A4B","#BBBB7F"],paints:[{p:"Death Guard Green",role:"Basecoat armour"},{p:"Agrax Earthshade",role:"Shade entire model"},{p:"Nurgling Green",role:"Layer highlights"},{p:"Ogryn Camo",role:"Bright highlights"},{p:"Typhus Corrosion",role:"Rust and rot effects"},{p:"Nurgle's Rot",role:"Oozing pustule effects"},{p:"Nihilakh Oxide",role:"Verdigris on metal"},{p:"Leadbelcher",role:"Metal areas"},{p:"Nuln Oil",role:"Shade metals deeply"},{p:"Screaming Skull",role:"Bone details"}]},
  ],
  "Tyranids":[
    {name:"Hive Fleet Leviathan",desc:"Purple and white — the most iconic Hive Fleet. Classic and recognisable on any tabletop.",colors:["#7761AB","#471F5F","#FFFFFF","#C77958","#CDCEBE"],paints:[{p:"Xereus Purple",role:"Basecoat all chitin armour"},{p:"Druchii Violet",role:"Shade chitin"},{p:"Genestealer Purple",role:"Layer highlight chitin"},{p:"Dechala Lilac (Edge)",role:"Edge highlight chitin"},{p:"Ceramite White",role:"Basecoat flesh areas"},{p:"Reikland Fleshshade",role:"Shade flesh"},{p:"Pallid Wych Flesh",role:"Highlight flesh"},{p:"Cadian Fleshtone",role:"Tongue and inner flesh"},{p:"Abaddon Black",role:"Talons and claws base"},{p:"Eshin Grey",role:"Highlight claws"}]},
    {name:"Hive Fleet Kraken",desc:"Red and bone — fast and aggressive. Striking contrast between dark and light.",colors:["#9A1115","#C2191F","#BBBB7F","#D2D4A2","#5D0009"],paints:[{p:"Khorne Red",role:"Basecoat all chitin"},{p:"Nuln Oil",role:"Shade chitin recesses"},{p:"Mephiston Red",role:"Layer highlight chitin"},{p:"Evil Sunz Scarlet",role:"Edge highlight chitin"},{p:"Ushabti Bone",role:"Basecoat flesh/bone areas"},{p:"Agrax Earthshade",role:"Shade bone areas"},{p:"Screaming Skull",role:"Layer highlight bone"},{p:"Ceramite White",role:"Extreme bone highlights"},{p:"Abaddon Black",role:"Carapace deep recesses"},{p:"Leadbelcher",role:"Any metal biomorphs"}]},
    {name:"Hive Fleet Behemoth",desc:"Blue and red — the fleet of the First Tyrannic War. Bold and striking.",colors:["#0D407F","#4272B8","#9A1115","#C2191F","#BBBB7F"],paints:[{p:"Macragge Blue",role:"Basecoat chitin plates"},{p:"Drakenhof Nightshade",role:"Shade chitin"},{p:"Calgar Blue",role:"Layer highlight chitin"},{p:"Hoeth Blue",role:"Edge highlight chitin"},{p:"Mephiston Red",role:"Basecoat flesh areas"},{p:"Carroburg Crimson",role:"Shade flesh"},{p:"Evil Sunz Scarlet",role:"Highlight flesh"},{p:"Ushabti Bone",role:"Bone and claw areas"},{p:"Agrax Earthshade",role:"Shade bone"},{p:"Screaming Skull",role:"Highlight bone"}]},
    {name:"Hive Fleet Kronos",desc:"Black and teal — sleek and predatory. Perfect for painting fast with Contrast paints.",colors:["#231F20","#108080","#A2BAD2","#BBBB7F","#60A890"],paints:[{p:"Abaddon Black",role:"Basecoat all chitin"},{p:"Terradon Turquoise (Contrast)",role:"Apply over black for a teal sheen"},{p:"Etherium Blue (Dry)",role:"Drybrush chitin highlights"},{p:"Nihilakh Oxide",role:"Accent on claw tips"},{p:"Wraithbone",role:"Basecoat flesh areas"},{p:"Nighthaunt Gloom (Contrast)",role:"Shade flesh teal-green"},{p:"Pallid Wych Flesh",role:"Highlight flesh"},{p:"Ushabti Bone",role:"Claws and teeth"},{p:"Agrax Earthshade",role:"Shade claws"},{p:"Screaming Skull",role:"Highlight claws and teeth"}]},
  ],
  "Orks":[
    {name:"Evil Sunz",desc:"Racing-obsessed Orks. Bright red vehicles and armour — they go faster that way.",colors:["#9A1115","#C2191F","#FFF200","#888D8F","#3A7030"],paints:[{p:"Mephiston Red",role:"Basecoat vehicles and armour"},{p:"Nuln Oil",role:"Heavy shade all over"},{p:"Evil Sunz Scarlet",role:"Layer highlight red areas"},{p:"Wild Rider Red",role:"Edge highlight bright chips"},{p:"Waaagh! Flesh",role:"Basecoat all Ork skin"},{p:"Biel-Tan Green",role:"Shade skin"},{p:"Warboss Green",role:"Layer skin highlights"},{p:"Flash Gitz Yellow",role:"Yellow checkered patterns"},{p:"Leadbelcher",role:"Metal armour plates and weapons"},{p:"Agrax Earthshade",role:"Shade and dirty everything"}]},
    {name:"Goff Klan",desc:"The most brutal Orks. Black armour with white checkers — classic and intimidating.",colors:["#231F20","#FFFFFF","#3A7030","#888D8F","#8B5910"],paints:[{p:"Abaddon Black",role:"Basecoat armour plates"},{p:"Eshin Grey",role:"Layer highlight armour"},{p:"Dawnstone",role:"Edge highlight black armour"},{p:"Ceramite White",role:"Checker patterns on armour"},{p:"Waaagh! Flesh",role:"Basecoat skin"},{p:"Biel-Tan Green",role:"Shade skin"},{p:"Warboss Green",role:"Highlight skin"},{p:"Leadbelcher",role:"Weapons and metal bits"},{p:"Nuln Oil",role:"Shade metals"},{p:"Skrag Brown",role:"Leather straps and belts"}]},
    {name:"Deathskulls",desc:"Loot-obsessed Orks who paint themselves blue for luck. Motley mismatched equipment.",colors:["#396E9E","#34A2CF","#FFF200","#3A7030","#888D8F"],paints:[{p:"Caledor Sky",role:"Basecoat blue armour and skin highlights"},{p:"Drakenhof Nightshade",role:"Shade blue areas"},{p:"Lothern Blue",role:"Highlight blue elements"},{p:"Waaagh! Flesh",role:"Basecoat skin"},{p:"Biel-Tan Green",role:"Shade skin"},{p:"Flash Gitz Yellow",role:"Yellow accents on looted gear"},{p:"Mephiston Red",role:"Red accents — random stolen pieces"},{p:"Leadbelcher",role:"Weapons and looted metal"},{p:"Agrax Earthshade",role:"Shade and weather everything"},{p:"Ryza Rust (Dry)",role:"Rust on all metal"}]},
    {name:"Bad Moons",desc:"Wealthiest Orks. Yellow armour covered in teeth currency and flashy glyph markings.",colors:["#FDB825","#FFF200","#231F20","#3A7030","#888D8F"],paints:[{p:"Averland Sunset",role:"Basecoat yellow armour"},{p:"Seraphim Sepia",role:"Shade yellow heavily"},{p:"Yriel Yellow",role:"Layer highlight yellow"},{p:"Flash Gitz Yellow",role:"Bright top highlights"},{p:"Abaddon Black",role:"Deep recesses and armour trim"},{p:"Waaagh! Flesh",role:"Skin basecoat"},{p:"Biel-Tan Green",role:"Skin shade"},{p:"Warboss Green",role:"Skin highlight"},{p:"Leadbelcher",role:"Metal weapons and teeth currency"},{p:"Agrax Earthshade",role:"Shade and weather metals"}]},
  ],
  "Necrons":[
    {name:"Szarekhan Dynasty",desc:"The Silent King's own Dynasty. Silver and white — regal, immaculate, terrifying.",colors:["#C3CACE","#BBC6C9","#231F20","#FFF200","#6CB79E"],paints:[{p:"Leadbelcher",role:"Basecoat all metal body"},{p:"Nuln Oil",role:"Heavy shade all over"},{p:"Ironbreaker",role:"Layer highlight raised areas"},{p:"Runefang Steel",role:"Edge and extreme highlight"},{p:"Stormhost Silver",role:"Brightest edge highlights"},{p:"Abaddon Black",role:"Deep recesses and details"},{p:"Nihilakh Oxide",role:"Verdigris effect in joints"},{p:"Yriel Yellow",role:"Eye lenses and rods"},{p:"Casandora Yellow",role:"Shade the yellow lenses"},{p:"Ceramite White",role:"Dynasty markings"}]},
    {name:"Sautekh Dynasty",desc:"Largest of the Dynasties. Gunmetal silver with black and white trim — crisp and stark.",colors:["#888D8F","#A1A6A9","#231F20","#FFFFFF","#004EFA"],paints:[{p:"Leadbelcher",role:"Basecoat all metal"},{p:"Nuln Oil",role:"Deep shade all over"},{p:"Ironbreaker",role:"Layer highlights"},{p:"Stormhost Silver",role:"Bright edge highlights"},{p:"Abaddon Black",role:"Black trim and face details"},{p:"Ceramite White",role:"White dynasty markings"},{p:"Soulstone Blue",role:"Energy weapon rods"},{p:"Aethermatic Blue (Contrast)",role:"Weapon glow effects"},{p:"Nihilakh Oxide",role:"Verdigris in joints"},{p:"Agrax Earthshade",role:"Deepen shadows"}]},
    {name:"Nephrekh Dynasty",desc:"Gold-clad sun-worshippers. Warm golden armour that shimmers in light.",colors:["#A47552","#E8BC6D","#C39E81","#FDB825","#888D8F"],paints:[{p:"Retributor Armour",role:"Basecoat all metal"},{p:"Reikland Fleshshade",role:"Shade the gold"},{p:"Auric Armour Gold",role:"Layer highlight gold areas"},{p:"Stormhost Silver",role:"Edge highlights"},{p:"Averland Sunset",role:"Warm glow on energy sources"},{p:"Casandora Yellow",role:"Shade the yellow"},{p:"Flash Gitz Yellow",role:"Brightest glow highlights"},{p:"Abaddon Black",role:"Deep recesses"},{p:"Nihilakh Oxide",role:"Verdigris accents"},{p:"Ceramite White",role:"Dynasty symbols"}]},
    {name:"Mephrit Dynasty",desc:"Red-accented warriors forged in solar fire. Gunmetal bodies with burning red energy.",colors:["#888D8F","#9A1115","#C2191F","#004EFA","#231F20"],paints:[{p:"Leadbelcher",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Shade all over"},{p:"Ironbreaker",role:"Highlight raised plates"},{p:"Stormhost Silver",role:"Bright edge highlights"},{p:"Khorne Red",role:"Red armour accents"},{p:"Carroburg Crimson",role:"Shade the red"},{p:"Evil Sunz Scarlet",role:"Highlight red accents"},{p:"Mephiston Red",role:"Bright top highlights on red"},{p:"Spiritstone Red",role:"Gem and eye effects"},{p:"Nihilakh Oxide",role:"Verdigris details"}]},
  ],
  "Tau Empire":[
    {name:"Sa'cea Sept",desc:"Warm cream and tan armour with red markings. Classic Tau look — clean and futuristic.",colors:["#E8DCBA","#A67610","#9A1115","#888D8F","#C39E81"],paints:[{p:"Wraithbone",role:"Basecoat all armour"},{p:"Seraphim Sepia",role:"Shade armour panels"},{p:"Screaming Skull",role:"Layer highlight armour"},{p:"Ceramite White",role:"Brightest highlight edges"},{p:"Khorne Red",role:"Markings and sept colours"},{p:"Nuln Oil",role:"Shade red markings"},{p:"Leadbelcher",role:"Weapons and mechanical parts"},{p:"Nuln Oil",role:"Shade all metals"},{p:"Ironbreaker",role:"Highlight metal areas"},{p:"Averland Sunset",role:"Eye lenses and drone sensors"}]},
    {name:"Dal'yth Sept",desc:"Urban camouflage. Muted grey and white armour for city warfare.",colors:["#C1C0BF","#949B95","#70756E","#3D4B4D","#888D8F"],paints:[{p:"Grey Seer",role:"Basecoat all armour"},{p:"Apothecary White (Contrast)",role:"Apply over Grey Seer for quick tone"},{p:"Celestra Grey",role:"Layer highlight armour"},{p:"Ulthuan Grey",role:"Bright highlight edges"},{p:"Ceramite White",role:"Extreme highlights"},{p:"Mechanicus Standard Grey",role:"Armour panel shadow lines"},{p:"Leadbelcher",role:"Weapons and tech"},{p:"Nuln Oil",role:"Shade metals"},{p:"Averland Sunset",role:"Sensor lenses"},{p:"Casandora Yellow",role:"Shade lenses"}]},
    {name:"Vior'la Sept",desc:"Aggressive red-marked warriors. Hot-blooded and bold — lots of sept red.",colors:["#9A1115","#FFFFFF","#888D8F","#A67610","#C39E81"],paints:[{p:"Mephiston Red",role:"Basecoat armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Evil Sunz Scarlet",role:"Layer highlight red panels"},{p:"Wild Rider Red",role:"Edge highlight"},{p:"Ceramite White",role:"White armour trim and markings"},{p:"Agrax Earthshade",role:"Shade white areas"},{p:"Ulthuan Grey",role:"Highlight white trim"},{p:"Leadbelcher",role:"All weapons"},{p:"Ironbreaker",role:"Highlight weapons"},{p:"Averland Sunset",role:"Lenses"}]},
    {name:"T'au Sept",desc:"The homeworld sept. Brown/tan earth tones — suited to desert terrain.",colors:["#72491E","#9E915C","#A67610","#888D8F","#C3CACE"],paints:[{p:"XV-88",role:"Basecoat armour"},{p:"Agrax Earthshade",role:"Shade armour"},{p:"Zandri Dust",role:"Layer highlight armour"},{p:"Karak Stone",role:"Edge highlight"},{p:"Tallarn Sand",role:"Bright top highlights"},{p:"Leadbelcher",role:"Weapons and joints"},{p:"Nuln Oil",role:"Shade metals"},{p:"Ironbreaker",role:"Highlight metals"},{p:"Averland Sunset",role:"Sensor lenses"},{p:"Casandora Yellow",role:"Shade lenses yellow"}]},
  ],
  "Aeldari":[
    {name:"Craftworld Iyanden",desc:"Ghost Warriors and wraithbone constructs. Yellow and bone armour.",colors:["#FDB825","#FFDA00","#E8DCBA","#888D8F","#0B474A"],paints:[{p:"Averland Sunset",role:"Basecoat yellow armour"},{p:"Seraphim Sepia",role:"Heavy shade yellow"},{p:"Yriel Yellow",role:"Layer highlight"},{p:"Flash Gitz Yellow",role:"Bright edge highlight"},{p:"Wraithbone",role:"Bone-coloured trim and details"},{p:"Agrax Earthshade",role:"Shade bone areas"},{p:"Screaming Skull",role:"Highlight bone"},{p:"Incubi Darkness",role:"Dark green gems and accents"},{p:"Sotek Green",role:"Highlight gems"},{p:"Stormhost Silver",role:"Metallic details"}]},
    {name:"Craftworld Ulthwé",desc:"Black armour with bone accents. Seer council heavy — dark and mystical.",colors:["#231F20","#BBBB7F","#C39E81","#7761AB","#888D8F"],paints:[{p:"Abaddon Black",role:"Basecoat all armour"},{p:"Eshin Grey",role:"Layer drybrush highlight"},{p:"Dawnstone",role:"Edge highlight dark armour"},{p:"Ushabti Bone",role:"Bone trim and runes"},{p:"Agrax Earthshade",role:"Shade bone areas"},{p:"Screaming Skull",role:"Highlight bone markings"},{p:"Genestealer Purple",role:"Psychic power accents"},{p:"Druchii Violet",role:"Shade purple"},{p:"Stormhost Silver",role:"Metallic accents"},{p:"Nuln Oil",role:"Shade metals"}]},
    {name:"Craftworld Biel-Tan",desc:"Warrior-focused. Green and white armour — aggressive and crisp.",colors:["#00401F","#52B244","#FFFFFF","#C39E81","#888D8F"],paints:[{p:"Caliban Green",role:"Basecoat green armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Warpstone Glow",role:"Layer highlight green"},{p:"Moot Green",role:"Edge highlight"},{p:"Ceramite White",role:"White armour sections"},{p:"Agrax Earthshade",role:"Shade white areas gently"},{p:"Ulthuan Grey",role:"Highlight white areas"},{p:"Retributor Armour",role:"Gold Aspect markings"},{p:"Stormhost Silver",role:"Bright metal weapons"},{p:"Nuln Oil",role:"Shade all metals"}]},
    {name:"Craftworld Saim-Hann",desc:"Wild Riders and Windriders. Blazing red with serpent motifs.",colors:["#9A1115","#C2191F","#FFFFFF","#231F20","#888D8F"],paints:[{p:"Mephiston Red",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Evil Sunz Scarlet",role:"Layer highlight red"},{p:"Wild Rider Red",role:"Edge highlights"},{p:"Ceramite White",role:"Serpent pattern markings"},{p:"Agrax Earthshade",role:"Shade white patterns"},{p:"Abaddon Black",role:"Black trim and weapons"},{p:"Eshin Grey",role:"Highlight black areas"},{p:"Retributor Armour",role:"Clan gold markings"},{p:"Stormhost Silver",role:"Metal weapons"}]},
  ],
  "Death Guard":[
    {name:"Mortarion's Chosen",desc:"Putrid pale yellow armour decaying into rot. The classic Death Guard look.",colors:["#848A66","#BBBB7F","#9B8F22","#3B7A5F","#C15A4B"],paints:[{p:"Death Guard Green",role:"Basecoat all armour"},{p:"Agrax Earthshade",role:"Heavy shade"},{p:"Nurgling Green",role:"Layer highlight armour"},{p:"Ogryn Camo",role:"Bright armour highlights"},{p:"Screaming Skull",role:"Bleached/exposed areas"},{p:"Typhus Corrosion",role:"Corrosion effects"},{p:"Nurgle's Rot",role:"Oozing slime details"},{p:"Nihilakh Oxide",role:"Verdigris on metal"},{p:"Leadbelcher",role:"Metal areas"},{p:"Nuln Oil",role:"Shade metals deeply"}]},
    {name:"The Inexorable",desc:"Pale white armour half-consumed by Chaos. Ghostly and terrifying.",colors:["#CDCEBE","#C1C0BF","#9B8F22","#3B7A5F","#888D8F"],paints:[{p:"Grey Seer",role:"Basecoat armour"},{p:"Agrax Earthshade",role:"Shade and stain"},{p:"Pallid Wych Flesh",role:"Layer highlights"},{p:"Ceramite White",role:"Brightest highlights"},{p:"Typhus Corrosion",role:"Corrosion streaks"},{p:"Nurgle's Rot",role:"Slime and rot"},{p:"Death Guard Green (Contrast)",role:"Green tint wash over details"},{p:"Nihilakh Oxide",role:"Verdigris"},{p:"Leadbelcher",role:"Metal parts"},{p:"Nuln Oil",role:"Heavy metal shading"}]},
    {name:"Plague Surgeons",desc:"Brass and bronze armour stained with experiment. Dark and scientific.",colors:["#B77647","#A47552","#848A66","#9B8F22","#463D2B"],paints:[{p:"Screaming Bell",role:"Basecoat all armour (brass)"},{p:"Agrax Earthshade",role:"Heavy shade"},{p:"Hashut Copper",role:"Layer highlight brass"},{p:"Sycorax Bronze",role:"Edge highlight"},{p:"Skullcrusher Brass",role:"Brightest highlights"},{p:"Typhus Corrosion",role:"Corrosion and pitting"},{p:"Nihilakh Oxide",role:"Heavy verdigris effect"},{p:"Nurgle's Rot",role:"Slime"},{p:"Leadbelcher",role:"Blades and tools"},{p:"Nuln Oil",role:"Shade steel tools"}]},
    {name:"Bubotic Warriors",desc:"Vivid yellow-green armour absolutely dripping in plague. Very distinctive.",colors:["#748F39","#9DA94B","#9B8F22","#3B7A5F","#C15A4B"],paints:[{p:"Elysian Green",role:"Basecoat armour"},{p:"Biel-Tan Green",role:"Shade armour"},{p:"Ogryn Camo",role:"Layer highlight"},{p:"Nurgling Green",role:"Edge highlight"},{p:"Nurgle's Rot",role:"Generous slime application"},{p:"Typhus Corrosion",role:"Rust and corrosion"},{p:"Plaguebearer Flesh (Contrast)",role:"Exposed flesh areas"},{p:"Agrax Earthshade",role:"Shade flesh"},{p:"Leadbelcher",role:"Metal areas"},{p:"Nihilakh Oxide",role:"Verdigris everywhere"}]},
  ],
  "Thousand Sons":[
    {name:"Crimson King's Host",desc:"Deep teal and gold — the iconic Thousand Sons. Rich and arcane.",colors:["#18ABCC","#0B6974","#E8BC6D","#471F5F","#C39E81"],paints:[{p:"Thousand Sons Blue",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Ahriman Blue",role:"Layer highlight"},{p:"Lothern Blue",role:"Edge highlight"},{p:"Retributor Armour",role:"Gold trim and details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Auric Armour Gold",role:"Highlight gold"},{p:"Xereus Purple",role:"Purple cloth and accents"},{p:"Druchii Violet",role:"Shade purple"},{p:"Genestealer Purple",role:"Highlight purple"}]},
    {name:"Corvidae Cult",desc:"Ochre and gold — the warrior cults of Prospero. Warm and ancient.",colors:["#BF6E1D","#DDA026","#E8BC6D","#18ABCC","#231F20"],paints:[{p:"Tau Light Ochre",role:"Basecoat armour"},{p:"Seraphim Sepia",role:"Shade armour"},{p:"Zamesi Desert",role:"Layer highlight"},{p:"Karak Stone",role:"Edge highlight"},{p:"Retributor Armour",role:"Gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Thousand Sons Blue",role:"Teal blue accents"},{p:"Abaddon Black",role:"Lenses and deep recesses"},{p:"Screaming Skull",role:"Scrollwork and runes"},{p:"Agrax Earthshade",role:"Shade parchment"}]},
    {name:"Pyrae Cult (Fire)",desc:"Warm orange-red armour with crackling flame effects. Blazing psychic power.",colors:["#C16F45","#F58652","#E8BC6D","#18ABCC","#9A1115"],paints:[{p:"Screaming Bell",role:"Basecoat armour"},{p:"Agrax Earthshade",role:"Shade armour"},{p:"Hashut Copper",role:"Layer highlight"},{p:"Skullcrusher Brass",role:"Bright highlights"},{p:"Fire Dragon Bright",role:"Flame effect basecoat"},{p:"Troll Slayer Orange",role:"Layer flame"},{p:"Flash Gitz Yellow",role:"Flame tips"},{p:"Thousand Sons Blue",role:"Teal accents and gems"},{p:"Retributor Armour",role:"Gold trim"},{p:"Reikland Fleshshade",role:"Shade gold"}]},
    {name:"Rubricae",desc:"Automaton warriors. Dark blue with bone-white details — hollow inside.",colors:["#002151","#0D407F","#BBBB7F","#E8BC6D","#18ABCC"],paints:[{p:"Kantor Blue",role:"Basecoat armour dark blue"},{p:"Drakenhof Nightshade",role:"Shade deep"},{p:"Macragge Blue",role:"Layer highlight"},{p:"Alaitoc Blue",role:"Edge highlight"},{p:"Ushabti Bone",role:"Skull and bone trim"},{p:"Agrax Earthshade",role:"Shade bone"},{p:"Screaming Skull",role:"Highlight bone"},{p:"Retributor Armour",role:"Gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Thousand Sons Blue",role:"Eye glow effects"}]},
  ],
  "Astra Militarum":[
    {name:"Cadian Shock Troops",desc:"The iconic Guard scheme. Khaki fatigues and grey armour — no-nonsense soldiers.",colors:["#5E5134","#A67610","#90A8A8","#888D8F","#C77958"],paints:[{p:"Steel Legion Drab",role:"Basecoat fatigues"},{p:"Agrax Earthshade",role:"Shade clothing"},{p:"Tallarn Sand",role:"Layer highlight fatigues"},{p:"Zandri Dust",role:"Edge highlight"},{p:"Celestra Grey",role:"Armour plates"},{p:"Nuln Oil",role:"Shade armour"},{p:"Administratum Grey",role:"Highlight armour"},{p:"Cadian Fleshtone",role:"Skin basecoat"},{p:"Reikland Fleshshade",role:"Shade skin"},{p:"Kislev Flesh",role:"Highlight skin"}]},
    {name:"Catachan Jungle Fighters",desc:"Muscular jungle fighters. Olive green fatigues with dark skin tones.",colors:["#314821","#50702D","#9E915C","#AD6B4C","#888D8F"],paints:[{p:"Castellan Green",role:"Basecoat fatigues"},{p:"Agrax Earthshade",role:"Shade clothing"},{p:"Elysian Green",role:"Layer highlight"},{p:"Straken Green",role:"Edge highlight"},{p:"Ratskin Flesh",role:"Skin basecoat"},{p:"Reikland Fleshshade",role:"Shade skin"},{p:"Cadian Fleshtone",role:"Highlight skin"},{p:"Kislev Flesh",role:"Bright skin highlight"},{p:"Mechanicus Standard Grey",role:"Straps and webbing"},{p:"Leadbelcher",role:"Weapons"}]},
    {name:"Valhallan Ice Warriors",desc:"White winter camo fatigues. Cold tones and icy weathering.",colors:["#FFFFFF","#C1C0BF","#888D8F","#90A8A8","#AD6B4C"],paints:[{p:"Grey Seer",role:"Basecoat fatigues"},{p:"Agrax Earthshade",role:"Shade all recesses"},{p:"Ulthuan Grey",role:"Layer highlight fatigues"},{p:"Ceramite White",role:"Bright highlights"},{p:"Celestra Grey",role:"Armour and equipment"},{p:"Nuln Oil",role:"Shade armour"},{p:"Administratum Grey",role:"Highlight armour"},{p:"Ratskin Flesh",role:"Skin"},{p:"Reikland Fleshshade",role:"Shade skin"},{p:"Leadbelcher",role:"Weapons"}]},
    {name:"Death Korps of Krieg",desc:"WW1 aesthetic. Grey greatcoats, gasmasks, and bleak trench warfare colours.",colors:["#3D4B4D","#70756E","#949B95","#888D8F","#5E5134"],paints:[{p:"Mechanicus Standard Grey",role:"Basecoat greatcoats"},{p:"Nuln Oil",role:"Heavy shade all over"},{p:"Dawnstone",role:"Layer highlight coat"},{p:"Administratum Grey",role:"Edge highlight"},{p:"Eshin Grey",role:"Gasmask and dark equipment"},{p:"Celestra Grey",role:"Highlight gasmask"},{p:"Leadbelcher",role:"Weapons and metal"},{p:"Nuln Oil",role:"Shade metals"},{p:"Steel Legion Drab",role:"Leather straps"},{p:"Agrax Earthshade",role:"Shade leather"}]},
  ],
  "Adepta Sororitas":[
    {name:"Order of Our Martyred Lady",desc:"Black armour with red cloth. The most popular and iconic Sororitas scheme.",colors:["#231F20","#9A1115","#C39E81","#888D8F","#FFFFFF"],paints:[{p:"Abaddon Black",role:"Basecoat all armour"},{p:"Eshin Grey",role:"Layer drybrush"},{p:"Dawnstone",role:"Edge highlight black"},{p:"Mephiston Red",role:"Red robes"},{p:"Nuln Oil",role:"Shade robes"},{p:"Evil Sunz Scarlet",role:"Highlight robes"},{p:"Retributor Armour",role:"Gold trim"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Stormhost Silver",role:"Bright metal highlights"},{p:"Ceramite White",role:"White cloth and purity seals"}]},
    {name:"Order of the Bloody Rose",desc:"Deep crimson armour with rose motifs. Romantic and deadly.",colors:["#6A0001","#9A1115","#C39E81","#231F20","#FFFFFF"],paints:[{p:"Khorne Red",role:"Basecoat armour"},{p:"Nuln Oil",role:"Heavy shade"},{p:"Mephiston Red",role:"Layer highlight"},{p:"Evil Sunz Scarlet",role:"Edge highlight"},{p:"Wild Rider Red",role:"Brightest highlight"},{p:"Retributor Armour",role:"Gold rose motifs"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Auric Armour Gold",role:"Highlight gold"},{p:"Abaddon Black",role:"Dark trim"},{p:"Ceramite White",role:"Purity seals"}]},
    {name:"Order of the Valorous Heart",desc:"White armour with black cloth. Pure and severe.",colors:["#FFFFFF","#C1C0BF","#231F20","#C39E81","#9A1115"],paints:[{p:"Grey Seer",role:"Basecoat armour"},{p:"Apothecary White (Contrast)",role:"Apply for instant shading"},{p:"Ulthuan Grey",role:"Layer highlight"},{p:"Ceramite White",role:"Brightest highlights"},{p:"Abaddon Black",role:"Black cloth"},{p:"Eshin Grey",role:"Highlight black cloth"},{p:"Retributor Armour",role:"Gold trim"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Mephiston Red",role:"Red cloth details"},{p:"Nuln Oil",role:"Shade metals"}]},
    {name:"Order of the Azure Shroud",desc:"Deep blue armour with silver and white. Calm and devoted.",colors:["#002151","#0D407F","#C3CACE","#FFFFFF","#C39E81"],paints:[{p:"Kantor Blue",role:"Basecoat armour"},{p:"Drakenhof Nightshade",role:"Shade armour"},{p:"Macragge Blue",role:"Layer highlight"},{p:"Calgar Blue",role:"Edge highlight"},{p:"Retributor Armour",role:"Gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Runefang Steel",role:"Silver trim"},{p:"Nuln Oil",role:"Shade silver"},{p:"Ceramite White",role:"White robes and details"},{p:"Agrax Earthshade",role:"Shade white areas"}]},
  ],
  "Grey Knights":[
    {name:"Standard Grey Knights",desc:"The classic scheme. Gleaming silver with red/gold details — holy warriors.",colors:["#A1A6A9","#C3CACE","#C39E81","#9A1115","#FFFFFF"],paints:[{p:"Leadbelcher",role:"Basecoat all armour"},{p:"Nuln Oil",role:"Shade all over"},{p:"Ironbreaker",role:"Layer highlight armour"},{p:"Runefang Steel",role:"Edge highlight"},{p:"Stormhost Silver",role:"Brightest highlights"},{p:"Retributor Armour",role:"Gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Khorne Red",role:"Red accents"},{p:"Ceramite White",role:"White seals and parchment"},{p:"Agrax Earthshade",role:"Shade parchment"}]},
    {name:"Purifiers",desc:"Purer than standard — slightly whiter, more radiant silver. Holy fire accents.",colors:["#BBC6C9","#C3CACE","#FFF200","#C39E81","#FFFFFF"],paints:[{p:"Runefang Steel",role:"Basecoat armour (lighter start)"},{p:"Nuln Oil",role:"Shade recesses"},{p:"Stormhost Silver",role:"Layer highlight"},{p:"Ceramite White",role:"Extreme edge highlights"},{p:"Flash Gitz Yellow",role:"Holy fire effects basecoat"},{p:"Casandora Yellow",role:"Shade fire orange"},{p:"Troll Slayer Orange",role:"Mid fire colour"},{p:"Retributor Armour",role:"Gold trim"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Agrax Earthshade",role:"Deepen shadows"}]},
    {name:"Paladins",desc:"The elite of the elite. Heavy ornate silver with deep shadow contrast.",colors:["#888D8F","#A1A6A9","#E8BC6D","#231F20","#FFFFFF"],paints:[{p:"Leadbelcher",role:"Basecoat armour"},{p:"Nuln Oil",role:"Heavy shade all over"},{p:"Ironbreaker",role:"Layer broad highlights"},{p:"Runefang Steel",role:"Focused highlights"},{p:"Stormhost Silver",role:"Sharp edge highlights"},{p:"Auric Armour Gold",role:"Ornate gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Skullcrusher Brass",role:"Highlight gold ornaments"},{p:"Ceramite White",role:"White purity seals"},{p:"Agrax Earthshade",role:"Age the purity seals"}]},
    {name:"Dreadknights",desc:"Massive combat walkers. Heavy silver with glowing arcane weapons.",colors:["#A1A6A9","#C3CACE","#004EFA","#18ABCC","#C39E81"],paints:[{p:"Leadbelcher",role:"Basecoat entire walker"},{p:"Nuln Oil",role:"Heavy shade all panels"},{p:"Ironbreaker",role:"Panel highlights"},{p:"Runefang Steel",role:"Edge highlights"},{p:"Stormhost Silver",role:"Extreme highlights"},{p:"Soulstone Blue",role:"Arcane weapon energy glow"},{p:"Aethermatic Blue (Contrast)",role:"Glow OSL effect"},{p:"Retributor Armour",role:"Gold ornate details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Ceramite White",role:"Symbols and seals"}]},
  ],
  "Drukhari":[
    {name:"Kabal of the Black Heart",desc:"Asdrubael Vect's own Kabal. Black armour with purple and midnight blue.",colors:["#231F20","#3D3354","#7761AB","#888D8F","#C39E81"],paints:[{p:"Abaddon Black",role:"Basecoat all armour"},{p:"Drakenhof Nightshade",role:"Shade with blue-black tint"},{p:"Eshin Grey",role:"Layer drybrush highlight"},{p:"Dawnstone",role:"Edge highlight"},{p:"Naggaroth Night",role:"Purple accent areas"},{p:"Druchii Violet",role:"Shade purple"},{p:"Genestealer Purple",role:"Highlight purple"},{p:"Stormhost Silver",role:"Metallic weapons"},{p:"Nuln Oil",role:"Shade metals"},{p:"Retributor Armour",role:"Gold details"}]},
    {name:"Kabal of the Poisoned Tongue",desc:"Green and gold armour. Sinister and venomous-looking.",colors:["#038C67","#30A56C","#E8BC6D","#231F20","#888D8F"],paints:[{p:"Kabalite Green",role:"Basecoat armour"},{p:"Nuln Oil",role:"Shade armour"},{p:"Sybarite Green",role:"Layer highlight"},{p:"Moot Green",role:"Edge highlight"},{p:"Retributor Armour",role:"Gold details"},{p:"Reikland Fleshshade",role:"Shade gold"},{p:"Auric Armour Gold",role:"Highlight gold"},{p:"Abaddon Black",role:"Dark trim and details"},{p:"Stormhost Silver",role:"Weapon blades"},{p:"Nuln Oil",role:"Shade blades"}]},
    {name:"Wyches",desc:"Gladiatorial fighters. Flesh and leather with vibrant accent colours.",colors:["#AD6B4C","#C77958","#7761AB","#9A1115","#888D8F"],paints:[{p:"Ratskin Flesh",role:"Basecoat exposed skin"},{p:"Reikland Fleshshade",role:"Shade skin"},{p:"Cadian Fleshtone",role:"Layer skin"},{p:"Kislev Flesh",role:"Highlight skin"},{p:"Rhinox Hide",role:"Leather armour base"},{p:"Agrax Earthshade",role:"Shade leather"},{p:"Mournfang Brown",role:"Highlight leather"},{p:"Screamer Pink",role:"Vibrant cloth accents"},{p:"Carroburg Crimson",role:"Shade cloth"},{p:"Emperors Children",role:"Highlight cloth"}]},
    {name:"Haemonculus Covens",desc:"Flesh-crafters. Pale skin and corroded metal — body horror aesthetic.",colors:["#CDCEBE","#F0D9B8","#888D8F","#463D2B","#3B7A5F"],paints:[{p:"Pallid Wych Flesh",role:"Basecoat pale skin"},{p:"Reikland Fleshshade",role:"Shade skin lightly"},{p:"Flayed One Flesh",role:"Layer skin highlight"},{p:"Ceramite White",role:"Extreme highlight"},{p:"Leadbelcher",role:"Metallic implements"},{p:"Typhus Corrosion",role:"Rust and decay on metal"},{p:"Nihilakh Oxide",role:"Verdigris on old metal"},{p:"Nuln Oil",role:"Shade deep into flesh tools"},{p:"Liquid Green Stuff",role:"Stitching effects over basecoat"},{p:"Agrax Earthshade",role:"Deepen all recesses"}]},
  ],
};

// ─── BEGINNER TIPS ──────────────────────────────────────────────
const BEGINNER_TIPS = [
  {cat:"Getting Started",icon:"🎯",tips:[
    {title:"Thin Your Paints",body:"This is the single most important rule. Add a drop or two of water to your paint until it has the consistency of skimmed milk. Thick paint obscures detail and looks chunky. Multiple thin coats always beat one thick one."},
    {title:"Prime Everything First",body:"Never paint straight onto bare plastic or resin. Apply a spray primer (grey, black, or white depending on your colour scheme) first. This helps paint stick and dramatically improves the end result."},
    {title:"Start With the Darkest Colour",body:"Paint dark areas first, then layer lighter colours on top. It's easier to go dark-to-light than to paint over bright colours with dark ones. Work from recesses outward."},
    {title:"Don't Overload Your Brush",body:"Dip just the tip of your brush into the paint. A brush loaded halfway up the bristles will blob and ruin details. Wipe excess on the side of the pot, then test on a piece of paper first."},
    {title:"Use the Right Brush for the Job",body:"Don't use a detail brush for basecoating — it'll wear out in minutes. Use large brushes for large areas, save your fine brushes for eyes and gems. Your brushes will last much longer."},
  ]},
  {cat:"Painting Techniques",icon:"🖌️",tips:[
    {title:"Drybrushing for Instant Highlights",body:"Load a stiff brush with paint, then wipe almost all of it off on a tissue until barely any transfers. Then lightly flick the brush across raised surfaces. The tiny amount remaining catches raised details beautifully — perfect for texture, fur, and armour edges."},
    {title:"Washes Are Magic",body:"Apply a dark wash (like Agrax Earthshade or Nuln Oil) over your base coat and let it flow into recesses. When dry, it creates instant shading and depth. It's probably the most effective technique for the time invested."},
    {title:"Edge Highlighting Defines Models",body:"Once shaded, paint a thin line of a lighter colour along the sharpest raised edges. This creates a crisp, defined look. Keep the line thin and consistent — it takes practice but transforms models."},
    {title:"Two-Thin-Coat Rule for Every Colour",body:"When painting over a darker colour with a lighter one, you'll nearly always need two coats. Don't panic if the first coat looks streaky — let it dry fully and apply a second thin coat. It'll cover perfectly."},
    {title:"Layering vs Blending",body:"Layering (applying progressively lighter colours in smaller areas) is the beginner-friendly route. You don't need to blend — just ensure each layer covers slightly less area than the last, creating a smooth graduation."},
  ]},
  {cat:"Washes & Shading",icon:"💧",tips:[
    {title:"Let Washes Dry Fully",body:"Washes look blotchy and uneven when wet. Leave them 15-20 minutes or more to dry completely before judging the result or adding more layers. Most beginners add more wash too soon — be patient."},
    {title:"Targeted vs All-Over Washes",body:"An all-over wash gives quick results but can muddy flat areas. For better results, apply the wash carefully only into recesses using a fine brush. This is called 'targeted shading' and produces cleaner results."},
    {title:"Glossy Surfaces Carry Washes Better",body:"Washes flow more smoothly on slightly glossy surfaces. If your base coat is very matte and washes are beading oddly, a light coat of 'Ardcoat varnish before washing can fix this — then matte varnish at the end."},
  ]},
  {cat:"Basing & Finishing",icon:"🏔️",tips:[
    {title:"Basing Transforms a Model",body:"A well-painted base elevates even an average paintjob. Apply texture paint, add some static grass or rocks, and paint it with the same care as the model itself. An unbased model always looks unfinished."},
    {title:"Always Varnish at the End",body:"Unvarnished models will chip and scratch with handling. Apply a matte varnish spray when fully dry to protect your work. It's heartbreaking to see paint chip off a carefully painted model."},
    {title:"Seal Before Washes on Light Models",body:"If painting white or light armour, seal with matte varnish before applying washes. This prevents dark washes from permanently staining light areas in unintended ways."},
    {title:"The 3-Foot Rule",body:"Most miniatures are viewed from 2-3 feet away on a tabletop, not up close. Don't stress over tiny imperfections — at table distance they disappear. Step back and view your model from playing distance to assess the real result."},
  ]},
  {cat:"Tools & Organisation",icon:"🔧",tips:[
    {title:"Keep a Wet Palette",body:"A wet palette (a sponge under wet palette paper) stops your paints drying out while you work. It keeps paints workable for hours and saves a lot of paint. You can buy one or make one with a plastic tray, kitchen sponge, and baking paper."},
    {title:"Rinse Your Brush Often",body:"Swish your brush in water every minute or two while painting. Paint drying on the bristles ruins brushes quickly. Never leave a loaded brush sitting — the bristles will splay permanently."},
    {title:"Batch Paint for Efficiency",body:"When painting a unit of 10 models, do one stage on all 10 before moving to the next. Basecoat all 10, then shade all 10, then highlight all 10. Much faster than painting each model individually."},
    {title:"Good Lighting Matters",body:"Paint under a bright daylight bulb (5000K+). Yellow incandescent lighting makes colours look different on the table. A cheap daylight LED desk lamp is one of the best investments for any painter."},
    {title:"Use a Painting Handle",body:"Holding models while painting gets oils from your fingers onto the surface, which can cause paint to repel. Use a dedicated handle or bluetack the model to an old paint pot or cork. Your hands will thank you too."},
  ]},
  {cat:"Common Mistakes to Avoid",icon:"⚠️",tips:[
    {title:"Skipping the Primer",body:"Painting without primer is the most common beginner mistake. Paint will scrape off easily, won't cover evenly, and the model will look poor. Always prime — no exceptions, even for speed-painting or Contrast paints."},
    {title:"Painting Too Fast",body:"Rushing causes blobs, mistakes, and frustration. Allow each step to dry fully before moving on. Miniature painting rewards patience — a model painted slowly over several sessions will always look better than one rushed in an hour."},
    {title:"Buying Too Many Paints at Once",body:"You don't need every Citadel paint to start. Begin with a starter set or 10-12 focused colours for your army. Learn to mix and layer what you have before expanding. Too many paints creates analysis paralysis."},
    {title:"Giving Up on a Model",body:"Every painter has models they're unhappy with. Strip the paint with Simple Green (safe on plastic) and start again — it's completely normal and experienced painters do it all the time. Don't throw models away."},
  ]},
];

// ─── CONSTANTS ───────────────────────────────────────────────────
const RANGE_COLOURS = {Base:"#c8912a",Layer:"#7ec8a4",Shade:"#8a7ec8",Contrast:"#c87e7e",Dry:"#c8c07e",Edge:"#7eb8c8",Technical:"#b0b0b0",Glaze:"#c87eb8"};
const PAINT_RANGES = ["All","Base","Layer","Shade","Contrast","Dry","Edge","Technical","Glaze"];
const BRUSH_TYPES = ["All","Base","Layer","Detail","Shade","Dry","Scenery","Glaze","Texture"];
const DEFAULT_STAGES = ["Primed","Base Coated","Shaded","Highlighted","Based","Done"];

function loadS(key,fb){try{const s=sessionStorage.getItem(key);if(s)return JSON.parse(s);}catch(e){}return fb;}
function saveS(key,val){try{sessionStorage.setItem(key,JSON.stringify(val));}catch(e){}}

// ─── STYLES ──────────────────────────────────────────────────────
const STYLE=`
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#0a0806;color:#e8d5b0;font-family:'Crimson Pro',Georgia,serif;min-height:100vh;}
.app{min-height:100vh;background:radial-gradient(ellipse at 20% 0%,rgba(139,69,19,.15) 0%,transparent 50%),radial-gradient(ellipse at 80% 100%,rgba(101,37,122,.12) 0%,transparent 50%),#0a0806;}
.hdr{text-align:center;padding:28px 16px 12px;border-bottom:1px solid rgba(139,90,43,.3);position:relative;}
.hdr::after{content:'';position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:180px;height:2px;background:linear-gradient(90deg,transparent,#c8912a,transparent);}
.hdr-t{font-family:'Cinzel Decorative',serif;font-size:clamp(13px,3.2vw,26px);font-weight:900;background:linear-gradient(135deg,#c8912a,#f0c85a 40%,#c8912a 70%,#9a6b1e);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:3px;}
.hdr-s{font-size:10px;color:rgba(232,213,176,.45);font-style:italic;letter-spacing:.15em;text-transform:uppercase;}
.tabs{display:flex;justify-content:center;flex-wrap:wrap;padding:12px 8px 0;border-bottom:1px solid rgba(139,90,43,.2);gap:2px;}
.tab{background:none;border:none;color:rgba(232,213,176,.4);font-family:'Cinzel Decorative',serif;font-size:8.5px;letter-spacing:.08em;padding:8px 11px;cursor:pointer;position:relative;transition:color .3s;text-transform:uppercase;white-space:nowrap;}
.tab:hover{color:rgba(232,213,176,.7);}
.tab.on{color:#c8912a;}
.tab.on::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#c8912a,transparent);}
.cnt{max-width:960px;margin:0 auto;padding:20px 15px 60px;}
.sl{font-family:'Cinzel Decorative',serif;font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,145,42,.7);margin-bottom:8px;}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px;}
.tin{background:rgba(255,255,255,.04);border:1px solid rgba(200,145,42,.2);color:#e8d5b0;font-family:'Crimson Pro',serif;font-size:14px;padding:8px 11px;border-radius:4px;}
.tin:focus{outline:none;border-color:rgba(200,145,42,.6);}
.sel{background:rgba(10,8,6,.9);border:1px solid rgba(200,145,42,.25);color:#e8d5b0;font-family:'Crimson Pro',serif;font-size:14px;padding:8px 11px;border-radius:4px;cursor:pointer;}
.sel:focus{outline:none;border-color:rgba(200,145,42,.55);}
.swp{position:relative;width:44px;height:44px;border-radius:4px;border:1px solid rgba(200,145,42,.4);overflow:hidden;cursor:pointer;flex-shrink:0;}
.swp input[type="color"]{position:absolute;inset:-10px;width:calc(100% + 20px);height:calc(100% + 20px);opacity:0;cursor:pointer;border:none;}
.swpr{position:absolute;inset:0;pointer-events:none;}
.btn{background:linear-gradient(135deg,#8b4513,#c8912a,#8b4513);background-size:200% 200%;animation:shm 3s ease infinite;border:none;color:#0a0806;font-family:'Cinzel Decorative',serif;font-size:8.5px;font-weight:700;letter-spacing:.15em;padding:10px 17px;border-radius:3px;cursor:pointer;text-transform:uppercase;transition:opacity .2s,transform .15s;flex-shrink:0;}
.btn:hover{opacity:.85;transform:translateY(-1px);}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.gbtn{background:rgba(255,255,255,.05);border:1px solid rgba(200,145,42,.3);color:#e8d5b0;font-family:'Cinzel Decorative',serif;font-size:8.5px;letter-spacing:.13em;padding:10px 15px;border-radius:3px;cursor:pointer;text-transform:uppercase;transition:background .2s;}
.gbtn:hover{background:rgba(255,255,255,.09);}
.dbtn{background:rgba(180,40,40,.12);border:1px solid rgba(200,60,60,.3);color:#e88888;font-family:'Cinzel Decorative',serif;font-size:8px;letter-spacing:.1em;padding:6px 11px;border-radius:3px;cursor:pointer;text-transform:uppercase;}
.dbtn:hover{background:rgba(180,40,40,.22);}
@keyframes shm{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.pills{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:9px;}
.pill{background:none;border:1px solid rgba(200,145,42,.18);color:rgba(232,213,176,.5);font-family:'Crimson Pro',serif;font-size:11px;padding:3px 9px;border-radius:20px;cursor:pointer;transition:all .2s;}
.pill:hover{border-color:rgba(200,145,42,.45);color:rgba(232,213,176,.8);}
.pill.on{background:rgba(200,145,42,.15);border-color:rgba(200,145,42,.6);color:#c8912a;}
.scrl{max-height:260px;overflow-y:auto;border:1px solid rgba(200,145,42,.12);border-radius:6px;background:rgba(0,0,0,.18);}
.scrl::-webkit-scrollbar{width:5px;}
.scrl::-webkit-scrollbar-thumb{background:rgba(200,145,42,.25);border-radius:3px;}
.prow{display:flex;align-items:center;gap:10px;padding:6px 12px;cursor:pointer;transition:background .15s;border-bottom:1px solid rgba(200,145,42,.06);}
.prow:last-child{border-bottom:none;}
.prow:hover{background:rgba(200,145,42,.07);}
.prow.sel{background:rgba(200,145,42,.13);}
.pdot{width:20px;height:20px;border-radius:50%;border:1px solid rgba(255,255,255,.12);flex-shrink:0;}
.pnm{flex:1;font-size:13px;color:rgba(232,213,176,.85);}
.prng{font-size:9px;letter-spacing:.06em;padding:2px 7px;border-radius:10px;border:1px solid;opacity:.75;white-space:nowrap;}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(125px,1fr));gap:8px;margin-bottom:18px;}
.card{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.12);border-radius:6px;overflow:hidden;transition:border-color .2s,transform .2s;cursor:pointer;}
.card:hover{border-color:rgba(200,145,42,.35);transform:translateY(-2px);}
.csw{height:46px;width:100%;}
.cbdy{padding:7px 9px;}
.cnm{font-family:'Cinzel Decorative',serif;font-size:7px;letter-spacing:.07em;color:#c8912a;margin-bottom:2px;}
.crole{font-size:10px;color:rgba(232,213,176,.55);font-style:italic;line-height:1.3;}
.chex{font-size:9px;color:rgba(232,213,176,.3);letter-spacing:.07em;margin-top:2px;font-family:monospace;}
.tbox{background:rgba(139,69,19,.08);border:1px solid rgba(200,145,42,.15);border-left:3px solid rgba(200,145,42,.5);border-radius:4px;padding:12px 15px;margin-bottom:18px;}
.ttl{font-family:'Cinzel Decorative',serif;font-size:8px;letter-spacing:.2em;color:rgba(200,145,42,.8);margin-bottom:6px;text-transform:uppercase;}
.tbd{font-size:13px;color:rgba(232,213,176,.75);line-height:1.7;}
.stl{font-family:'Cinzel Decorative',serif;font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,145,42,.6);margin-bottom:9px;display:flex;align-items:center;gap:8px;}
.stl::after{content:'';flex:1;height:1px;background:rgba(200,145,42,.15);}
.div{height:1px;background:linear-gradient(90deg,transparent,rgba(200,145,42,.2),transparent);margin:18px 0;}
.ld{text-align:center;padding:34px;}
.lrn{font-family:'Cinzel Decorative',serif;font-size:26px;color:#c8912a;animation:spn 2s linear infinite;display:block;margin-bottom:8px;}
@keyframes spn{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.ltx{font-style:italic;color:rgba(232,213,176,.5);font-size:12px;}
.err{background:rgba(180,40,40,.1);border:1px solid rgba(200,60,60,.3);border-radius:4px;padding:11px 14px;color:#e88888;font-size:13px;margin-bottom:14px;}
.fd{animation:fin .35s ease;}
@keyframes fin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.pcount{font-size:10px;color:rgba(232,213,176,.35);font-style:italic;margin-bottom:8px;}
.bowned{font-size:9px;padding:1px 7px;background:rgba(30,115,49,.2);border:1px solid rgba(30,115,49,.4);border-radius:10px;color:#4ec86a;margin-left:4px;}
.stat-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px;}
.stat{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.15);border-radius:6px;padding:11px 16px;text-align:center;flex:1;min-width:80px;}
.stn{font-family:'Cinzel Decorative',serif;font-size:20px;color:#c8912a;}
.stl2{font-size:10px;color:rgba(232,213,176,.4);letter-spacing:.1em;text-transform:uppercase;margin-top:2px;}
.chk-row{display:flex;align-items:center;gap:10px;padding:6px 12px;border-bottom:1px solid rgba(200,145,42,.06);cursor:pointer;transition:background .15s;}
.chk-row:hover{background:rgba(200,145,42,.05);}
.chk-row.own{background:rgba(30,115,49,.05);}
.chk{width:16px;height:16px;cursor:pointer;accent-color:#c8912a;flex-shrink:0;}
.bcard{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.12);border-radius:8px;padding:13px 15px;margin-bottom:9px;display:flex;gap:13px;align-items:flex-start;transition:border-color .2s;}
.bcard:hover{border-color:rgba(200,145,42,.28);}
.bico{font-size:22px;flex-shrink:0;margin-top:2px;}
.bnm{font-family:'Cinzel Decorative',serif;font-size:10px;color:#c8912a;margin-bottom:2px;}
.btbdg{font-size:9px;padding:2px 8px;border-radius:10px;border:1px solid rgba(200,145,42,.3);color:rgba(200,145,42,.7);display:inline-block;margin-bottom:5px;}
.bdsc{font-size:13px;color:rgba(232,213,176,.7);line-height:1.6;}
.bown{display:flex;align-items:center;gap:6px;margin-top:7px;font-size:11px;color:rgba(232,213,176,.5);cursor:pointer;}
.army-wrap{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.15);border-radius:8px;margin-bottom:14px;overflow:hidden;}
.army-hdr{display:flex;align-items:center;gap:11px;padding:11px 15px;cursor:pointer;background:rgba(200,145,42,.05);transition:background .2s;}
.army-hdr:hover{background:rgba(200,145,42,.09);}
.army-nm{font-family:'Cinzel Decorative',serif;font-size:10px;color:#c8912a;flex:1;}
.army-bdy{padding:13px 15px;border-top:1px solid rgba(200,145,42,.1);}
.unit-row{background:rgba(0,0,0,.15);border:1px solid rgba(200,145,42,.1);border-radius:6px;padding:9px 13px;margin-bottom:7px;}
.u-top{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin-bottom:7px;}
.u-nm{font-size:14px;color:rgba(232,213,176,.9);flex:1;min-width:80px;}
.sbtn{font-size:10px;padding:3px 9px;border-radius:12px;border:1px solid rgba(200,145,42,.2);background:none;color:rgba(232,213,176,.45);cursor:pointer;transition:all .2s;font-family:'Crimson Pro',serif;}
.sbtn:hover{border-color:rgba(200,145,42,.45);color:rgba(232,213,176,.8);}
.sbtn.dn{background:rgba(30,115,49,.2);border-color:rgba(30,115,49,.6);color:#4ec86a;}
.pb-wrap{height:5px;background:rgba(255,255,255,.06);border-radius:3px;margin-top:7px;overflow:hidden;}
.pb-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,#4a8b20,#7ec84a);transition:width .4s ease;}
.s-ed{margin-top:7px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;}
.min{background:rgba(255,255,255,.05);border:1px solid rgba(200,145,42,.2);color:#e8d5b0;font-size:11px;padding:3px 8px;border-radius:3px;width:120px;}
.min:focus{outline:none;border-color:rgba(200,145,42,.5);}
.tag{display:inline-flex;align-items:center;gap:3px;font-size:10px;padding:2px 7px;border-radius:12px;background:rgba(200,145,42,.1);border:1px solid rgba(200,145,42,.25);color:rgba(200,145,42,.8);}
.tx{cursor:pointer;opacity:.6;font-size:12px;line-height:1;}
.tx:hover{opacity:1;}
.shop-list{background:rgba(0,0,0,.2);border:1px solid rgba(200,145,42,.15);border-radius:6px;padding:15px;}
.shop-i{display:flex;align-items:center;gap:9px;padding:5px 0;border-bottom:1px solid rgba(200,145,42,.07);}
.shop-i:last-child{border-bottom:none;}
/* TIPS */
.tip-cat{margin-bottom:22px;}
.tip-cat-hdr{display:flex;align-items:center;gap:10px;cursor:pointer;padding:10px 14px;background:rgba(200,145,42,.06);border:1px solid rgba(200,145,42,.15);border-radius:6px;margin-bottom:8px;transition:background .2s;}
.tip-cat-hdr:hover{background:rgba(200,145,42,.1);}
.tip-cat-ico{font-size:20px;}
.tip-cat-nm{font-family:'Cinzel Decorative',serif;font-size:10px;color:#c8912a;flex:1;letter-spacing:.08em;}
.tip-card{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.1);border-radius:6px;padding:13px 15px;margin-bottom:8px;transition:border-color .2s;}
.tip-card:hover{border-color:rgba(200,145,42,.28);}
.tip-title{font-family:'Cinzel Decorative',serif;font-size:10px;color:#c8912a;margin-bottom:5px;letter-spacing:.06em;}
.tip-body{font-size:13px;color:rgba(232,213,176,.72);line-height:1.7;}
/* SCHEMES */
.army-pick-row{display:flex;gap:10px;align-items:center;margin-bottom:20px;flex-wrap:wrap;}
.scheme-card{background:rgba(255,255,255,.03);border:1px solid rgba(200,145,42,.15);border-radius:8px;margin-bottom:14px;overflow:hidden;}
.scheme-hdr{display:flex;gap:14px;align-items:center;padding:14px 16px;cursor:pointer;transition:background .2s;}
.scheme-hdr:hover{background:rgba(200,145,42,.05);}
.scheme-palette{display:flex;gap:4px;flex-shrink:0;}
.scheme-dot{width:22px;height:22px;border-radius:50%;border:1px solid rgba(255,255,255,.15);}
.scheme-nm{font-family:'Cinzel Decorative',serif;font-size:11px;color:#c8912a;margin-bottom:3px;}
.scheme-desc{font-size:12px;color:rgba(232,213,176,.55);font-style:italic;line-height:1.4;}
.scheme-bdy{padding:14px 16px;border-top:1px solid rgba(200,145,42,.1);}
.scheme-step{display:flex;align-items:center;gap:11px;padding:7px 0;border-bottom:1px solid rgba(200,145,42,.07);}
.scheme-step:last-child{border-bottom:none;}
.scheme-step-dot{width:28px;height:28px;border-radius:4px;border:1px solid rgba(255,255,255,.12);flex-shrink:0;}
.scheme-step-info{flex:1;}
.scheme-step-nm{font-size:13px;color:rgba(232,213,176,.9);font-weight:600;}
.scheme-step-role{font-size:11px;color:rgba(232,213,176,.5);font-style:italic;}
`;

// ─── COLOUR THEORY TAB ───────────────────────────────────────────
function isHex(h){return /^#[0-9A-Fa-f]{6}$/.test(h);}
// Calls the Netlify proxy (/netlify/functions/claude.js)
// which uses the FREE Google Gemini API.
// Set GEMINI_API_KEY in Netlify → Site configuration → Environment variables.
// Get a free key at: https://aistudio.google.com/app/apikey
async function callClaude(msgs, sys) {
  // msgs is an array; grab the last user message content as the prompt
  const userMessage = msgs.map(m => (typeof m.content === "string" ? m.content : m.content.map(c => c.text || "").join(""))).join("\n");
  const r = await fetch("/.netlify/functions/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt: sys, userMessage }),
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error);
  return d.text || "";
}

function ColourTab({owned}){
  const [hex,setHex]=useState("#9A1115");
  const [hexIn,setHexIn]=useState("#9A1115");
  const [nm,setNm]=useState("Mephiston Red");
  const [res,setRes]=useState(null);
  const [load,setLoad]=useState(false);
  const [err,setErr]=useState(null);
  const [srch,setSrch]=useState("");
  const [rng,setRng]=useState("All");
  const filt=useMemo(()=>CITADEL_PAINTS.filter(p=>(rng==="All"||p.range===rng)&&p.name.toLowerCase().includes(srch.toLowerCase())),[srch,rng]);
  const pick=(h,n)=>{setHex(h);setHexIn(h);setNm(n||"");setRes(null);};
  const analyse=async()=>{
    setLoad(true);setErr(null);setRes(null);
    try{
      const ctx=nm?`Paint:"${nm}"(${hex})`:`Hex:${hex}`;
      const raw=await callClaude([{role:"user",content:`${ctx}. Warhammer colour theory guide. Return ONLY JSON:\n{"colourName":"","description":"","technique":"","baseCoats":[{"name":"","hex":"","role":""}],"shadows":[{"name":"","hex":"","role":""}],"highlights":[{"name":"","hex":"","role":""}],"accents":[{"name":"","hex":"","role":""}]}\n2-3 per array, real Citadel names.`}],"Expert Warhammer painting advisor. JSON only, no markdown.");
      setRes(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    }catch(e){setErr("The forge spirits are troubled. Please try again.");}
    setLoad(false);
  };
  return(
    <div>
      <div className="sl">Browse all {CITADEL_PAINTS.length} Citadel Paints</div>
      <div className="row"><input className="tin" style={{flex:1}} placeholder="Search paint…" value={srch} onChange={e=>setSrch(e.target.value)}/></div>
      <div className="pills">{PAINT_RANGES.map(r=><button key={r} className={`pill ${rng===r?"on":""}`} onClick={()=>setRng(r)}>{r}</button>)}</div>
      <div className="pcount">{filt.length} of {CITADEL_PAINTS.length} shown</div>
      <div className="scrl" style={{marginBottom:18}}>
        {filt.map(p=>{const rc=RANGE_COLOURS[p.range]||"#c8912a";return(
          <div key={p.name} className={`prow ${hex===p.hex?"sel":""}`} onClick={()=>pick(p.hex,p.name)}>
            <div className="pdot" style={{background:p.hex}}/>
            <span className="pnm">{p.name}{owned[p.name]&&<span className="bowned">owned</span>}</span>
            <span className="prng" style={{color:rc,borderColor:rc}}>{p.range}</span>
          </div>
        );})}
        {!filt.length&&<div style={{padding:"18px",textAlign:"center",color:"rgba(232,213,176,.35)",fontStyle:"italic",fontSize:13}}>No paints found</div>}
      </div>
      <div className="div"/>
      <div className="sl" style={{marginBottom:8}}>Or enter a custom hex colour</div>
      <div className="row">
        <div className="swp"><div className="swpr" style={{background:hex}}/><input type="color" value={hex} onChange={e=>pick(e.target.value,"")}/></div>
        <input className="tin" style={{width:110,letterSpacing:".1em"}} value={hexIn} onChange={e=>{setHexIn(e.target.value);if(isHex(e.target.value)){setHex(e.target.value);setNm("");}}} placeholder="#9A1115" maxLength={7}/>
        {nm&&<span style={{fontSize:12,color:"#c8912a",fontStyle:"italic"}}>{nm}</span>}
        <button className="btn" onClick={analyse} disabled={load||!isHex(hex)}>{load?"Consulting…":"Analyse Colour"}</button>
      </div>
      {load&&<div className="ld"><span className="lrn">✦</span><div className="ltx">Consulting the ancient grimoire…</div></div>}
      {err&&<div className="err">{err}</div>}
      {res&&<div className="fd">
        <div style={{display:"flex",gap:13,alignItems:"center",marginBottom:18,paddingBottom:15,borderBottom:"1px solid rgba(200,145,42,.15)"}}>
          <div style={{width:44,height:44,borderRadius:4,background:hex,border:"1px solid rgba(255,255,255,.15)",flexShrink:0,boxShadow:"0 4px 14px rgba(0,0,0,.5)"}}/>
          <div><div style={{fontFamily:"'Cinzel Decorative',serif",fontSize:11,color:"#c8912a",marginBottom:3}}>{res.colourName}</div><div style={{fontSize:13,color:"rgba(232,213,176,.6)",fontStyle:"italic"}}>{res.description}</div></div>
        </div>
        <div className="tbox"><div className="ttl">✦ Painting Technique</div><div className="tbd">{res.technique}</div></div>
        {[["Base Coats",res.baseCoats],["Shades & Shadows",res.shadows],["Highlights",res.highlights],["Accents",res.accents]].map(([t,items])=>items?.length>0&&(
          <div key={t} style={{marginBottom:18}}>
            <div className="stl">{t}</div>
            <div className="cards">{items.map((c,i)=><div key={i} className="card" onClick={()=>pick(c.hex,c.name)}><div className="csw" style={{background:c.hex}}/><div className="cbdy"><div className="cnm">{c.name}</div><div className="crole">{c.role}</div><div className="chex">{c.hex}</div></div></div>)}</div>
          </div>
        ))}
      </div>}
    </div>
  );
}

// ─── INVENTORY TAB ───────────────────────────────────────────────
function InvTab({owned,setOwned,brushOwned,setBrushOwned}){
  const [srch,setSrch]=useState("");
  const [rng,setRng]=useState("All");
  const [show,setShow]=useState("all");
  const [sec,setSec]=useState("paints");
  const tog=(n)=>{const nx={...owned,[n]:!owned[n]};setOwned(nx);saveS("ownedPaints",nx);};
  const togB=(n)=>{const nx={...brushOwned,[n]:!brushOwned[n]};setBrushOwned(nx);saveS("ownedBrushes",nx);};
  const filt=useMemo(()=>CITADEL_PAINTS.filter(p=>(rng==="All"||p.range===rng)&&p.name.toLowerCase().includes(srch.toLowerCase())&&(show==="all"||(show==="owned"&&owned[p.name])||(show==="missing"&&!owned[p.name]))),[srch,rng,show,owned]);
  const oc=CITADEL_PAINTS.filter(p=>owned[p.name]).length;
  const ob=CITADEL_BRUSHES.filter(b=>brushOwned[b.name]).length;
  const miss=CITADEL_PAINTS.filter(p=>!owned[p.name]);
  const copy=()=>{const t="PAINT SHOPPING LIST\n"+miss.map(p=>`- ${p.name} (${p.range})`).join("\n");navigator.clipboard.writeText(t).catch(()=>{});};
  return(
    <div>
      <div className="stat-row">
        <div className="stat"><div className="stn">{oc}</div><div className="stl2">Owned</div></div>
        <div className="stat"><div className="stn">{CITADEL_PAINTS.length-oc}</div><div className="stl2">Missing</div></div>
        <div className="stat"><div className="stn">{Math.round(oc/CITADEL_PAINTS.length*100)}%</div><div className="stl2">Collection</div></div>
        <div className="stat"><div className="stn">{ob}</div><div className="stl2">Brushes</div></div>
      </div>
      <div className="pills" style={{marginBottom:14}}>
        {[["paints","Paints"],["brushes","Brushes"],["shopping",`Shopping List (${CITADEL_PAINTS.length-oc})`]].map(([v,l])=><button key={v} className={`pill ${sec===v?"on":""}`} onClick={()=>setSec(v)}>{l}</button>)}
      </div>
      {sec==="paints"&&<>
        <div className="row"><input className="tin" style={{flex:1}} placeholder="Search paints…" value={srch} onChange={e=>setSrch(e.target.value)}/></div>
        <div className="pills">{PAINT_RANGES.map(r=><button key={r} className={`pill ${rng===r?"on":""}`} onClick={()=>setRng(r)}>{r}</button>)}</div>
        <div className="pills">{[["all","All"],["owned","Owned"],["missing","Missing"]].map(([v,l])=><button key={v} className={`pill ${show===v?"on":""}`} onClick={()=>setShow(v)}>{l}</button>)}</div>
        <div className="pcount">{filt.length} paints shown</div>
        <div className="scrl" style={{maxHeight:380}}>
          {filt.map(p=>{const rc=RANGE_COLOURS[p.range]||"#c8912a";return(
            <div key={p.name} className={`chk-row ${owned[p.name]?"own":""}`} onClick={()=>tog(p.name)}>
              <input type="checkbox" className="chk" checked={!!owned[p.name]} readOnly/>
              <div className="pdot" style={{background:p.hex}}/>
              <span style={{flex:1,fontSize:13,color:owned[p.name]?"rgba(232,213,176,.9)":"rgba(232,213,176,.6)"}}>{p.name}</span>
              <span className="prng" style={{color:rc,borderColor:rc}}>{p.range}</span>
            </div>
          );})}
        </div>
      </>}
      {sec==="brushes"&&<>
        {CITADEL_BRUSHES.map(b=>(
          <div key={b.name} className="bcard" style={brushOwned[b.name]?{borderColor:"rgba(30,115,49,.4)",background:"rgba(30,115,49,.04)"}:{}}>
            <div className="bico">{b.icon}</div>
            <div style={{flex:1}}>
              <div className="bnm">{b.name}</div>
              <div className="btbdg">{b.type}</div>
              <div className="bdsc">{b.desc}</div>
              <label className="bown" onClick={()=>togB(b.name)}>
                <input type="checkbox" checked={!!brushOwned[b.name]} readOnly style={{accentColor:"#c8912a",cursor:"pointer"}}/>
                {brushOwned[b.name]?"✓ Owned":"Mark as owned"}
              </label>
            </div>
          </div>
        ))}
      </>}
      {sec==="shopping"&&<>
        <div className="tbox">
          <div className="ttl">✦ Your Paint Shopping List</div>
          <div className="tbd" style={{marginBottom:10}}>{miss.length===0?"You own every Citadel paint! A truly blessed collector.":`Missing ${miss.length} paints. Check off what you own to update this list.`}</div>
          {miss.length>0&&<button className="gbtn" onClick={copy}>Copy to Clipboard</button>}
        </div>
        {miss.length>0&&<div className="shop-list">{PAINT_RANGES.filter(r=>r!=="All").map(range=>{const items=miss.filter(p=>p.range===range);if(!items.length)return null;const rc=RANGE_COLOURS[range]||"#c8912a";return(
          <div key={range} style={{marginBottom:13}}>
            <div style={{fontFamily:"'Cinzel Decorative',serif",fontSize:9,letterSpacing:".18em",color:rc,marginBottom:7,textTransform:"uppercase"}}>{range} ({items.length})</div>
            {items.map(p=><div key={p.name} className="shop-i"><div style={{width:15,height:15,borderRadius:"50%",background:p.hex,border:"1px solid rgba(255,255,255,.12)",flexShrink:0}}/><span style={{fontSize:13,color:"rgba(232,213,176,.8)"}}>{p.name}</span></div>)}
          </div>
        );})}
        </div>}
      </>}
    </div>
  );
}

// ─── BRUSHES TAB ─────────────────────────────────────────────────
function BrushTab({brushOwned,setBrushOwned}){
  const [tf,setTf]=useState("All");
  const [srch,setSrch]=useState("");
  const tog=(n)=>{const nx={...brushOwned,[n]:!brushOwned[n]};setBrushOwned(nx);saveS("ownedBrushes",nx);};
  const filt=useMemo(()=>CITADEL_BRUSHES.filter(b=>(tf==="All"||b.type===tf)&&b.name.toLowerCase().includes(srch.toLowerCase())),[tf,srch]);
  return(
    <div>
      <div className="tbox"><div className="ttl">✦ About Citadel Brushes</div><div className="tbd">Citadel brushes are purpose-built for miniature painting. As a beginner, start with a Medium Base, Medium Layer, and a Shade brush — these three cover 90% of painting needs.</div></div>
      <div className="row"><input className="tin" style={{flex:1}} placeholder="Search brushes…" value={srch} onChange={e=>setSrch(e.target.value)}/></div>
      <div className="pills">{BRUSH_TYPES.map(t=><button key={t} className={`pill ${tf===t?"on":""}`} onClick={()=>setTf(t)}>{t}</button>)}</div>
      <div className="pcount" style={{marginBottom:12}}>{filt.length} brushes shown</div>
      {filt.map(b=>(
        <div key={b.name} className="bcard" style={brushOwned[b.name]?{borderColor:"rgba(30,115,49,.4)",background:"rgba(30,115,49,.04)"}:{}}>
          <div className="bico">{b.icon}</div>
          <div style={{flex:1}}>
            <div className="bnm">{b.name}</div>
            <div className="btbdg">{b.type}</div>
            <div className="bdsc">{b.desc}</div>
            <label className="bown" onClick={()=>tog(b.name)}><input type="checkbox" checked={!!brushOwned[b.name]} readOnly style={{accentColor:"#c8912a",cursor:"pointer"}}/>{brushOwned[b.name]?"✓ Owned":"Mark as owned"}</label>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TIPS TAB ────────────────────────────────────────────────────
function TipsTab(){
  const [open,setOpen]=useState({0:true});
  return(
    <div>
      <div className="tbox"><div className="ttl">✦ Beginner's Wisdom</div><div className="tbd">New to Warhammer painting? These tips have been gathered from experienced painters to help you avoid the most common pitfalls and improve faster. Click any category to expand it.</div></div>
      {BEGINNER_TIPS.map((cat,i)=>(
        <div key={i} className="tip-cat">
          <div className="tip-cat-hdr" onClick={()=>setOpen(o=>({...o,[i]:!o[i]}))}>
            <div className="tip-cat-ico">{cat.icon}</div>
            <div className="tip-cat-nm">{cat.cat}</div>
            <span style={{color:"rgba(200,145,42,.6)",fontSize:14}}>{open[i]?"▲":"▼"}</span>
            <span style={{fontSize:11,color:"rgba(232,213,176,.35)",fontStyle:"italic",marginLeft:8}}>{cat.tips.length} tips</span>
          </div>
          {open[i]&&cat.tips.map((tip,j)=>(
            <div key={j} className="tip-card">
              <div className="tip-title">✦ {tip.title}</div>
              <div className="tip-body">{tip.body}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── SCHEMES TAB ─────────────────────────────────────────────────
function SchemesTab(){
  const armies=Object.keys(ARMY_SCHEMES);
  const [army,setArmy]=useState(armies[0]);
  const [open,setOpen]=useState({0:true});
  const schemes=ARMY_SCHEMES[army]||[];
  const toggle=(i)=>setOpen(o=>({...o,[i]:!o[i]}));
  const pmap=useMemo(()=>{const m={};CITADEL_PAINTS.forEach(p=>m[p.name]=p.hex);return m;},[]);
  return(
    <div>
      <div className="tbox"><div className="ttl">✦ Suggested Colour Schemes</div><div className="tbd">Each army has 4 curated schemes with step-by-step paint guides. Click a scheme to reveal the full recipe.</div></div>
      <div className="army-pick-row">
        <select className="sel" style={{flex:1}} value={army} onChange={e=>{setArmy(e.target.value);setOpen({0:true});}}>
          {armies.map(a=><option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      {schemes.map((sc,i)=>(
        <div key={i} className="scheme-card">
          <div className="scheme-hdr" onClick={()=>toggle(i)}>
            <div className="scheme-palette">
              {sc.colors.map((c,j)=><div key={j} className="scheme-dot" style={{background:c}}/>)}
            </div>
            <div style={{flex:1,marginLeft:8}}>
              <div className="scheme-nm">{sc.name}</div>
              <div className="scheme-desc">{sc.desc}</div>
            </div>
            <span style={{color:"rgba(200,145,42,.5)",fontSize:14,marginLeft:8}}>{open[i]?"▲":"▼"}</span>
          </div>
          {open[i]&&(
            <div className="scheme-bdy fd">
              <div className="stl" style={{marginBottom:12}}>Paint Recipe — {sc.paints.length} steps</div>
              {sc.paints.map((step,j)=>{const ph=pmap[step.p]||"#888";return(
                <div key={j} className="scheme-step">
                  <div className="scheme-step-dot" style={{background:ph}}/>
                  <div className="scheme-step-info">
                    <div className="scheme-step-nm">{step.p}</div>
                    <div className="scheme-step-role">{step.role}</div>
                  </div>
                </div>
              );})}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PROJECT PLANNER ─────────────────────────────────────────────
function ProjTab(){
  const [projs,setProjs]=useState(()=>loadS("projects",[]));
  const [exp,setExp]=useState({});
  const [newF,setNewF]=useState(Object.keys(ARMIES_40K)[0]);
  const [newN,setNewN]=useState("");
  const save=(p)=>{setProjs(p);saveS("projects",p);};
  const addArmy=()=>{const n=newN.trim()||newF;const p={id:Date.now(),faction:newF,name:n,units:[]};save([...projs,p]);setExp(e=>({...e,[p.id]:true}));setNewN("");};
  const remArmy=(id)=>save(projs.filter(p=>p.id!==id));
  const addUnit=(pid,un,ct)=>save(projs.map(p=>p.id===pid?{...p,units:[...p.units,{id:Date.now(),name:un,count:parseInt(ct)||1,stages:[...DEFAULT_STAGES],done:{}}]}:p));
  const remUnit=(pid,uid)=>save(projs.map(p=>p.id===pid?{...p,units:p.units.filter(u=>u.id!==uid)}:p));
  const togS=(pid,uid,s)=>save(projs.map(p=>p.id===pid?{...p,units:p.units.map(u=>u.id===uid?{...u,done:{...u.done,[s]:!u.done[s]}}:u)}:p));
  const addS=(pid,uid,s)=>{if(!s.trim())return;save(projs.map(p=>p.id===pid?{...p,units:p.units.map(u=>u.id===uid&&!u.stages.includes(s)?{...u,stages:[...u.stages,s]}:u)}:p));};
  const remS=(pid,uid,s)=>save(projs.map(p=>p.id===pid?{...p,units:p.units.map(u=>u.id===uid?{...u,stages:u.stages.filter(x=>x!==s),done:Object.fromEntries(Object.entries(u.done).filter(([k])=>k!==s))}:u)}:p));
  return(
    <div>
      <div className="tbox">
        <div className="ttl">✦ Add New Army</div>
        <div className="row" style={{marginBottom:8}}>
          <select className="sel" style={{flex:1}} value={newF} onChange={e=>setNewF(e.target.value)}>
            {Object.keys(ARMIES_40K).map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="row">
          <input className="tin" style={{flex:1}} placeholder="Custom army name (optional)…" value={newN} onChange={e=>setNewN(e.target.value)}/>
          <button className="btn" onClick={addArmy}>Add Army</button>
        </div>
      </div>
      {!projs.length&&<div style={{textAlign:"center",padding:"36px 20px",color:"rgba(232,213,176,.3)",fontStyle:"italic",fontSize:14}}>No armies yet. Add your first above.</div>}
      {projs.map(proj=>{
        const ts=proj.units.reduce((s,u)=>s+u.stages.length,0);
        const ds=proj.units.reduce((s,u)=>s+Object.values(u.done).filter(Boolean).length,0);
        const pct=ts?Math.round(ds/ts*100):0;
        return(
          <ArmyBlock key={proj.id} proj={proj} exp={!!exp[proj.id]} pct={pct}
            onToggle={()=>setExp(e=>({...e,[proj.id]:!e[proj.id]}))}
            onRem={()=>remArmy(proj.id)} onAddUnit={addUnit} onRemUnit={remUnit}
            onTogS={togS} onAddS={addS} onRemS={remS}/>
        );
      })}
    </div>
  );
}

function ArmyBlock({proj,exp,pct,onToggle,onRem,onAddUnit,onRemUnit,onTogS,onAddS,onRemS}){
  const [su,setSu]=useState((ARMIES_40K[proj.faction]||[])[0]||"");
  const [ct,setCt]=useState("5");
  const [ns,setNs]=useState({});
  return(
    <div className="army-wrap">
      <div className="army-hdr" onClick={onToggle}>
        <span style={{fontSize:14}}>{exp?"▼":"▶"}</span>
        <div style={{flex:1}}>
          <div className="army-nm">{proj.name}</div>
          <div style={{fontSize:10,color:"rgba(232,213,176,.38)",letterSpacing:".07em"}}>{proj.faction}</div>
        </div>
        <span style={{fontSize:11,color:"rgba(232,213,176,.4)",fontStyle:"italic",marginRight:10}}>{proj.units.length} units · {pct}%</span>
        <div style={{width:70}}><div className="pb-wrap"><div className="pb-fill" style={{width:`${pct}%`}}/></div></div>
        <button className="dbtn" style={{marginLeft:8}} onClick={e=>{e.stopPropagation();onRem();}}>Remove</button>
      </div>
      {exp&&<div className="army-bdy">
        <div className="row" style={{marginBottom:12}}>
          <select className="sel" style={{flex:1}} value={su} onChange={e=>setSu(e.target.value)}>
            {(ARMIES_40K[proj.faction]||[]).map(u=><option key={u} value={u}>{u}</option>)}
          </select>
          <input className="tin" style={{width:55}} type="number" min="1" max="100" value={ct} onChange={e=>setCt(e.target.value)} placeholder="Qty"/>
          <button className="btn" onClick={()=>onAddUnit(proj.id,su,ct)}>Add Unit</button>
        </div>
        {!proj.units.length&&<div style={{textAlign:"center",padding:"14px",color:"rgba(232,213,176,.3)",fontStyle:"italic",fontSize:13}}>No units yet.</div>}
        {proj.units.map(u=>{
          const sp=u.stages.length?Math.round(Object.values(u.done).filter(Boolean).length/u.stages.length*100):0;
          return(
            <div key={u.id} className="unit-row">
              <div className="u-top">
                <span className="u-nm">{u.name}</span>
                <span style={{fontSize:11,color:"rgba(200,145,42,.7)"}}>×{u.count} models</span>
                <span style={{fontSize:11,color:"rgba(232,213,176,.4)"}}>{sp}%</span>
                <button className="dbtn" onClick={()=>onRemUnit(proj.id,u.id)}>✕</button>
              </div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {u.stages.map(s=><button key={s} className={`sbtn ${u.done[s]?"dn":""}`} onClick={()=>onTogS(proj.id,u.id,s)}>{u.done[s]?"✓ ":""}{s}</button>)}
              </div>
              <div className="pb-wrap"><div className="pb-fill" style={{width:`${sp}%`}}/></div>
              <div className="s-ed">
                <span style={{fontSize:10,color:"rgba(200,145,42,.5)",letterSpacing:".1em",textTransform:"uppercase"}}>+ Stage:</span>
                <input className="min" placeholder="e.g. Washed metals" value={ns[u.id]||""} onChange={e=>setNs(x=>({...x,[u.id]:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter"){onAddS(proj.id,u.id,ns[u.id]||"");setNs(x=>({...x,[u.id]:""}));}}}/>
                <button className="gbtn" style={{padding:"3px 10px",fontSize:8}} onClick={()=>{onAddS(proj.id,u.id,ns[u.id]||"");setNs(x=>({...x,[u.id]:""}));}}>Add</button>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",marginLeft:4}}>
                  {u.stages.map(s=><span key={s} className="tag">{s}<span className="tx" onClick={()=>onRemS(proj.id,u.id,s)}>×</span></span>)}
                </div>
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────
export default function App(){
  const [tab,setTab]=useState("colour");
  const [owned,setOwned]=useState(()=>loadS("ownedPaints",{}));
  const [bOwned,setBOwned]=useState(()=>loadS("ownedBrushes",{}));
  const TABS=[
    {id:"colour",label:"Colour Theory"},
    {id:"inv",label:"Inventory"},
    {id:"brushes",label:"Brushes"},
    {id:"schemes",label:"Schemes"},
    {id:"tips",label:"Beginner Tips"},
    {id:"project",label:"Project Planner"},
  ];
  return(
    <>
      <style>{STYLE}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-t">⚔ Warhammer Hobby Helper ⚔</div>
          <div className="hdr-s">✦ Forge your collection with ancient wisdom ✦</div>
        </div>
        <div className="tabs">{TABS.map(t=><button key={t.id} className={`tab ${tab===t.id?"on":""}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}</div>
        <div className="cnt">
          {tab==="colour"&&<ColourTab owned={owned}/>}
          {tab==="inv"&&<InvTab owned={owned} setOwned={setOwned} brushOwned={bOwned} setBrushOwned={setBOwned}/>}
          {tab==="brushes"&&<BrushTab brushOwned={bOwned} setBrushOwned={setBOwned}/>}
          {tab==="schemes"&&<SchemesTab/>}
          {tab==="tips"&&<TipsTab/>}
          {tab==="project"&&<ProjTab/>}
        </div>
      </div>
    </>
  );
}
