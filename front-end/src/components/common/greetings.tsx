import SocialIcons from "./social-icons";

const Greetings = () => {
  return (
    <div className="relative px-5 md:px-20 w-full bg-[rgba(255,255,255,0.24)] bg-blend-lighten flex items-center justify-center md:justify-end h-[100vh] bg-[url(/images/living_room_design_2-wallpaper-1920x1080.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col bg-[#000000bb] border rounded-lg backdrop-blur-xs border-neutral-300 gap-3 items-center">
        <div className="p-12 flex flex-col gap-3 items-center justify-start">
          <h4 className="font-weight300 text-amber-300 text-size24 text-shadow-lg text-shadow-glass-shadow">
            رواقِ منظرِ چشم من آشیانه توست
          </h4>
          <p className="font-weight200 text-neutral-50 text-size17 text-shadow-lg text-shadow-glass-shadow">
            کرم نما و فرود آ که خانه خانه توست ❤
          </p>
        </div>
        <div className="mt-auto flex items-center gap-2 p-5 justify-between w-full">
          <h4 className="text-size13 text-white font-weight200">
            مجموعه هنری آناناس
          </h4>
          <div className="flex gap-1">
            <SocialIcons
              width={"17px"}
              height={"17px"}
              fill={"whitesmoke"}
            ></SocialIcons>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
