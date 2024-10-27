import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/vertical-slide-2.png';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import InputCheck from '../components/Input/InputCheck';
import FooterBar from '../components/Register/FooterBar';
import { registration } from "../services";

export default function PageName() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!agreeToTerms) {
            alert("You must agree to the terms and conditions");
            return;
        }

        const payload = {
            email,
            password,
            confirm_password: confirmPassword
        };

        setIsLoading(true); // Set loading state to true

        try {
            const response = await registration(payload);
            if (response.status === 201) {
                setSuccess("Registration successful! Please check your email to verify your account.");
                setError(null);
                window.location.href = "/verification?email=" + email;
            } else {
                setError("Registration failed. Please try again.");
                setSuccess(null);
            }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("An error occurred during registration. Please try again.");
            setSuccess(null);
        } finally {
            setIsLoading(false); // Set loading state back to false
        }
    };

    // Determine if the button should be disabled
    const isButtonDisabled =  !email || !password || !confirmPassword || !agreeToTerms || isLoading;

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
                        <h1 className="text-[40px] font-[600]">Registrasi</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Mari siapkan semuanya agar Anda dapat mengakses akun Anda</span>
                    </div>
                    {error && <div className="text-white bg-revamp-error-300 py-[8px] mb-[18px] rounded-[6px]">{error}</div>}
                    {success && <div className="text-white bg-revamp-success-300 py-[8px] mb-[18px] rounded-[6px]">{success}</div>}
                    <div className="mb-[24px]">
                        <InputEmail label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputPassword label={'Kata Sandi'} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputPassword label={'Konfirmasi Kata Sandi'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div className="flex justify-between items-start">
                            <InputCheck 
                                label={<span>Saya menyetujui semua <a href="#" className="text-revamp-red-700 font-[500]">Syarat</a> dan <a href="#" className="text-revamp-red-700 font-[500]">Kebijakan Privasi</a></span>} 
                                value={agreeToTerms} 
                                onChange={(e) => setAgreeToTerms(e.target.checked)} 
                            />
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button 
                            className={`${isButtonDisabled ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600]`}
                            onClick={handleRegister}
                            disabled={isButtonDisabled} // Use the calculated disabled state
                        >
                            {isLoading ? 'Loading...' : 'Buat Akun'} {/* Display loading text */}
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
