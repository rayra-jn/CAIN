import React from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { router } from "expo-router";
import CainBackground from "../../../components/CainBackground";
import { useSession } from "../../session";

type ChatItem = {
  id: string;
  title: string;
  last: string;
  unread: number;
  online?: boolean;
};

const MOCK_CHATS: ChatItem[] = [
  { id: "operacao-01", title: "#OPERACAO-01", last: "LOG INICIADO", unread: 2, online: true },
  { id: "windigo", title: "#WINDIGO", last: "Acesso monitorado...", unread: 0, online: false },
];

export default function Conversas() {
  const { identity } = useSession();

  return (
    <View style={styles.container}>
      <CainBackground />

      {/* Header “identidade” */}
      <View style={styles.header}>
        <Text style={styles.h1}>CONVERSAS</Text>
        <Text style={styles.sub}>
          IDENTIDADE: {identity?.name?.toUpperCase()} • {identity?.role}
        </Text>
      </View>

      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`./screens/conversas/${item.id}`)}
            style={styles.row}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.rowTop}>
                <Text style={styles.title}>{item.title}</Text>

                {/* online piscando (simples) */}
                {item.online ? <View style={styles.onlineDot} /> : null}

                {/* badge */}
                {item.unread > 0 ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unread}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={styles.last} numberOfLines={1}>
                {item.last}
              </Text>
            </View>

            <Text style={styles.chev}>›</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 18, paddingHorizontal: 16, paddingBottom: 10 },
  h1: { color: "#00ff88", fontSize: 18, letterSpacing: 3, fontFamily: "VGA" },
  sub: { color: "#1f8f5a", marginTop: 6, fontFamily: "VGA" },

  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  rowTop: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { color: "#6aff9c", fontFamily: "VGA", letterSpacing: 2 },
  last: { color: "#1f8f5a", marginTop: 6, fontFamily: "VGA" },
  chev: { color: "#00ff88", fontSize: 22, marginLeft: 10 },

  sep: { height: 1, backgroundColor: "rgba(0,255,136,0.12)", marginHorizontal: 16 },

  badge: {
    minWidth: 22,
    height: 18,
    borderWidth: 1,
    borderColor: "#00ff88",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: { color: "#00ff88", fontFamily: "VGA", fontSize: 12 },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#00ff88",
    opacity: 0.9,
  },
});
