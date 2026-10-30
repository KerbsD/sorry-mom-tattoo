import { anton } from "@/utils/fonts";
import PortfolioCarousel from "./PortfolioCarousel";
import usePortfolio from "./usePortfolio";

async function Portfolio() {
  const { items } = await usePortfolio();

  if (items.length === 0) {
    return (
      <section className="min-h-[75dvh] flex-1">
        <div className="flex flex-col items-center px-6 pt-40 text-center">
          <h1 className={`text-6xl leading-none ${anton.className}`}>
            SMT PORTFOLIO
          </h1>
          <p className="mt-6 text-sm text-white/60 sm:text-base">
            Gallery of tattoos done by Sorry Mom.
          </p>
          <p className="mt-16 text-white/50">
            s No portfolio pieces are published yet. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return <PortfolioCarousel items={items} />;
}

export default Portfolio;
