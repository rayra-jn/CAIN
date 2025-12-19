export type ChatRoom = {
  id: string;
  name: string;
  type: "GROUP" | "PRIVATE";
};

export const CHAT_ROOMS: ChatRoom[] = [
  { id: "operacao-01", name: "GRUPO HYDRA", type: "GROUP" },
  { id: "laboratorio", name: "ALEJANDRO", type: "PRIVATE" },
  { id: "arquivo", name: "ALEX", type: "PRIVATE" },
];
