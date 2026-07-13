import { SlotGroup } from './components/SlotGroup'
import './App.css'

function App() {
  return (
    <main className="ripperdoc">
      <div className="ripperdoc__preview">
        <SlotGroup
          category="Frontal Cortex"
          slots={[undefined, undefined, undefined]}
        />
        <SlotGroup category="Arms" slots={[undefined]} />
        <SlotGroup
          category="Nervous System"
          slots={[undefined, undefined, undefined]}
        />
      </div>
    </main>
  )
}

export default App
