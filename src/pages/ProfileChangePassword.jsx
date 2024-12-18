import { useEffect, useState } from "react";
import InputPassword from '../components/Input/InputPassword';
import { changePassword } from  "../services";
import Cookies from "js-cookie";
import handleLogout from "../utils/HandleLogout";
import validatePassword from "../utils/ValidationPassword";
import validateConfrimPassword from "../utils/ValidationConfirmPassword";
import ModalSuccess from '../components/Modal/ModalSuccess';

export default function ProfilePage() {
    const [token, setToken] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        newPassword: "",
        confirmPassword: "",
        oldPassword: ""
    });
    const [modalItem, setModalItem] = useState({});

    useEffect(() => {
        setToken(Cookies.get('PHPSESSID'));
    }, []);

    const saveHandler = async () => {
        setIsLoading(true);

        try {
            const payload = {old_password: oldPassword, new_password: newPassword, confirm_new_password: confirmPassword}
            const response = await changePassword(payload, token);
            if (response.status === 201 || response.status === 200) {
                setModalItem({ isOpen: true, title: "Berhasil", description: "Data berhasil terkirim." });
            } else {
                setErrorMessage((prev) => ({
                    ...prev,
                    oldPassword: "Password lama tidak sesuai!"
                }));
            }
        } catch {
            setErrorMessage((prev) => ({
                ...prev,
                oldPassword: "Password lama tidak sesuai!"
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const closeHanlder = () => {
        setModalItem(false);
        handleLogout();

    }

    return (
        <>
            <ModalSuccess 
                isOpen={modalItem?.isOpen && modalItem?.title === "Berhasil"} 
                setIsOpen={closeHanlder} 
                title={modalItem?.title} 
                description={modalItem?.description} 
                label={"Oke"}
            />
            <div className="container-sm w-full max-w-[800px] min-w-[400px] mx-auto p-4">
            <div>
                <h1 className="text-[40px] text-revamp-neutral-11 font-[600]">
                    Ubah Kata Sandi
                </h1>
                <span className="font-[400] text-[16px] text-revamp-neutral-7">Demi alasan keamanan, harap perbarui kata sandi untuk melindungi akun Anda.</span>
                </div>
                <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
                    <InputPassword
                        label={'Kata Sandi Lama'}
                        value={oldPassword}
                        onChange={(value) => {
                            setOldPassword(value);
                        }}
                        errorMessage={errorMessage.oldPassword}
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