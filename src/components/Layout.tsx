import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
