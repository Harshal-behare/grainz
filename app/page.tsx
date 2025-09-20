import Image from 'next/image'
import Link from 'next/link'
import { Heart, Apple, Target, Users, Award, Mail, Phone, MapPin } from 'lucide-react'
import NavigationHeader from '@/components/navigation-header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 overflow-x-hidden">
      <NavigationHeader />
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
        {/* Background Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-orange-100/30 pointer-events-none" />
        
        <div className="container-custom relative z-10 py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up">
              {/* Logo and Brand */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 w-16 h-16 md:w-20 md:h-20">
                    <Image
                      src="/grainz_logo.jpg"
                      alt="grainZ Logo"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gradient-text">
                      grainZ
                    </h1>
                    <p className="text-xs md:text-sm text-gray-600 font-medium tracking-wider uppercase">by Maitri Ramaiya</p>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gray-900 leading-tight">
                  Transform Your Body,
                  <span className="block gradient-text mt-2">Transform Your Life</span>
                </h2>
                <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Your journey to peak fitness starts here. Expert guidance, personalized nutrition, 
                  and proven training methods to help you achieve your goals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="group relative btn-primary bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10">Start Your Journey</span>
                </button>
                <button className="group border-2 border-orange-500 text-orange-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-orange-50 hover:border-orange-600 hover:text-orange-700 transform hover:-translate-y-0.5 transition-all duration-300">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-8 md:pt-12">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold gradient-text">500+</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Clients Transformed</div>
                </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold gradient-text">10+</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Years Experience</div>
                </div>
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold gradient-text">98%</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Hero Image - TRANSPARENT PNG */}
            <div className="relative mt-12 lg:mt-0 animate-fade-in-up animation-delay-200">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <Image
                  src="/maitri-cutout-crop_2.png"   // <— transparent PNG/WebP in /public
                  alt="Maitri Ramaiya - Professional Fitness Trainer"
                  width={700}
                  height={700}
                  priority
                  className="w-full h-auto object-contain pointer-events-none select-none animate-float"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(249, 115, 22, 0.15))'
                  }}
                />
                
                {/* Professional gradient mask at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50/80 via-orange-50/40 to-transparent pointer-events-none" />
              </div>

              {/* Decorative glow BEHIND the person */}
              <div className="absolute -z-10 top-20 right-20 w-88 h-88 bg-gradient-radial from-orange-300/40 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute -z-10 bottom-20 left-20 w-72 h-72 bg-gradient-radial from-orange-400/30 to-transparent rounded-full blur-3xl animate-pulse-slow animation-delay-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-50/20 to-transparent pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 animate-fade-in-down">What I Offer</h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Comprehensive fitness solutions tailored to your unique needs and goals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="card-hover bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-orange-100 animate-scale-in animation-delay-200">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform hover:rotate-3 transition-transform duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-4">Personal Training</h4>
              <p className="text-gray-600 leading-relaxed">
                One-on-one sessions designed to maximize your results with personalized attention and expert guidance.
              </p>
            </div>

            <div className="card-hover bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-orange-100 animate-scale-in animation-delay-400">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform hover:rotate-3 transition-transform duration-300">
                <Apple className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-4">Nutrition Planning</h4>
              <p className="text-gray-600 leading-relaxed">
                Custom meal plans and dietary guidance to fuel your body for optimal performance and results.
              </p>
            </div>

            <div className="card-hover bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-orange-100 animate-scale-in animation-delay-600">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transform hover:rotate-3 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-4">Online Coaching</h4>
              <p className="text-gray-600 leading-relaxed">
                Remote training programs with regular check-ins, progress tracking, and continuous support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-br from-orange-50/50 via-white to-orange-100/30 relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 animate-fade-in-down">Your Fitness Partner</h3>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in-up animation-delay-200">
              As a certified fitness trainer, nutrition specialist, and wellness coach with over a decade of experience, 
              I'm dedicated to helping you achieve sustainable results. My holistic approach combines science-based 
              training methods with personalized nutrition strategies to transform not just your body, but your entire lifestyle.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12 pt-8">
              <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Award className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-gray-700 font-semibold text-lg">Certified Trainer</span>
              </div>
              <div className="flex items-center space-x-3 group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <span className="text-gray-700 font-semibold text-lg">Health Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white relative">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 animate-fade-in-down">Get In Touch</h3>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              Ready to start your fitness journey? Contact me today for a free consultation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">contact@grainz.fitness</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg flex-shrink-0">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-gray-900 mb-1">Location</h4>
                  <p className="text-gray-600">Available for online coaching worldwide</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-10 rounded-2xl shadow-xl border border-orange-100">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 resize-none"
                    placeholder="Tell me about your fitness goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 md:py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl shadow-lg">
                  <Dumbbell className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold">grainZ</span>
              </div>
              <p className="text-gray-400 text-sm">© 2024 grainZ by Maitri Ramaiya. All rights reserved.</p>
            </div>
            <div className="text-sm">
              <Link
                href="/login"
                className="text-gray-400 hover:text-orange-400 transition-all duration-300 underline-offset-4 hover:underline font-medium"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
