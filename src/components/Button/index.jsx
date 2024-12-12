

// eslint-disable-next-line react/prop-types
export default function Button({ label, type="button", onClick, className }) {

    return (
        <button type={type} onClick={onClick} className={ `${className} px-[24px] py-[12px]`}>{label}</button>
    );
  }
  