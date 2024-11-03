/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide1 from '../assets/vertical-slide-1.png';
import IcBack from '../assets/ic-back.svg';
import InputText from '../components/Input/InputText';
import FooterBar from '../components/Register/FooterBar';
import { verifyOtp, sendOtp } from "../services";
import { useLocation } from "react-router-dom";

export default function PageName() {
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State to manage errors
    const [success, setSuccess] = useState(null); // State to manage success messages

    useEffect(() => {
        document.title = "E-Wastepas | Login";
        const urlParams = new URLSearchParams(window.location.search);
        setEmail(urlParams.get('email'));
    }, []);

    const handleSendOtp = async () => {
        setIsLoading(true);
        const payload = {
            otp,
            email,
            type: location.pathname.split('/')[1] === 'register' ? 'registration' : 'forgot_password'
        };

        try {
            const response = await verifyOtp(payload);
            if (response.status === 200) { // Assuming 200 is the success status code
                setSuccess("OTP verified successfully!");
                setError(null); // Clear any previous error
                // Optionally, redirect the user to another page
                window.location.href = location.pathname.split('/')[1] === 'register' ? "/login" : "/forgot/change-password?token=" + response.data.token;
            } else {
                setError("OTP verification failed. Please try again.");
                setSuccess(null); // Clear any previous success message
            }

            setIsLoading(false);
        } catch (error) {
            setError("An error occurred during OTP verification. Please try again.");
            setSuccess(null); // Clear any previous success message
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        const payload = {
            email
        };

        try {
            const response = await sendOtp(payload);
            if (response.status === 200) { // Assuming 200 is the success status code
                setSuccess("OTP send successfully!");
                setError(null); // Clear any previous error
            } else {
                setError("OTP verification failed. Please try again.");
                setSuccess(null); // Clear any previous success message
            }
        } catch (error) {
            setError("An error occurred during OTP verification. Please try again.");
            setSuccess(null); // Clear any previous success message
        }
    };

    const isButtonDisabled =  !otp || isLoading;

    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <div className="text-start mb-[24px]">
                    <a href="/login" className="text-[14px] font-[500] text-revamp-neutral-9 flex gap-2 items-center">
                        <img src={IcBack} className="w-[8px]" alt="Back Icon" /> Kembali ke login
                    </a>
                </div>
                <img src={Slide1} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Verifikasi OTP</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Kode otentikasi telah dikirim ke email Anda.</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputText label={'Masukan Kode'} value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isButtonDisabled ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleSendOtp}
                            disabled={isButtonDisabled}
                        >
                            {isLoading ? 'Loading...' : 'Kirim' }
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                                Tidak mendapatkan kode? <a onClick={handleResendOtp} className="text-revamp-error-300 cursor-pointer hover:underline">Kirim Ulang</a>
                            </span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
}
