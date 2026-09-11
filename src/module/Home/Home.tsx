import HomeHero from "./HomeHero";
import HomeTeaserVid from "./HomeTeaserVid";
import HomeAbout from "./HomeAbout";
import HomeBooking from "./HomeBooking";

function Home() {
  return (
    <section>
      <HomeHero />
      <HomeTeaserVid />
      <HomeAbout />
      <HomeBooking />
    </section>
  );
}

export default Home;
