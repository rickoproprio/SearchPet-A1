import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import Home from "./routes/pages/Home.jsx";
import Contact from "./routes/pages/Contact.jsx";
import Blazon from "./routes/pages/Blazon.jsx";
import Service from "./routes/pages/Service.jsx";
import ErrorPage from "./routes/pages/ErrorPage.jsx";
import User from "./routes/pages/User.jsx";
import tel from "./services/tel.jsx"
import ContactDetails from "./components/ContactDetails.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blazon",
        element: <Blazon />,
      },
      {
        path: "service",
        element: <Service />,
        children: [
          {
            path: "cpf",
            element: tel(12997675520),
          }
        ]
      },
      {
        path: "/contact/:id",
        element: <ContactDetails />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "oldcontact",
        element: <Navigate to="/contact" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


const name = "Fsystem Private";

export default name;