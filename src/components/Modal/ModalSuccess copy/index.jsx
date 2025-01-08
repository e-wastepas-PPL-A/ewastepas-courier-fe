import Modal from "..";
import ImageWithFallback from "../../TagImage/ImageWithFallback";
import IcSUccess from "../../../assets/ic-success.svg"

// eslint-disable-next-line react/prop-types
export default function ModalSuccess({ title, desctiption, label, isOpen }) {

    return (
        <Modal isOpen={isOpen} label={label}>
            <div className="flex flex-col justify-center items-center gap-2">
                <ImageWithFallback src={IcSUccess} className={"w-[130px] h-[130px]"}/>
                <h2 className="text-revamp-success-500 text-[24px] font-[600]">{title}</h2>
                <p className="text-revamp-neutral-8 text-[16px] font-[600]">{desctiption}</p>
            </div>
         </Modal>
    );
  }
  