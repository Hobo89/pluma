import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BookingPage } from "./pages/BookingPage";
import { MemberCardPage } from "./pages/MemberCardPage";
import { LegalPage } from "./pages/LegalPage";
import { PricingPage } from "./pages/PricingPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="book" element={<BookingPage />} />
        <Route path="member-card" element={<MemberCardPage />} />
        <Route path="aviso-legal" element={<LegalPage page="notice" />} />
        <Route path="privacidad" element={<LegalPage page="privacy" />} />
        <Route path="cookies" element={<LegalPage page="cookies" />} />
      </Route>
    </Routes>
  );
}
