//this button used for loading buttons

interface LoadingButtonProps {
  loading?: any;
  disabled?: any;
  form?: any;
  children?: any;
}

const LoadingButton = (props: LoadingButtonProps) => {
  return (
    <button
      type="submit"
      disabled={props.loading | props.disabled ? true : false}
      form={props.form}
    >
      {props.loading ? "loading" : props.children}
    </button>
  );
};
export default LoadingButton;
