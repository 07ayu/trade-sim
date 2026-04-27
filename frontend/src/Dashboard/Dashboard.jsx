import React, { useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import WatchList from "./Sidebar/Watchlist";
import { Outlet } from "react-router-dom";
import Menu from "./Navbar/Menu";
import { GeneralContextProvider } from "./GeneralContext";
import { socket } from "../network/socket_api";
import { toast } from "react-toastify";

const Dashboard = () => {
  useEffect(() => {
    console.log("[Dashboard] Connecting socket...");
    socket.connect();

    socket.on("connect", () => {
      console.log("[Dashboard] Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("[Dashboard] Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("[Dashboard] Socket connection error:", err.message);
    });

    socket.on("order_status_update", (data) => {
      console.log("[Dashboard] Order status update:", data);
      toast.info(`Order for ${data.symbol}: ${data.status}`, {
        position: "bottom-right",
        theme: "dark",
      });
    });

    return () => {
      console.log("[Dashboard] Cleaning up socket...");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("order_status_update");
      socket.disconnect();
    };
  }, []);

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
