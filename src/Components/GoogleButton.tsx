import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { serverurl } from "../Config/baseurl";
import Lottie from "lottie-react";
import animationData from "../assets/Lottie/googlelogin.json";
import loadingimg from "../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface GoogleButtonProps {
  type: "login" | "signup";
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => handleSuccess(tokenResponse.access_token),
    onError: (error) => handleError(error),
  });

  const handleSuccess = async (accessToken: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverurl}/auth/google/${type === "signup" ? "signup" : "login"}`,
        {
          googleToken: accessToken,
        }
      );

      if (response.status === 200 || response.status === 201) {
        const { accessToken, refreshToken } = response.data.token;

        localStorage.setItem("access_token", accessToken);
        document.cookie = `refreshToken=${refreshToken}; Max-Age=${
          7 * 24 * 60 * 60
        }; Secure; HttpOnly`;

        navigate("/");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error("Error during Google authentication:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error: any) => {
    console.error("Error", error);
  };

  return (
    <button
      type="button"
      className="px-4 md:px-6 bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200 rounded-md shadow-sm flex items-center justify-center w-full"
      onClick={() => googleLogin()}
      disabled={loading}
    >
      {!loading ? (
        <>
          <Lottie animationData={animationData} className="h-10 w-12" />
          {type === "login" ? "Login with Google" : "Signup with Google"}
        </>
      ) : (
        <>
          <img src={loadingimg} alt="loading" className="w-10 h-10 scale-150" />
        </>
      )}
    </button>
  );
};

export default GoogleButton;
