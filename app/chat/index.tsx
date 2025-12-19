import React from "react";
import { router } from "expo-router";
import LoginCain from "./../screens/LoginCain";

export default function Index() {
  return (
    <LoginCain
      onLoggedIn={(payload) => {
        // payload vindo do seu LoginCain
        const role = payload?.user?.role ?? "PLAYER";
        const name = payload?.scientist?.name ?? "UNKNOWN";

        router.replace({
          pathname: "/hub",
          params: { role, name },
        });
      }}
    />
  );
}
