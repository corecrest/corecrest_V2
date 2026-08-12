import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-teal-50 via-slate-50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-10">
              CoreCrest helps small and growing businesses build websites and internal tools that generate more leads, streamline operations, and support growth — without overbuilding.
            </p>

            <div className="mb-6">
              <Link
                to={createPageUrl('BookConsultation')}
                className="gradient-bg text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25"
              >
                Get a 2-Week Growth Diagnostic
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-sm text-slate-600 max-w-xl">
              Low-risk, fixed-scope assessment. Clear roadmap before you spend on a build.
            </p>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-transparent rounded-full blur-3xl" />
            <img
              src="/corecrest_hero.webp"
              alt="Illustration of a small business owner using a website, connected tools, and a growth dashboard"
              width={1150}
              height={1150}
              decoding="async"
              className="relative w-full max-w-sm lg:max-w-none mx-auto mix-blend-multiply"
            />
          </motion.div>
        </div>

        {/* Credibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-slate-200"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Practical, business-first delivery</h3>
          <ul className="grid sm:grid-cols-3 gap-6">
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
        </motion.div>
      </div>
    </section>
  );
}
