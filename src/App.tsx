/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Play, 
  Info, 
  Search, 
  Bell, 
  ChevronRight, 
  Home, 
  Library, 
  Compass, 
  Trophy, 
  User,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ReactNode } from 'react';

// --- Constants ---

const IMAGES = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAFiKf0Ip_bFJVH-kxb9cytM06tj37Q0ELo3PHNgKYAQfgRrns_d8_HADxc0c0CC_bJ73R-lpjRjwWKvGHZ0qLLHjoHo8oeGwSUtO8nSt6--qXwh9OqDNHs-U9k3W28LOifPtj2TlDXxcWf9UsoHMhvD9rNXlFyljARn9KZKkkmr8BQa-Y2ehXvDQmAF1BDohrRF51foz3-Qf6p5IbwRM4YsRwKC4P9KsmXJ92At_wD_iENBZQ8PvmiYDv7TdnNCorOsEWMovXIvvz",
  synaptic: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1YNf6FeoVYPg7Cerk-4B1czR1MizVN90rEQExIF8wkb5_lm0NMpDHc-OeniQOWT7P9-gYYInf0d5PnLc5BsoVm9oAdcuxpGqxVnFNjw6sszaHQtNtoiWIJoKmZrZpQ2q960UWvptqEvLCM5U8nTRKJRAjLo6ucT3ctlTjZwCfxTAgOd-GUyOzu6PNyz9MYIzPa1jL8ATfxKWsZDU1OVL_RyMejTodEKT4E6yY8gXSh2l7NxW01s8K6z3NFJTqJ7ImKtg7BEkGZ3_W",
  reactive: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBoNrygvzhRVgM0bqERyn9bKktgPq1THIsYdMTAS1-riFQrBXlOSDKCJcrxQkgw0Xtl6E99VSaDNsccnrj64UGfXVYjtQKMABq89TjKskEI51ww4xfxY9oqkgcuTqm7UbjvnbkieLevlzsaraVNWJb5Of2TflSUrWXob5F49gLKHCoISfzmxeiMRD8goegVvEosBAF72Y7yizhd5kqC24aUHBHxFZka889c46WKIfn-iaXtKD5GNhxZCtj71UqcC6G33TO1yZAWSYH",
  ui: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6puuA0nh2C9O13bVVojMNTlbVe0FiZpOdpSCfQ7OXW9rF-xc8xt9vDka-yEWFLi1ixwQD0Snhuxrn8tSCqYTLPn0q2Osv9pxTOIgrWmb01GjeI9K7OsrHiIdigKNS1XReB2V_ivt1X8bh2RNX9EHPMYCdWHba2C1c_YodA_ROKdvFAwokGdnp4v6lCqvJ-1Q2xW3_2Q8GnzoFIecwXRHcF90KoF5jet0Edm1Dm3hIlSa2nka4Rfi04OS2D0nxfjb1PUlqk_NhCRBU",
  english_bay: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuGV4wiYPtqQv9C5jtjwTLJgjQ6RzpuuJtQXPoVJkcWq23YYR8SWr9W4p3Pkn_w3g04-J9DnGn_rrbUjkciJrVL60njf8EP24UVC5qNX-b0XVX84LSEbjzHdAWUIu3kFmWkKAZAzoWv_WTaoFI0n4RgObnoahZGgBxKJwNsFZZ44RsqLJqmppZmzls7Qb9OBONnL_6thKkNhQEtivpZLiVDQRoRNT1UcaQG2x90MxAm_Dmtty1FVMFnwlAXjH5F9gCym9mMnJpGwj1",
  violao: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD7kPlrvYxUspvTRg0h-sMgEvNEJYLn1pQHkq8zdfUaPQhtYj-RovDsvWH5zm97y8KsixYOq2N1yXzXhcAiJ4Uz5r4jWNgeVQP8RUKqhNZWFnBnd-BZFveD6aqnEjaJLeaqUnW6WgvJY3IfrRlcoBe5H1z_Ig34f01QoJ9rXdTVwkpn-sUuLPQbVxIC3ZWMryTDr3uDq9-43gqBRkNKd62eZyFyPhsToBf4WB-9JfBIR8cFq77ufHUoblAhPZAG8Aw-cIHBpWoJcTQ",
  physics: "https://lh3.googleusercontent.com/aida-public/AB6AXuBECu8oL02oIC-t8tIR--BTO-tDvNztO20Ts57DQSV91zQM0IsKz1Fo6tFclNZPbiGKDBeskBBhonlTM9znBY05SlyCCJ1MdjfurH4Nb7i6EzeDenEKyq98Oskbv8dHFNbyhtztv-eaeFNrje3WMAdsnTctijcxRDn5MgKIZ2mRr7GM0AoU48QsDrF9pxA6AeJH3MX6UZULPSWfMp5hLmJhTrcsjTsCrLdyITEgvYhBlMxRDF1U-esoAao3jadEn1Jviv5w3Dl8nE1C",
  matematica: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVW83ZAv88o9fe7XsuBlR_bSxCl2YWW4IcghQfr9usRtQGY_k5ux1YYUP17uOHkzZbMLYtFAzHc0ysoAYJw91pK95LfBAV0HbHple3m-Pin_JBlNgJbP5IZWTPUhLYuLElw83bRXJ7aKgW7jqpM1PixMY4LDh69HWfD9sZ0-ED1dB8yeTSfrXu68qFYRJR7FB7UvBgRIns49KBWogmYytdI4CkOQfTKlBhJe26pz6C63X-p6-adOjpKZ8xcHgNcy_F05Lv972OzDrg",
  programacao: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZPYHd30NV9ZGAuItJu2DYBMo0d4ZyK_P3hZDtZoQEolCo1aSvtkW0jeYbr7rdBtnSrOVRsJf-4TAe9-2_i057luFUGFG3-zblOLHDVrWm5ZBFPsjtLdP6t6XaQSpctmUKkJ8kGBF5kVqygZR_FJ3Y4Nr6TbCLQ7b2aTs4DBeMcEfWdk4VUTK4Ikc9HLK5VCofpcevCO5qpAzRfpPwYaULxAjA0h2qFxisnMxrTAfZbZgtdMfPe0_DddDFcZecUpEbOS5nsoMN50sl",
  bio: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-3O3AFLTB1fn6XOJ-9KFI4mDU_JW3rZAJtDSbYqlOB3mRjGDohGT5DYIcPb1OEljLt0bNfnEyXEn4s4yTj6yrfR6p5eNboIvJqSBhAw5ikIGzyXzohHU2I7BYcu2c9VIbGdWxNJJJFp5dGn9FzvOmUHm3q54LR6eTbnUwHEW2rFjIqq5kuJqr6FWJra3BQTtIrbIYiJQYn8ghEJhAf5FI9AWc3Eth-4UFC-fNfgwfqJ-X8x4iXll7rJiIk8UWlYgDLyO1CgFHBrcG",
  stock: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs4xNzTFCRJ76ekVBDhUdpbmOby9MB3Vy66Q2ekyMZ_lbw082axBi5CMznSicp4zhb6CZn0DPFAFIKHZibv-8pU_nkHBCMfnppmxmMjbDrmOGfoiMqlQoCK_LTJ-7t6CWwrmmZJTgTpJfdTL13O-nL0G5GWBJT87CZFBatqOFUBEAv3xz61CX7bWE1ULQJrzfRVvNWwSx_LGyaCYm4UDQRarvZw_TZdkZjKICwvlvqmA4R-wYdqhUPPge90UtGDZVGFvE_ZU8FL1YQ",
  visual: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr326ZCMMoqwrcHcATAoDt7O6cNU2M7KSvaFDbfw_AuZyMazgG1vNbVR8gNwEP_-2bbXI52i5Wyxy7sM4lj7CfARn__Iml5TKhwTQcm30ssuKAfAIm8zSt_8hD2cs7cqxgjiMl_-NewkpyA1I1cpN7ykg3yaO0dGgsItKn2lc0IpIOqbSEfA44IYr1fThkJNgwEGN5UoPNyCavRts0i_QFYR0i-NiiPT3xxGEJc4ZsX0yNy42avJI4YM-q5WzzJEAR5ET38Z72ewFG",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPf84ZwhLmkg8a59-3AughB2pwu8v6vcS00Ww2vl4rOwc-K1l2gN0OKmgxi1BD025TpdoKtJSiMCYqAXsPl-fajs3Q5mf5Wq5eDMxURVNQkT_Ye7KOzIrgHep8SvLkX2Uun9xIk4UHQsgI_Lv4K05YizAr4winOWaYqIKUqybk-6h_0QK1bW3J8y9lgojOcMlC-D4SJGy7MCWsYoWjycY_yq7d9vzmnrZg4uL8ueSHHpsp3vz2_Wd__uFpS1c7m66LNI_dhvfl_R52",
  deep_learning: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  creative_writing: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  public_speaking: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
  cyber_security: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  design_thinking: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
  world_history: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800",
  marketing: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
};

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12 py-4 flex items-center justify-between ${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center gap-8 md:gap-12">
        <h1 className="text-xl md:text-2xl font-black text-[#e50914] tracking-tighter cursor-pointer">NEUROLEARN</h1>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#" className="text-white font-bold border-b-2 border-[#e50914] pb-1 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-zinc-400 font-medium hover:text-white transition-all hover:scale-105">My Courses</a>
          <a href="#" className="text-zinc-400 font-medium hover:text-white transition-all hover:scale-105">Learning Hub</a>
          <a href="#" className="text-zinc-400 font-medium hover:text-white transition-all hover:scale-105">Achievements</a>
        </nav>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 group-focus-within:text-[#e50914] transition-colors" />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="bg-zinc-900 border-none rounded-full pl-10 pr-4 py-1.5 text-sm w-48 md:w-64 focus:ring-1 focus:ring-[#e50914] transition-all placeholder:text-zinc-500"
          />
        </div>
        <button className="text-zinc-300 hover:text-white transition-transform hover:scale-110 active:scale-95">
          <Bell className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-white/20 hover:scale-110 transition-all cursor-pointer">
          <img src={IMAGES.avatar} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[85vh] md:h-[90vh] w-full flex items-end pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={IMAGES.hero} 
          alt="English Bay Premium" 
          className="w-full h-full object-cover" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 px-6 md:px-16 max-w-3xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#e50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-widest uppercase">Premium</span>
          <span className="text-white/70 font-label tracking-widest text-[11px] uppercase">Academy Original</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-display font-extrabold text-white mb-6 uppercase tracking-tight">
          English Bay Premium
        </h2>
        <p className="text-sm md:text-lg text-zinc-300 mb-8 max-w-xl leading-relaxed">
          Master the art of high-level business communication and academic English with our most immersive course. Designed for global leaders and professionals seeking linguistic perfection.
        </p>
        <div className="flex flex-wrap gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e50914] hover:bg-[#ff0a16] text-white px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold flex items-center gap-3 transition-colors shadow-lg shadow-red-900/20"
          >
            <Play className="w-5 h-5 fill-white" />
            Resume Lesson
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/15 backdrop-blur-md text-white px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold flex items-center gap-3 transition-all border border-white/10"
          >
            <Info className="w-5 h-5" />
            More Info
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

const Shelf = ({ title, children, showViewAll = true }: { title: string, children: ReactNode, showViewAll?: boolean }) => {
  return (
    <section className="px-6 md:px-16 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">{title}</h3>
        {showViewAll && (
          <a href="#" className="group text-zinc-400 hover:text-white font-label text-xs tracking-widest flex items-center gap-2 transition-colors uppercase">
            View All <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-2 px-2">
        {children}
      </div>
    </section>
  );
};

const ProgressCard = ({ image, title, progress, chapter }: { image: string, title: string, progress: number, chapter: string }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex-none w-[280px] md:w-[360px] group cursor-pointer"
    >
      <div className="relative aspect-video rounded-xl overflow-hidden glass-card transition-all duration-300 border border-white/5 hover:border-[#e50914]/50">
        <img src={image} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/70 transition-all"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Play className="w-12 h-12 text-white fill-white" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="flex justify-between items-end mb-2">
            <span className="font-label text-[10px] md:text-[11px] text-white/90 tracking-widest uppercase">{chapter}</span>
            <span className="font-stats text-[12px] text-zinc-400">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#e50914]"
            ></motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CourseCard = ({ image, title, subtitle, tag }: { image: string, title: string, subtitle: string, tag?: string }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex-none w-[340px] md:w-[460px] group cursor-pointer"
    >
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
        <img src={image} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:via-black/40 transition-colors"></div>
        
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {tag && (
            <span className="bg-[#e50914] text-white font-label text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider self-start">
              {tag}
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6">
          <h4 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter mb-1 select-none">
            {title}
          </h4>
          <p className="text-zinc-300 text-xs md:text-sm font-medium tracking-wide">
            {subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const NewReleaseCard = ({ image, title, release, isSparkle }: { image: string, title: string, release: string, isSparkle?: boolean }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="flex-none w-[200px] md:w-[240px] group cursor-pointer"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden glass-card transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.2)]">
        <img src={image} alt={title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
        
        {isSparkle && (
          <div className="absolute top-3 right-3">
            <div className="bg-[#e50914] text-white p-1.5 rounded-full shadow-lg">
              <Sparkles className="w-3 h-3 fill-white" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black via-black/60 to-transparent">
          <h4 className="text-white font-bold text-lg md:text-xl mb-1 group-hover:text-[#e50914] transition-colors">{title}</h4>
          <p className="text-zinc-500 text-[10px] md:text-xs uppercase font-label tracking-widest">{release}</p>
        </div>
      </div>
    </motion.div>
  );
};

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 md:hidden bg-black/95 backdrop-blur-xl border-t border-zinc-900">
      <button className="flex flex-col items-center justify-center text-[#e50914]">
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center justify-center text-zinc-500">
        <Compass className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-1">Explore</span>
      </button>
      <button className="flex flex-col items-center justify-center text-zinc-500">
        <Library className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-1">Subscribed</span>
      </button>
      <button className="flex flex-col items-center justify-center text-zinc-500">
        <User className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-1">Profile</span>
      </button>
    </nav>
  );
};

const Toast = () => {
  return (
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="fixed top-24 right-6 md:right-12 z-[60] glass-card px-6 py-4 rounded-xl border-l-4 border-[#02ad49] flex items-center gap-4 hidden lg:flex shadow-2xl"
    >
      <div className="bg-[#02ad49]/20 p-2 rounded-full">
        <CheckCircle2 className="w-6 h-6 text-[#02ad49]" />
      </div>
      <div>
        <p className="text-white font-bold text-sm">Neural Path Confirmed</p>
        <p className="text-zinc-400 text-xs mt-0.5">Synaptic Plasticity module synchronized.</p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans pb-20 md:pb-32 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        
        <div className="relative -mt-16 md:-mt-24 z-20 space-y-12 md:space-y-16">
          <Shelf title="Continue Watching">
            <ProgressCard 
              image={IMAGES.synaptic} 
              title="Synaptic Plasticity" 
              chapter="CH 4: Synaptic Plasticity" 
              progress={75} 
            />
            <ProgressCard 
              image={IMAGES.reactive} 
              title="Reactive Systems" 
              chapter="Reactive Systems" 
              progress={30} 
            />
            <ProgressCard 
              image={IMAGES.ui} 
              title="UI Fundamentals" 
              chapter="UI Fundamentals" 
              progress={90} 
            />
            <ProgressCard 
              image={IMAGES.deep_learning} 
              title="Deep Learning" 
              chapter="CH 1: Neural Networks" 
              progress={45} 
            />
            <ProgressCard 
              image={IMAGES.creative_writing} 
              title="Creative Writing" 
              chapter="Storytelling Mastery" 
              progress={15} 
            />
            <ProgressCard 
              image={IMAGES.public_speaking} 
              title="Public Speaking" 
              chapter="Rhetoric Basics" 
              progress={60} 
            />
          </Shelf>

          <Shelf title="Your Blockbuster Courses" showViewAll={false}>
            <CourseCard 
              image={IMAGES.english_bay} 
              title="English Bay" 
              subtitle="Elevate your linguistic influence" 
              tag="Must Watch"
            />
            <CourseCard 
              image={IMAGES.violao} 
              title="Violão Master" 
              subtitle="Advanced fingerstyle techniques" 
              tag="Masterclass"
            />
            <CourseCard 
              image={IMAGES.physics} 
              title="Physics Pro" 
              subtitle="Relativity and Quantum Mechanics" 
              tag="Trending"
            />
          </Shelf>

          <Shelf title="New Releases">
            <NewReleaseCard image={IMAGES.matematica} title="Matemática" release="Launching Monday" isSparkle={true} />
            <NewReleaseCard image={IMAGES.programacao} title="Programação" release="Next Friday" />
            <NewReleaseCard image={IMAGES.bio} title="Bio-Genesis" release="Coming Soon" />
            <NewReleaseCard image={IMAGES.stock} title="Stock Master" release="Coming Soon" />
            <NewReleaseCard image={IMAGES.visual} title="Visual Arts" release="Coming Soon" />
            <NewReleaseCard image={IMAGES.cyber_security} title="Cyber Security" release="May 12" isSparkle={true} />
            <NewReleaseCard image={IMAGES.design_thinking} title="Design Thinking" release="June 05" />
            <NewReleaseCard image={IMAGES.world_history} title="World History" release="June 18" />
            <NewReleaseCard image={IMAGES.marketing} title="Marketing Pro" release="Coming Soon" />
          </Shelf>
        </div>
      </main>

      <Toast />
      <BottomNav />
      <footer className="hidden md:block py-12 px-16 border-t border-zinc-900 bg-black text-center text-zinc-600">
        <p className="text-sm">© 2026 NeuroLearn Academy. All rights reserved. 🧠⚡️</p>
      </footer>
    </div>
  );
}
