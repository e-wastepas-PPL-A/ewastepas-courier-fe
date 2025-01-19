import Cookies from "js-cookie";

const handleLogout = () => {

    // Destroy the SSID cookie
    Cookies.remove("SSID");

    // Redirect to login page
    window.location.href = "/login";
};

export default handleLogout;