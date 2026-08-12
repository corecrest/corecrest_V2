import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import HoneypotField from '../components/HoneypotField';
import { submitContactForm } from '../lib/email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  Loader2, ArrowRight, MessageCircle, AlertCircle 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm(formData, honeypot);
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      setSubmitError(
        error instanceof TypeError && error.message.includes('Failed to fetch')
          ? 'Unable to connect to the server. Please check your internet connection and try again.'
          : 'Something went wrong sending your message. Please try again, or email us directly at info@corecrest.tech.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      content: 'Kigali, Rwanda',
      link: null,
    },
    {
      icon: Phone,
      title: 'Phone Number',
      content: '+250 788 863 783',
      link: 'tel:+250788863783',
    },
    {
      icon: Mail,
      title: 'Email Address',
      content: 'info@corecrest.tech',
      link: 'mailto:info@corecrest.tech',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM (CAT)',
      link: null,
    },
  ];

  return (
    <>
      <SEO
        title="Contact CoreCrest - Get in Touch | Software Company Rwanda"
        description="Contact CoreCrest for website development, SaaS solutions, and custom web applications. Located in Kigali, Rwanda. Call +250 788 863 783 or email info@corecrest.tech"
        keywords="Contact CoreCrest, Software Company Rwanda, IT Services Kigali, Website Development Contact, SaaS Solutions Rwanda"
        ogTitle="Contact CoreCrest - Get in Touch | Software Company Rwanda"
        ogDescription="Contact CoreCrest for website development, SaaS solutions, and custom web applications. Located in Kigali, Rwanda."
        ogUrl="https://corecrest.tech/contact"
        twitterTitle="Contact CoreCrest - Get in Touch | Software Company Rwanda"
        twitterDescription="Contact CoreCrest for website development, SaaS solutions, and custom web applications. Located in Kigali, Rwanda."
        canonicalUrl="https://corecrest.tech/contact"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "CoreCrest",
            "url": "https://corecrest.tech",
            "telephone": "+250788863783",
            "email": "info@corecrest.tech",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            "priceRange": "$$",
            "areaServed": "Rwanda",
            "description": "CoreCrest is a software company in Kigali, Rwanda providing website development, SaaS solutions, automation, and IT advisory services for small businesses.",
            "logo": "https://corecrest.tech/logo.png",
            "sameAs": [
              "https://www.linkedin.com/company/corecrest",
              "https://twitter.com/CoreCrestTech"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://corecrest.tech" },
              { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://corecrest.tech/contact" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take to build a website?",
                "acceptedAnswer": { "@type": "Answer", "text": "A typical website takes 2-4 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation." }
              },
              {
                "@type": "Question",
                "name": "What is your pricing model?",
                "acceptedAnswer": { "@type": "Answer", "text": "We offer project-based pricing tailored to your specific needs. Contact us for a free quote based on your requirements." }
              },
              {
                "@type": "Question",
                "name": "Do you provide ongoing support?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes! We offer maintenance and support packages to keep your website or application running smoothly." }
              },
              {
                "@type": "Question",
                "name": "Can you work with our existing systems?",
                "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We specialize in integrating with existing systems and can work with your current technology stack." }
              }
            ]
          }
        ]}
      />
      {isSubmitted ? (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-200/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Message Sent!
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Thank you for reaching out. We've received your message and will 
              get back to you within 24 hours.
            </p>
            <Link
              to={createPageUrl('Home')}
              className="inline-flex items-center gap-2 gradient-bg text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Back to Home
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
      ) : (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-200/30">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-teal-600 tracking-wide uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-6">
              Let's Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p className="text-lg text-slate-600">
              Have a question or want to discuss a project? We'd love to hear from you. 
              Reach out and we'll respond as soon as we can.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-slate-600 mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <HoneypotField value={honeypot} onChange={setHoneypot} />

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-slate-700">Your Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className={`mt-2 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className={`mt-2 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-slate-700">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help you?"
                      className={`mt-2 ${errors.subject ? 'border-red-500' : ''}`}
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-slate-700">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project or question..."
                      className={`mt-2 min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-bg text-white py-6 text-lg rounded-xl hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {item.title}
                      </h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-slate-600 hover:text-teal-600 transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-slate-600">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[4/3] bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
                    alt="CoreCrest office location in Kigali, Rwanda - software company providing website development and technology solutions"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                    <div className="text-center text-white">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Kigali, Rwanda</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-slate-950 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Need immediate help?
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  Book a consultation and speak with our team directly.
                </p>
                <Link
                  to={createPageUrl('BookConsultation')}
                  className="block w-full gradient-bg text-white px-4 py-3 rounded-xl font-medium text-center hover:opacity-90 transition-opacity"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold text-teal-600 tracking-wide uppercase">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to build a website?',
                a: 'A typical website takes 2-4 weeks depending on complexity. We\'ll provide a detailed timeline during our initial consultation.',
              },
              {
                q: 'What is your pricing model?',
                a: 'We offer project-based pricing tailored to your specific needs. Contact us for a free quote based on your requirements.',
              },
              {
                q: 'Do you provide ongoing support?',
                a: 'Yes! We offer maintenance and support packages to keep your website or application running smoothly.',
              },
              {
                q: 'Can you work with our existing systems?',
                a: 'Absolutely. We specialize in integrating with existing systems and can work with your current technology stack.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
      )}
    </>
  );
}