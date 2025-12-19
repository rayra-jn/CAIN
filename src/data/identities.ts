export type Identity = {
  id: string;
  name: string;
  securityCode: string;
  role: "PLAYER" | "GM";
};

export const IDENTITIES: Identity[] = [
  { id: "katherine", name: "Katherine Valensk", securityCode: "AL9-X32-MVT", role: "PLAYER" },
  { id: "kruger", name: "Kruger Bloodcroft", securityCode: "KT2-W51-PRX", role: "PLAYER" },
  { id: "percyval", name: "Percyval Bloodcroft", securityCode: "BR4-Q88-ZNH", role: "PLAYER" },
  { id: "benjamin", name: "Benjamin Bagora", securityCode: "SV7-M09-LQD", role: "PLAYER" },
  { id: "charley", name: "Charley Miller", securityCode: "HM3-T44-VJK", role: "PLAYER" },
  { id: "salazar", name: "Salazar Alzalam", securityCode: "QP8-R21-TFG", role: "PLAYER" },
  { id: "adrian", name: "Adrian Voss", securityCode: "ZX1-H77-BWC", role: "PLAYER" },

  // mestre (pode trocar depois)
  { id: "gm", name: "MESTRE", securityCode: "GM-ROOT-000", role: "GM" },
];

export function getById(id?: string) {
  return IDENTITIES.find((x) => x.id === id);
}

export function getBySecurityCode(code: string) {
  const normalized = code.trim().toUpperCase();
  return IDENTITIES.find((x) => x.securityCode.toUpperCase() === normalized);
}
