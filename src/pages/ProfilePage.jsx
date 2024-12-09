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
        setToken(Cookies.get('PHPSESSID'));
    }, []);

    const saveHandler = async () => {
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
                Swal.fire({
                    title: "Berhasil",
                    text: "Data berhasil terkirim.",
                    icon: "success",
                    confirmButtonColor: "#7066e0",
                  });
            } else {
                Swal.fire({
                    title: "Error",
                    text: response.response.data.error,
                    icon: "error",
                    confirmButtonColor: "#7066e0",
                  });
                sessionStorage.removeItem("expiredOtp");
            }
        } catch {
            Swal.fire({
                title: "Error",
                text: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
                icon: "error",
                confirmButtonColor: "#7066e0",
              });
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <div className="container-sm mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Ubah Kata Sandi
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
        <div className="mb-10">
            <InputProfile      
            id="profile-picture"
            value={photo}
            onChange={(e) => {
                setPhoto(e);
            }}
            format="image" 
            />
            </div>
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
            /> <InputPhone
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
         <InputFile
                id="upload-ktp"
                label="Upload KTP"
                value={ktp}
                onChange={(e) => {
                    setKtp(e);
                }}
                format="image"
            />
              <InputFile
                id="upload-kk"
                label="Upload KK"
                value={kk}
                onChange={(e) => {
                    setKk(e);
                }}
                format="image"
            />
                <button
                className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]`}
                onClick={saveHandler}
            >
                {isLoading ? 'Loading...' : "Ubah"}
            </button>
        </div>
      </div>
    );
  }