import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  X,
  Tag,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, language } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Exam Preparation', 'Parent Guidance', 'Study Tips'];

  const filteredPosts = blogPosts.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Educational Insights & Guides
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Learning Resources & Exam Preparation for Ethiopia
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Expert articles from our academic advisory team, top university student tutors, and curriculum specialists.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
              selectedCategory === cat
                ? 'bg-[#0D3B66] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat === 'all' ? 'All Articles' : cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-white rounded-3xl border border-slate-200/90 hover:border-[#0D3B66]/30 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div className="p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="font-bold text-[#06B6D4] uppercase tracking-wider">
                  {post.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0D3B66] transition-colors leading-snug">
                {language === 'am' && post.titleAm ? post.titleAm : post.title}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {language === 'am' && post.summaryAm ? post.summaryAm : post.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{post.author}</span>
              <span className="flex items-center gap-1 font-semibold text-[#0D3B66] group-hover:underline">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-[#06B6D4] uppercase">
                  {selectedPost.category}
                </span>
                <span>·</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {language === 'am' && selectedPost.titleAm
                  ? selectedPost.titleAm
                  : selectedPost.title}
              </h2>
              <p className="text-xs text-slate-500">
                By {selectedPost.author} · {selectedPost.date}
              </p>
            </div>

            <div className="prose prose-sm max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-100 pt-4">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex gap-1.5">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-xl hover:bg-[#1E3A8A]"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
