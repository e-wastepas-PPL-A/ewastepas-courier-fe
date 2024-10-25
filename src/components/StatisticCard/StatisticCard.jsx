/* eslint-disable react/prop-types */
const StatisticCard = ({ title, value }) => {
  return (
    <div className={`w-[259px] h-[134px] bg-revamp-secondary-400 rounded-2xl`}>
      <div className="flex flex-row items-center gap-2 p-4 justify-center">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold text-revamp-neutral-1">{title}</h3>
          <h4 className="text-[48px] font-bold text-revamp-neutral-1">
            {value}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
