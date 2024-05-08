import { AuthContextProvider } from './provider/AuthContextProvider'
import AppRouter from './router/AppRouter'

function App() {

  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  )
}

export default App
