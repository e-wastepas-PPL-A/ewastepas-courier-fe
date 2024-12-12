// eslint-disable-next-line react/prop-types
export default function Modal({ children, isOpen }) {

  return (
    <div className={`${isOpen ? "opacity-0" : "opacity-[1]"} fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center`}>
      <div className="w-full h-[100dvh] bg-black opacity-[0.8]"></div>
      <div className="fixed p-[12px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] w-[400px] overflow-x-auto">
            {children}
        </div>
      </div>
  );
}
