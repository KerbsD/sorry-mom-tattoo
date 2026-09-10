import { anton, emgaramond } from "@/utils/Fonts";
import BookButton from "@/components/Buttons/Home/BookButton";

function HomeHero() {
  return (
    <section className="mx-auto mt-40 flex max-w-400 flex-col items-center gap-6 px-6 sm:mt-60 sm:flex-row sm:items-end sm:justify-between sm:gap-0">
      <div className="flex flex-col items-center sm:items-start">
        <h1
          className={`${anton.className} mb-4 text-center text-5xl tracking-wide text-white sm:text-6xl`}
        >
          SORRY MOM TATTOO
        </h1>
        <p
          className={`${emgaramond.className} text-2xl tracking-tighter text-white/60 italic`}
        >
          &quot;Ink First, Apologize Later&quot;
        </p>
      </div>

      <BookButton />
    </section>
  );
}

export default HomeHero;
