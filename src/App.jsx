import { useState } from 'react'
import "./app.css"

import ChatBotLauncher from './ChatBot';

import ExtractionPluginSFSQat from './SFSQat';
import ExtractionPluginSFSProd from './SFSProd'
import ExtractionPluginSFSProdNew from './SFSProdNew';

function App() {

  const [view, setView] = useState('menu')

  return (
    <div>

      {view === 'menu' && (
        <div>
          <button onClick={() => setView('chat')}>Chat</button>
          <button onClick={() => setView('qat')}>SFS QAT</button>
          <button onClick={() => setView('prod')}>SFS PROD</button>
          <button onClick={() => setView('new-prod')}>SFS NEW PROD</button>
        </div>
      )}

      {view === 'chat' && (<ChatBotLauncher />)}

      {view === 'qat' && (
        <ExtractionPluginSFSQat
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

      {view === 'prod' && (
        <ExtractionPluginSFSProd
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

      {view === 'new-prod' && (
        <ExtractionPluginSFSProdNew
          previewMode={true}
          setPreviewMode={() => setView('menu')}
        />
      )}

    </div>
  )
}

export default App
