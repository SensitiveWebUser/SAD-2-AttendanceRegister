import React from "react";
import { useTranslation } from "react-i18next";
import { signup } from '../../components/login/signup';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      TEST PAGE <br />
      {t("translation.hello")}
      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => signup}>SIGNUP</button>
    </div >
  );
};