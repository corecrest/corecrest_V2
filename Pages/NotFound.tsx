import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, AlertCircle } from 'lucide-react';
import { createPageUrl } from '../utils';
import SEO from '../components/SEO';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="404 - Page Not Found | CoreCrest"
        description="The page you're looking for doesn't exist. Return to CoreCrest homepage or browse our services."
        keywords="404, Page Not Found, CoreCrest"
        ogTitle="404 - Page Not Found | CoreCrest"
        ogDescription="The page you're looking for doesn't exist."
        ogUrl="https://corecrest.tech/404"
        twitterTitle="404 - Page Not Found | CoreCrest"
        twitterDescription="The page you're looking for doesn't exist."
        canonicalUrl="https://corecrest.tech/404"
        noindex={true}
      />
      <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-9xl sm:text-[12rem] font-bold gradient-text leading-none">
                404
              </h1>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center shadow-lg shadow-green-600/25">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Page Not Found
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-base text-slate-500 max-w-2xl mx-auto">
                It might have been deleted, renamed, or the URL might be incorrect.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to={createPageUrl('Home')}
                className="inline-flex items-center gap-2 gradient-bg text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-green-700/25"
              >
                <Home className="w-5 h-5" />
                Go to Homepage
              </Link>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-colors border-2 border-slate-200 shadow-sm"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/50"
            >
              <div className="flex items-center gap-2 mb-6 justify-center">
                <Search className="w-5 h-5 text-green-600" />
                <h3 className="text-xl font-semibold text-slate-900">Popular Pages</h3>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Home', page: 'Home' },
                  { name: 'Services', page: 'Services' },
                  { name: 'About Us', page: 'About' },
                  { name: 'Contact', page: 'Contact' },
                ].map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page as any)}
                    className="text-center px-4 py-3 bg-slate-50 hover:bg-green-50 rounded-xl transition-colors text-slate-700 hover:text-green-700 font-medium border border-slate-200 hover:border-green-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

