/* eslint-disable react/prop-types */
const StatisticWrapper = ({ data }) => {
  const { totalDelivered, totalOnDelivery, totalCancelled } = data;
  return (
    <>
      <div className="flex flex-col lg:flex-row mx-auto my-8 gap-4 justify-center items-center lg:w-full">
        {/* Card */}
        <div
          className={`w-[320px] h-[134px] bg-revamp-secondary-400 rounded-2xl`}>
          <div className="flex flex-row items-center gap-2 p-4 justify-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-revamp-neutral-1">
                Total Delivered Today
              </h3>
              <h4 className="text-[48px] font-bold text-revamp-neutral-1">
                {totalDelivered}
              </h4>
            </div>
          </div>
        </div>
        {/* Card */}
        <div
          className={`w-[320px] h-[134px] bg-revamp-secondary-400 rounded-2xl`}>
          <div className="flex flex-row items-center gap-2 p-4 justify-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-revamp-neutral-1">
                On Delivery Today
              </h3>
              <h4 className="text-[48px] font-bold text-revamp-neutral-1">
                {totalOnDelivery}
              </h4>
            </div>
          </div>
        </div>
        {/* Card */}
        <div
          className={`w-[320px] h-[134px] bg-revamp-secondary-400 rounded-2xl`}>
          <div className="flex flex-row items-center gap-2 p-4 justify-center">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-revamp-neutral-1">
                Canceled Delivery
              </h3>
              <h4 className="text-[48px] font-bold text-revamp-neutral-1">
                {totalCancelled}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticWrapper;
