interface PropertySelectorProps {
  type: "color" | "ordinary";
  propertyval: any;
  formData: any;
}
const PropertySelector = (props: PropertySelectorProps) => {
  if (props.type === "color") {
    return (
      <span
        className={`w-8 h-8 flex border-2 rounded-full border-white z-10 inner ${
          props.formData.selectedPropertyvalString ===
            props.propertyval.propertyval._id &&
          "border-2 border-white outline-2 outline-green-600"
        }`}
        style={{
          backgroundColor: "#" + props.propertyval.propertyval.hex.toString(),
        }}
      ></span>
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
