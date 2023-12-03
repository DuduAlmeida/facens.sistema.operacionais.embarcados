import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Home";
import MinePage from "./pages/Mine";
import Login from "./pages/Login/login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Header}>
      <Route index Component={HomePage} />
      <Route path="/compras" Component={MinePage} />
      <Route path="/login" Component={Login} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
