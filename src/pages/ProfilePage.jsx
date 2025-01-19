import { useEffect, useState } from "react";
import InputText from '../components/Input/InputText';
import InputPhone from '../components/Input/InputPhone';
import InputDate from '../components/Input/InputDate';
import InputFile from '../components/Input/InputFile';
import InputProfile from '../components/Input/InputProfile';
import { useCourier } from "../stores/courier";
import validationText from "../utils/ValidationText";
import validationBirth from "../utils/ValidationBirth";
import validationPhone from "../utils/ValidatonPhone";
import { updateUser } from  "../services";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ModalSuccess from '../components/Modal/ModalSuccess';
import ModalError from "../components/Modal/ModalError"

export default function ProfileChangePassword() {
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
    const [isLoading, setIsLoading] = useState(false);
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
    const formattedMaxDate = maxDate.toISOString().split("T")[0];
    const [modalItem, setModalItem] = useState({});

    useEffect(() => {
        setNik(user?.nik);
        setName(user?.name);
        setPhone(user?.phone);
        setAccountNumber(user?.account_number)
        const dateOfBirth = user?.date_of_birth.split('T')[0].split('-');
        setDate(new Date(dateOfBirth[0], dateOfBirth[1] - 1, dateOfBirth[2]));
        setAddress(user?.address);
        setPhoto(user?.photo ? [{url:user?.photo}] : []);
        setKtp(user?.ktp_url ? [{url:user?.ktp_url}] : []);
        setKk(user?.kk_url ? [{url:user?.kk_url}] : []);
    }, [user?.account_number, user?.address, user?.date_of_birth, user?.kk_url, user?.ktp_url, user?.name, user?.nik, user?.phone, user?.photo]);  


    useEffect(() => {
        setToken(Cookies.get('SSID'));
    }, []);

    const saveHandler = async () => {
        const formatDate = new Date(date).toISOString()
        let payload = { nik, name, phone: phone, date_of_birth: formatDate, account_number: accountNumber, address, photo};

        if(!ktp[0]?.url){
            payload.ktp = ktp;
        }
        if(!kk[0]?.url){
            payload.kk = kk;
        }

        if(payload?.ktp?.length === 0 && ktp?.length === 0 || payload?.kk?.length === 0 && kk?.length === 0){
            Swal.fire({
                title: "Error",
                text: "KTP atau KK tidak boleh kosong!",
                icon: "error",
                confirmButtonColor: "#7066e0",
              });
              return;
        }

        setIsLoading(true);

        try {
            const response = await updateUser(payload, token);
            if (response.status === 201 || response.status === 200) {
                setModalItem({ isOpen: true, title: "Berhasil", description: "Data berhasil diubah." });
            } else {
                setModalItem({ isOpen: true, title: "Error", description: response.response.data.error });
            }
        } catch {
            setModalItem({ isOpen: true, title: "Error", description: "Terjadi kesalahan saat registrasi. Silakan coba lagi." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
            <div className="container-sm w-full max-w-[800px] min-w-[400px] mx-auto p-4">
                <div>
                <h1 className="text-[40px] text-revamp-neutral-11 font-[600]">
                    Profile
                </h1>
                <span className="font-[400] text-[16px] text-revamp-neutral-7">Anda bisa merubah data diri kurir sebagai berikut.</span>
                </div>
                <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
                    <div className="mb-10 flex items-center gap-2">
                        <InputProfile      
                        id="profile-picture"
                        value={photo}
                        onChange={(e) => {
                            setPhoto(e);
                        }}
                        format="image" 
                        />
                        <div>
                        <h2 className="text-md text-revamp-neutral-11 font-[500]">
                             {name}
                        </h2>
                        <span className="text-sm text-revamp-neutral-7 font-[400]">{user.email}</span>
                        </div>
                    </div>
                    <div className="md:flex justify-between w-full gap-2">
                        <div className={"md:w-1/2 w-full"}>
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
                            disabled={true}
                            
                        />
                        </div>
                        <div className={"md:w-1/2 w-full"}>
                        <InputText
                            label="Nama"
                            value={name}
                            onChange={(value) => {
                                setName(value);
                                setErrorMessage((prev) => ({...prev, name: validationText("Nama", value, 2)}));
                            }}
                            errorMessage={errorMessage.name}
                        />
                        </div>
                    </div>
                    <div className="md:flex justify-between w-full gap-2">
                    <div className={"md:w-1/2 w-full"}>
                    <InputPhone
                    label="Nomor Telepon"
                    value={phone}
                    onChange={(value) => {
                        setPhone(value);
                        setErrorMessage((prev) => ({...prev, phone: validationPhone(value)}));
                    }}
                    errorMessage={errorMessage.phone}
                />
                </div>
                <div className={"md:w-1/2 w-full"}>
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
                </div>
                </div>
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
                 <InputText
                    label="Alamat"
                    value={address}
                    onChange={(value) => {
                        setAddress(value);
                        setErrorMessage((prev) => ({...prev, address: validationText("Alamat", value, 50)}))
                    }}
                    errorMessage={errorMessage.address}
                />
                 <InputFile
                        id="upload-ktp"
                        label="Upload KTP"
                        value={ktp}
                        onChange={(e) => {
                            setKtp(e);
                        }}
                        format="image"
                        disabled={true}
                        required={true}
                    />
                      <InputFile
                        id="upload-kk"
                        label="Upload KK"
                        value={kk}
                        onChange={(e) => {
                            setKk(e);
                        }}
                        format="image"
                        disabled={true}
                        required={true}
                    />
                    <div className="w-full flex justify-end mt-8">
                        <button
                        className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-fit py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[8px]`}
                        onClick={saveHandler}
                    >
                        {isLoading ? 'Loading...' : "Ubah"}
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
  }