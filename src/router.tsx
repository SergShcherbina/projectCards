import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { Cards } from './pages/cards/cards.tsx'
import { Decks } from './pages/decks/decsk.tsx'
import { Decks } from './pages'
import { SignInPage } from './pages/sign-in/sign-in.tsx'
import { useMeQuery } from './services/auth/auth.api.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: 'cards/:deckId',
    element: <Cards />,
  },
  {
    path: '/learn',
    element: <div>learn</div>,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes,
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data, isLoading } = useMeQuery()

  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
