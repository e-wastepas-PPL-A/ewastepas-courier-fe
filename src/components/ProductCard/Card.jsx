/* eslint-disable react/prop-types */
const ProductCard = ({ name, image }) => {
  return (
    <div className="bg-revamp-secondary-400 hover:bg-revamp-secondary-500 hover:shadow-lg rounded-lg p-6 flex flex-col items-center justify-center aspect-square transition-colors duration-200">
      <div className="bg-white rounded-md flex items-center justify-center mb-4">
        <img src={image} alt={name} className="w-24 h-24 object-contain" />
      </div>
      <p className="text-white font-semibold">{name}</p>
    </div>
  );
};

export default ProductCard;
