const GoUp = () => {
  const handleGoUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className="fixed bottom-0 left-0 my-10 mx-10 md:mx-25 px-3 py-2 rounded-md bg-primary z-20 opacity-50 cursor-pointer hover:opacity-100 transition-opacity duration-300"
      onClick={handleGoUp}
    >
      <i className="bi bi-chevron-up text-white text-shadow-lg shadow-black"></i>
    </button>
  );
};

export default GoUp;
