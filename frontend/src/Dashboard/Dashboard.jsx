import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import WatchList from "./Sidebar/Watchlist";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";
import Menu from "./Navbar/Menu";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  return (
    <>
      <SidebarProvider>
        <GeneralContextProvider>
          <WatchList />
          <SidebarInset>
            <main>
              <Menu />
              <Outlet />
            </main>
          </SidebarInset>
        </GeneralContextProvider>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
