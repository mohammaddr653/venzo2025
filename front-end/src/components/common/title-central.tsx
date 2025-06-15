const TitleCentral = (props:any) => {
  return (
    <div className="w-full flex flex-row gap-1">
      <h3 className="text-size24 text-neutral-700 font-weight300">{props.title}</h3>
    </div>
  );
};
export default TitleCentral;
