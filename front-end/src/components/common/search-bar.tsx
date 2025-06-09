const SearchBar = (props:any) => {
  return (
    <input
      type="text"
      className={`border rounded-xl border-cu-neutral-700 py-2 w-52 px-3 text-size14 ${props.className}`}
      placeholder="جستجو..."
    />
  );
};
export default SearchBar;
