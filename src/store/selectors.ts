import { useShallow } from 'zustand/react/shallow'
import {
  CATALOG_BY_ID,
  ATTRIBUTES,
  type Attribute,
  type Cyberware,
  type CyberwareCategory,
} from '../data/cyberware'
import { useBuildStore } from './buildStore'

// Resolve the equipped id-map into the full Cyberware objects it references.
const resolve = (equipped: Record<CyberwareCategory, number[]>): Cyberware[] =>
  Object.values(equipped)
    .flat()
    .map((id) => CATALOG_BY_ID.get(id))
    .filter((c): c is Cyberware => c !== undefined)

/** Capacity consumed by everything currently equipped. */
export const useUsedCapacity = () =>
  useBuildStore((s) => resolve(s.equipped).reduce((n, c) => n + c.cost, 0))

/** Budget left over — negative means the build is over capacity. */
export const useRemainingCapacity = () =>
  useBuildStore(
    (s) => s.cyberwareCapacity - resolve(s.equipped).reduce((n, c) => n + c.cost, 0),
  )

/** Total armor granted by equipped cyberware. */
export const useTotalArmor = () =>
  useBuildStore((s) => resolve(s.equipped).reduce((n, c) => n + c.armor, 0))

/**
 * Count of equipped cyberware per attribute. Returns a fresh object each call,
 * so `useShallow` prevents re-renders when the tallies haven't changed.
 */
export const useAttunement = () =>
  useBuildStore(
    useShallow((s) => {
      const totals = Object.fromEntries(
        ATTRIBUTES.map((a): [Attribute, number] => [a, 0]),
      ) as Record<Attribute, number>
      for (const c of resolve(s.equipped)) totals[c.attunement]++
      return totals
    }),
  )
