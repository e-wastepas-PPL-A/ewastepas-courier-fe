import IcGoogle from '../../assets/ic-google.svg'

const FooterBar = () => {
    return (
        <div className="mb-[24px]">
        <div className="flex justify-between items-center mb-[24px]">
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
            <span className="text-revamp-neutral-7 w-full">Atau masuk dengan</span>
            <span className="border border-revamp-neutral-7 border-1 w-full"></span>
        </div>
        <div className="flex justify-center">
            <div className="rounded-full shadow-lg w-fit p-[8px] flex justify-center cursor-pointer">
                <img src={IcGoogle} />
            </div>
        </div>
        </div>
    );
  };
  
  export default FooterBar;
  