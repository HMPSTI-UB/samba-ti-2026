import { 
  Cloud, 
  Zap, 
  Sun, 
  Star, 
  Globe, 
  Award, 
  ShieldCheck, 
  Rocket, 
  CheckCircle2,
  Brain,
  Shield,
  Lightbulb,
  Heart,
  Code,
  Users
} from "lucide-react";

export const PHASES = [
  {
    id: "nebula",
    title: "NEBULA",
    phase: "PHASE 01",
    meaning: "Nebula adalah tempat lahirnya bintang baru. Mahasiswa baru berkumpul, berkenalan, dan membentuk fondasi identitas sebagai satu angkatan.",
    color: "from-cosmic-purple to-electric-blue",
    icon: Cloud,
    accent: "#7C3AED",
    secondary: "#38BDF8",
    details: {
      date: "12 Agustus 2026",
      time: "07:00 - 15:00 WIB",
      venue: "Gedung F FILKOM UB",
      address: "Jl. Veteran, Ketawanggede, Kec. Lowokwaru, Malang",
      activities: "Pemberian materi pengenalan lingkungan kampus, perkenalan antar kelompok, dinamika angkatan, dan fun games pengakraban.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    }
  },
  {
    id: "fusion",
    title: "FUSION",
    phase: "PHASE 02",
    meaning: "Proses bintang ditempa tekanan agar tetap bersinar. Pengujian mental, logika, solidaritas, kreativitas, dan kerja sama tim.",
    color: "from-electric-blue to-star-gold",
    icon: Zap,
    accent: "#38BDF8",
    secondary: "#FACC15",
    details: {
      date: "26 Agustus 2026",
      time: "08:00 - 16:00 WIB",
      venue: "Auditorium Algoritma",
      address: "Gedung G Lantai 2, Fakultas Ilmu Komputer UB",
      activities: "Workshop IT fundamental, pemecahan masalah (Problem Solving), studi kasus kolaboratif, dan presentasi gagasan inovatif angkatan.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    }
  },
  {
    id: "supernova",
    title: "SUPERNOVA",
    phase: "PHASE 03",
    meaning: "Ledakan indah dari bintang yang mencapai puncak evolusi. Selebrasi resmi diterimanya mahasiswa baru sebagai bagian keluarga TI.",
    color: "from-supernova-orange to-star-gold",
    icon: Sun,
    accent: "#FB923C",
    secondary: "#FACC15",
    details: {
      date: "15 September 2026",
      time: "18:00 - 22:00 WIB",
      venue: "Samantha Krida UB",
      address: "Universitas Brawijaya, Ketawanggede, Malang",
      activities: "Malam inaugurasi, penganugerahan IT Heroes, penampilan seni dari tiap kelompok, dan pengukuhan resmi keluarga besar mahasiswa TI.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800",
    }
  },
  {
    id: "zenith",
    title: "ZENITH",
    phase: "FINAL STATE",
    meaning: "Peserta telah menyelesaikan rangkaian dan siap menjadi New IT Heroes. Siap bersinar dan berkarya di masa depan.",
    color: "from-soft-white via-star-gold to-electric-blue",
    icon: Star,
    accent: "#FACC15",
    secondary: "#38BDF8",
    details: {
      date: "Pasca Inaugurasi",
      time: "Sepanjang Masa",
      venue: "Dunia Teknologi",
      address: "Global Digital Ecosystem",
      activities: "Berkarya, mengikuti kompetisi, membangun startup, atau menjadi profesional TI yang membawa nama baik almamater di dunia luar.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    }
  },
];

export const OUTCOMES = [
  { 
    id: "academic",
    title: "Academic Integration", 
    desc: "Mengenal program studi Teknologi Informasi secara mendalam, memahami kurikulum, serta menguasai fundamental akademik sebagai pondasi karir TI.", 
    icon: Globe,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-cyan-500/20"
  },
  { 
    id: "excellence",
    title: "IT Excellence", 
    desc: "Lahirnya karya dan proyek kolaboratif TI angkatan 2026 yang inovatif, solutif, dan memberikan dampak nyata secara langsung bagi masyarakat luas.", 
    icon: Award,
    color: "from-star-gold to-orange-400",
    shadow: "shadow-star-gold/20"
  },
  { 
    id: "unity",
    title: "Unity & Synergy", 
    desc: "Membentuk rasa kepemilikan dan solidaritas angkatan yang kokoh, suportif, serta saling menguatkan dalam menghadapi berbagai tantangan perkuliahan.", 
    icon: ShieldCheck,
    color: "from-emerald-400 to-green-500",
    shadow: "shadow-emerald-500/20"
  },
  { 
    id: "innovation",
    title: "Innovation Mindset", 
    desc: "Meningkatkan daya kreativitas, berpikir kritis, dan kemampuan problem solving tingkat tinggi melalui berbagai tantangan terukur yang diberikan.", 
    icon: Rocket,
    color: "from-cosmic-purple to-purple-600",
    shadow: "shadow-purple-500/20"
  },
  { 
    id: "branding",
    title: "Visionary Branding", 
    desc: "Meningkatkan citra dan branding SAMBA TI: ZENITH di mata publik, sivitas akademika, dan ekosistem digital secara lebih luas.", 
    icon: Zap,
    color: "from-electric-blue to-blue-600",
    shadow: "shadow-electric-blue/20"
  },
  { 
    id: "character",
    title: "Character Building", 
    desc: "Menanamkan nilai-nilai luhur seperti respect, integrity, kedisiplinan, dan etika kolaborasi dalam setiap aksi dan keputusan.", 
    icon: CheckCircle2,
    color: "from-rose-400 to-red-500",
    shadow: "shadow-rose-500/20"
  },
];

export const MANIFESTO = [
  { label: "Adaptive", icon: Brain },
  { label: "Integrity", icon: Shield },
  { label: "Creative", icon: Lightbulb },
  { label: "Respectful", icon: Heart },
  { label: "Problem Solver", icon: Code },
  { label: "Collaborative", icon: Users },
];

export const MISSIONS = [
  "Mengenalkan program studi Teknologi Informasi.",
  "Menanamkan kreativitas, respect, solidaritas, dan problem solving.",
  "Menyatukan keberagaman latar belakang ke ekosistem TI.",
  "Mengasah daya kritis melalui tantangan terukur.",
  "Mengukuhkan maba sebagai keluarga besar TI."
];
