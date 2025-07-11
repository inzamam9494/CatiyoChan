import App from "../App";
import HomeScreen from "../pages/HomeScreen";
import { createBrowserRouter } from "react-router-dom";
import RomsScreen from "../pages/RomsScreen";
import GameScreen from "../pages/GameScreen";

import GameDetailScreen from "../pages/GameDetailScreen";
import EmulatorsCategoryScreen from "../pages/EmulatorsCategoryScreen";
import EmulatorsScreen from "../pages/EmulatorsScreen";
import EmulatorDetailScreen from "../pages/EmulatorDetailScreen";
import RequiresRom_Emu from "../pages/RequiresRom_Emu";
import BlogScreen from "../pages/BlogScreen";
import SearchResultsScreen from "../pages/SearchResultsScreen";

// Industrial Standard: Export the router directly instead of a function
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default route for '/'
        element: <HomeScreen />,
      }, 
      {
        path: "home",
        element: <HomeScreen />,
      },
      {
        path: "roms",
        element: <RomsScreen />,
      },
      {
        path: "games/:category",
        element: <GameScreen />,
      },
      {
        path: "games/:category/:id",
        element: <GameDetailScreen />,
      },
      {
        path: "emulators",
        element: <EmulatorsCategoryScreen />,
      },
      {
        path: "emulators/:slug",
        element: <EmulatorsScreen/>
      },
      {
        path: "emulators/:slug/:id",
        element: <EmulatorDetailScreen/>
      },
      {
        path: "required_roms_emulator",
        element: <RequiresRom_Emu/>
      },
      {
        path: "search-results",
        element: <SearchResultsScreen/>
      },
      {
        path: "blog",
        element: <BlogScreen/>
      }
    ],
  },
]);

// Alternative: Keep the function approach but fix it properly
const Routers = () => {
  return router;
};

export default Routers;
