import { useContext } from "react";
import AuthContext  from "../../../context/Authcontext";
import { GoogleLogin } from "@react-oauth/google";

const GoogleRegisterComponent = () => {
    const {handleGoogleSuccess, handleGoogleFailure} = useContext(AuthContext);

    return (
        <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            useOneTap
            shape="circle"
            theme="filled_blue"
            text="signin_with" // Ajouter ce paramètre pour personnaliser le texte du bouton
            width="240"
            className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        />
    )
}
export default GoogleRegisterComponent;