import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BookingPage } from "./pages/BookingPage";
import { BonosPage } from "./pages/BonosPage";
import { LegalPage } from "./pages/LegalPage";
import { PricingPage } from "./pages/PricingPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="book" element={<BookingPage />} />
        {/*
          The bono page keeps its original `/member-card` address. Only the
          label changed. Renaming the path needs permanent redirects from the
          host, which GitHub Pages cannot serve; see the implementation report.
        */}
        <Route path="member-card" element={<BonosPage />} />
        <Route path="aviso-legal" element={<LegalPage page="notice" />} />
        <Route path="privacidad" element={<LegalPage page="privacy" />} />
        <Route path="cookies" element={<LegalPage page="cookies" />} />
        <Route
          path="condiciones-reserva"
          element={<LegalPage page="terms" />}
        />
        <Route
          path="condiciones-bonos"
          element={<LegalPage page="bonoTerms" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
