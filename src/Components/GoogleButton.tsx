import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { serverurl } from "../Config/baseurl";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie/googlelogin.json";

interface GoogleButtonProps {
  type: "login" | "signup";
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => handleSuccess(credentialResponse),
  });

  const handleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverurl}/auth/google/${type === "signup" ? "signup" : "login"}`,
        {
          googleToken: credentialResponse.credential,
        }
      );
      console.log("Success", response.data);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="px-4 md:px-6 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-md shadow-sm flex items-center justify-center w-full"
      onClick={() => googleLogin()}
      disabled={loading}
    >
      <Lottie animationData={animationData} className="h-10 w-12" />
      {type === "login" ? "Login with Google" : "Signup with Google"}
    </button>
  );
};

export default GoogleButton;
