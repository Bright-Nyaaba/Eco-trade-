import React, { useState } from 'react';
import { storage } from '../lib/storage';
import { useAuth } from '../lib/auth';
import { MessageSquare, Heart, Share2, Plus, Search, Tag, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_POSTS = [
  { 
    id: '1', 
    userId: 'u1', 
    userName: 'Kofi Mensah', 
    title: 'How I reduced my household waste by 50%', 
    content: 'Start by separating your plastics from organics. It makes the trade process so much faster!', 
    tags: ['Tips', 'Recycling'], 
    likes: 24, 
    commentsCount: 8, 
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString() 
  },
  { 
    id: '2', 
    userId: 'u2', 
    userName: 'Ama Serwaa', 
    title: 'New collection point in East Legon!', 
    content: 'Just spotted a new EcoTrade bin near the Palace Mall. Super convenient.', 
    tags: ['News', 'Locations'], 
    likes: 15, 
    commentsCount: 3, 
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString() 
  },
];

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [isPosting, setIsPosting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handlePost = () => {
    if (!newTitle || !newContent || !user) return;
    const post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      title: newTitle,
      content: newContent,
      tags: ['Discussion'],
      likes: 0,
      commentsCount: 0,
      timestamp: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setIsPosting(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-sm text-neutral-500">Share tips & stories with eco-warriors</p>
        </div>
        <button 
          onClick={() => setIsPosting(true)}
          className="bg-green-600 text-white p-3 rounded-2xl shadow-lg shadow-green-100 active:scale-90 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input 
          type="text" 
          placeholder="Search discussions..." 
          className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {['All', 'Tips', 'News', 'Locations', 'Challenges', 'Success Stories'].map(tag => (
          <button 
            key={tag}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tag === 'All' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-500 border border-neutral-100'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isPosting && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border-2 border-green-100 rounded-3xl p-5 space-y-4 mb-4">
              <input 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Topic Title" 
                className="w-full font-bold text-lg focus:outline-none"
              />
              <textarea 
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Share your tip or experience..." 
                rows={3}
                className="w-full text-sm text-neutral-600 focus:outline-none resize-none"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsPosting(false)} className="px-4 py-2 text-neutral-400 text-sm font-bold">Cancel</button>
                <button 
                  onClick={handlePost}
                  disabled={!newTitle || !newContent}
                  className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50"
                >
                  Post to Community
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {posts.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-neutral-100 p-5 rounded-3xl shadow-sm space-y-4 group active:scale-[0.98] transition-transform"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-neutral-400" />
              </div>
              <div>
                <p className="text-xs font-bold">{post.userName}</p>
                <p className="text-[10px] text-neutral-400">{format(new Date(post.timestamp), 'MMM d, h:mm a')}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-lg leading-tight group-hover:text-green-600 transition-colors">{post.title}</h3>
              <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed">{post.content}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-neutral-400 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-neutral-400 hover:text-green-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-bold">{post.commentsCount}</span>
                </button>
              </div>
              <button className="text-neutral-400">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
