import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import CainBackground from "../components/CainBackground";

type Params = { role?: string; name?: string };

export default function Hub() {
  const { role = "PLAYER", name = "UNKNOWN" } = useLocalSearchParams<Params>();

  const go = (path: "/messages" | "/bank" | "/store") => {
    router.push({
      pathname: path as "/messages",
      params: { role, name },
    });
  };

  return (
    <View style={styles.container}>
      <CainBackground />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>CENTRAL</Text>
        <Text style={styles.headerSub}>
          IDENTIDADE: {String(name).toUpperCase()} • PERFIL: {String(role).toUpperCase()}
        </Text>
      </View>

      <View style={styles.grid}>
        <AppTile title="MENSAGENS" subtitle="Chats privados e grupos" onPress={() => go("/messages")} />
        <AppTile title="BANCO" subtitle="Créditos do RPG" onPress={() => go("/bank")} />
        <AppTile title="LOJA" subtitle="Itens & upgrades" onPress={() => go("/store")} />
      </View>
    </View>
  );
}

function AppTile({
  title,
  subtitle,
  onPress,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tile} activeOpacity={0.85}>
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileSub}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 56,
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  headerTitle: {
    fontFamily: "VGA",
    color: "#00ff88",
    fontSize: 22,
    letterSpacing: 2,
  },
  headerSub: {
    marginTop: 6,
    fontFamily: "VGA",
    color: "#6aff9c",
    fontSize: 11,
    letterSpacing: 1,
    opacity: 0.9,
  },
  grid: {
    paddingHorizontal: 18,
    paddingTop: 18,
    gap: 12,
  },
  tile: {
    borderWidth: 1,
    borderColor: "#00ff88",
    backgroundColor: "rgba(0,255,136,0.03)",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  tileTitle: {
    fontFamily: "VGA",
    color: "#00ff88",
    fontSize: 16,
    letterSpacing: 2,
  },
  tileSub: {
    marginTop: 6,
    fontFamily: "VGA",
    color: "#2fa66a",
    fontSize: 10,
    letterSpacing: 1,
  },
});
