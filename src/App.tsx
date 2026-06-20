import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-16">
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
