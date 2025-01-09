import { useEffect, useState } from "react";
import Logo from '../assets/logo.png';
import Slide1 from '../assets/vertical-slide-1.png';
import InputEmail from '../components/Input/InputEmail';
import InputPassword from '../components/Input/InputPassword';
import InputCheck from '../components/Input/InputCheck';
import FooterBar from '../components/Register/FooterBar';
import { registration, sendOtp } from "../services";
import validateEmail from "../utils/ValidationEmail";
import validatePassword from "../utils/ValidationPassword";
import validateConfrimPassword from "../utils/ValidationConfirmPassword";
import Modal from "../components/Modal";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        tnc: ""
    });
    const [isOpen, setIsOpen] = useState(false);
    const tocValue = '1. Pendaftaran Pengguna\nPengguna harus mendaftar dengan informasi yang akurat, termasuk email, nomor telepon, dan alamat pengambilan sampah elektronik. Informasi ini digunakan untuk memproses layanan dan komunikasi.\n\n2. Tanggung Jawab Pengguna\nPengguna bertanggung jawab memastikan barang yang akan diangkut aman dan tidak mengandung bahan berbahaya. Alamat yang diberikan juga harus lengkap dan dapat diakses oleh kurir.\n\n3. Proses Pengangkutan\nPengangkutan akan dilakukan sesuai dengan jadwal yang telah disepakati. Kurir akan memeriksa kondisi barang sebelum proses pengangkutan berlangsung.\n\n4. Pengolahan Sampah Elektronik\nSampah elektronik yang diangkut akan diproses sesuai dengan peraturan lingkungan yang berlaku, mendukung pengelolaan limbah elektronik yang ramah lingkungan.\n\n5. Hak dan Kewajiban Penyedia Layanan\nPenyedia layanan berhak menolak pengangkutan barang yang tidak memenuhi persyaratan atau tidak layak diangkut. Semua perubahan pada layanan atau biaya dapat dilakukan tanpa pemberitahuan terlebih dahulu.\n\n6. Privasi\nData pribadi pengguna akan digunakan hanya untuk keperluan layanan ini dan dilindungi sesuai dengan kebijakan privasi yang berlaku.\n\n7. Pembatasan Tanggung Jawab\nPenyedia layanan tidak bertanggung jawab atas kerusakan atau kehilangan barang selama proses pengangkutan, kecuali disebabkan oleh kelalaian dari pihak penyedia layanan.\n\n8. Perubahan Ketentuan\nPenyedia layanan berhak mengubah syarat dan ketentuan ini kapan saja, dengan informasi yang akan disampaikan melalui website.'

    useEffect(() => {
        document.title = "E-Wastepas | Register";
    }, []);


    const handleRegister = async () => {
        setErrorMessage((prev) => ({
            ...prev,
            email: validateEmail(email)
        }));
        setErrorMessage((prev) => ({
            ...prev,
            password: validatePassword(password)
        }));
        setErrorMessage((prev) => ({
            ...prev,
            confirmPassword: validateConfrimPassword(confirmPassword, password)
        }));
        if (!agreeToTerms) {
            setErrorMessage((prev) => ({
                ...prev,
                tnc: "Anda harus menyetujui syarat dan kebijakan privasi"
            }));
        }

        if(isDisabled){
            return;
        }

        const payload = { email, password, confirm_password: confirmPassword };

        setIsLoading(true);

        try {
            const response = await registration(payload);
            if (response.status === 201 || response.status === 200) {
                const newExpiredOtp = new Date(new Date().getTime() + 60 * 3000);
                sessionStorage.setItem("expiredOtp", newExpiredOtp);

                window.location.href = "/register/verification?email=" + email;
            } else if (response.response.data.error === "Your account has not been verified") {
                await sendOtp({ email });
                sessionStorage.removeItem("expiredOtp");

                window.location.href = "/register/verification?email=" + email;
            } else {
                setError(response.response.data.error);
                setSuccess(null);
                sessionStorage.removeItem("expiredOtp");
            }
        } catch {
            setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };
    const isDisabled =
        !email ||
        !password ||
        !confirmPassword ||
        !agreeToTerms ||
        isLoading ||
        errorMessage.email ||
        errorMessage.password ||
        errorMessage.confirmPassword;
        
    return (
        <div className="h-[100dvh] p-[8px] md:p-[100px] flex justify-center md:items-center">
             <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={'bg-white p-6 rounded-lg shadow-lg w-full overflow-y-auto'}>
                <h2 className="text-[24px] font-[700] mb-4 text-center text-[#313131] bg-white">Syarat dan Kebijakan Privasi</h2>
                <div className="whitespace-pre-wrap text-[16px] fonr-[400] text-gray-600 mb-4">{tocValue}</div>
                <div className="flex justify-center">
                <button
                className={'bg-revamp-secondary-500 border-revamp-secondary-500 border py-[4px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]'}
                onClick={() => setIsOpen(false)}
            >
                Kembali
            </button>
            </div>
            </Modal>
            <div className="w-1/2 md:p-[10px] lg:p-[52px] hidden lg:block">
                <img src={Slide1} className="max-h-[90vh]" alt="Slide" />
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
                        <InputEmail
                            label={'Email'}
                            value={email}
                            onChange={(value) => {
                                setEmail(value);
                                setErrorMessage((prev) => ({
                                    ...prev,
                                    email: validateEmail(value)
                                }));
                            }}
                            errorMessage={errorMessage.email}
                        />
                        <InputPassword
                            label={'Kata Sandi'}
                            value={password}
                            onChange={(value) => {
                                setPassword(value);
                                setErrorMessage((prev) => ({
                                    ...prev,
                                    password: validatePassword(value)
                                }));
                            }}
                            errorMessage={errorMessage.password}
                            isValidateCheck={true}
                        />
                        <InputPassword
                            label={'Konfirmasi Kata Sandi'}
                            value={confirmPassword}
                            onChange={(value) => {
                                 setConfirmPassword(value);
                                 setErrorMessage((prev) => ({
                                    ...prev,
                                    confirmPassword: validateConfrimPassword(value, password)
                                }));
                                }}
                            errorMessage={errorMessage.confirmPassword}
                        />
                        <div>
                            <InputCheck
                                label={<span>Saya menyetujui semua <span onClick={()=>setIsOpen(true)} className="text-revamp-error-400 font-[500] cursor-pointer hover:underline">Syarat</span> dan <span onClick={()=>setIsOpen(true)} className="text-revamp-error-400 font-[500] cursor-pointer hover:underline">Kebijakan Privasi</span></span>}
                                value={agreeToTerms}
                                onChange={(value) =>{setAgreeToTerms(value);setErrorMessage((prev) => ({...prev, tnc: ""}))}}
                                errorMessage={errorMessage.tnc}
                            />
                        </div>
                    </div>
                    <div className="mb-[24px]">
                        <button
                             className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] text-white text-[14px] font-[600] rounded-[15px]`}
                            onClick={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Buat Akun'}
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
