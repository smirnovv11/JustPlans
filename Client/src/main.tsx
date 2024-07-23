import "./index.css"
import React from "react"
import { createRoot } from "react-dom/client"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Paths } from "../paths"
import Notes from "./pages/notes"
import Authorization from "./pages/auth"
import Layout from "./components/layout"
import Note from "./pages/note"
import Auth from "./features/user/userAuth"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: Paths.home,
        element: (
          <Auth>
            <Notes />
          </Auth>
        ),
      },
      {
        path: `${Paths.notes}/:id`,
        element: (
          <Auth>
            <Note />
          </Auth>
        ),
      },
      {
        path: Paths.auth,
        element: <Authorization />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
