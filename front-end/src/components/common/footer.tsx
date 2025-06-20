import { Logo } from "../../../config";
import SocialIcons from "./social-icons";

const Footer = () => {
  return (
    <>
      <footer>
        <div
          id="footer-container"
          className="flex flex-col gap-20 border-t border-neutral-200 py-10 px-5 md:px-20"
        >
          <div className="flex flex-col md:flex-row justify-between gap-5 items-center">
            <div className=" w-full flex flex-col gap-8">
              <div className="flex flex-row justify-between items-center">
                <img src={Logo} className="" alt="logo" width={60} />
                <div className="flex flex-row gap-4">
                  <SocialIcons></SocialIcons>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3 justify-start text-neutral-700">
                <div className="flex flex-row gap-2">
                  <h4 className="text-size14 font-weight300 text-nowrap">
                    تماس با پشتیبانی :
                  </h4>
                  <span>09377372231</span>
                </div>
                <span className="hidden md:flex bg-secondary rounded-2xl w-0.5 self-stretch"></span>
                <div className="flex flex-row gap-2">
                  <h4 className="text-size14 font-weight300 text-nowrap">
                    آدرس فروشگاه :
                  </h4>
                  <span className="text-justify">
                    تهران ، حسن آباد ، خیابان حافظ ، روبروی بیمارستان نجمیه ،
                    خوابگاه دانشجویی تربیت دبیر رجایی
                  </span>
                </div>
              </div>
            </div>
            <div className=" w-full flex flex-row gap-3 justify-end">
              <div className="aspect-[14/16] border border-neutral-200 rounded-xl">
                <img src="/images/icons/logo.png" alt="" />
              </div>
            </div>
          </div>
          <p className="text-size14 text-center  text-neutral-700">
            کلیه حقوق این وب‌سایت متعلق به شرکت آینده گستران زرین وانیا (فروشگاه
            آنلاین اگزو) است - Copyright 2015-2025© Exo.ir - All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
