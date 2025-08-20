import Image from 'next/image'
import Link from 'next/link'
import { Dumbbell, Heart, Apple, Target, Users, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Logo and Brand */}
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-full p-3 shadow-lg">
                    <Dumbbell className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                      grainZ
                    </h1>
                    <p className="text-sm text-gray-600 font-medium">by Maitri Ramaiya</p>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Transform Your Body,
                  <span className="block text-orange-500">Transform Your Life</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                  Your journey to peak fitness starts here. Expert guidance, personalized nutrition, 
                  and proven training methods to help you achieve your goals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  Start Your Journey
                </button>
                <button className="border-2 border-orange-500 text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-all duration-200">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">500+</div>
                  <div className="text-sm text-gray-600">Clients Transformed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">98%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Hero_image.jpg"
                  alt="Fitness Transformation"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-orange-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -z-10 bottom-10 left-10 w-72 h-72 bg-orange-400 rounded-full filter blur-3xl opacity-20 animate-pulse delay-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What I Offer</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive fitness solutions tailored to your unique needs and goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Personal Training */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Personal Training</h4>
              <p className="text-gray-600">
                One-on-one sessions designed to maximize your results with personalized attention and expert guidance.
              </p>
            </div>

            {/* Nutrition Planning */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Apple className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Nutrition Planning</h4>
              <p className="text-gray-600">
                Custom meal plans and dietary guidance to fuel your body for optimal performance and results.
              </p>
            </div>

            {/* Online Coaching */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Online Coaching</h4>
              <p className="text-gray-600">
                Remote training programs with regular check-ins, progress tracking, and continuous support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-orange-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Your Fitness Partner</h3>
            <p className="text-lg text-gray-600 mb-8">
              As a certified fitness trainer, nutrition specialist, and wellness coach with over a decade of experience, 
              I'm dedicated to helping you achieve sustainable results. My holistic approach combines science-based 
              training methods with personalized nutrition strategies to transform not just your body, but your entire lifestyle.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-orange-500" />
                <span className="text-gray-700 font-medium">Certified Trainer</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-orange-500" />
                <span className="text-gray-700 font-medium">Health Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <Dumbbell className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold">grainZ</span>
              </div>
              <p className="text-gray-400 text-sm">© 2024 grainZ by Maitri Ramaiya. All rights reserved.</p>
            </div>
            
            {/* Login Button - Small and Subtle */}
            <div className="text-sm">
              <Link 
                href="/login" 
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200 underline-offset-4 hover:underline"
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
