const TrustBar = () => {
  return (
    <>
      <div className="flex flex-row gap-10 flex-wrap [&>*]:grow">
        <div className=" flex flex-col items-center justify-between rounded-xl py-3 gap-3 basis-50">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/images/icons/icons8-support-96 (2).png"
              width={80}
              alt=""
            />
            <h3 className="text-size14 font-weight300 text-neutral-500">
              پشتیبانی 24 ساعته
            </h3>
          </div>
          <p className="text-size14 hidden md:block font-weight200 text-cu-neutral-800 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است،
          </p>
        </div>
        <div className=" flex flex-col items-center justify-between rounded-xl py-3 gap-3 basis-50">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/images/icons/icons8-delivery-time-96.png"
              width={80}
              alt=""
            />
            <h3 className="text-size14 font-weight300 text-neutral-500">
              تحویل سریع
            </h3>
          </div>
          <p className="text-size14 hidden md:block font-weight200 text-cu-neutral-800 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است،
          </p>
        </div>
        <div className=" flex flex-col items-center justify-between rounded-xl py-3 gap-3 basis-50">
          <div className="flex flex-col items-center gap-1">
            <img src="/images/icons/icons8-money-96.png" width={80} alt="" />
            <h3 className="text-size14 font-weight300 text-neutral-500">
              درگاه پرداخت ایمن
            </h3>
          </div>
          <p className="text-size14 hidden md:block font-weight200 text-cu-neutral-800 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است،
          </p>
        </div>
        <div className=" flex flex-col items-center justify-between rounded-xl py-3 gap-3 basis-50">
          <div className="flex flex-col items-center gap-1">
            <img
              src="/images/icons/icons8-transaction-96.png"
              width={80}
              alt=""
            />
            <h3 className="text-size14 font-weight300 text-neutral-500">
              7روز ضمانت بازگشت وجه
            </h3>
          </div>
          <p className="text-size14 hidden md:block font-weight200 text-cu-neutral-800 text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است،
          </p>
        </div>
      </div>
    </>
  );
};
export default TrustBar;
