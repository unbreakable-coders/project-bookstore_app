import { Outlet } from "react-router-dom";
import { Header } from "../../organisms/Header";
import { Footer } from "../../organisms/Footer";
import { HeaderDiscountBar } from "@/components/molecules/HeaderDiscountBar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <HeaderDiscountBar />

      <Footer />
    </div>
  );
};
