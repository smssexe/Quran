export type Surah = {
  id: number;
  name: string;
  ayahCount: number;
};

export const SURAHS: Surah[] = [
  { id: 1,  name: "الفاتحة", ayahCount: 7 },
  { id: 2,  name: "البقرة", ayahCount: 286 },
  { id: 3,  name: "آل عمران", ayahCount: 200 },
  { id: 4,  name: "النساء", ayahCount: 176 },
  { id: 5,  name: "المائدة", ayahCount: 120 },
  { id: 6,  name: "الأنعام", ayahCount: 165 },
  { id: 7,  name: "الأعراف", ayahCount: 206 },
  { id: 8,  name: "الأنفال", ayahCount: 75 },
  { id: 9,  name: "التوبة", ayahCount: 129 },
  { id: 10, name: "يونس", ayahCount: 109 },
  // ... ادامه 114 سوره را می‌توانید اضافه کنید
];
