/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import InputEmail from '../../../components/Input/InputEmail';
import InputText from '../../../components/Input/InputText';
import InputPhone from '../../../components/Input/InputPhone';
import InputFile from '../../../components/Input/InputFile';
import InputProfile from '../../../components/Input/InputProfile';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/regex';
import { updateUser } from "../../../services";
import { useCourier } from "../../../stores/courier";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
    const [token, setToken] = useState('');
    const user = useCourier((state) => state.user);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [ktp, setKtp] = useState([]);
    const [photo, setphoto] = useState([]);
    const [kk, setKk] = useState([]);
    const [canProceed, setCanProceed] = useState(false)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        name: "",
        phone: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        setToken(Cookies.get('PHPSESSID'));
    }, []);

    

    const stepHandler = () => {
        if (canProceed && step < 4) {
          setStep(step + 1)
        }else if(step === 4){
            handleRegister()
        }
      }

      const handleLogout = () => {
        // Destroy the PHPSESSID cookie
        Cookies.remove("PHPSESSID");
    
        // Redirect to login page
        navigate("/login");
      };

    useEffect(() => {
        if (step === 1) {
          setCanProceed(true)
        } else if (step === 2) {
        const isNameValid = !errorMessage.name && !!name;
        const isEmailValid = !errorMessage.email && !!email;
        const isPhoneValid = !errorMessage.phone && !!phone;
        setCanProceed(isNameValid && isEmailValid && isPhoneValid);
        } else if (step === 3) {
          setCanProceed(!!ktp)
        } else if (step === 4) {
          setCanProceed(!!kk)
        }
      }, [step, name, email, phone])

    useEffect(() => {
        setName(user?.name);
        setEmail(user?.email);
        setPhone(user?.phone);
        setphoto(user?.photo ? [{url:user?.photo}] : []);
        setKtp(user?.ktp_url ? [{url:user?.ktp_url}] : []);
        setKk(user?.kk_url ? [{url:user?.kk_url}] : []);
    }, []);

    const validateName = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                name: "Nama tidak boleh kosong"
            }));
        }else if (value.length < 2) {
            setErrorMessage((prev) => ({
                ...prev,
                name: "Nama minimal 2 karakter"
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                name: ""
            }));
        }
    };

    const validatePhone = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                phone: "No telepon tidak boleh kosong"
            }));
        }else if (!PHONE_REGEX.test(value)) {
            setErrorMessage((prev) => ({
                ...prev,
                phone: "Email tidak valid"
            }));
        }else if (value.length < 8) {
            setErrorMessage((prev) => ({
                ...prev,
                phone: "No telepon minimal 8 karakter"
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                phone: ""
            }));
        }
    };

    const validateEmail = (value) => {
        if (!value) {
            setErrorMessage((prev) => ({
                ...prev,
                email: "Email tidak boleh kosong"
            }));
        }else if (!EMAIL_REGEX.test(value)) {
            setErrorMessage((prev) => ({
                ...prev,
                email: "Email tidak valid"
            }));
        } else {
            setErrorMessage((prev) => ({
                ...prev,
                email: ""
            }));
        }
    };

    const handleRegister = async () => {
        validateEmail(email)

        const payload = { name, email, phone_number: phone, ktp, kk };

        setIsLoading(true);

        try {
            const response = await updateUser(payload, token);
            if (response.status === 201 || response.status === 200) {
                alert('good')
            } else {
                setError(response.response.data.error);
                sessionStorage.removeItem("expiredOtp");
            }
        } catch {
            setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    };

    const StepOne = () => (
        <div className={`${step === 1 ? "block" : "hidden"}`}>
            <InputProfile      
                id="profile-picture"
                value={photo}
                onChange={(e) => {
                    setphoto(e);
                }}
                errorMessage={errorMessage.photo}
                format="image" 
                />
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold">Hello, {user?.name}</h1>
                <span className="text-sm text-revamp-neutral-7">
                    Mari siapkan semuanya agar Anda dapat mengakses akun Anda
                </span>
            </div>
        </div>
    );

    const StepTwo = () => (
        <div className={`${step === 2 ? "block" : "hidden"}`}>
            <InputText
                label="Nama"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    validateName(e.target.value);
                }}
                errorMessage={errorMessage.name}
            />
            <InputEmail
                label="Email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                }}
                errorMessage={errorMessage.email}
            />
            <InputPhone
                label="No Telepon"
                value={phone}
                onChange={(e) => {
                    setPhone((e));
                    validatePhone(e);
                }}
                errorMessage={errorMessage.phone}
            />
        </div>
    );

    const StepThree = () => (
        <div className={`${step === 3 ? "block" : "hidden"}`}>
            <InputFile
                id="upload-ktp"
                label="Upload KTP"
                value={ktp}
                onChange={(e) => {
                    setKtp(e);
                }}
                errorMessage={errorMessage.ktp}
                format="image"
            />
        </div>
    );
    const StepFour = () => (
        <div className={`${step === 4 ? "block" : "hidden"}`}>
             <InputFile
                id="upload-kk"
                label="Upload KK"
                value={kk}
                onChange={(e) => {
                    setKk(e);
                }}
                errorMessage={errorMessage.kk}
                format="image"
            />
        </div>
    );

    return (
        <div className="fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center">
            <div className="w-full h-[100dvh] bg-black-100 opacity-[0.8]"></div>
        <div className="fixed p-[12px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] w-[400px] overflow-x-auto">
                 {step !== 5 && (
                  <div className="mb-[24px] flex items-center justify-center gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-[6.38px] w-[6.38px] rounded-full ${i + 1 < step && "cursor-pointer"} ${step == i + 1 ? "bg-revamp-neutral-6" : "bg-revamp-neutral-10"}`}
                        onClick={() => {
                          i + 1 < step && setStep(i + 1)
                        }} // Use arrow function to avoid immediate invocation
                      ></div>
                    ))}
                  </div>
                )}
                {step > 1 && (
                    <h1 className="text-2xl font-semibold text-center mb-8">Lengkapi Data Diri</h1>
                )}
            { error}
            <div className="h-full">
            <div className="text-center w-full">
                <div>
                {StepOne()}
                {StepTwo()}
                {StepThree()}
                {StepFour()}
                    <div className="mb-[24px]">
                        <button
                            className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]`}
                            onClick={stepHandler}
                            disabled={!canProceed}
                        >
                            {isLoading ? 'Loading...' : step === 1 ? 'Mulai' : step < 4 ? "Lanjut" : "Kirim"}
                        </button>
                        <div className="flex justify-center items-center mt-[10px]">
                            <span className="text-revamp-neutral-10 font-[500] text-[14px]">Anda mau ganti akun? <a href="#" onClick={handleLogout} className="text-revamp-error-300 cursor-pointer">Logout</a></span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
