import React, { useMemo, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CainBackground from "../../components/CainBackground";
import CainNoise from "../../components/CainNoise";
import TerminalInput from "../../components/TerminalInput";

import { router } from "expo-router";
import { useCainBootSound } from "../../hooks/useCainSound";
import { router } from "expo-router";
import { getBySecurityCode } from "../../src/data/identities";

type Status = "IDLE" | "VALIDATING" | "DENIED" | "GRANTED";

export default function LoginCain({
  onLoggedIn,
}: {
  onLoggedIn: (payload: any) => void;
}) {
  useCainBootSound();

  const [securityCode, setSecurityCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("IDLE");

  const systemLine = useTypewriter(
    "Conectando à rede WINDIGO COMPANY...",
    26
  );

  const helper = useMemo(() => {
    if (status === "VALIDATING") return "VALIDANDO CREDENCIAIS...";
    if (status === "DENIED")
      return "ACESSO NEGADO • ATIVIDADE INDEVIDA DETECTADA";
    if (status === "GRANTED")
      return "ACESSO CONCEDIDO • SESSÃO INICIADA";
    return "Acesso monitorado • Nível Confidencial";
  }, [status]);

  const submit = async () => {
    const identity = getBySecurityCode(securityCode);

if (!identity) {
  setStatus("DENIED");
  return;
}

setStatus("GRANTED");
await wait(500);

// vai pra lista de chats passando quem é
router.replace(
  { pathname: "/chat", 
    params: { as: identity.id } });
  };

  const disabled = status === "VALIDATING";
  const denied = status === "DENIED";

  return (
    <View style={styles.container}>
      <CainBackground />
      <CainNoise />

      <View style={styles.center}>
        <Text style={styles.title}>C.A.I.N</Text>

        <Text style={styles.subtitle}>
          Centro de Análise e Integração Necrotecnológica
        </Text>

        <Text style={styles.episode}>
          Bem vindos a Windigo Company!
        </Text>

        <Text style={styles.system}>
          {systemLine}
          <Text style={styles.cursor}>▮</Text>
        </Text>

        <View style={styles.box}>
          <Text style={styles.label}>CÓDIGO DE SEGURANÇA</Text>

          <TerminalInput
            value={securityCode}
            onChangeText={(t) =>
              setSecurityCode(t.toUpperCase())
            }
            placeholder="KT2-W51-PRX"
            editable={!disabled}
            denied={denied}
          />

          <Text style={styles.label}>SENHA</Text>

          <TerminalInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            editable={!disabled}
            denied={denied}
            secureTextEntry
            showPassword={showPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword((v) => !v)
            }
            disabled={disabled}
            style={[
              styles.eyeBtn,
              disabled && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.eyeText}>
              {showPassword ? "ESCONDER" : "MOSTRAR"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              disabled && styles.buttonDisabled,
            ]}
            onPress={submit}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>
              {status === "VALIDATING"
                ? "PROCESSANDO..."
                : "INICIAR SESSÃO"}
            </Text>
          </TouchableOpacity>

          <Text style={denied ? styles.error : styles.footer}>
            {helper}
          </Text>
        </View>
      </View>
    </View>
  );
}

const wait = (ms: number) =>
  new Promise((r) => setTimeout(r, ms));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    width: "100%",
    maxWidth: 520,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  title: {
    fontFamily: "PressStart2P",
    fontSize: Platform.OS === "web" ? 44 : 40,
    color: "#00ff88",
    marginBottom: 6,
  },

  subtitle: {
    fontFamily: "PressStart2P",
    fontSize: 14,
    color: "#2fa66a",
    textAlign: "center",
    marginBottom: 10,
  },

  episode: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#2fa66a",
    marginBottom: 14,
  },

  system: {
    fontFamily: "PressStart2P",
    fontSize: 14,
    color: "#1f8f5a",
    marginBottom: 18,
  },

  cursor: {
    fontFamily: "PressStart2P",
    color: "#00ff88",
  },

  box: {
    width: "100%",
    maxWidth: 420,
    borderWidth: 1,
    borderColor: "#00ff88",
    padding: 18,
    backgroundColor: "rgba(0,255,136,0.035)",
  },

  label: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#7cffb0",
    marginBottom: 6,
  },

  eyeBtn: {
    alignSelf: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(0,255,136,0.35)",
  },

  eyeText: {
    fontFamily: "PressStart2P",
    fontSize: 10,
    color: "#00ff88",
  },

  button: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#00ff88",
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#00ff88",
  },

  footer: {
    marginTop: 14,
    fontFamily: "PressStart2P",
    fontSize: 12,
    color: "#00ff88",
    textAlign: "center",
  },

  error: {
    marginTop: 14,
    fontFamily: "PressStart2P",
    fontSize: 9,
    color: "#ff4d4d",
    textAlign: "center",
  },
});
