import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CainBackground from "../../components/CainBackground";
import { useSession } from "./../session";
import { Redirect } from "expo-router";

export default function AllChats() {
  const { isMaster } = useSession();
  if (!isMaster) return <Redirect href="./tabs/conversas" />;

  return (
    <View style={styles.container}>
      <CainBackground />
      <View style={{ padding: 16 }}>
        <Text style={styles.h1}>PAINEL DO MESTRE</Text>
        <Text style={styles.sub}>Visualização completa de todos os chats</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  h1: { color: "#00ff88", fontFamily: "VGA", letterSpacing: 3, fontSize: 18 },
  sub: { color: "#1f8f5a", fontFamily: "VGA", marginTop: 6 },
});
