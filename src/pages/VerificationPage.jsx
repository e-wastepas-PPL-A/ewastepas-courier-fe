/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide1 from '../assets/vertical-slide-1.png';
import IcBack from '../assets/ic-back.svg';
import InputText from '../components/Input/InputText';
import FooterBar from '../components/Register/FooterBar';
import { verifyOtp } from "../services";

export default function PageName() {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null); // State to manage errors
    const [success, setSuccess] = useState(null); // State to manage success messages

    useEffect(() => {
        document.title = "E-Wastepas | Login";
        const urlParams = new URLSearchParams(window.location.search);
        setEmail(urlParams.get('email'));
    }, []);

    const handleSendOtp = async () => {
        const payload = {
            otp,
            email
        };

        try {
            const response = await verifyOtp(payload);
            if (response.status === 200) { // Assuming 200 is the success status code
                setSuccess("OTP verified successfully!");
                setError(null); // Clear any previous error
                // Optionally, redirect the user to another page
                window.location.href = "/login";
            } else {
                setError("OTP verification failed. Please try again.");
                setSuccess(null); // Clear any previous success message
            }
        } catch (error) {
            setError("An error occurred during OTP verification. Please try again.");
            setSuccess(null); // Clear any previous success message
        }
    };

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
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                    <div className="mb-[24px]">
                        <InputText label={'Masukan Kode'} value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className="bg-revamp-secondary-500 w-full py-[8px] text-white text-[14px] font-[600]" 
                            onClick={handleSendOtp}
                            disabled={!otp}
                        >
                            Kirim
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">
                                Tidak mendapatkan kode? <a href="/register" className="text-revamp-error-300">Kirim Ulang</a>
                            </span>
                        </div>
                    </div>
                    <FooterBar />
                </div>
            </div>
        </div>
    );
}
