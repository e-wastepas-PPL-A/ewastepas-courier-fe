import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide2 from '../assets/vertical-slide-2.png';
import IcFacebook from '../assets/ic-facebook.svg';
import IcInstagram from '../assets/ic-instagram.svg';
import InputText from '../components/Input/InputText';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import InputCheck from '../components/Input/InputCheck';

export default function PageName() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);

    const handleRegister = () => {
        // handle registration logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!agreeToTerms) {
            alert("You must agree to the terms and conditions");
            return;
        }
        // Proceed with registration
    };

    return (
        <div className="h-[100dvh] flex items-center justify-center">
            <div className="container mx-auto flex justify-center my-auto">
                <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                    <img src={Slide2} className="max-h-[90vh]" alt="Slide" />
                </div>
                <div className="text-center w-full lg:w-1/2 px-[8px]">
                    <div className="flex justify-end">
                        <img src={Logo} className="w-[120px]" alt="Logo" />
                    </div>
                    <div className="">
                        <div className="text-start mb-[24px]">
                            <h1 className="text-[40px] font-[600]">Registrasi</h1>
                            <span className="text-[16px] font-[400] text-revamp-primary-300">Mari siapkan semuanya agar Anda dapat mengakses akun Anda</span>
                        </div>
                        <div className="mb-[24px]">
                            <div className="flex justify-between gap-2">
                                <div className="w-1/2">
                                    <InputText label={'Nama Depan'} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="w-1/2">
                                    <InputText label={'Nama Belakang'} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="flex justify-between gap-2">
                                <div className="w-1/2">
                                    <InputEmail label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="w-1/2">
                                    <InputText label={'Nomor Telepon'} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>
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
                                className="bg-revamp-secondary-700 w-full py-[8px] text-white text-[14px] font-[600]" 
                                onClick={handleRegister}>
                                Buat Akun
                            </button>
                            <div className="flex justify-center items-center mt-[10px]">
                                <span className="text-revamp-primary-700 font-[500] text-[14px]">Anda sudah memiliki akun? <a href="/login" className="text-revamp-red-700">Login</a></span>
                            </div>
                        </div>
                        <div className="mb-[24px]">
                            <div className="flex justify-between items-center mb-[24px]">
                                <span className="border border-revamp-primary-300 border-1 w-full"></span>
                                <span className="text-revamp-primary-300 w-full">Atau masuk dengan</span>
                                <span className="border border-revamp-primary-300 border-1 w-full"></span>
                            </div>
                            <div className="flex gap-4">
                                <div className="border border-revamp-secondary-700 w-1/2 flex justify-center py-[16px] rounded-[4px] cursor-pointer">
                                    <img src={IcFacebook} alt="Facebook" />
                                </div>
                                <div className="border border-revamp-secondary-700 w-1/2 flex justify-center py-[16px] rounded-[4px] cursor-pointer">
                                    <img src={IcInstagram} alt="Instagram" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
