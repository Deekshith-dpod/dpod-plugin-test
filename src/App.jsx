import { useState } from 'react'
import ExtractionLauncher from './Extraction'
import "./app.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ExtractionLauncher />
    </div>
  )
}

export default App
