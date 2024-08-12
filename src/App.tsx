import { GoogleLogin } from "@react-oauth/google";

const App = () => {
  return (
    <div>
      App
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          fetch("http://localhost:8080/api/auth/google/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              googleToken: credentialResponse.credential,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Login Success", data);
            })
            .catch((error) => {
              console.log("Login Failed", error);
            });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default App;
