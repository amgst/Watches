import { ChevronDown } from "lucide-react";
import heroImage from "@assets/generated_images/Luxury_watch_movement_macro_4690fb2e.png";

export function Hero() {
  const scrollToCatalog = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-light text-white mb-6 tracking-tight">
          Curated Collection of
          <br />
          Fine Timepieces
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover exceptional craftsmanship from the world's most prestigious
          watchmakers
        </p>
        <button
          onClick={scrollToCatalog}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white uppercase tracking-widest text-sm font-medium hover-elevate transition-all duration-300"
          data-testid="button-explore"
        >
          Explore Collection
        </button>
      </div>

      <button
        onClick={scrollToCatalog}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        data-testid="button-scroll"
        aria-label="Scroll to catalog"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
