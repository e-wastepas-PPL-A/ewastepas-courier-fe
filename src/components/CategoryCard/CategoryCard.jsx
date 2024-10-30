/* eslint-disable react/prop-types */
const CategoryCard = ({ icon, title, className }) => {
  return (
    <div
      className={`flex justify-center items-center gap-1 min-w-[200px] p-4 rounded-lg shadow-lg hover:shadow-md hover:bg-revamp-secondary-500 transition-all text-white cursor-pointer ${className}`}>
      <div className="p-2 rounded-lg bg-primary-50 ">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

export default CategoryCard;
