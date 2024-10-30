import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/vertical-slide-2.png';
import InputPassword from '../components/Input/InputPassword';
import FooterBar from '../components/Register/FooterBar';
import { changePassword } from "../services";

export default function PageName() {
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    useEffect(() => {
        document.title = "E-Wastepas | Register";
        const urlParams = new URLSearchParams(window.location.search);
        setToken(urlParams.get('token'));
    }, []);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        const payload = {
            new_password: password,
            confirm_new_password: confirmPassword
        };

        setIsLoading(true); // Set loading state to true

        try {
            const response = await changePassword(payload, token);
            if (response.status === 200) {
                setSuccess("Change password successful!");
                window.location.href = "/login";
                setError(null);
            } else {
                setError(response.response.data.error);
                setSuccess(null);
            }

        } catch {
            setError("An error occurred during registration. Please try again.");
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    // Determine if the button should be disabled
    const isButtonDisabled = !password || !confirmPassword || isLoading;
    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide2} className="max-h-[90vh]" alt="Slide" />
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
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputPassword label={'Kata Sandi'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputPassword label={'Konfirmasi Kata Sandi'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isButtonDisabled ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleRegister}
                            disabled={isButtonDisabled} // Use the calculated disabled state
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
