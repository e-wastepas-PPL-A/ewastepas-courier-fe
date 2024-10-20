import { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import Slide1 from '../assets/vertical-slide-1.png'
import IcFacebook from '../assets/ic-facebook.svg'
import IcInstagram from '../assets/ic-instagram.svg'
import InputEmail from '../components/Input/InputEmail'
import InputPassword from '../components/Input/InputPassword'
import InputCheck from '../components/Input/InputCheck'

export default function PageName() {
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')

    useEffect(()=>{
        document.title = "E-Wastepas | Login"
    }, [])

    return (
        <div className="h-[100dvh] flex items-center justify-center">
        <div className="container mx-auto flex justify-center my-auto">  
            <div className="text-center w-full lg:w-1/2 px-[8px]">
                <div className="flex justify-center">
                     <img src={Logo} className="w-[175px]" alt="Logo" />
                </div>
                <div>
                    <div className="text-start mb-[24px]">
                        <h1 className="text-[40px] font-[600]">Login</h1>
                        <span className="text-[16px] font-[400] text-revamp-primary-300">Masuk untuk mengakses akun Past-Trash Anda</span>
                    </div>
                    <div className="mb-[24px]">
                        <InputEmail label={'Email'} value={valueEmail} onChange={(e)=> setValueEmail(e.target.value)} />
                        <InputPassword label={'Kata Sandi'} value={valuePassword} onChange={(e)=> setValuePassword(e.target.value)} />
                        <div className="flex justify-between items-center">
                            <InputCheck label={'Ingatkan Saya'} value={true} onChange={(e)=> setValuePassword(e.target.value)} />
                            <a href="#" className="text-revamp-red-700 font-[500]">Lupa kata sandi</a>
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button className="bg-revamp-secondary-700 w-full py-[8px] text-white text-[14px] font-[600]">Login</button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-primary-700 font-[500] text-[14px]">Tidak memiliki akun? <a href="/register" className="text-revamp-red-700">Registrasi</a></span>
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
                                <img src={IcFacebook} />
                            </div>
                            <div className="border border-revamp-secondary-700 w-1/2 flex justify-center py-[16px] rounded-[4px] cursor-pointer">
                                <img src={IcInstagram} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide1} className="max-h-[90vh]" />
            </div>
        </div>
        </div>
    );
  }
  