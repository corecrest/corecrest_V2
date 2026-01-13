import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, FileSpreadsheet, Clock, Database, Plug, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: TrendingDown,
    text: 'You get website visitors, but enquiries and bookings are inconsistent.',
  },
  {
    icon: FileSpreadsheet,
    text: 'Your team relies on spreadsheets, WhatsApp, or email threads to run core workflows.',
  },
  {
    icon: Clock,
    text: 'Customer follow-ups are manual, late, or forgotten.',
  },
  {
    icon: Database,
    text: 'Reporting takes hours because data lives in too many places.',
  },
  {
    icon: Plug,
    text: 'You keep paying for tools, but nothing feels connected.',
  },
  {
    icon: AlertTriangle,
    text: 'Small mistakes (double work, missed messages, wrong data) happen too often.',
  },
];

export default function ProblemAwareness() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-slate-50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-50 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Signs your tech is costing you money
          </h2>
          <p className="text-lg text-slate-600">
            If any of these sound familiar, your technology might be holding your business back instead of helping it grow.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 hover:border-red-200 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <problem.icon className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {problem.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

