import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-teal-50/30" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-teal-600/20 to-teal-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-600/10 to-teal-700/10 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Make Technology Work for Your Business.
            </h1>
            <h2 className="sr-only">Innovation at the Heart of Africa — Websites & Tech Solutions That Help Small Businesses Grow</h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-xl">
              CoreCrest helps small and growing businesses build websites and internal tools that generate more leads, streamline operations, and support growth — without overbuilding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link
                to={createPageUrl('BookConsultation')}
                className="gradient-bg text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25"
              >
                Get a 2-Week Growth Diagnostic
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={createPageUrl('Services')}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-medium border-2 border-slate-200 hover:border-teal-600 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 text-teal-600" />
                See what we improve first
              </Link>
            </div>

            <p className="text-sm text-slate-500 max-w-xl">
              Low-risk, fixed-scope assessment. Clear roadmap before you spend on a build.
            </p>

            {/* Credibility */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Practical, business-first delivery</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Outcome-driven recommendations, not generic packages</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Fixed-scope diagnostics to reduce decision risk</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-teal-600 mt-1">•</span>
                  <span>Clean implementation with documentation and handover</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="CoreCrest team collaborating on website development and technology solutions for small businesses in Rwanda"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -left-8 top-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-slate-900/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Fast Delivery</p>
                    <p className="text-xs text-slate-500">On-time, every time</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-xl shadow-slate-900/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Quality Assured</p>
                    <p className="text-xs text-slate-500">Premium solutions</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}