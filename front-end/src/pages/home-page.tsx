import Header from "../components/common/header";
import HeroCard from "../components/common/hero-card";
import HomeBanner from "../components/common/home-banner";
import TrustBar from "../components/common/trust-bar";
import { useUserStore } from "../store";
import HomeLittleBanner from "../components/common/home-little-banner";
import ProductsArchive from "../components/common/productsArchive";
import Footer from "../components/common/footer";
import NewestProductsCarousel from "../components/common/newestProductsCarousel";
import OffProductsCarousel from "../components/common/offProductsCarousel";
import Greetings from "../components/common/greetings";
import ItemsSlidshow from "../components/common/items-slideshow";

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <main className="pb-15">
        <div className="homepage-container flex flex-col gap-5">
          <div className="bg-red-400">
            <Greetings></Greetings>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-3 lg:px-20 px-0">
            <div className="w-full lg:flex-[1] px-5 lg:px-0 hidden lg:block">
              <HeroCard></HeroCard>
            </div>
            <div className="w-full lg:flex-[3] px-5 md:px-20 lg:px-0 my-5 lg:my-0">
              <ItemsSlidshow></ItemsSlidshow>
            </div>
          </div>
          <div className="px-5 md:px-20">
            <TrustBar></TrustBar>
          </div>
          <div className="px-5 md:px-20">
            <HomeLittleBanner></HomeLittleBanner>
          </div>
          <div className="w-full lg:w-1/4 px-5 md:px-20 lg:hidden">
            <HeroCard></HeroCard>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <NewestProductsCarousel></NewestProductsCarousel>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <OffProductsCarousel></OffProductsCarousel>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default HomePage;
