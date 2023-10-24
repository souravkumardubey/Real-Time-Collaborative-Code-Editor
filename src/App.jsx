import "./App.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { Toaster } from "sonner";

const routes = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/editor/:roomId',
        element:<EditorPage/>
    }
])
const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
        <RouterProvider router={routes}/>
    </>
  );
};

export default App;
