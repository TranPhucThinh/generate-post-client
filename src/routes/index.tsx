import { RouteObject, useRoutes } from 'react-router-dom'
import Pages from '@/pages'

const routeList: RouteObject[] = [
  {
    path: '/',
    element: <Pages.HomePage />
  },
  {
    path: '/posts/:id',
    element: <Pages.Post />
  }
]

const RenderRouter: React.FC = () => {
  const element = useRoutes(routeList)

  return element
}

export default RenderRouter
