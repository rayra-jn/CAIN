import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import CainBackground from "../../components/CainBackground";
import { useSession } from "./../session";

export default function Room() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { identity } = useSession();

  return (
    <View style={styles.container}>
      <CainBackground />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>VOLTAR</Text>
        </Pressable>

        <View style={{ flex: 1 }}>
          <Text style={styles.h1}>{String(roomId).toUpperCase()}</Text>
          <Text style={styles.sub}>
            ID: {identity?.name?.toUpperCase()} • {identity?.role}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.log}>[CAIN] &gt; CANAL ABERTO: {String(roomId).toUpperCase()}</Text>
        <Text style={styles.log}>[CAIN] &gt; LOG INICIADO</Text>
        <Text style={styles.hint}>(próximo passo: mensagens + input + enviar)</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
  back: { borderWidth: 1, borderColor: "#00ff88", paddingVertical: 8, paddingHorizontal: 10 },
  backText: { color: "#00ff88", fontFamily: "VGA", letterSpacing: 2 },
  h1: { color: "#00ff88", fontFamily: "VGA", letterSpacing: 3, fontSize: 18 },
  sub: { color: "#1f8f5a", fontFamily: "VGA", marginTop: 4 },
  body: { paddingHorizontal: 16, paddingTop: 8 },
  log: { color: "#00ff88", fontFamily: "VGA", letterSpacing: 2, marginBottom: 10 },
  hint: { color: "#1f8f5a", fontFamily: "VGA" },
});
