interface PropertySelectorProps {
  type: "color" | "ordinary";
  propertyval: any;
  formData: any;
}
const PropertySelector = (props: PropertySelectorProps) => {
  if (props.type === "color") {
    return (
      <div className="rounded px-3 py-1 rounded-lg relative w-[32px] aspect-square flex items-center justify-center property-selector-box">
        <span
          className={`absolute w-[40px] aspect-square rounded-full border border-neutral-300 z-0 outer ${
            props.formData.selectedPropertyvalString ===
            props.propertyval.propertyval._id
              ? "bg-lime-500"
              : "bg-transparent"
          }`}
        ></span>
        <span
          className="absolute w-full h-full border-2 rounded-full border-white z-10 inner"
          style={{
            backgroundColor: "#" + props.propertyval.propertyval.hex.toString(),
          }}
        ></span>
        <i className="bi bi-list-check"></i>
      </div>
    );
  }
  if (props.type === "ordinary") {
    return (
      <div className="bg-secondary px-3 py-1 rounded-lg">
        {props.propertyval.propertyval.value}
      </div>
    );
  }
};

export default PropertySelector;
