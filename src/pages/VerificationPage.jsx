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
    const [isLoadingOtp, setIsLoadingOtp] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        document.title = "E-Wastepas | Login";
        const urlParams = new URLSearchParams(window.location.search);
        setEmail(urlParams.get('email'));

        const expiredOtp = sessionStorage.getItem("expiredOtp");
        console.log(expiredOtp)
        if (expiredOtp) {
            const timeLeft = new Date(expiredOtp) - new Date();
            if (timeLeft > 0) {
                setCountdown(Math.floor(timeLeft / 1000));
            }
        }
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleSendOtp = async () => {
        setIsLoading(true);
        const payload = {
            otp,
            email,
            type: location.pathname.split('/')[1] === 'register' ? 'registration' : 'forgot_password'
        };

        try {
            const response = await verifyOtp(payload);
            if (response.status === 200) {
                setSuccess("OTP verified successfully!");
                setError(null);
                window.location.href = location.pathname.split('/')[1] === 'register' ? "/login" : "/forgot/change-password?token=" + response.data.token;
            } else {
                setError("OTP verification failed. Please try again.");
                setSuccess(null);
            }
        } catch {
            setError("An error occurred during OTP verification. Please try again.");
            setSuccess(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsLoadingOtp(true);
        const payload = { email };
        try {
            const response = await sendOtp(payload);
            if (response.status === 200) {
                setSuccess("OTP sent successfully!");
                setError(null);

                // Set new expiredOtp session with 60 seconds (or any duration you want)
                const newExpiredOtp = new Date(new Date().getTime() + 60 * 3000);
                sessionStorage.setItem("expiredOtp", newExpiredOtp);
                setCountdown(60); // Start a new 60 seconds countdown
            } else {
                setError("OTP resend failed. Please try again.");
                setSuccess(null);
            }
        } catch {
            setError("An error occurred while resending OTP. Please try again.");
            setSuccess(null);
        }finally{
            setIsLoadingOtp(false)
        }
    };

    const isButtonDisabled = !otp || isLoading;

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
                            {isLoading ? 'Loading...' : 'Kirim'}
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                                Tidak mendapatkan kode? {' '}
                                {isLoadingOtp ? (
                                      <span className="text-revamp-error-300 cursor-pointer ">Loading...</span>
                                ):countdown > 0 ? (
                                    <span className="text-revamp-error-300 cursor-not-allowed"> Kirim Ulang ({countdown}s)</span>
                                ) : (
                                    <a onClick={handleResendOtp} className="text-revamp-error-300 cursor-pointer hover:underline">Kirim Ulang</a>
                                )}
                            </span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
}
