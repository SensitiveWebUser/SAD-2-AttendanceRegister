import React from "react";
import { useTranslation } from "react-i18next";
import useRequest from "../../hooks/useRequest";

export const signup: React.FC = () => {
    const { t } = useTranslation();
    const { } = useRequest;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            SIGNUP TEST PAGE
        </div>
    );
};