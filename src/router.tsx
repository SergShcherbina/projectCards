import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { Spinner } from './assets'
import { EditProfile } from './components/auth/edit-profile'
import { Decks } from './pages'
import { Cards } from './pages/cards'
import { LearnPage } from './pages/learn/learn-page.tsx'
import { Page404 } from './pages/page-404/page-404.tsx'
import { SignInPage } from './pages/sign-in/sign-in.tsx'
import { SignUpPage } from './pages/sign-up/sign-up-page.tsx'
import { useMeQuery } from './services/auth'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
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
    path: '/learn/:deckId',
    element: <LearnPage />,
  },
  {
    path: 'profile',
    element: <EditProfile />,
  },
  {
    path: '/404',
    element: <Page404 />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
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

  if (isLoading) return <Spinner />

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
