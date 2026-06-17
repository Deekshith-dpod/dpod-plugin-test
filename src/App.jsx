import { useState } from 'react'
import "./app.css"

import ChatBotLauncher from './ChatBot';
import DpodNewExtractionTraining from './dpod_new_extraction_training';
import SFSNewExtractionTraining from './sfs_new_extraction_training';
import SFSOldExtractionTraining from './sfs_old_extraction_training';


function App() {

  const [view, setView] = useState('menu')

  return (
    <div>

      {view === 'menu' && (
        <div>
          <button onClick={() => setView('chat')}>Chat</button>
          <button onClick={() => setView('dpod_new')}>Dpod New</button>
          <button onClick={() => setView('sfs_old')}>SFS Old</button>
          <button onClick={() => setView('sfs_new')}>SFS NEW</button>
        </div>
      )}

      {view === 'chat' && (<ChatBotLauncher />)}

      {view === 'dpod_new' && (
        <DpodNewExtractionTraining
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

      {view === 'sfs_old' && (
        <SFSOldExtractionTraining
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

      {view === 'sfs_new' && (
        <SFSNewExtractionTraining
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

    </div>
  )
}

export default App
