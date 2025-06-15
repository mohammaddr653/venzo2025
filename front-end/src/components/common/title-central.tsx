const TitleCentral = (props: any) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-5 py-10">
      <hr className="w-full text-neutral-300" />
      <h3 className="text-size24 text-neutral-600 font-weight300 text-nowrap">
        {props.title}
      </h3>
      <hr className="w-full text-neutral-300" />
    </div>
  );
};
export default TitleCentral;
