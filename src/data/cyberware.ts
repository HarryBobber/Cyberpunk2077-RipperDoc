export const CYBERWARE_CATEGORIES = [
  'Frontal Cortex', 'Arms', 'Skeleton', 'Nervous System',
  'Integumentary System', 'Operating System', 'Face',
  'Hands', 'Circulatory System', 'Legs',
] as const
export type CyberwareCategory = (typeof CYBERWARE_CATEGORIES)[number]

export const ATTRIBUTES = [
  'Body', 'Reflexes', 'Technical Ability', 'Intelligence', 'Cool',
] as const
export type Attribute = (typeof ATTRIBUTES)[number]

export interface Cyberware {
  id: number
  category: CyberwareCategory   // was `type` — renamed, `type` is a TS keyword-ish trap
  img: string                   // was void* — just a URL/asset path
  name: string
  isIconic: boolean
  cost: number                  // capacity cost (the budget it consumes)
  armor: number
  effect: string
  attunement: Attribute
}

// Per-category config: replaces Slot.num_slots / Slot.description.
// `slots` = base equip slots (some are perk-modified in game; these are base values).
export const CATEGORY_CONFIG: Record<CyberwareCategory, { slots: number; description: string }> = {
  'Frontal Cortex':       { slots: 3, description: 'Enhances cognitive functions, RAM, and quickhack capacity.' },
  'Arms':                 { slots: 1, description: 'Replaces your arms with an integrated weapon system.' },
  'Skeleton':             { slots: 3, description: 'Reinforces bones and joints for health and carry capacity.' },
  'Nervous System':       { slots: 3, description: 'Sharpens reflexes, reaction speed, and movement.' },
  'Integumentary System': { slots: 5, description: 'Skin-embedded cyberware granting armor, camo, and resistances.' },
  'Operating System':     { slots: 1, description: 'Core cyberware that defines your playstyle — Cyberdeck, Sandevistan, or Berserk.' },
  'Face':                 { slots: 1, description: 'Optical cyberware for scanning and targeting.' },
  'Hands':                { slots: 1, description: 'Augments weapon handling and grip.' },
  'Circulatory System':   { slots: 3, description: 'Regulates blood, healing, and stamina.' },
  'Legs':                 { slots: 1, description: 'Enhances mobility, jump height, and traversal.' },
}

