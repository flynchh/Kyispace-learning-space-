export type StudyApplication = {
  category: string;
  examples: string[];
};

export type StudyContent = {
  introduction: string;
  keyConcepts: string[];
  applications: StudyApplication[];
  ethics?: string;
  ksrTips: string[];
};

const contentByCanonicalName: Record<string, StudyContent> = {
  Bioteknologi: {
    introduction:
      'Bioteknologi adalah pemanfaatan makhluk hidup atau bagiannya (sel, enzim, DNA) untuk menghasilkan barang dan jasa yang berguna. Ada yang konvensional seperti fermentasi tempe, dan ada yang modern seperti rekayasa genetika. Topik ini sering muncul di KSR karena menghubungkan konsep sel, DNA, dan isu sehari-hari.',
    keyConcepts: [
      'Bioteknologi konvensional memakai mikroorganisme utuh tanpa mengubah DNA, contohnya tape, yogurt, dan nata de coco.',
      'Bioteknologi modern mengubah materi genetik, misalnya DNA rekombinan, kloning, dan organisme transgenik.',
      'DNA rekombinan menyisipkan gen asing ke inang (sering bakteri E. coli) agar menghasilkan protein tertentu.',
      'Kultur jaringan menumbuhkan sel/jaringan tumbuhan di media steril untuk perbanyakan cepat dan bebas penyakit.',
      'Enzim industri (amilase, protease) mempercepat reaksi tanpa dikonsumsi, dipakai di makanan dan detergen.',
    ],
    applications: [
      {
        category: 'Kesehatan',
        examples: [
          'Insulin manusia dari bakteri rekombinan untuk diabetes',
          'Vaksin hepatitis B dari ragi',
          'Antibiotik dari jamur Penicillium',
        ],
      },
      {
        category: 'Pertanian',
        examples: [
          'Golden Rice mengandung beta-karoten (provitamin A)',
          'Tanaman Bt tahan hama karena gen Bacillus thuringiensis',
          'Kultur meristem untuk bibit pisang/kentang bebas virus',
        ],
      },
      {
        category: 'Industri & Lingkungan',
        examples: [
          'Bioetanol dari tebu atau jagung',
          'Bioremediasi minyak tumpah oleh bakteri',
          'Enzim detergen yang aktif di suhu rendah',
        ],
      },
    ],
    ethics:
      'GMO diperdebatkan: mendukung hasil panen dan gizi, tapi dikhawatirkan dampak ekosistem, alergi, dan ketergantungan benih. Di soal KSR, bedakan fakta ilmiah dengan opini.',
    ksrTips: [
      'Bedakan konvensional vs modern dengan 2 contoh masing-masing.',
      'Hafal alur sederhana DNA rekombinan: isolasi gen → sisipkan plasmid → transformasi bakteri → produksi protein.',
      'Siap analisis pro-kontra GMO pada studi kasus.',
      'Jangan campur fermentasi (konvensional) dengan transgenik (modern).',
    ],
  },

  Ekologi: {
    introduction:
      'Ekologi mempelajari hubungan makhluk hidup dengan lingkungannya. Di SMP, fokusnya rantai makanan, jaring-jaring makanan, piramida ekologi, daur biogeokimia, dan keseimbangan ekosistem. Soal KSR sering menguji aliran energi dan dampak gangguan manusia.',
    keyConcepts: [
      'Produsen (autotrof) membuat makanan sendiri lewat fotosintesis; konsumen memakan organisme lain; dekomposer mengurai sisa organik.',
      'Rantai makanan linier; jaring-jaring makanan kumpulan rantai yang saling terhubung.',
      'Piramida energi selalu mengecil ke atas karena energi terbuang sebagai panas (hanya ~10% tersimpan ke tingkat berikutnya).',
      'Daur air, karbon, nitrogen, dan fosfor menjaga ketersediaan zat di ekosistem.',
      'Suksesi: perubahan komunitas menuju klimaks; primer di lahan baru, sekunder di lahan yang pernah hidup.',
    ],
    applications: [
      {
        category: 'Lingkungan',
        examples: [
          'Hutan mangrove meredam gelombang dan jadi nursery ikan',
          'Taman nasional menjaga keanekaragaman hayati',
        ],
      },
      {
        category: 'Pertanian',
        examples: [
          'Pengendalian hama hayati (predator alami) menggantikan pestisida berlebih',
          'Rotasi tanaman menjaga kesuburan tanah',
        ],
      },
    ],
    ethics:
      'Eksploitasi berlebih, polusi, dan alih fungsi lahan merusak jaring makanan. Konservasi bukan hanya “melarang”, tapi menjaga jasa ekosistem yang manusia butuhkan.',
    ksrTips: [
      'Kalau ada piramida, ingat: biomassa/energi menurun, tapi jumlah individu tidak selalu (contoh pohon vs serangga).',
      'Gangguan di satu tingkat memengaruhi tingkat lain — latihan soal “apa yang terjadi jika predator hilang”.',
      'Hafal peran Rhizobium (fiksasi N) dan dekomposer.',
      'Bedakan habitat (tempat hidup) vs relung/niche (peran ekologis).',
    ],
  },

  'Keanekaragaman dan Pengelompokan Makhluk Hidup': {
    introduction:
      'Makhluk hidup sangat beragam bentuk, habitat, dan cara hidupnya. Ilmuwan mengelompokkan mereka (taksonomi) agar mudah dipelajari. Di SMP, kamu membedakan kingdom, ciri vertebrata/invertebrata, dan kunci determinasi sederhana.',
    keyConcepts: [
      'Klasifikasi dari luas ke sempit: kingdom → filum/divisio → kelas → ordo → famili → genus → spesies.',
      'Nama ilmiah binomial: Genus spesies (contoh Homo sapiens), ditulis miring.',
      'Lima/enam kingdom yang sering diujikan: Monera, Protista, Fungi, Plantae, Animalia (plus Archaebacteria pada sistem 6).',
      'Vertebrata punya tulang belakang (ikan, amfibi, reptil, burung, mamalia); invertebrata tidak.',
      'Kunci determinasi: pertanyaan berpasangan (ya/tidak) untuk mengidentifikasi makhluk hidup.',
    ],
    applications: [
      {
        category: 'Kesehatan & Pangan',
        examples: [
          'Mengenali jamur/bakteri patogen vs yang bermanfaat',
          'Identifikasi tanaman obat dan hama pertanian',
        ],
      },
      {
        category: 'Konservasi',
        examples: [
          'Inventarisasi spesies endemik Indonesia (komodo, rafflesia)',
          'Membedakan spesies dilindungi saat ekowisata',
        ],
      },
    ],
    ksrTips: [
      'Hafal ciri pembeda cepat: bakteri (prokariotik), jamur (heterotrof dinding kitin), tumbuhan (autotrof dinding selulosa).',
      'Latihan kunci determinasi: baca dua opsi, pilih satu, lanjut nomor yang ditunjuk.',
      'Mamalia: kelenjar susu + berambut; burung: bulu + berparuh; reptil: sisik kering + bertelur berkulit.',
      'Spesies = kelompok yang dapat kawin dan menghasilkan keturunan fertil.',
    ],
  },

  'Makhluk Hidup & Lingkungannya': {
    introduction:
      'Makhluk hidup beradaptasi dengan lingkungan biotik dan abiotik. Interaksi bisa menguntungkan, merugikan, atau netral. Topik ini dekat dengan ekologi, tapi lebih fokus pada adaptasi, simbiosis, dan pengaruh faktor lingkungan.',
    keyConcepts: [
      'Faktor abiotik: suhu, cahaya, air, pH, tanah, udara. Faktor biotik: makhluk hidup lain.',
      'Adaptasi morfologi (bentuk tubuh), fisiologi (fungsi tubuh), dan tingkah laku.',
      'Simbiosis: mutualisme (saling untung), komensalisme (satu untung, lain tidak rugi), parasitisme (satu untung, inang rugi).',
      'Kompetisi terjadi jika sumber daya terbatas; predasi adalah pemangsa-mangsa.',
      'Kamuflase, mimikri, dan migrasi adalah strategi bertahan hidup.',
    ],
    applications: [
      {
        category: 'Sehari-hari',
        examples: [
          'Kaktus berdaun duri menghemat air di gurun',
          'Ikan paus bermigrasi mencari makan dan berkembang biak',
        ],
      },
      {
        category: 'Pertanian',
        examples: [
          'Tumpang sari mengurangi kompetisi hama',
          'Mikoriza (jamur + akar) membantu serapan hara',
        ],
      },
    ],
    ksrTips: [
      'Soal sering kasih contoh: tentukan jenis simbiosis — latihan 5 pasang organisme.',
      'Bedakan adaptasi morfologi vs tingkah laku dengan contoh konkret.',
      'Ingat: parasit merugikan inang, predator membunuh mangsa (bukan simbiosis).',
      'Faktor pembatas = faktor yang paling menghambat pertumbuhan populasi.',
    ],
  },

  'Molekuler, Sel & Organisme': {
    introduction:
      'Sel adalah unit terkecil kehidupan. Di tingkat molekuler, DNA, protein, dan organel bekerja agar sel hidup. Kamu perlu membedakan sel hewan/tumbuhan, prokariotik/eukariotik, serta fungsi organel utama.',
    keyConcepts: [
      'Prokariotik (bakteri) tidak punya inti sejati; eukariotik punya membran inti.',
      'Sel tumbuhan: dinding selulosa, kloroplas, vakuola besar; sel hewan: sentriol, tidak punya kloroplas.',
      'Mitokondria = respirasi sel (ATP); kloroplas = fotosintesis; ribosom = sintesis protein.',
      'Membran sel selektif: osmosis (air), difusi (zat terlarut), transpor aktif butuh energi.',
      'DNA membawa informasi genetik; gen diekspresikan menjadi protein lewat transkripsi-translasi (tingkat pengenalan).',
    ],
    applications: [
      {
        category: 'Kesehatan',
        examples: [
          'Cairan infus isotonis agar sel darah tidak pecah/mengkerut',
          'Obat yang menarget ribosom bakteri (antibiotik) tanpa merusak sel manusia',
        ],
      },
      {
        category: 'Teknologi',
        examples: [
          'Mikroskop cahaya vs elektron untuk melihat organel',
          'Kultur sel untuk uji obat',
        ],
      },
    ],
    ksrTips: [
      'Hafal tabel beda sel hewan vs tumbuhan (minimal 4 ciri).',
      'Soal osmosis: hipertonis = sel mengkerut, hipotonis = sel menggembung.',
      'Jangan tertukar: mitokondria ≠ kloroplas.',
      'Urutan organisasi: sel → jaringan → organ → sistem organ → organisme.',
    ],
  },

  'Organisasi Kehidupan': {
    introduction:
      'Kehidupan tersusun bertingkat, dari atom hingga biosfer. Memahami hierarki ini membantu menjelaskan kenapa kerusakan di satu tingkat bisa berdampak ke tingkat lain. Ini fondasi sebelum masuk sistem organ dan ekologi.',
    keyConcepts: [
      'Tingkat: sel → jaringan → organ → sistem organ → organisme → populasi → komunitas → ekosistem → bioma → biosfer.',
      'Jaringan: kumpulan sel sejenis dengan fungsi sama (epitel, otot, saraf, ikat pada hewan).',
      'Organ: beberapa jaringan bekerja sama (jantung, daun, ginjal).',
      'Populasi = individu sejenis di suatu daerah; komunitas = semua populasi; ekosistem = komunitas + abiotik.',
      'Emergent property: tingkat lebih tinggi punya sifat yang tidak ada di tingkat bawah (contoh: kesadaran bukan sifat satu neuron).',
    ],
    applications: [
      {
        category: 'Kesehatan',
        examples: [
          'Kerusakan sel jantung (jaringan) mengganggu organ, lalu sistem peredaran darah',
          'Biopsi memeriksa jaringan, bukan seluruh organ',
        ],
      },
      {
        category: 'Lingkungan',
        examples: [
          'Punahnya satu populasi mengubah komunitas',
          'Pencemaran abiotik merusak seluruh ekosistem',
        ],
      },
    ],
    ksrTips: [
      'Hafal urutan hierarki tanpa loncat.',
      'Soal “manakah tingkat di atas organ?” → sistem organ.',
      'Bedakan populasi vs komunitas dengan 1 contoh konkret.',
      'Daun = organ; mesofil = jaringan; kloroplas = organel (di dalam sel).',
    ],
  },

  'Pewarisan Sifat': {
    introduction:
      'Sifat makhluk hidup diwariskan lewat gen dari induk ke anak. Genetika Mendel menjelaskan rasio persilangan, sementara DNA menjelaskan substansinya. Di KSR, soal sering berupa punnett square dan kelainan terkait kromosom.',
    keyConcepts: [
      'Gen = unit pewarisan; alel = varian gen (dominan/resesif).',
      'Genotipe (susunan gen, mis. Aa) vs fenotipe (sifat tampak, mis. tinggi).',
      'Hukum pemisahan (segregation): alel berpisah saat pembentukan gamet; hukum berpasangan bebas (independent assortment) untuk gen beda kromosom.',
      'Persilangan monohibrid rasio fenotipe 3:1 (jika lengkap dominan); dihibrid 9:3:3:1.',
      'Kelamin ditentukan kromosom (XX/XY pada manusia); ada sifat tertaut kelamin (buta warna, hemofilia).',
    ],
    applications: [
      {
        category: 'Kesehatan',
        examples: [
          'Konseling genetik talasemia dan hemofilia',
          'Golongan darah ABO dan rhesus untuk transfusi',
        ],
      },
      {
        category: 'Pertanian',
        examples: [
          'Pemuliaan tanaman untuk hasil tinggi',
          'Persilangan hewan ternak unggul',
        ],
      },
    ],
    ethics:
      'Tes genetik dan rekayasa sifat menimbulkan isu privasi dan diskriminasi. Di soal, fokus ke mekanisme ilmiah dulu, baru implikasi sosial jika ditanya.',
    ksrTips: [
      'Latihan punnett square sampai otomatis.',
      'Hafal: O = resesif, A dan B kodominan pada golongan darah.',
      'Buta warna: X-linked resesif — laki-laki lebih sering terkena.',
      'Bedakan hibrida (Aa) vs galur murni (AA/aa).',
    ],
  },

  'Sistem-sistem pada Manusia dan Hewan': {
    introduction:
      'Tubuh manusia dan hewan bekerja lewat sistem organ yang terkoordinasi: pencernaan, pernapasan, peredaran, ekskresi, saraf, hormon, gerak, dan reproduksi. Soal KSR menguji fungsi organ, alur zat, dan gangguan umum.',
    keyConcepts: [
      'Pencernaan: mekanik + kimia; enzim (amilase, pepsin, lipase) spesifik substrat dan pH.',
      'Pernapasan manusia: hidung → tenggorokan → trakea → bronkus → alveolus (pertukaran O2-CO2).',
      'Peredaran darah tertutup: jantung 4 ruang, darah kaya O2 di arteri (kecuali arteri pulmonalis).',
      'Ekskresi: ginjal (urin), paru (CO2), kulit (keringat), hati (zat sisa hemoglobin → bilirubin).',
      'Saraf cepat (impuls), hormon lambat tapi lama (contoh insulin mengatur gula darah).',
    ],
    applications: [
      {
        category: 'Kesehatan',
        examples: [
          'Vaksin merangsang sistem imun',
          'Dialisis menggantikan fungsi ginjal',
          'Olahraga meningkatkan kapasitas vital paru',
        ],
      },
      {
        category: 'Perbandingan Hewan',
        examples: [
          'Ikan bernapas dengan insang; serangga dengan trakea',
          'Burung punya pundi-pundi hawa untuk terbang',
        ],
      },
    ],
    ksrTips: [
      'Hafal urutan saluran pencernaan dan di mana enzim bekerja.',
      'Jangan tertukar vena/arteri dan darah bersih/kotor, terutama sirkulasi paru.',
      'Nephron: filtrasi di glomerulus, reabsorpsi di tubulus.',
      'Soal gangguan: diabetes (insulin), anemia (hemoglobin), asma (saluran napas menyempit).',
    ],
  },

  'Besaran, Satuan, dan Pengukuran': {
    introduction:
      'Fisika dimulai dari mengukur. Besaran pokok punya satuan SI, besaran turunan disusun dari pokok. Ketelitian alat, angka penting, dan notasi ilmiah sering jadi soal jebakan di KSR.',
    keyConcepts: [
      '7 besaran pokok SI: panjang (m), massa (kg), waktu (s), arus (A), suhu (K), jumlah zat (mol), intensitas cahaya (cd).',
      'Besaran turunan: luas, volume, kecepatan, gaya (N = kg·m/s²), tekanan (Pa), energi (J).',
      'Vektor punya arah (gaya, kecepatan); skalar tidak (massa, suhu, energi).',
      'Ketidakpastian: skala terkecil alat; pengukuran berulang untuk kurangi galat acak.',
      'Notasi ilmiah dan prefiks (kilo, mili, mikro) wajib fasih dikonversi.',
    ],
    applications: [
      {
        category: 'Sehari-hari',
        examples: [
          'Timbangan digital vs neraca ohaus',
          'Stopwatch, mistar, jangka sorong, mikrometer sekrup',
        ],
      },
      {
        category: 'Teknologi',
        examples: [
          'GPS memakai pengukuran waktu sangat teliti',
          'Kalibrasi alat laboratorium',
        ],
      },
    ],
    ksrTips: [
      'Hafal ketelitian: mistar 1 mm, jangka sorong 0,1 mm, mikrometer 0,01 mm.',
      'Soal konversi satuan hampir selalu muncul — latihan kg↔g, m/s↔km/jam.',
      'Jangan campur massa (kg) dengan berat (N).',
      'Cek dimensi rumus: ruas kiri harus sama satuannya dengan ruas kanan.',
    ],
  },

  'Zat dan Kalor': {
    introduction:
      'Zat bisa padat, cair, gas, dan berubah wujud jika kalor diserap atau dilepas. Kalor adalah energi yang berpindah karena perbedaan suhu. Pahami kalor jenis, kalor laten, dan tiga cara perpindahan kalor.',
    keyConcepts: [
      'Suhu mengukur derajat panas (C/K); kalor adalah energi (Joule/kalori).',
      'Q = m·c·ΔT untuk ubah suhu; Q = m·L untuk ubah wujud (latihan/lebur, uap/kondensasi).',
      'Konduksi: lewat zat tanpa perpindahan partikel zat secara keseluruhan (logam).',
      'Konveksi: perpindahan karena aliran fluida (air mendidih, angin darat/laut).',
      'Radiasi: gelombang elektromagnetik, bisa vakum (panas matahari).',
    ],
    applications: [
      {
        category: 'Rumah Tangga',
        examples: [
          'Termos meminimalkan konduksi, konveksi, dan radiasi',
          'Kipas mempercepat penguapan keringat (pendinginan)',
        ],
      },
      {
        category: 'Alam',
        examples: [
          'Angin darat-laut karena konveksi',
          'Pemanasan global terkait efek rumah kaca (radiasi IR)',
        ],
      },
    ],
    ethics:
      'Pembakaran bahan bakar fosil menambah CO2, menahan kalor di atmosfer. Soal bisa mengaitkan kalor dengan isu iklim — pahami mekanismenya, bukan hanya jargon.',
    ksrTips: [
      'Grafik pemanasan es→uap: datar saat ubah wujud (suhu konstan).',
      'Hafal: kalor jenis air 4200 J/kg°C (sering dipakai).',
      'Logam konduktor, kayu/udara isolator.',
      'Bedakan suhu dan kalor di setiap soal cerita.',
    ],
  },

  Energi: {
    introduction:
      'Energi adalah kemampuan melakukan usaha. Bentuknya banyak (kinetik, potensial, panas, listrik, kimia, nuklir) dan bisa berubah, tetapi kekekalan energi tetap berlaku. Efisiensi dan sumber energi terbarukan sering diujikan.',
    keyConcepts: [
      'Usaha W = F·s (gaya searah perpindahan); daya P = W/t.',
      'Energi kinetik Ek = ½mv²; potensial gravitasi Ep = mgh; pegas ½kx².',
      'Mekanik = Ek + Ep (jika gesekan diabaikan, kekal).',
      'Hukum kekekalan: energi tidak diciptakan/dimusnahkan, hanya berubah bentuk.',
      'Efisiensi = (energi berguna / energi masukan) × 100%.',
    ],
    applications: [
      {
        category: 'Teknologi',
        examples: [
          'PLTA: potensial air → kinetik turbin → listrik',
          'Mobil: kimia BBM → panas → kinetik (banyak terbuang panas)',
        ],
      },
      {
        category: 'Lingkungan',
        examples: [
          'Panel surya, angin, biomassa sebagai energi terbarukan',
          'Hemat energi mengurangi emisi',
        ],
      },
    ],
    ksrTips: [
      'Gambar diagram aliran energi di pembangkit listrik.',
      'Soal lintasan: di titik tertinggi Ep max, di terendah Ek max.',
      'Hafal satuan: Joule, Watt, kWh (energi listrik rumah).',
      'Gesekan mengubah energi mekanik jadi kalor — mekanik tidak kekal.',
    ],
  },

  'Gerak dan Gaya': {
    introduction:
      'Gerak menjelaskan perubahan posisi terhadap waktu; gaya adalah tarikan atau dorongan yang bisa mengubah gerak. Newton memberi 3 hukum yang jadi tulang punggung mekanika SMP/KSR.',
    keyConcepts: [
      'GLB: v konstan, a = 0. GLBB: a konstan. v = s/t (rata-rata); a = Δv/t.',
      'Hukum I: benda diam/GLB tetap begitu jika resultan gaya nol (kelembaman).',
      'Hukum II: ΣF = m·a (gaya sebanding percepatan, berbanding terbalik massa).',
      'Hukum III: aksi = reaksi, sama besar berlawanan arah, pada benda berbeda.',
      'Gesekan statis > kinetis; gaya berat W = m·g; tekanan P = F/A.',
    ],
    applications: [
      {
        category: 'Sehari-hari',
        examples: [
          'Sabuk pengaman (hukum I: tubuh cenderung maju saat rem)',
          'Sepatu sport menambah gesekan agar tidak slip',
        ],
      },
      {
        category: 'Olahraga',
        examples: [
          'Semakin kecil massa raket (pada F sama), percepatan lebih besar',
          'Ban lebar mengurangi tekanan pada tanah lunak',
        ],
      },
    ],
    ksrTips: [
      'Grafik s-t: kemiringan = kecepatan. Grafik v-t: kemiringan = percepatan, luas = jarak.',
      'Jangan pakai hukum III seolah dua gaya pada benda yang sama saling meniadakan.',
      'Satuan gaya Newton; 1 N = 1 kg·m/s².',
      'Soal bidang miring: uraikan gaya jadi komponen sejajar dan tegak lurus.',
    ],
  },

  Fluida: {
    introduction:
      'Fluida meliputi zat cair dan gas yang dapat mengalir. Tekanan hidrostatis, hukum Pascal, Archimedes, dan persamaan kontinuitas adalah paket wajib KSR.',
    keyConcepts: [
      'Tekanan hidrostatis P = ρ·g·h (tergantung kedalaman, bukan bentuk bejana).',
      'Hukum Pascal: tekanan pada zat cair tertutup diteruskan sama ke segala arah (dongkrak hidrolik).',
      'Archimedes: gaya apung = berat fluida yang dipindahkan. Terapung, melayang, tenggelam tergantung massa jenis.',
      'Debit Q = V/t = A·v. Kontinuitas: A1v1 = A2v2 (pipa menyempit → lebih cepat).',
      'Bernoulli (pengenalan): kecepatan naik, tekanan turun (sayap pesawat, penyemprot).',
    ],
    applications: [
      {
        category: 'Teknologi',
        examples: [
          'Dongkrak dan rem hidrolik',
          'Kapal baja terapung karena volume terendam besar (massa jenis efektif < air)',
        ],
      },
      {
        category: 'Alam',
        examples: [
          'Ikan punya gelembung renang mengatur massa jenis',
          'Bendungan lebih tebal di bawah karena tekanan lebih besar',
        ],
      },
    ],
    ksrTips: [
      'Hafal ρ air = 1000 kg/m³, g = 10 m/s² (sering dibulatkan).',
      'Soal terapung: Fa = W benda; V terendam/V benda = ρ benda/ρ fluida.',
      'Pipa sempit → v besar. Jangan kebalik.',
      'Tekanan total di kedalaman = P0 + ρgh (jika ditanya termasuk atmosfer).',
    ],
  },

  'Getaran, Gelombang, & Bunyi': {
    introduction:
      'Getaran adalah gerak bolak-balik di sekitar kesetimbangan. Gelombang merambatkan energi. Bunyi adalah gelombang mekanik longitudinal yang butuh medium. Frekuensi, periode, dan cepat rambat jadi rumus inti.',
    keyConcepts: [
      'Periode T = waktu 1 getaran; f = 1/T; pada pegas T = 2π√(m/k), bandul T = 2π√(l/g).',
      'Gelombang transversal (simpangan tegak lurus merambat, tali/cahaya); longitudinal (sejajar, bunyi/pijar).',
      'v = f·λ = λ/T. Amplitudo terkait energi/kuat bunyi, bukan cepat rambat.',
      'Bunyi: 20–20.000 Hz (audiosonik); di bawah infrasonik, di atas ultrasonik.',
      'Cepat rambat bunyi paling cepat di zat padat, paling lambat di gas; tidak merambat di vakum.',
    ],
    applications: [
      {
        category: 'Teknologi',
        examples: [
          'USG memakai ultrasonik',
          'Sonar kapal mengukur kedalaman (pantulan bunyi)',
        ],
      },
      {
        category: 'Musik',
        examples: [
          'Senar lebih tegang/pendek → f lebih tinggi (nada lebih tinggi)',
          'Resonansi kotak gitar memperkuat bunyi',
        ],
      },
    ],
    ksrTips: [
      'Hafal v bunyi udara ≈ 340 m/s.',
      'Soal echo: 2s = v·t, s jarak ke tebing.',
      'Bedakan nada (frekuensi) vs kuat bunyi (amplitudo).',
      'Gelombang tali: gambar λ dari puncak ke puncak.',
    ],
  },

  'Cahaya dan Optik': {
    introduction:
      'Cahaya adalah gelombang elektromagnetik yang bisa dipantulkan, dibiaskan, dan diuraikan. Cermin dan lensa membentuk bayangan dengan aturan tertentu — ini topik rumus-heavy yang sering muncul di KSR.',
    keyConcepts: [
      'Pemantulan: i = r. Cermin datar: bayangan maya, sama besar, tegak, jarak sama.',
      'Cermin cekung: konvergen, bisa nyata/terbalik; cembung: divergen, maya, tegak, diperkecil.',
      'Pembiasan: cahaya pindah medium, n = c/v, n1 sin i = n2 sin r (Snellius).',
      'Lensa cembung (+) mengumpulkan; cekung (−) menyebarkan. 1/f = 1/s + 1/s′; M = s′/s = h′/h.',
      'Mata: lensa cembung, retina. Miopi (dekat) dikoreksi cekung; hipermetropi (jauh) dikoreksi cembung.',
    ],
    applications: [
      {
        category: 'Alat Optik',
        examples: [
          'Kacamata, lup, mikroskop, teropong',
          'Kamera: lensa + sensor sebagai “retina”',
        ],
      },
      {
        category: 'Alam',
        examples: [
          'Pelangi: dispersi + pemantulan dalam tetes air',
          'Fatamorgana karena pembiasan di udara panas',
        ],
      },
    ],
    ksrTips: [
      'Hafal sifat bayangan 5 kasus cermin cekung dan 2 kasus cembung.',
      'Tanda f: cembung +, cekung − (lensa). s′ + = nyata (di belakang lensa).',
      'Indeks bias besar → cahaya lebih “dibelokkan” ke normal.',
      'Lukisan sinar: 3 sinar istimewa cukup untuk tentukan bayangan.',
    ],
  },

  'Kelistrikan & Kemagnetan': {
    introduction:
      'Muatan listrik menghasilkan medan; arus adalah aliran muatan. Magnet punya kutub utara-selatan dan berkaitan dengan listrik (elektromagnetisme). Rangkaian HUKUM OHM adalah jantung soal KSR.',
    keyConcepts: [
      'Q = I·t. Ohm: V = I·R. Daya P = V·I = I²R = V²/R.',
      'Hambatan seri: R tot = R1+R2 (I sama). Paralel: 1/R tot = 1/R1+1/R2 (V sama).',
      'Hantaran: konduktor (logam), isolator (karet), semikonduktor (silikon).',
      'Magnet: kutub sejenis tolak, berlainan tarik. Medan keluar dari utara ke selatan (luar magnet).',
      'Arus listrik menimbulkan magnet (Oersted); magnet bergerak dekat kawat dapat induksi arus (Faraday).',
    ],
    applications: [
      {
        category: 'Rumah',
        examples: [
          'Sekering/MCB putus jika arus berlebih',
          'Lampu paralel agar satu mati yang lain tetap nyala',
        ],
      },
      {
        category: 'Teknologi',
        examples: [
          'Motor listrik: gaya Lorentz pada kawat berarus di medan magnet',
          'Generator/dinamo mengubah gerak jadi listrik',
          'Kompas mengikuti medan magnet Bumi',
        ],
      },
    ],
    ksrTips: [
      'Latihan rangkaian campuran seri-paralel sampai lancar.',
      'Hafal warna kutub kompas: utara kompas menunjuk utara geografis ≈ selatan magnet Bumi.',
      'Energi listrik rumah: kWh = P(kW) × t(jam).',
      'Jangan tertukar: hambatan besar → arus kecil (V tetap).',
    ],
  },

  'Ilmu Pengetahuan Bumi dan Antariksa': {
    introduction:
      'IPBA membahas Bumi sebagai planet, struktur dalamnya, atmosfer, hidrosfer, serta tata surya. Soal KSR menguji lapisan Bumi, peredaran benda langit, gerhana, dan fenomena seperti pasang surut serta musim.',
    keyConcepts: [
      'Lapisan Bumi: kerak, mantel, inti luar (cair, medan magnet), inti dalam (padat).',
      'Lempeng tektonik: gempa, gunung api, palung di batas lempeng.',
      'Atmosfer: troposfer (cuaca), stratosfer (ozon), mesosfer, termosfer, eksosfer.',
      'Rotasi Bumi (24 jam) → siang-malam & gaya Coriolis; revolusi + kemiringan 23,5° → musim.',
      'Gerhana bulan: Bumi di antara Matahari-Bulan (purnama). Gerhana matahari: Bulan di antara (bulan baru). Pasang surut karena gravitasi Bulan (dan Matahari).',
    ],
    applications: [
      {
        category: 'Kehidupan',
        examples: [
          'Kalender dan arah kiblat/navigasi dari benda langit',
          'Prakiraan cuaca dari data atmosfer',
        ],
      },
      {
        category: 'Mitigasi Bencana',
        examples: [
          'Peta zona gempa dan tsunami di batas lempeng',
          'Lapisan ozon melindungi dari UV',
        ],
      },
    ],
    ethics:
      'Pemanasan global dan lubang ozon adalah isu sains + kebijakan. Pahami penyebab ilmiah (GRK, CFC) agar bisa menjawab soal berbasis data, bukan mitos.',
    ksrTips: [
      'Gambar posisi Matahari-Bumi-Bulan untuk gerhana — jangan kebalik.',
      'Planet dalam (Merkurius, Venus) vs luar (setelah Mars) dipisah asteroid.',
      'Hafal urutan planet dan ciri khusus: Venus terpanas, Jupiter terbesar, Saturnus cincin.',
      'Musim di Indonesia lebih terkait hujan/kemarau (monsun), bukan 4 musim kutub.',
    ],
  },
};

const aliases: Record<string, string> = {
  'Keanekaragaman Makhluk Hidup': 'Keanekaragaman dan Pengelompokan Makhluk Hidup',
  'Sistem Manusia & Hewan': 'Sistem-sistem pada Manusia dan Hewan',
  'Besaran, Satuan & Pengukuran': 'Besaran, Satuan, dan Pengukuran',
  'Zat & Kalor': 'Zat dan Kalor',
  'Gerak & Gaya': 'Gerak dan Gaya',
  'Getaran, Gelombang & Bunyi': 'Getaran, Gelombang, & Bunyi',
  'Cahaya & Optik': 'Cahaya dan Optik',
  'Bumi & Antariksa': 'Ilmu Pengetahuan Bumi dan Antariksa',
};

export function getStudyContent(topicName: string): StudyContent | null {
  const canonical = aliases[topicName] ?? topicName;
  return contentByCanonicalName[canonical] ?? null;
}

export function getCanonicalTopicName(topicName: string): string {
  return aliases[topicName] ?? topicName;
}

export const studyContent = contentByCanonicalName;
export const studyContentAliases = aliases;
