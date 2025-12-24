import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, Mail, MapPin, Clock, Send, CheckCircle, 
  Loader2, ArrowRight, MessageCircle 
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
    
    try {
      // Prepare the email body (formatted for better readability)
      const emailSubject = `Website Inquiry: ${formData.subject}`;
      const emailBody = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">NEW CONTACT FORM SUBMISSION</h1>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; border-top: none;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #16a34a; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">CLIENT INFORMATION</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b; width: 30%;">Name:</td><td style="padding: 8px 0;">${formData.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}" style="color: #16a34a; text-decoration: none;">${formData.email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Subject:</td><td style="padding: 8px 0; background: #dcfce7; padding: 8px; border-radius: 4px; color: #15803d;">${formData.subject}</td></tr>
            </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #16a34a; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">MESSAGE DETAILS</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; border-left: 4px solid #16a34a; white-space: pre-wrap;">${formData.message.replace(/\n/g, '<br>')}</div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #16a34a; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">SUBMISSION DETAILS</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b; width: 30%;">Submission Time:</td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Source:</td><td style="padding: 8px 0;">CoreCrest Website Contact Form</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Priority:</td><td style="padding: 8px 0; background: #dcfce7; color: #15803d; padding: 4px 8px; border-radius: 4px; display: inline-block;">Normal</td></tr>
            </table>
        </div>
    </div>
    
    <div style="background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
        This email was automatically generated from the CoreCrest website.
    </div>
</div>`;

      // Send the data to the API
      const response = await fetch('https://bff.corecrest.tech/api/submit/contact', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': window.location.origin,
        },
        credentials: 'omit',
        mode: 'cors',
        body: JSON.stringify({
          recipient: 'info@corecrest.tech',
          subject: emailSubject,
          body: emailBody,
          body_type: 'html',
          content_encoding: 'plain',
          priority: 2,
          notification_type: 'email',
          source: 'corecrest'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Error: ${response.status} - Failed to send message`);
      }

      // Send confirmation email to the user
      const confirmationSubject = 'Thank you for contacting CoreCrest';
      const confirmationBody = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #16a34a, #15803d); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Thank You for Contacting CoreCrest</h1>
    </div>
    
    <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef; border-top: none;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #1e293b; font-size: 16px; margin: 0 0 15px 0;">Hello ${formData.name},</p>
            <p style="color: #1e293b; font-size: 16px; margin: 0 0 15px 0;">Thank you for reaching out to CoreCrest! We've received your message and will get back to you within 24 hours.</p>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #16a34a; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">YOUR MESSAGE SUMMARY</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b; width: 30%;">Subject:</td><td style="padding: 8px 0;">${formData.subject}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Submitted:</td><td style="padding: 8px 0;">${new Date().toLocaleString()}</td></tr>
            </table>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #16a34a; margin-top: 0; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #16a34a; padding-bottom: 8px;">WHAT HAPPENS NEXT?</h2>
            <p style="color: #1e293b; font-size: 14px; margin: 0 0 10px 0;">Our team will review your message and respond to you at <strong>${formData.email}</strong> within 24 hours.</p>
            <p style="color: #1e293b; font-size: 14px; margin: 0;">If you have any urgent questions, feel free to call us at <a href="tel:+250788863783" style="color: #16a34a; text-decoration: none;">+250 788 863 783</a>.</p>
        </div>
    </div>
    
    <div style="background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">CoreCrest - Practical Tech Solutions for Small Businesses</p>
        <p style="margin: 5px 0 0 0;">Kigali, Rwanda | <a href="mailto:info@corecrest.tech" style="color: #16a34a; text-decoration: none;">info@corecrest.tech</a></p>
    </div>
</div>`;

      try {
        await fetch('https://bff.corecrest.tech/api/submit/contact', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': window.location.origin,
          },
          credentials: 'omit',
          mode: 'cors',
          body: JSON.stringify({
            recipient: formData.email,
            subject: confirmationSubject,
            body: confirmationBody,
            body_type: 'html',
            content_encoding: 'plain',
            priority: 2,
            notification_type: 'email',
            source: 'corecrest-confirmation'
          })
        });
      } catch (confirmationError) {
        // Log but don't fail the main submission if confirmation email fails
        console.error('Failed to send confirmation email:', confirmationError);
      }

      setIsSubmitted(true);
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        alert('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        alert((error instanceof Error ? error.message : 'Failed to send message. Please try again later.'));
      }
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
      />
      {isSubmitted ? (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-200/30 flex items-center justify-center">
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
        <div className="pt-24 min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-200/30">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-semibold text-green-600 tracking-wide uppercase">
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

                <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="text-slate-600 hover:text-green-600 transition-colors"
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
            <span className="text-sm font-semibold text-green-600 tracking-wide uppercase">
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