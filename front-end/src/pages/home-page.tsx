import Header from "../components/common/header";
import HomeBanner from "../components/common/home-banner";
import TrustBar from "../components/common/trust-bar";
import { useUserStore } from "../store";

const HomePage = () => {
  const { user } = useUserStore();
  return (
    <>
      <Header></Header>
      <main className="pt-17">
        <div className="px-5 md:px-20">
          <HomeBanner></HomeBanner>
        </div>
        <div className="px-5 md:px-20 mt-5">
          <TrustBar></TrustBar>
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
      </main>
    </>
  );
};
export default HomePage;
