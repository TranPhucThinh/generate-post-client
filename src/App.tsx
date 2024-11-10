import { BrowserRouter } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import RenderRouter from '@/routes'
import { Suspense } from 'react'

function App() {
  return (
    <Suspense>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
