/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Logo from '../assets/logo.png';
import Slide1 from '../assets/vertical-slide-1.png';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import InputCheck from '../components/Input/InputCheck';
import FooterBar from '../components/Register/FooterBar';
import { login } from "../services";

export default function PageName() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for error handling
    const [success, setSuccess] = useState(null); // State for success messages

    useEffect(() => {
        document.title = "E-Wastepas | Login";
    }, []);

    const handleLogin = async () => {
        const payload = {
            email: email,
            password: password,
        };

        try {
            const response = await login(payload);
            if (response.status === 200) {
                setSuccess("Login successful!");
                setError(null);
                console.log(response)
                // Set the cookie with the token received in the response
                Cookies.set('PHPSESSID', response.data.token, { expires: 0.25, secure: true }); // Cookie expires in 7 days

                // Optionally, redirect the user to the dashboard or homepage
                window.location.href = "/";
            } else {
                setError("Login failed. Please check your credentials and try again.");
                setSuccess(null); // Clear any previous success message
            }
        } catch (error) {
            setError("An error occurred during login. Please try again.");
            setSuccess(null); // Clear any previous success message
        }
    };

    const isButtonDisabled =  !email || !password;

    return (
        <div className="h-[100dvh] px-[8px] md:p-[100px] flex justify-center items-center">
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide1} className="max-h-[90vh]" alt="Slide" />
            </div>
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                    <img src={Logo} className="w-[340px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Login</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Masuk untuk mengakses akun Past-Trash Anda</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputEmail label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputPassword label={'Kata Sandi'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className="flex justify-between items-center">
                            <InputCheck label={'Ingatkan Saya'} value={true} onChange={(e) => setPassword(e.target.value)} />
                            <a href="/forgot" className="text-revamp-error-300 font-[500]">Lupa kata sandi</a>
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isButtonDisabled ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleLogin}
                            disabled={!email || !password}
                        >
                            Login
                        </button>
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
