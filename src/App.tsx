import React, { useState } from "react";
import { View, Text } from "react-native";
import LoginCain from "../app/screens/LoginCain";

export default function App() {
  const [session, setSession] = useState<any>(null);

  if (!session) {
    return <LoginCain onLoggedIn={setSession} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#050807", alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#00ff88", letterSpacing: 2 }}>
        ACESSO CONCEDIDO
      </Text>
      <Text style={{ color: "#2fa66a", marginTop: 8 }}>
        {session.scientist.name} • {session.scientist.securityCode}
      </Text>
    </View>
  );
}
