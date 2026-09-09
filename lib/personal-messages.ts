export function relativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Baru aja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;

  return then.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
}

export function getGreeting(name: string = 'Kiya'): string {
  const hour = new Date().getHours();
  
  const morningGreetings = [
    `Selamat pagi ${name}! Semangat belajarnya! ☀️`,
    `Morning ${name}! Ready taklukkin soal hari ini? 💪`,
    `Pagi ${name}! Jeya siap nemenin belajar! 🐼`,
  ];
  
  const afternoonGreetings = [
    `Halo ${name}! Semangat siang-siangnya! 🌤️`,
    `Siang ${name}! Istirahat dulu atau lanjut belajar? 🐼`,
    `Afternoon ${name}! Let's keep the momentum! ✨`,
  ];
  
  const eveningGreetings = [
    `Malam ${name}! Masih semangat? 🌙✨`,
    `Evening study session! Let's go ${name}! 🎯`,
    `Malam ${name}! Jeya nemenin belajar yaa! 🐼💪`,
  ];

  let greetings;
  if (hour < 12) greetings = morningGreetings;
  else if (hour < 18) greetings = afternoonGreetings;
  else greetings = eveningGreetings;

  return greetings[Math.floor(Math.random() * greetings.length)];
}

export const jeyaMessages = {
  encouragement: [
    'Kiya pasti bisa! 💪🐼',
    'Keep going Kiya! Kamu amazing! ✨',
    'Semangat terus yaa! 🔥',
    'Jeya tau Kiya bisa! Let\'s go! 🌟',
  ],

  celebration: [
    'KEREN KIYA! 🎉🐼',
    'Perfect! Kiya mantap banget! 🌟',
    'Yesss! That\'s my Kiya! 💪✨',
    'Luar biasa Kiya! Jeya bangga! 🎉',
  ],

  correct: [
    'Bener banget Kiya! 🎉',
    'Keren! Kiya pinter banget! 🌟',
    'Perfect! Lanjut yuk! 💪',
    'Yesss! Kiya mantap! 🔥',
    'Hebat Kiya! Jeya proud! 🐼✨',
  ],

  wrong: [
    'Gapapa Kiya, coba lagi yuk! 💪',
    'Hampir bener! Kamu pasti bisa! ✨',
    'Santai, ini kan buat belajar! 🐼',
    'Next time pasti bisa! Keep going! 🌟',
    'Jeya yakin Kiya bisa! Semangat! 💪',
  ],

  loading: [
    'Lagi nyiapin soal yang seru nih! 🎯',
    'AI-nya lagi mikir keras buat Kiya! 🧠',
    'Tunggu sebentar, hampir siap! ✨',
    'Preparing your challenge! 💪',
    'Jeya lagi pilih-pilih soal terbaik! 🐼',
  ],
};

export function randomPick<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
