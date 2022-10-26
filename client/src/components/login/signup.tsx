import { useTranslation } from "react-i18next";
import useRequest from "../../hooks/useRequest";

export const SignUp = ({ }) => {
    const { t } = useTranslation();
    const { } = useRequest;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            SIGNUP TEST PAGE
            DOES STUFF FOR SIGN IN
            {/* links to a sign up form */}
            {/* checks the info against restrictions */}
            {/* creates a new user on submit */}
            <form>
                <div>

                </div>
            </form>
        </div>
    );
};

