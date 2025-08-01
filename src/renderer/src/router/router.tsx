import EditView from '@renderer/pages/edit'
import { createHashRouter } from 'react-router-dom'

const routers = createHashRouter([
  {
    path: '/',
    element: <EditView />
  }
])

export { routers }
