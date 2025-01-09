/* eslint-disable react/prop-types */
import placeholderImage from "../../assets/placeholder.png";
import patternImage from "../../assets/pattern.jpg";

const ProductCard = ({ name, image }) => {
  return (
    <div
      className="bg-revamp-secondary-400 hover:bg-revamp-secondary-500 hover:shadow-lg rounded-3xl py-6 h-[200px] w-full items-center justify-center aspect-square transition-colors duration-200 bg-cover bg-center shadow-md"
      style={{ backgroundImage: `url(${patternImage})` }}>
      <div className="rounded-md flex items-center justify-center mb-4">
        {image === null ? (
          <img
            src={placeholderImage}
            alt={name}
            className="w-24 h-24 object-contain"
          />
        ) : (
          <img src={image} alt={name} className="w-24 h-24 object-contain" />
        )}
      </div>
      <div className="bg-white p-2 w-full h-[65px] rounded-br-md rounded-bl-md">
        <p className="flex justify-center text-revamp-secondary-500 font-semibold">
          {name}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
