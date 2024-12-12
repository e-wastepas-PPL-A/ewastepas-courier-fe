import { useEffect } from "react";
import { callbackHandler } from "../services";
import Cookies from "js-cookie";

export default function OauthPage() {

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Retrieve the 'code' parameter from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
          // Pass the code to the callback handler or handle it as needed
          const result = await callbackHandler(code);

          if (result?.data && result?.data?.token) {
            // Save the token to cookies
            Cookies.set("PHPSESSID", result?.data?.token, { expires: 7 });
          }
        }
      } catch (error) {
        console.error("Error fetching token:", error);
      } finally {
        window.location = "/"
      }
    };

    fetchToken();
  }, []);

  return (
    <div>
        <div className="loading-container">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>Loading...</p>
        </div>
    </div>
  );
}
