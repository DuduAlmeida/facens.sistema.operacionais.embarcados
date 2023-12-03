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
import SignUp from "./pages/Register/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Header}>
      <Route index Component={HomePage} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={SignUp} />
      <Route path="/compras" Component={MinePage} />
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
