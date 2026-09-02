import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/sop/Header";
import Footer from "@/components/sop/Footer";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
