import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CainBackground from "../components/CainBackground";

type Params = { role?: string; name?: string };
type TabKey = "CONVERSAS" | "TODOS";

type ChatItem = {
  id: string;
  title: string;
  last: string;
  time: string;
  unread: number;
  online?: boolean;
  kind: "dm" | "group";
};

export default function Messages() {
  const { role = "PLAYER", name = "UNKNOWN" } = useLocalSearchParams<Params>();
  const isMaster = String(role).toUpperCase() === "MASTER";

  const [tab, setTab] = useState<TabKey>("CONVERSAS");

  // bolinha online piscando
  const pulse = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.2, duration: 650, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const conversations: ChatItem[] = useMemo(
    () => [
      { id: "operacao-01", title: "#OPERACAO-01", last: "[CAIN] > LOG INICIADO", time: "21:21", unread: 2, online: true, kind: "group" },
      { id: "katherine", title: "KATHERINE VALENSK", last: "Ok. Entendido.", time: "20:58", unread: 0, online: true, kind: "dm" },
      { id: "kruger", title: "KRUGER BLOODCROFT", last: "Sem perguntas.", time: "19:40", unread: 1, online: false, kind: "dm" },
    ],
    []
  );

  const allChatsForMaster: ChatItem[] = useMemo(
    () => [
      ...conversations,
      { id: "todos-logs", title: "[MESTRE] LOGS GERAIS", last: "Acesso total liberado.", time: "21:10", unread: 5, online: true, kind: "group" },
      { id: "grupo-testes", title: "#TESTES-NO-LAB", last: "Nova evidência anexada.", time: "18:12", unread: 3, online: false, kind: "group" },
    ],
    [conversations]
  );

  const data = tab === "TODOS" ? allChatsForMaster : conversations;

  return (
    <View style={styles.container}>
      <CainBackground />

      {/* HEADER (fixo) */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>MENSAGENS</Text>

          <TouchableOpacity
            onPress={() => router.replace({ pathname: "/hub", params: { role, name } })}
            style={styles.headerBtn}
            activeOpacity={0.85}
          >
            <Text style={styles.headerBtnText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.identityRow}>
          <Animated.View style={[styles.onlineDot, { opacity: pulse }]} />
          <Text style={styles.identityText}>
            IDENTIDADE: {String(name).toUpperCase()} {isMaster ? "• ACESSO: TOTAL" : "• ACESSO: PADRÃO"}
          </Text>
        </View>

        {/* “abas” (somente mostra TODOS pro mestre) */}
        <View style={styles.tabs}>
          <TabButton active={tab === "CONVERSAS"} label="CONVERSAS" onPress={() => setTab("CONVERSAS")} />
          {isMaster && <TabButton active={tab === "TODOS"} label="TODOS" onPress={() => setTab("TODOS")} />}
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.newBtn} activeOpacity={0.85} onPress={() => { /* depois abrimos modal "novo chat" */ }}>
            <Text style={styles.newBtnText}>NOVO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sep} />
      </View>

      {/* LISTA */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.rowSep} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.row}
            onPress={() =>
              router.push({
                pathname: `./room/[roomId]` as const,
                params: { role, name, title: item.title, roomId: item.id },
              })
            }
          >
            <View style={styles.rowLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.kind === "group" ? "#" : "@"}</Text>
              </View>

              <View style={styles.rowText}>
                <View style={styles.rowTitleLine}>
                  <Text style={styles.rowTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  {item.online ? <View style={styles.onlineMini} /> : null}
                </View>

                <Text style={styles.rowLast} numberOfLines={1}>
                  {item.last}
                </Text>
              </View>
            </View>

            <View style={styles.rowRight}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unread > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.unread}</Text>
                </View>
              ) : (
                <View style={{ height: 18 }} />
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function TabButton({ active, label, onPress }: { active: boolean; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.tabBtn, active && styles.tabBtnActive]}>
      <Text style={[styles.tabText, active && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingTop: 48,
    paddingHorizontal: 14,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "PressStart2P",
    color: "#00ff88",
    fontSize: 18,
    letterSpacing: 2,
  },
  headerBtn: {
    borderWidth: 1,
    borderColor: "#00ff88",
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,255,136,0.03)",
  },
  headerBtnText: {
    fontFamily: "PressStart2P",
    color: "#00ff88",
    fontSize: 10,
    letterSpacing: 2,
  },

  identityRow: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8 },
  onlineDot: { width: 8, height: 8, borderRadius: 8, backgroundColor: "#00ff88" },
  identityText: { fontFamily: "PressStart2P", color: "#6aff9c", fontSize: 10, letterSpacing: 1, opacity: 0.95 },

  tabs: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 8 },
  tabBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,255,136,0.35)",
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,255,136,0.02)",
  },
  tabBtnActive: { borderColor: "#00ff88", backgroundColor: "rgba(0,255,136,0.06)" },
  tabText: { fontFamily: "PressStart2P", color: "#2fa66a", fontSize: 10, letterSpacing: 2 },
  tabTextActive: { color: "#00ff88" },

  newBtn: {
    borderWidth: 1,
    borderColor: "#00ff88",
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,255,136,0.03)",
  },
  newBtnText: { fontFamily: "PressStart2P", color: "#00ff88", fontSize: 10, letterSpacing: 2 },

  sep: { marginTop: 12, height: 1, backgroundColor: "rgba(0,255,136,0.25)" },

  listContent: { paddingHorizontal: 8, paddingTop: 10, paddingBottom: 24 },
  rowSep: { height: 1, backgroundColor: "rgba(0,255,136,0.12)", marginHorizontal: 6 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatar: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: "rgba(0,255,136,0.4)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,255,136,0.03)",
  },
  avatarText: { fontFamily: "PressStart2P", color: "#00ff88", fontSize: 14, letterSpacing: 1 },

  rowText: { flex: 1 },
  rowTitleLine: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowTitle: { fontFamily: "PressStart2P", color: "#00ff88", fontSize: 12, letterSpacing: 2, flex: 1 },
  onlineMini: { width: 6, height: 6, borderRadius: 6, backgroundColor: "#00ff88" },

  rowLast: { marginTop: 6, fontFamily: "PressStart2P", color: "#2fa66a", fontSize: 10, letterSpacing: 1, opacity: 0.95 },

  rowRight: { alignItems: "flex-end", gap: 8, paddingLeft: 10 },
  time: { fontFamily: "PressStart2P", color: "#6aff9c", fontSize: 9, letterSpacing: 1, opacity: 0.8 },
  badge: {
    minWidth: 20,
    height: 18,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#00ff88",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,255,136,0.06)",
  },
  badgeText: { fontFamily: "PressStart2P", color: "#00ff88", fontSize: 9, letterSpacing: 1 },
});
