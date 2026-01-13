import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
      
      {/* White fade overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Make Technology Work for Your Business.
          </h1>
          <h2 className="sr-only">Innovation at the Heart of Africa — Websites & Tech Solutions That Help Small Businesses Grow</h2>

          <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-10 max-w-2xl">
            CoreCrest helps small and growing businesses build websites and internal tools that generate more leads, streamline operations, and support growth — without overbuilding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link
              to={createPageUrl('BookConsultation')}
              className="gradient-bg text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25"
            >
              Get a 2-Week Growth Diagnostic
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to={createPageUrl('Services')}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-medium border-2 border-slate-200 hover:border-teal-600 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-5 h-5 text-teal-600" />
              See what we improve first
            </Link>
          </div>

          <p className="text-sm text-slate-600 max-w-xl mb-12">
            Low-risk, fixed-scope assessment. Clear roadmap before you spend on a build.
          </p>

          {/* Credibility */}
          <div className="mt-12 pt-8 border-t border-slate-300/50">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Practical, business-first delivery</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-teal-600 mt-1">•</span>
                <span>Outcome-driven recommendations, not generic packages</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-teal-600 mt-1">•</span>
                <span>Fixed-scope diagnostics to reduce decision risk</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-teal-600 mt-1">•</span>
                <span>Clean implementation with documentation and handover</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}