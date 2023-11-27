import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./pages/Home";
import MinePage from "./pages/Mine";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Header}>
      <Route index Component={HomePage} />
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
