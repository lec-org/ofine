import { RouterProvider } from 'react-router-dom'
import { routers } from './router/router'

function App(): React.JSX.Element {
  return <RouterProvider router={routers} />
}

export default App
