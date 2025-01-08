

// eslint-disable-next-line react/prop-types
export default function Button({ label, type="button", onClick, className }) {

    return (
        <button type={type} onClick={onClick} className={ `${className} px-[24px] py-[8px] bg-revamp-secondary-600 text-white font-[700] rounded-[8px]`}>{label}</button>
    );
  }
  