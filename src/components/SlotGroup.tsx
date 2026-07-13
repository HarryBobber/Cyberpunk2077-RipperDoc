import { Slot, type EquippedItem } from './Slot'
import './SlotGroup.css'

interface SlotGroupProps {
  category: string
  /** One entry per slot; `undefined` renders that slot empty. */
  slots: (EquippedItem | undefined)[]
}

export function SlotGroup({ category, slots }: SlotGroupProps) {
  return (
    <section className="slot-group">
      <h2 className="slot-group__label">{category}</h2>
      <div className="slot-group__slots">
        {slots.map((equipped, i) => (
          <Slot key={i} equipped={equipped} />
        ))}
      </div>
    </section>
  )
}
