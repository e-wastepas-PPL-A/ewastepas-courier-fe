import Modal from "../";
import ImageWithFallback from "../../TagImage/ImageWithFallback";
import Button from "../../Button";

// eslint-disable-next-line react/prop-types
export default function ModalSuccess({ title, desctiption, isButton }) {

    return (
        <Modal>
            <div className="flex justify-center">
                <ImageWithFallback src={"/ic-success.svg"}/>
                <h2 className="text-revamp-success-500">{title}</h2>
                <p>{desctiption}</p>
                {isButton &&(
                    <Button lanbel="Ok"/>
                )}
            </div>
         </Modal>
      
    );
  }
  