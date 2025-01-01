/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import InputText from '../../../components/Input/InputText';
import InputPhone from '../../../components/Input/InputPhone';
import InputDate from '../../../components/Input/InputDate';
import InputFile from '../../../components/Input/InputFile';
import InputProfile from '../../../components/Input/InputProfile';
import { updateUser } from "../../../services";
import { useCourier } from "../../../stores/courier";
import handleLogout from "../../../utils/HandleLogout";
import validationText from "../../../utils/ValidationText";
import validationBirth from "../../../utils/ValidationBirth";
import validationPhone from "../../../utils/ValidatonPhone";
import ModalSuccess from '../../../components/Modal/ModalSuccess';
import ModalError from '../../../components/Modal/ModalError';

export default function OnBoarding() {
    const [token, setToken] = useState('');
    const user = useCourier((state) => state.user);
    const [nik, setNik] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState();
    const [ktp, setKtp] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [kk, setKk] = useState([]);
    const [canProceed, setCanProceed] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState({
        nik: "",
        email: "",
        name: "",
        phone: "",
        accountNumber: "",
        address: ""
    });
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 17); // Subtract 17 years
    const formattedMaxDate = maxDate.toISOString()?.split("T")[0];
    const [modalItem, setModalItem] = useState({});

    useEffect(() => {
        setToken(Cookies.get('PHPSESSID'));
    }, []);

    const stepHandler = () => {
        if (canProceed && step < 5) {
          setStep(step + 1)
        }else if(step === 5){
            handleRegister()
        }
      }

  useEffect(() => {
        if (step === 1) {
          setCanProceed(true)
        } else if (step === 2) {
        const isNikValid = !errorMessage.nik && !!nik;
        const isNameValid = !errorMessage.name && !!name;
        const isDateValid = !errorMessage.date && !!date;
        setCanProceed(isNikValid && isNameValid && isDateValid);
        } else if (step === 3) {
        const isPhoneValid = !errorMessage.phone && !!phone;
        const isaccountNumberValid = !errorMessage.accountNumber && !!accountNumber;
        const isAddressValid = !errorMessage.address && !!address;
          setCanProceed(isPhoneValid && isaccountNumberValid && isAddressValid)
        } else if (step === 4) {
            setCanProceed(ktp[0]?.url?.length > 0 || ktp?.name?.length > 0)
          } else if (step === 5) {
          setCanProceed(!!kk[0]?.url?.length > 0 || !!kk?.name?.length > 0)
        }
      }, [step, nik, accountNumber, address, name, phone, date, ktp, kk])

    useEffect(() => {
        setNik(user?.nik);
        setName(user?.name);
        setPhone(user?.phone);
        setAccountNumber(user?.account_number)
        const dateOfBirth = user?.date_of_birth?.split('T')?.[0]?.split('-');
        setDate(new Date(dateOfBirth?.[0]||2000, dateOfBirth?.[1] - 1||0, dateOfBirth?.[2]||1));
        setAddress(user?.address);
        setPhoto(user?.photo ? [{url:user?.photo}] : []);
        setKtp(user?.ktp_url ? [{url:user?.ktp_url}] : []);
        setKk(user?.kk_url ? [{url:user?.kk_url}] : []);
    }, []);    

    const handleRegister = async () => {
        const formatDate = new Date(date).toISOString()
        let payload = { nik, name, phone: phone, date_of_birth: formatDate, account_number: accountNumber, address};
        if(!photo[0]?.url){
            payload.photo = photo;
        }
        if(!ktp[0]?.url){
            payload.ktp = ktp;
        }
        if(!kk[0]?.url){
            payload.kk = kk;
        }

        setIsLoading(true);

        try {
            const response = await updateUser(payload, token);
            if (response.status === 201 || response.status === 200) {
                setModalItem({ isOpen: true, title: "Berhasil", description: "Data berhasil terkirim.", to: "/" });
            } else {
                setModalItem({ isOpen: true, title: "Error", description: response.response.data.error });
                sessionStorage.removeItem("expiredOtp");
            }
        } catch {
            setModalItem({ isOpen: true, title: "Error", description: "Terjadi kesalahan saat registrasi. Silakan coba lagi." });
        } finally {
            setIsLoading(false);
        }
    };
    const StepOne = () => (
        <div className={`${step === 1 ? "block" : "hidden"} mt-8`}>
            <div className="my-8">
            <InputProfile      
                id="profile-picture"
                value={photo}
                onChange={(e) => {
                    setPhoto(e);
                }}
                format="image" 
                />
                </div>
            <div className="text-center my-8">
                <h1 className="text-2xl font-semibold mb-2">Hello, {user?.name}</h1>
                <span className="text-sm text-revamp-neutral-7">
                    Mari siapkan semuanya agar Anda dapat mengakses akun Anda
                </span>
            </div>
        </div>
    );

    const StepTwo = () => (
        <div className={`${step === 2 ? "block" : "hidden"}`}>
             <InputText
                label="NIK"
                value={nik}
                onChange={(value) => {
                    setNik(value);
                    setErrorMessage((prev) => ({...prev, nik: validationText("NIK", value, 16, 16)}));
                }}
                min={16}
                type="numerik"
                errorMessage={errorMessage.nik}
            />
            <InputText
                label="Nama"
                value={name}
                onChange={(value) => {
                    setName(value);
                    setErrorMessage((prev) => ({...prev, name: validationText("Nama", value, 2)}));
                }}
                errorMessage={errorMessage.name}
            />
            <InputDate
                label="Tanggal Lahir"
                value={date}
                onChange={(value) => {
                    setDate(value);
                    setErrorMessage((prev) => ({...prev, date: validationBirth(value)}));
                }}
                max={formattedMaxDate}
                type="birth"
                errorMessage={errorMessage.date}
            />
        </div>
    );

    const StepThree = () => (
        <div className={`${step === 3 ? "block" : "hidden"}`}>
            <InputPhone
                label="Nomor Telepon"
                value={phone}
                onChange={(value) => {
                    setPhone(value);
                    setErrorMessage((prev) => ({...prev, phone: validationPhone(value)}));
                }}
                errorMessage={errorMessage.phone}
            />
              <InputText
                label="No Rekening"
                value={accountNumber}
                onChange={(value) => {
                    setAccountNumber(value);
                    setErrorMessage((prev) => ({...prev, accountNumber: validationText("No Rekening", value, 8)}))
                }}
                type="numerik"
                errorMessage={errorMessage.accountNumber}
            />
             <InputText
                label="Alamat"
                value={address}
                onChange={(value) => {
                    setAddress(value);
                    setErrorMessage((prev) => ({...prev, address: validationText("Alamat", value, 50)}))
                }}
                errorMessage={errorMessage.address}
            />
        </div>
    );
    const StepFour = () => (
        <div className={`${step === 4 ? "block" : "hidden"} mb-8`}>
            <InputFile
                id="upload-ktp"
                label="Upload KTP"
                value={ktp}
                onChange={(e) => {
                    setKtp(e);
                }}
                format="image"
                required={true}
            />
        </div>
    );
    const StepFive = () => (
        <div className={`${step === 5 ? "block" : "hidden"} mb-8`}>
             <InputFile
                id="upload-kk"
                label="Upload KK"
                value={kk}
                onChange={(e) => {
                    setKk(e);
                }}
                format="image"
                required={true}
            />
        </div>
    );

    return (
        <div className="fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center">
            <ModalSuccess 
                isOpen={modalItem?.isOpen && modalItem?.title === "Berhasil"} 
                setIsOpen={setModalItem} 
                title={modalItem?.title} 
                description={modalItem?.description} 
                to={modalItem?.to} 
                label={"Oke"}
            />
            <ModalError 
                isOpen={modalItem?.isOpen && modalItem?.title === "Error"} 
                setIsOpen={setModalItem} 
                title={modalItem?.title} 
                description={modalItem?.description} 
                to={modalItem?.to} 
                label={"Oke"}
            />
            <div className="!w-full !h-[100dvh] !bg-black opacity-[0.8]" style={{ backgroundColor: "black" }}></div>
        <div className="fixed p-[24px] flex-col bg-white rounded-md justify-center items-between h-max-[500px] h-[500px] max-w-[600px] min-w-[300px] w-full overflow-x-auto">
                 {step !== 6 && (
                  <div className="mb-[32px] flex items-center justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-[8px] w-[8px] rounded-full ${i + 1 < step && "cursor-pointer"} ${step == i + 1 ? "bg-revamp-secondary-600" : "bg-revamp-neutral-6"}`}
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
            <div className="text-center w-full">
                <div>
                {StepOne()}
                {StepTwo()}
                {StepThree()}
                {StepFour()}
                {StepFive()}
                    <div className="mb-[24px]">
                        <button
                            className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]`}
                            onClick={stepHandler}
                            disabled={!canProceed}
                        >
                            {isLoading ? 'Loading...' : step === 1 ? 'Lengkapi Profile' : step < 5 ? "Lanjut" : "Kirim"}
                        </button>
                        <div className="flex justify-center items-center mt-[80px]">
                            <span className="text-revamp-neutral-10 font-[400] text-[14px]">Anda mau ganti akun? <a href="#" onClick={handleLogout} className="text-revamp-error-300 cursor-pointer">Logout</a></span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