// A representative slice — one to three pieces per category — so the store and
// UI have real data to render. Names/categories/attunement are real game data;
// the `cost` and `armor` numbers are illustrative — verify before shipping.
export const CATALOG: Cyberware[] = [
  // Frontal Cortex
  { id: 1, category: 'Frontal Cortex', img: '/img/cyberware/1.png', name: 'Limbic System Enhancement', isIconic: true,  cost: 20, armor: 0, effect: 'Increases Crit Chance; landing a Crit slows time briefly.', attunement: 'Cool' },
  { id: 2, category: 'Frontal Cortex', img: '/img/cyberware/2.png', name: 'Camillo RAM Manager',        isIconic: false, cost: 14, armor: 0, effect: 'Recovers used RAM after landing a quickhack.',           attunement: 'Intelligence' },
  { id: 3, category: 'Frontal Cortex', img: '/img/cyberware/3.png', name: 'Mechatronic Core',            isIconic: false, cost: 16, armor: 0, effect: 'Increases damage to drones, mechs, and turrets.',       attunement: 'Intelligence' },

  // Arms
  { id: 10, category: 'Arms', img: '/img/cyberware/10.png', name: 'Mantis Blades', isIconic: false, cost: 20, armor: 0, effect: 'Bladed arms for lethal melee combat and finishers.',   attunement: 'Reflexes' },
  { id: 11, category: 'Arms', img: '/img/cyberware/11.png', name: 'Gorilla Arms',  isIconic: false, cost: 20, armor: 0, effect: 'Blunt melee arms; boosts damage and force-open checks.', attunement: 'Body' },

  // Skeleton
  { id: 20, category: 'Skeleton', img: '/img/cyberware/20.png', name: 'Epimorphic Skeleton', isIconic: true,  cost: 22, armor: 0, effect: 'Grants a health buffer at high health.',        attunement: 'Body' },
  { id: 21, category: 'Skeleton', img: '/img/cyberware/21.png', name: 'Titanium Bones',      isIconic: false, cost: 12, armor: 0, effect: 'Increases carry capacity and melee damage.',   attunement: 'Body' },

  // Nervous System
  { id: 30, category: 'Nervous System', img: '/img/cyberware/30.png', name: 'Kerenzikov',    isIconic: false, cost: 15, armor: 0, effect: 'Slows time while aiming/blocking after a dodge.',   attunement: 'Reflexes' },
  { id: 31, category: 'Nervous System', img: '/img/cyberware/31.png', name: 'Reflex Tuner',  isIconic: true,  cost: 18, armor: 0, effect: 'Slows time when health drops below a threshold.',   attunement: 'Reflexes' },

  // Integumentary System
  { id: 40, category: 'Integumentary System', img: '/img/cyberware/40.png', name: 'Subdermal Armor', isIconic: false, cost: 16, armor: 150, effect: 'Increases total Armor.',                          attunement: 'Body' },
  { id: 41, category: 'Integumentary System', img: '/img/cyberware/41.png', name: 'Optical Camo',    isIconic: false, cost: 20, armor: 0,   effect: 'Active: turns you briefly invisible, raises evasion.', attunement: 'Cool' },
  { id: 42, category: 'Integumentary System', img: '/img/cyberware/42.png', name: 'Pain Editor',     isIconic: false, cost: 24, armor: 0,   effect: 'Reduces all incoming damage.',                    attunement: 'Technical Ability' },

  // Operating System
  { id: 50, category: 'Operating System', img: '/img/cyberware/50.png', name: 'Militech "Apogee" Sandevistan', isIconic: true,  cost: 22, armor: 0, effect: 'Slows time; boosts Crit Chance and Crit Damage.',   attunement: 'Reflexes' },
  { id: 51, category: 'Operating System', img: '/img/cyberware/51.png', name: 'Tetratronic Ripmind Mk.5',      isIconic: false, cost: 22, armor: 0, effect: 'High-end cyberdeck; boosts quickhack damage/upload.', attunement: 'Intelligence' },
  { id: 52, category: 'Operating System', img: '/img/cyberware/52.png', name: 'Berserk MK.5',                  isIconic: false, cost: 20, armor: 0, effect: 'Boosts damage, mitigation, and regen when active.',  attunement: 'Body' },

  // Face
  { id: 60, category: 'Face', img: '/img/cyberware/60.png', name: 'Kiroshi "Cockatrice" Optics', isIconic: false, cost: 12, armor: 0, effect: 'Improves scanning; grants a headshot damage bonus.', attunement: 'Intelligence' },

  // Hands
  { id: 70, category: 'Hands', img: '/img/cyberware/70.png', name: 'Smart Link',            isIconic: false, cost: 12, armor: 0, effect: 'Enables Smart weapon targeting and boosts their damage.', attunement: 'Technical Ability' },
  { id: 71, category: 'Hands', img: '/img/cyberware/71.png', name: 'Ballistic Coprocessor', isIconic: false, cost: 14, armor: 0, effect: 'Increases ricochet damage; shows ricochet trajectories.', attunement: 'Cool' },

  // Circulatory System
  { id: 80, category: 'Circulatory System', img: '/img/cyberware/80.png', name: 'Second Heart', isIconic: false, cost: 28, armor: 0, effect: 'On lethal damage, restores health instead of dying.', attunement: 'Body' },
  { id: 81, category: 'Circulatory System', img: '/img/cyberware/81.png', name: 'Blood Pump',   isIconic: false, cost: 18, armor: 0, effect: 'Active: restores health and grants a health buffer.', attunement: 'Body' },
  { id: 82, category: 'Circulatory System', img: '/img/cyberware/82.png', name: 'Biomonitor',   isIconic: false, cost: 10, armor: 0, effect: 'Auto-uses a health item at low health.',           attunement: 'Technical Ability' },

  // Legs
  { id: 90, category: 'Legs', img: '/img/cyberware/90.png', name: 'Reinforced Tendons', isIconic: false, cost: 12, armor: 0, effect: 'Enables a double jump.',  attunement: 'Reflexes' },
  { id: 91, category: 'Legs', img: '/img/cyberware/91.png', name: 'Fortified Ankles',   isIconic: false, cost: 12, armor: 0, effect: 'Enables a charged jump.', attunement: 'Body' },
]

// O(1) lookup for resolving equipped ids back to full items.
export const CATALOG_BY_ID: Map<number, Cyberware> =
  new Map(CATALOG.map((c) => [c.id, c]))