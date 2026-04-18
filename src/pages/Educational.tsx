import React from 'react';
import { BookOpen, Lightbulb, Recycle, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ARTICLES = [
  {
    title: "The Impact of Plastic in Ghana",
    excerpt: "Over 3,000 tonnes of plastic waste are generated daily in Ghana. Most ends up in our oceans.",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-600",
    readTime: "4 min read"
  },
  {
    title: "PET vs HDPE: What's the Diff?",
    excerpt: "Understanding industrial codes can help you organize your waste more efficiently for higher rewards.",
    icon: Recycle,
    color: "bg-blue-100 text-blue-600",
    readTime: "3 min read"
  },
  {
    title: "10 Zero-Waste Kitchen Hacks",
    excerpt: "Small changes in your cooking habits can lead to a massive reduction in single-use plastic.",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
    readTime: "6 min read"
  }
];

export default function Educational() {
  return (
    <div className="space-y-6 pb-12">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Learn & Grow</h1>
        <p className="text-sm text-neutral-500">Your guide to sustainable living in Ghana</p>
      </header>

      <div className="space-y-4">
        {ARTICLES.map((article, idx) => (
          <motion.div
            key={article.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-5 rounded-3xl border border-neutral-100 shadow-sm space-y-3 group cursor-pointer hover:border-green-100"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${article.color}`}>
              <article.icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-lg leading-tight group-hover:text-green-600 transition-colors">{article.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{article.excerpt}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{article.readTime}</span>
              <div className="text-green-600 font-bold text-xs flex items-center gap-1">
                Read Article <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-neutral-900 p-8 rounded-[40px] text-white text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-green-400 mx-auto" />
        <h2 className="text-xl font-bold italic">“Be the change you want to see in the world.”</h2>
        <p className="text-xs text-white/50 leading-relaxed">
          Mahatma Gandhi's words resonate today in our fight against plastic pollution in our beautiful Ghana. 
          Every bottle you recycle counts.
        </p>
      </div>
    </div>
  );
}
