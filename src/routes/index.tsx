import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { LiquidBackground } from "@/components/portfolio/primitives";
import { Navbar, Hero, About, History, Projects, Contact, Footer } from "@/components/portfolio/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "orzech — Full Stack Developer" },
      { name: "description", content: "Portfolio of a full stack developer crafting precise, fluid and refined web interfaces." },
      { property: "og:title", content: "orzech — Full Stack Developer" },
      { property: "og:description", content: "Portfolio of a full stack developer crafting precise, fluid and refined web interfaces." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/logo-7.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo-7.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <div className="grain relative min-h-screen overflow-x-hidden">
        <LiquidBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <History />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
