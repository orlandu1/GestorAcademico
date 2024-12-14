import React from 'react'
import AppRoutes from './routes/routes'
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { TarefasProvider } from '../src/hookies/useTarefas';

import './App.css'

function App() {

  return (
    <>
      <div>
        <TarefasProvider>
          <BrowserRouter>
            <AppRoutes />
            <Sidebar />
          </BrowserRouter>
        </TarefasProvider>
      </div>
    </>
  )
}

export default App
