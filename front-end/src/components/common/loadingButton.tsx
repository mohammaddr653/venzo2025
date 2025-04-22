//this button used for loading buttons

const LoadingButton = (props: any) => {
  if (props.loading) {
    return (
      <button type="submit" disabled>
        loading
      </button>
    );
  } else {
    return <button type="submit">{props.children}</button>;
  }
};
export default LoadingButton;
