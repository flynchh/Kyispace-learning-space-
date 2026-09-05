import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export type QuizQuestion = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
};

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'INSANE';

const difficultyGuides = {
  EASY: 'Fokus pada definisi, konsep dasar, dan hafalan. Level SMP kelas 7. Pertanyaan straightforward tanpa jebakan.',
  MEDIUM: 'Kombinasi pemahaman konsep dan aplikasi sederhana. Level SMP kelas 8. Membutuhkan pemahaman, bukan hanya hafalan.',
  HARD: 'Analisis, sintesis, dan problem solving. Level SMP kelas 9 + reasoning. Soal multi-step yang membutuhkan berpikir kritis.',
  INSANE: 'Mix medium-hard dengan trick questions, edge cases, dan multi-step reasoning. Membutuhkan pemahaman mendalam dan analisis cepat.',
};

export async function generateQuiz(
  topic: string,
  difficulty: Difficulty,
  count: number = 15
): Promise<QuizQuestion[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });

  const prompt = `Kamu adalah generator soal IPA Terpadu SMP untuk persiapan lomba KSR (Kompetisi Sains SMP).

TOPIC: ${topic}
DIFFICULTY: ${difficulty}
GUIDE: ${difficultyGuides[difficulty]}

Generate EXACTLY ${count} multiple choice questions dalam format JSON array.

REQUIREMENTS:
1. Semua teks dalam Bahasa Indonesia yang baik dan benar
2. Sesuai kurikulum IPA Terpadu SMP Indonesia
3. Hindari pertanyaan ambigu atau multitafsir
4. Setiap opsi jawaban harus masuk akal (bukan jelas salah)
5. Penjelasan harus edukatif dan mengajarkan konsep
6. Untuk INSANE mode: buat pertanyaan yang menantang tapi tetap fair

FORMAT OUTPUT (JSON array):
[
  {
    "question": "Teks pertanyaan yang jelas dan spesifik",
    "options": {
      "A": "Opsi A",
      "B": "Opsi B",
      "C": "Opsi C",
      "D": "Opsi D"
    },
    "correctAnswer": "A",
    "explanation": "Penjelasan lengkap mengapa jawaban benar dan yang lain salah, serta konsep yang diajarkan"
  }
]

HANYA return JSON array, tanpa teks tambahan, tanpa markdown code block, tanpa penjelasan.`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const cleaned = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const questions = JSON.parse(cleaned) as QuizQuestion[];
    
    if (!Array.isArray(questions) || questions.length !== count) {
      throw new Error('Invalid question format or count');
    }
    
    return questions;
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error('Failed to generate quiz questions');
  }
}
