import { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import Slide1 from '../assets/vertical-slide-1.png'
import IcBack from '../assets/ic-back.svg'
import InputEmail from '../components/Input/InputEmail'
import FooterBar from '../components/Register/FooterBar'
import { sendOtp } from "../services";

export default function PageName() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null); // State to manage errors


    useEffect(()=>{
        document.title = "E-Wastepas | Login"
    }, [])


    const handleSend = async () => {

        setIsLoading(true);

        const payload = {
            email
        };
        

        try {
            const response = await sendOtp(payload);
            if (response.status === 200) { // Assuming 200 is the success status code
                const newExpiredOtp = new Date(new Date().getTime() + 60 * 3000);
                sessionStorage.setItem("expiredOtp", newExpiredOtp);
                
                setError(null); // Clear any previous error
                window.location.href = "/forgot/verification?email=" + email;
            } else {
                setError("OTP verification failed. Please try again.");
            }
            setIsLoading(false);
        } catch {
            setError("An error occurred during OTP verification. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide1} className="max-h-[90vh]" />
            </div>
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <a href="/login" className="text-[14px] font-[600] flex gap-2 items-center"><img src={IcBack} className="w-[8px]" alt="Logo" /> Kembali ke login</a>
                    </div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Lupa kata sandi?</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Jangan khawatir, ini bisa terjadi pada siapa saja. Masukkan email Anda di bawah ini untuk memulihkan kata sandi Anda.</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    <div className="mb-[24px]">
                    <InputEmail
                            label={'Email'}
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                            }}
                        />
                    </div>
                    <div className="mb-[24px]">
                        <button onClick={handleSend} disabled={isLoading} className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600] rounded-[15px]`}>{isLoading ? 'Loading...' :'Kirim'}</button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">Tidak memiliki akun? <a href="/register" className="text-revamp-error-300">Registrasi</a></span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
  }
  