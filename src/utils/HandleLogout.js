import Cookies from "js-cookie";

const handleLogout = () => {

    // Destroy the PHPSESSID cookie
    Cookies.remove("PHPSESSID");

    // Redirect to login page
    window.location.href = "/login";
};

export default handleLogout;