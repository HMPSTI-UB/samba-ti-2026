import Link from "next/link";
import { Mail, MapPin } from "lucide-react";


const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-midnight-navy border-t border-white/10 pt-20 pb-10 px-6 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent blur-sm" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Brand Info */}
        <div className="lg:col-span-1">
          <div className="flex flex-col">
            <h2 className="font-heading font-black text-2xl tracking-tighter mb-2">SAMBA TI <span className="text-electric-blue">2026</span></h2>
            <p className="font-heading text-sm font-bold tracking-widest text-star-gold mb-6">ZENITH</p>
            <p className="text-muted-text text-sm leading-relaxed mb-6">
              Ruang inkubasi visioner yang mengantarkan mahasiswa baru menuju Zenith potensi mereka sebagai New IT Heroes.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-electric-blue hover:border-electric-blue hover:bg-electric-blue/10 transition-all">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-electric-blue hover:border-electric-blue hover:bg-electric-blue/10 transition-all">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-text hover:text-electric-blue hover:border-electric-blue hover:bg-electric-blue/10 transition-all">
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-6 text-soft-white">Tautan Berguna</h3>
          <ul className="space-y-4">
            <li><Link href="#about" className="text-muted-text text-sm hover:text-electric-blue transition-colors">About Mission</Link></li>
            <li><Link href="#journey" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Journey Phase</Link></li>
            <li><Link href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Outcomes</Link></li>
            <li><Link href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-6 text-soft-white">Sumber Daya</h3>
          <ul className="space-y-4">
            <li><a href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Buku Panduan</a></li>
            <li><a href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Virtual Background</a></li>
            <li><a href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Twibbon</a></li>
            <li><a href="#" className="text-muted-text text-sm hover:text-electric-blue transition-colors">Ketentuan Atribut</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading font-bold text-lg mb-6 text-soft-white">Hubungi Kami</h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-electric-blue flex-shrink-0" />
              <span className="text-muted-text text-sm">Gedung Fakultas Vokasi Dieng, Universitas Brawijaya</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-electric-blue flex-shrink-0" />
              <span className="text-muted-text text-sm">samba.ti@ub.ac.id</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between relative z-10">
        <p className="text-muted-text text-sm mb-4 md:mb-0">
          &copy; 2026 Himpunan Mahasiswa Teknologi Informasi. All rights reserved.
        </p>
        <div className="flex space-x-6 text-sm text-muted-text">
          <a href="#" className="hover:text-soft-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-soft-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
