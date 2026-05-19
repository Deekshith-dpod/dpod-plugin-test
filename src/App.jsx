import { useState } from 'react'
import ExtractionLauncher from './Extraction'
import ChatBotLauncher from './ChatBot'
import "./app.css"
import ExtractionLaunch from './OldPlugin'
import ExtractionTraining from './New'

function App() {
  const [page, setPage] = useState('extraction')
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <div>
      {!previewMode && <button onClick={() => setPreviewMode(true)}>Click</button>}
      {previewMode && <ExtractionLauncher previewMode={previewMode} setPreviewMode={setPreviewMode} />}
      {/* <ExtractionLaunch /> */}
      {/* <ChatBotLauncher /> */}
    </div>
  )
}

export default App
