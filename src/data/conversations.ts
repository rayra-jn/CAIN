import { IDENTITIES } from "./identities";

export type Conversation = {
  id: string;
  type: "GROUP" | "DM";
  title: string;        // nome que aparece na lista
  members: string[];    // ids
  lastMessage?: string;
  lastTime?: string;    // "18:56"
  unread?: number;
  online?: boolean;     // só faz sentido em DM
};

const GROUPS: Conversation[] = [
  {
    id: "operacao-01",
    type: "GROUP",
    title: "OPERAÇÃO-01",
    members: IDENTITIES.map((x) => x.id),
    lastMessage: "[CAIN] LOG INICIADO",
    lastTime: "18:56",
    unread: 2,
  },
];

function dmId(a: string, b: string) {
  return `dm-${[a, b].sort().join("-")}`;
}

export function buildDMs(): Conversation[] {
  const players = IDENTITIES.filter((x) => x.role !== "GM");
  const dms: Conversation[] = [];

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const a = players[i];
      const b = players[j];
      dms.push({
        id: dmId(a.id, b.id),
        type: "DM",
        title: `${a.name.toUpperCase()} ↔ ${b.name.toUpperCase()}`,
        members: [a.id, b.id],
        lastMessage: "…",
        lastTime: "—",
        unread: 0,
        online: Math.random() > 0.5, // mock
      });
    }
  }

  return dms;
}

const ALL_DMS = buildDMs();

export function getConversationsForUser(meId: string, role: "PLAYER" | "GM") {
  if (role === "GM") {
    return [...GROUPS, ...ALL_DMS];
  }
  return [
    ...GROUPS,
    ...ALL_DMS.filter((c) => c.members.includes(meId)),
  ];
}
