import './Slot.css'

/** Minimal shape for now — swap for the real Cyberware type once the catalog lands. */
export interface EquippedItem {
  name: string
  img: string
}

interface SlotProps {
  /** Absent = empty slot. */
  equipped?: EquippedItem
}

export function Slot({ equipped }: SlotProps) {
  return (
    <button
      type="button"
      className={`slot ${equipped ? 'is-equipped' : 'is-empty'}`}
      aria-label={equipped ? equipped.name : 'Empty slot'}
    >
      <span className="slot__frame" aria-hidden="true" />
      <span className="slot__deco" aria-hidden="true" />
      {equipped ? (
        <img className="slot__icon" src={equipped.img} alt="" />
      ) : (
        <span className="slot__plus" aria-hidden="true" />
      )}
    </button>
  )
}
