import { useEffect, useState } from "react";
import Logo from '../assets/logo.png'
import Slide1 from '../assets/vertical-slide-1.png'
import InputEmail from '../components/Input/InputEmail'
import InputPassword from '../components/Input/InputPassword'
import InputCheck from '../components/Input/InputCheck'
import FooterBar from '../components/Register/FooterBar'


export default function PageName() {
    const [valueEmail, setValueEmail] = useState('')
    const [valuePassword, setValuePassword] = useState('')

    useEffect(()=>{
        document.title = "E-Wastepas | Login"
    }, [])

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
                        <h1 className="text-[40px] font-[600]">Login</h1>
                        <span className="text-[16px] font-[400] text-revamp-neutral-7">Masuk untuk mengakses akun Past-Trash Anda</span>
                    </div>
                    <div className="mb-[24px]">
                        <InputEmail label={'Email'} value={valueEmail} onChange={(e)=> setValueEmail(e.target.value)} />
                        <InputPassword label={'Kata Sandi'} value={valuePassword} onChange={(e)=> setValuePassword(e.target.value)} />
                        <div className="flex justify-between items-center">
                            <InputCheck label={'Ingatkan Saya'} value={true} onChange={(e)=> setValuePassword(e.target.value)} />
                            <a href="/forgot" className="text-revamp-error-300 font-[500]">Lupa kata sandi</a>
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button className="bg-revamp-secondary-500 w-full py-[8px] text-white text-[14px] font-[600]">Login</button>
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
  