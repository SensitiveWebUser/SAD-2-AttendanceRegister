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
            <form>
                <div>

                </div>
            </form>
        </div>
    );
};

