//this button used for loading buttons

const LoadingButton = (props: any) => {
  return (
    <button
      type="submit"
      disabled={props.loading | props.disabled ? true : false}
    >
      {props.loading ? "loading" : props.children}
    </button>
  );
};
export default LoadingButton;
