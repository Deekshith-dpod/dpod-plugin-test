import { useState } from 'react'
import ExtractionLauncher from './Extraction'
import ChatBotLauncher from './ChatBot'
import "./app.css"

function App() {
  const [page, setPage] = useState('extraction')

  const navBtn = (id, label) => (
    <button
      onClick={() => setPage(id)}
      style={{
        padding: '6px 12px',
        marginRight: 8,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        background: page === id ? '#0B51C5' : '#DEDEDE',
        color: page === id ? '#fff' : '#000',
      }}
    >
      {label}
    </button>
  )

  return (
    <div>
      {/* <div style={{ padding: 8, background: '#F3F5F7', borderBottom: '1px solid #DEDEDE' }}>
        {navBtn('extraction', 'Extraction')}
        {navBtn('chatbot', 'ChatBot')}
      </div> */}
      {/* {page === 'extraction' ? <ExtractionLauncher /> : <ChatBotLauncher />} */}
      <ExtractionLauncher />
      <ChatBotLauncher />
    </div>
  )
}

export default App
