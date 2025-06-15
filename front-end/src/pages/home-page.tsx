import Header from "../components/common/header";
import HeroCard from "../components/common/hero-card";
import HomeBanner from "../components/common/home-banner";
import TrustBar from "../components/common/trust-bar";
import { useUserStore } from "../store";
import "../assets/css/home-page.css";
import HomeLittleBanner from "../components/common/home-little-banner";
import ProductsArchive from "../components/common/productsArchive";

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <>
      <Header></Header>
      <main className="pt-17">
        <div className="homepage-container">
          <div className="px-5 md:px-20 flex flex-col-reverse lg:flex-row gap-2">
            <div className="hero-card w-full lg:w-1/4 rounded-xl bg-linear-0 from-amber-700 to-secondary">
              <HeroCard></HeroCard>
            </div>
            <div className="w-full lg:w-3/4">
              <HomeBanner></HomeBanner>
            </div>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <TrustBar></TrustBar>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <HomeLittleBanner></HomeLittleBanner>
          </div>
          <div className="px-5 md:px-20 mt-5">
            <ProductsArchive></ProductsArchive>
          </div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <div className="p-1"></div>
          <h1>home page</h1>
          <div className="bg-sky-600">this is tailwind</div>
          <div className="bg-sky-300">
            this is zustand , hello{user ? user.name : " user"}
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
