import Modal from "..";
import ImageWithFallback from "../../TagImage/ImageWithFallback";
import IcError from "../../../assets/ic-error.svg"

// eslint-disable-next-line react/prop-types
export default function ModalError({ title, description, label, isOpen, setIsOpen, to }) {

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} label={label} to={to}>
            <div className="flex flex-col justify-center items-center gap-2">
                <ImageWithFallback src={IcError} className={"w-[130px] h-[130px]"}/>
                <h2 className="text-revamp-error-500 text-[24px] font-[600]">{title}</h2>
                <p className="text-revamp-neutral-8 text-[16px] font-[600]">{description}</p>
            </div>
         </Modal>
    );
  }
  