import Header from "../components/common/header";
import HeroCard from "../components/common/hero-card";
import HomeBanner from "../components/common/home-banner";
import TrustBar from "../components/common/trust-bar";
import { useUserStore } from "../store";
import HomeLittleBanner from "../components/common/home-little-banner";
import ProductsArchive from "../components/common/productsArchive";
import Footer from "../components/common/footer";
import ProductsCarousel from "../components/common/newestProductsCarousel";
import OffProductsCarousel from "../components/common/offProductsCarousel";

const HomePage = () => {
  return (
    <>
      <Header></Header>
      <main className="pt-17 pb-15">
        <div className="homepage-container flex flex-col gap-5">
          <div className="flex flex-col-reverse lg:flex-row gap-2 lg:px-20 px-0">
            <div className="w-full lg:w-1/4 px-5 lg:px-0 hidden lg:block">
              <HeroCard></HeroCard>
            </div>
            <div className="w-full lg:w-3/4">
              <HomeBanner></HomeBanner>
            </div>
          </div>
          <div className="px-5 md:px-20">
            <TrustBar></TrustBar>
          </div>
          <div className="px-5 md:px-20">
            <HomeLittleBanner></HomeLittleBanner>
          </div>
          <div className="w-full lg:w-1/4 px-5 lg:px-0 lg:hidden">
            <HeroCard></HeroCard>
          </div>
          <div className="px-5 md:px-20">
            <ProductsCarousel></ProductsCarousel>
          </div>
          <div className="px-5 md:px-20">
            <OffProductsCarousel></OffProductsCarousel>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
export default HomePage;
