export type CommunityBoard = {
  code: string;
  name: string;
  borough: string;
  zipCodes: string[];
};

export const COMMUNITY_BOARDS: CommunityBoard[] = [
  { code: "BK-01", name: "Brooklyn Community Board 1", borough: "Brooklyn", zipCodes: ["11211", "11222", "11249"] },
  { code: "BK-02", name: "Brooklyn Community Board 2", borough: "Brooklyn", zipCodes: ["11201", "11205", "11215", "11217"] },
  { code: "BK-03", name: "Brooklyn Community Board 3", borough: "Brooklyn", zipCodes: ["11206", "11216", "11221", "11233"] },
  { code: "BK-04", name: "Brooklyn Community Board 4", borough: "Brooklyn", zipCodes: ["11206", "11221", "11237"] },
  { code: "BK-05", name: "Brooklyn Community Board 5", borough: "Brooklyn", zipCodes: ["11207", "11208", "11239"] },
  { code: "BK-06", name: "Brooklyn Community Board 6", borough: "Brooklyn", zipCodes: ["11215", "11217", "11231"] },
  { code: "BK-07", name: "Brooklyn Community Board 7", borough: "Brooklyn", zipCodes: ["11209", "11214", "11228"] },
  { code: "BK-08", name: "Brooklyn Community Board 8", borough: "Brooklyn", zipCodes: ["11209", "11214", "11228", "11204"] },
  { code: "MN-11", name: "Manhattan Community Board 11", borough: "Manhattan", zipCodes: ["10029", "10035"] },
];

export function getCommunityBoardsForZip(zip: string): CommunityBoard[] {
  return COMMUNITY_BOARDS.filter((cb) => cb.zipCodes.includes(zip));
}

export function isZipInBoard(zip: string, boardCode: string): boolean {
  const board = COMMUNITY_BOARDS.find((cb) => cb.code === boardCode);
  return board ? board.zipCodes.includes(zip) : false;
}
