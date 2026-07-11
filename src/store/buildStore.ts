import { create } from 'zustand'
import {
  CYBERWARE_CATEGORIES,
  CATEGORY_CONFIG,
  CATALOG_BY_ID,
  type CyberwareCategory,
} from '../data/cyberware'

// A fresh equipped map with all 10 categories present and empty, so that
// `equipped[category]` is always a real array — never undefined.
const emptyEquipped = (): Record<CyberwareCategory, number[]> =>
  Object.fromEntries(
    CYBERWARE_CATEGORIES.map((c): [CyberwareCategory, number[]] => [c, []]),
  ) as Record<CyberwareCategory, number[]>

export interface BuildState {
  cyberwareCapacity: number // total budget the equipped `cost`s draw down
  equipped: Record<CyberwareCategory, number[]> // ids per category — the only source of truth

  equip: (id: number) => void
  unequip: (id: number) => void
  setCapacity: (capacity: number) => void
  reset: () => void
}

export const useBuildStore = create<BuildState>((set) => ({
  cyberwareCapacity: 0,
  equipped: emptyEquipped(),

  equip: (id) =>
    set((state) => {
      const item = CATALOG_BY_ID.get(id)
      if (!item) return state // unknown id

      const slot = state.equipped[item.category]
      if (slot.includes(id)) return state // already equipped
      if (slot.length >= CATEGORY_CONFIG[item.category].slots) return state // slot full

      // Immutable update: new equipped object + new array for the changed category.
      return {
        equipped: { ...state.equipped, [item.category]: [...slot, id] },
      }
    }),

  unequip: (id) =>
    set((state) => {
      const item = CATALOG_BY_ID.get(id)
      if (!item) return state

      return {
        equipped: {
          ...state.equipped,
          [item.category]: state.equipped[item.category].filter((x) => x !== id),
        },
      }
    }),

  setCapacity: (capacity) => set({ cyberwareCapacity: capacity }),

  reset: () => set({ equipped: emptyEquipped() }),
}))
