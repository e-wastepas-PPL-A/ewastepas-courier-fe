import { useEffect, useState } from "react";
import InputPassword from '../components/Input/InputPassword';
import { changePassword } from  "../services";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import validatePassword from "../utils/ValidationPassword";
import validateConfrimPassword from "../utils/ValidationConfirmPassword";
import handleLogout from "../utils/HandleLogout";

export default function ProfilePage() {
    const [token, setToken] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        setToken(Cookies.get('PHPSESSID'));
    }, []);

    const saveHandler = async () => {
        setIsLoading(true);

        try {
            const payload = {old_password: oldPassword, new_password: newPassword, confirm_new_password: confirmPassword}
            const response = await changePassword(payload, token);
            if (response.status === 201 || response.status === 200) {
                Swal.fire({
                    title: "Berhasil",
                    text: "Data berhasil terkirim.",
                    icon: "success",
                    confirmButtonColor: "#7066e0",
                    willClose: () => {
                        handleLogout();
                        window.location.reload();
                    }
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
        } catch(error) {
            Swal.fire({
                title: "Error",
                text: error.message,
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
          Data Akun Anda
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
        <InputPassword
            label={'Kata Sandi Lama'}
            value={oldPassword}
            onChange={(value) => {
                setOldPassword(value);
            }}
            errorMessage={errorMessage.password}
            isValidateCheck={false}
        />
        <InputPassword
            label={'Kata Sandi Baru'}
            value={newPassword}
            onChange={(value) => {
                setNewPassword(value);
                setErrorMessage((prev) => ({
                    ...prev,
                    newPassword: validatePassword(value)
                }));
            }}
            errorMessage={errorMessage.newPassword}
            isValidateCheck={true}
        />
        <InputPassword
            label={'Konfirmasi Kata Sandi Baru'}
            value={confirmPassword}
            onChange={(value) => {
                setConfirmPassword(value);
                setErrorMessage((prev) => ({
                    ...prev,
                    confirmPassword: validateConfrimPassword(value, newPassword)
                }));
            }}
            errorMessage={errorMessage.confirmPassword}
        />
                <button
                className={`${isLoading ? 'bg-revampV2-neutral-400' : 'bg-revamp-secondary-500'} w-full py-[8px] px-[46px] text-white text-[14px] font-[600] rounded-[15px]`}
                onClick={saveHandler}
            >
                {isLoading ? 'Loading...' : "Simpan"}
            </button>
        </div>
      </div>
    );
  }