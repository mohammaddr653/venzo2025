interface TitleCentralProps {
  title?: string;
  class?: string;
  icon?: boolean;
}

const TitleCentral = (props: TitleCentralProps) => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3">
      <hr className="w-full text-neutral-300" />
      <h3
        className={`${props.class} flex flex-row items-center justify-center gap-1`}
      >
        <span>{props.title}</span>
        {props.icon ? <i className="bi bi-chevron-left text-size13"></i> : null}
      </h3>
      <hr className="w-full text-neutral-300" />
    </div>
  );
};
export default TitleCentral;
