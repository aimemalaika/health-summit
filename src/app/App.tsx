import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import heroImage from '@/assets/3e1b8c5057f8ee51803533b2cd0c5e557313e19d.png';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const formElement = e.currentTarget; // Save reference before async operations
    const name = formData.get('name') as string;
    const organization = formData.get('organization') as string;
    const title = formData.get('title') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, organization, title, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      
      // Reset form
      formElement.reset();
      
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#0a0a0f] text-white flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="flex-1 relative overflow-hidden flex items-center">
        {/* Background Image - Full Screen */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback 
            src={heroImage}
            alt="African healthcare professionals in modern medical research setting" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 via-30% to-[#0a0a0f]/20" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-1 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 bg-[#0a0a0f]/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl lg:w-[70%]">
              <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#FF8C42] via-[#FFB88C] to-[#FF8C42] leading-[1.15] tracking-tight drop-shadow-[0_0_30px_rgba(255,140,66,0.5)]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                AFRICA-EUROPE<br />
                HEALTH R&D<br />
                SUMMIT
              </h1>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Exploring an Africa-Europe Health R&D ecosystem: A concept for enhanced collaboration and innovation
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 items-center">
                <button 
                  className="px-8 py-3.5 bg-[#FF8C42]/20 hover:bg-[#FF8C42]/30 backdrop-blur-md text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#FF8C42]/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-transparent border border-[#FF8C42]/50"
                  aria-label="Get in touch with the summit organizers"
                  onClick={() => setIsModalOpen(true)}
                >
                  Get in Touch
                </button>
                
                {/* Badge */}
                <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 shadow-xl border border-white/20 ml-auto">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FF6B35] flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    AE
                  </div>
                  <div className="text-xs font-semibold text-white">
                    AFRICA-EUROPE<br />
                    HEALTH RESEARCH SUMMIT
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image - Removed as it's now background */}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-[#0a0a0f]/60 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
              <button 
                className="text-gray-400 hover:text-[#FF8C42] transition-colors p-2 hover:bg-white/10 rounded-lg"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="organization">
                  Organization *
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent transition-all"
                  placeholder="Your organization"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="title">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent transition-all"
                  placeholder="Your job title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent transition-all resize-none"
                  rows={5}
                  placeholder="Tell us about your interest in the summit..."
                  required
                />
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-200 border border-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 bg-[#FF8C42]/90 hover:bg-[#FF8C42] backdrop-blur-sm text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#FF8C42]/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-transparent border border-[#FF8C42]/30"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
              {submitStatus === 'success' && (
                <div className="text-sm text-green-500 mt-2">
                  Your message has been sent successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="text-sm text-red-500 mt-2">
                  An error occurred while sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 border-t border-white/10 mt-auto bg-[#0a0a0f]/40 backdrop-blur-lg">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-sm text-gray-400">Africa-Europe Health R&D Summit</span>
            <p className="text-sm text-gray-500">© 2025 Africa-Europe Health R&D Summit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}