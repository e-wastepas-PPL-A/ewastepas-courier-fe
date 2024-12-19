import Button from "../Button";

// eslint-disable-next-line react/prop-types
export default function Modal({ children, isOpen, setIsOpen, label, to }) {

  const handleClose = () => {
    setIsOpen(false);
    if (to) {
      window.location.href = to;
    }
  };

  return (
    <div className={`${!isOpen && "hidden"} fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center`}>
      <div className="!w-full !h-[100dvh] !bg-black opacity-[0.8]" style={{ backgroundColor: "black" }} onClick={handleClose}></div>
      <div className="fixed px-[12px] py-[24px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] max-w-[600px] w-[600px] overflow-x-auto">
            {children}
          {label && (
            <div className='flex justify-center mt-4'>
             <Button onClick={handleClose} label={label}/>
            </div>
          )}
        </div>
      </div>
  );
}
