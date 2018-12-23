import { Pokemon } from './pokemon';
import { Team } from './team';

export const TEAMS: Team[] =[
  /* {
      "id": 1,
      "team": "Gothitelle,Marowak-Alola,Mawile,Rotom-Wash,Scrafty,tapuBulu",
      "usage_count": 7,
      "win_count": 7,
      "usage_ratio": 0.0013067015120403211,
      "win_ratio": 1,
      "battle_ids": [
        "gen7vgc2018-676822507",
        "gen7vgc2018-676996570",
        "gen7vgc2018-676998680",
        "gen7vgc2018-675922596",
        "gen7vgc2018-676916532",
        "gen7vgc2018-675899140",
        "gen7vgc2018-675925269"
      ],
      "users": [
        "Xjay121",
        "Xjay121",
        "Xjay121",
        "Xjay121",
        "Xjay121",
        "Xjay121",
        "Xjay121"
      ],
      "pokemon_ids": [
        "Gothitelle",
        "Marowak-Alola",
        "Mawile",
        "Rotom-Wash",
        "Scrafty",
        "tapuBulu"
      ],
      "relevance": 0.0013067015120403211
    },
    {
      "id": 2,
      "team": "Abomasnow,Arcanine,Glaceon,Landorus-Therian,Rotom-Wash,tapuKoko",
      "usage_count": 1,
      "win_count": 0,
      "usage_ratio": 0.00018667164457718873,
      "win_ratio": 0,
      "battle_ids": [],
      "users": [
        "naivetewater"
      ],
      "pokemon_ids": [
        "Abomasnow",
        "Arcanine",
        "Glaceon",
        "Landorus-Therian",
        "Rotom-Wash",
        "tapuKoko"
      ],
      "relevance": 0
    },
    {
      "id": 3,
      "team": "Gothitelle,Incineroar,Ludicolo,Mawile,Politoed,tapuKoko",
      "usage_count": 7,
      "win_count": 6,
      "usage_ratio": 0.0013067015120403211,
      "win_ratio": 0.8571428571428571,
      "battle_ids": [
        "gen7vgc2018-670801974",
        "gen7vgc2018-675177555",
        "gen7vgc2018-675910124",
        "gen7vgc2018-677922381",
        "gen7vgc2018-675893761",
        "gen7vgc2018-676482899"
      ],
      "users": [
        "drop the folling",
        "SoggysockVGC",
        "Breakfast Pub",
        "spthugs10",
        "Breakfast Pub",
        "tblastvgc",
        "notketchuppie"
      ],
      "pokemon_ids": [
        "Gothitelle",
        "Incineroar",
        "Ludicolo",
        "Mawile",
        "Politoed",
        "tapuKoko"
      ],
      "relevance": 0.0011200298674631324
    },
    {
      "id": 4,
      "team": "Celesteela,Excadrill,Milotic,Salamence,tapuLele,Tyranitar",
      "usage_count": 1,
      "win_count": 0,
      "usage_ratio": 0.00018667164457718873,
      "win_ratio": 0,
      "battle_ids": [],
      "users": [
        "Mimimi"
      ],
      "pokemon_ids": [
        "Celesteela",
        "Excadrill",
        "Milotic",
        "Salamence",
        "tapuLele",
        "Tyranitar"
      ],
      "relevance": 0
    },
    {
      "id": 5,
      "team": "Bisharp,Landorus-Therian,Manectric,tapuFini,Tyranitar,Zapdos",
      "usage_count": 9,
      "win_count": 6,
      "usage_ratio": 0.0016800448011946986,
      "win_ratio": 0.6666666666666666,
      "battle_ids": [
        "gen7vgc2018-678274282",
        "gen7vgc2018-677244859",
        "gen7vgc2018-677619239",
        "gen7vgc2018-676712479",
        "gen7vgc2018-678389476",
        "gen7vgc2018-677634379"
      ],
      "users": [
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet",
        "Hailey's Comet"
      ],
      "pokemon_ids": [
        "Bisharp",
        "Landorus-Therian",
        "Manectric",
        "tapuFini",
        "Tyranitar",
        "Zapdos"
      ],
      "relevance": 0.0011200298674631324
    },
    {
      "id": 6,
      "team": "Ferrothorn,Incineroar,Metagross,Scrafty,tapuLele,Zapdos",
      "usage_count": 1,
      "win_count": 0,
      "usage_ratio": 0.00018667164457718873,
      "win_ratio": 0,
      "battle_ids": [],
      "users": [
        "Sir Zordor"
      ],
      "pokemon_ids": [
        "Ferrothorn",
        "Incineroar",
        "Metagross",
        "Scrafty",
        "tapuLele",
        "Zapdos"
      ],
      "relevance": 0
    },
    {
      "id": 7,
      "team": "Aegislash,Arcanine,Beedrill,Gyarados,tapuBulu,Wigglytuff",
      "usage_count": 2,
      "win_count": 1,
      "usage_ratio": 0.00037334328915437746,
      "win_ratio": 0.5,
      "battle_ids": [
        "gen7vgc2018-677349415"
      ],
      "users": [
        "Darktrainer gas",
        "Darktrainer Gas"
      ],
      "pokemon_ids": [
        "Aegislash",
        "Arcanine",
        "Beedrill",
        "Gyarados",
        "tapuBulu",
        "Wigglytuff"
      ],
      "relevance": 0.00018667164457718873
    },
    {
      "id": 8,
      "team": "Abomasnow,Aegislash,Landorus-Therian,tapuFini,Volcarona,Zapdos",
      "usage_count": 1,
      "win_count": 0,
      "usage_ratio": 0.00018667164457718873,
      "win_ratio": 0,
      "battle_ids": [],
      "users": [
        "Umat_VGC"
      ],
      "pokemon_ids": [
        "Abomasnow",
        "Aegislash",
        "Landorus-Therian",
        "tapuFini",
        "Volcarona",
        "Zapdos"
      ],
      "relevance": 0
    },
    {
      "id": 9,
      "team": "Ferrothorn,Politoed,Swampert,tapuLele,Thundurus,Tornadus",
      "usage_count": 1,
      "win_count": 1,
      "usage_ratio": 0.00018667164457718873,
      "win_ratio": 1,
      "battle_ids": [
        "gen7vgc2018-673660199"
      ],
      "users": [
        "Tapu Prata"
      ],
      "pokemon_ids": [
        "Ferrothorn",
        "Politoed",
        "Swampert",
        "tapuLele",
        "Thundurus",
        "Tornadus"
      ],
      "relevance": 0.00018667164457718873
    }*/
];
