import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide from '../assets/vertical-slide-1.png';
import InputPassword from '../components/Input/InputPassword';
import FooterBar from '../components/Register/FooterBar';
import { changeForgot } from "../services";
import validatePassword from "../utils/ValidationPassword";
import validateConfrimPassword from "../utils/ValidationConfirmPassword";
import ModalSuccess from "../components/Modal/ModalSuccess/index.jsx";

export default function PageName() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading
    const [errorMessage, setErrorMessage] = useState({
        password: "",
        confirmPassword: "",
    });
    const [modalItem, setModalItem] = useState({});

    useEffect(() => {
        document.title = "E-Wastepas | Register";
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handleRegister = async () => {
        validatePassword(password)
        validateConfrimPassword(confirmPassword)

        if(isDisabled){
            return;
        }

        const payload = {
            new_password: password,
            confirm_new_password: confirmPassword
        };

        setIsLoading(true); // Set loading state to true

        try {
            const response = await changeForgot(payload, token);
            if (response.status === 200) {
                setModalItem({ isOpen: true, title: "Berhasil", description: "Kata sandi berhasil diubah.", to: "/login" });
                setError(null);
            } else {
                setError(response.response.data.error);
            }

        } catch {
            setError("An error occurred during registration. Please try again.");
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    // Determine if the button should be disabled
    const isDisabled = !password || !confirmPassword || errorMessage.password || errorMessage.confirmPassword;
    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <ModalSuccess isOpen={modalItem?.isOpen} setIsOpen={setModalItem} title={modalItem?.title} description={modalItem?.description} to={modalItem?.to} label={"Oke"}/>
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Ubah Kata Sandi</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Kata sandi Anda yang sebelumnya telah direset. Silakan tetapkan kata sandi baru untuk akun Anda</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    <div className="mb-[24px]">
                    <InputPassword
                            label={'Kata Sandi'}
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                                setErrorMessage((prev) => ({
                                    ...prev,
                                    password: validatePassword(value)
                                }));
                            }}
                            errorMessage={errorMessage.password}
                            isValidateCheck={true}
                        />
                        <InputPassword
                            label={'Konfirmasi Kata Sandi'}
                            value={confirmPassword}
                            onChange={(value) => {
                                setConfirmPassword(value);
                                setErrorMessage((prev) => ({
                                    ...prev,
                                    confirmPassword: validateConfrimPassword(value, password)
                                }));
                            }}
                            errorMessage={errorMessage.confirmPassword}
                        />
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleRegister}
                            disabled={isLoading} // Use the calculated disabled state
                        >
                            {isLoading ? 'Loading...' : 'Tetapkan Kata Sandi'} {/* Display loading text */}
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">Anda sudah memiliki akun? <a href="/login" className="text-revamp-error-300">Login</a></span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
}
