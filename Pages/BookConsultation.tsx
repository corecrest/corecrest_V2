import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, Clock, CheckCircle, ArrowRight, 
  Phone, Mail, MapPin, Loader2, AlertCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import HoneypotField from '../components/HoneypotField';
import { submitConsultationForm } from '../lib/email';

const services = [
  { value: 'website_development', label: 'Websites That Convert' },
  { value: 'web_app_development', label: 'Custom Web Apps & Internal Tools' },
  { value: 'saas_products', label: 'Automation & Integrations' },
  { value: 'it_advisory', label: 'IT Advisory (Decision-Safe Tech)' },
];

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service_interest: '',
    preferred_date: undefined as Date | undefined,
    preferred_time: '',
    project_details: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Check for service param in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get('service');
    if (service) {
      const serviceMap: Record<string, string> = {
        'website-development': 'website_development',
        'saas-products': 'saas_products',
        'web-app-development': 'web_app_development',
        'it-advisory': 'it_advisory',
      };
      if (serviceMap[service]) {
        setFormData(prev => ({ ...prev, service_interest: serviceMap[service] }));
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.service_interest) newErrors.service_interest = 'Please select a service';
    if (!formData.preferred_date) newErrors.preferred_date = 'Please select a date';
    if (!formData.preferred_time) newErrors.preferred_time = 'Please select a time';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitConsultationForm({
        ...formData,
        serviceLabel:
          services.find((s) => s.value === formData.service_interest)?.label || formData.service_interest,
        formattedDate: formData.preferred_date
          ? format(formData.preferred_date, 'MMMM d, yyyy')
          : 'Not specified',
      }, honeypot);
      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error('Error sending booking request:', error);
      setSubmitError(
        error instanceof TypeError && error.message.includes('Failed to fetch')
          ? 'Unable to connect to the server. Please check your internet connection and try again.'
          : 'Something went wrong sending your booking. Please try again, or email us directly at info@corecrest.tech.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Book Consultation - Free Growth Diagnostic | CoreCrest"
        description="Book a free Growth Diagnostic with CoreCrest. Get a clear roadmap in 1-2 weeks identifying what's leaking value and what to fix first. Low-risk, fixed-scope assessment."
        keywords="Book Consultation Rwanda, Free IT Consultation Kigali, Growth Diagnostic, Technology Assessment, Software Consultation"
        ogTitle="Book Consultation - Free Growth Diagnostic | CoreCrest"
        ogDescription="Book a free Growth Diagnostic with CoreCrest. Get a clear roadmap in 1-2 weeks identifying what's leaking value."
        ogUrl="https://corecrest.tech/book-consultation"
        twitterTitle="Book Consultation - Free Growth Diagnostic | CoreCrest"
        twitterDescription="Book a free Growth Diagnostic with CoreCrest. Get a clear roadmap in 1-2 weeks identifying what's leaking value."
        canonicalUrl="https://corecrest.tech/book-consultation"
      />
      {isSubmitted ? (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
          <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 shadow-xl"
            >
              <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Growth Diagnostic Booked!
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for booking your Growth Diagnostic with CoreCrest. We've received your request 
                and will confirm your appointment shortly. You'll receive an email confirmation 
                at <span className="font-medium text-slate-900">{formData.email}</span>.
              </p>
              <div className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl p-6 text-left mb-8 border border-teal-100">
                <h3 className="font-semibold text-slate-900 mb-4">Your Diagnostic Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service</span>
                    <span className="text-slate-900 font-medium">
                      {services.find(s => s.value === formData.service_interest)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date</span>
                    <span className="text-slate-900 font-medium">
                      {formData.preferred_date ? format(formData.preferred_date, 'MMMM d, yyyy') : ''}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time (Rwanda Time)</span>
                    <span className="text-slate-900 font-medium">{formData.preferred_time}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500">
                Questions? Contact us at{' '}
                <a href="mailto:info@corecrest.tech" className="text-teal-600 hover:underline">
                  info@corecrest.tech
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                Book Your Growth Diagnostic
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Get a clear roadmap in 1–2 weeks. We'll identify what's leaking value and show you exactly what to fix first.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-8 md:p-10">
                  <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <HoneypotField value={honeypot} onChange={setHoneypot} />

                {/* Personal Information Section */}
                <div className="space-y-6">
                  <div className="pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Your Information</h3>
                    <p className="text-sm text-slate-500 mt-1">Tell us how to reach you</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-slate-700 font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="John Doe"
                        className={`h-12 ${errors.full_name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500'}`}
                      />
                      {errors.full_name && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.full_name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500'}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700 font-medium">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+250 788 123 456"
                        className={`h-12 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500'}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-slate-700 font-medium">
                        Company <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="h-12 focus:border-teal-500 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Service & Scheduling Section */}
                <div className="space-y-6">
                  <div className="pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Service & Scheduling</h3>
                    <p className="text-sm text-slate-500 mt-1">What would you like to discuss?</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Service Interest <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.service_interest}
                      onValueChange={(value) => setFormData({ ...formData, service_interest: value })}
                    >
                      <SelectTrigger className={`h-12 ${errors.service_interest ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500'}`}>
                        {formData.service_interest ? (
                          <span className="text-slate-900">
                            {services.find(s => s.value === formData.service_interest)?.label || formData.service_interest}
                          </span>
                        ) : (
                          <span className="text-slate-400">Select a service</span>
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.service_interest && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span>•</span> {errors.service_interest}
                      </p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Preferred Date <span className="text-red-500">*</span>
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full h-12 justify-start text-left font-normal border-2 ${
                              !formData.preferred_date && 'text-slate-400'
                            } ${errors.preferred_date ? 'border-red-500 focus:border-red-500' : 'focus:border-teal-500'}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.preferred_date ? (
                              format(formData.preferred_date, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white" align="start">
                          <Calendar
                            selected={formData.preferred_date}
                            onSelect={(date: Date | undefined) => setFormData({ ...formData, preferred_date: date })}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.preferred_date && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.preferred_date}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Preferred Time <span className="text-slate-400 text-xs font-normal">(Rwanda Time)</span> <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.preferred_time}
                        onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
                      >
                        <SelectTrigger className={`h-12 ${errors.preferred_time ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-teal-500 focus:ring-teal-500'}`}>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-slate-400" />
                            <SelectValue placeholder="Select time" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.preferred_time && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <span>•</span> {errors.preferred_time}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="space-y-2">
                  <div className="pb-4 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
                    <p className="text-sm text-slate-500 mt-1">Help us prepare for our conversation</p>
                  </div>
                  
                  <Label htmlFor="project_details" className="text-slate-700 font-medium">
                    Project Details <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                  </Label>
                  <Textarea
                    id="project_details"
                    value={formData.project_details}
                    onChange={(e) => setFormData({ ...formData, project_details: e.target.value })}
                    placeholder="Tell us about your current challenges, goals, or what you'd like to discuss..."
                    className="min-h-[140px] resize-none focus:border-teal-500 focus:ring-teal-500"
                  />
                  <p className="text-xs text-slate-400">This helps us prepare relevant questions and examples for our call.</p>
                </div>

                <div className="pt-4">
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
                    className="w-full gradient-bg text-white py-6 text-lg font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-teal-600/25"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Booking Your Diagnostic...
                      </>
                    ) : (
                      <>
                        Book the Growth Diagnostic
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    By submitting, you agree to be contacted about your consultation request.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-8 text-white sticky top-28 shadow-2xl border border-slate-800">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">What You'll Get</h3>
                  <p className="text-slate-400 text-sm">A clear, prioritized roadmap in 1–2 weeks</p>
                </div>
                
                <div className="space-y-6 mb-8">
                {[
                  {
                    title: 'Value Leak Assessment',
                    desc: 'We identify where your website and tools are costing you customers, time, or money.',
                  },
                  {
                    title: 'Prioritized Roadmap',
                    desc: 'Get a step-by-step plan showing which improvements will have the biggest impact first.',
                  },
                  {
                    title: 'ROI-Focused Recommendations',
                    desc: 'Clear build vs buy vs automate decisions with cost and time estimates.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-white">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/10">
                  <h4 className="font-semibold mb-3 text-white">Low-Risk, Fixed Scope</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This is a diagnostic assessment, not a sales pitch. You'll get actionable insights whether you work with us or not.
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <h4 className="font-semibold mb-4 text-white">Need to reach us?</h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+250788863783"
                      className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-teal-600/20 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span className="text-sm">+250 788 863 783</span>
                    </a>
                    <a
                      href="mailto:info@corecrest.tech"
                      className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-teal-600/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-sm">info@corecrest.tech</span>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Kigali, Rwanda</span>
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}