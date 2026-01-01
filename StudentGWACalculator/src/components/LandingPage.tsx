import React from 'react';
import { Calculator, TrendingUp, Award, BarChart3, Zap, Shield, ArrowRight, Sun, Moon, GraduationCap, CheckCircle, Users, BookOpen, Star } from 'lucide-react';

interface LandingPageProps {
  darkMode: boolean;
  onGetStarted: () => void;
  toggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ darkMode, onGetStarted, toggleDarkMode }) => {
  const bgColor = darkMode ? 'bg-[#000]' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-[#0a0a0a]' : 'bg-white';
  const border = darkMode ? 'border-[#1a1a1a]' : 'border-gray-200';
  const textColor = darkMode ? 'text-white' : 'text-gray-900';
  const textMuted = darkMode ? 'text-[#555]' : 'text-gray-400';
  const textLight = darkMode ? 'text-[#888]' : 'text-gray-600';
  const buttonBg = darkMode ? 'bg-[#1a1a1a] hover:bg-[#222]' : 'bg-gray-100 hover:bg-gray-200';

  const features = [
    { icon: Calculator, title: 'GWA Calculator', description: 'Calculate your weighted GWA in real-time with the STI grading system.', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { icon: TrendingUp, title: 'Smart Predictions', description: 'See what grades you need in remaining subjects to pass or hit your target.', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { icon: BarChart3, title: 'Multi-Subject', description: 'Track multiple subjects at once and calculate cumulative GWA.', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { icon: Award, title: 'Honors Check', description: 'Instantly see if you qualify for Dean\'s List or graduation honors.', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    { icon: Zap, title: 'What-If Analysis', description: 'Simulate different grade scenarios and see the impact instantly.', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { icon: Shield, title: 'STI Grading', description: 'Built specifically for STI\'s 20-20-20-40 weighted grading system.', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' }
  ];

  const benefits = [
    { icon: CheckCircle, text: 'Real-time calculations as you type' },
    { icon: CheckCircle, text: 'Works with 1, 2, or 3 grades entered' },
    { icon: CheckCircle, text: 'Automatic Dean\'s List eligibility check' },
    { icon: CheckCircle, text: 'Save and track semester history' },
    { icon: CheckCircle, text: 'Dark and light mode support' },
    { icon: CheckCircle, text: 'Mobile-friendly responsive design' }
  ];

  const stats = [
    { value: '20-20-20-40', label: 'STI Weights' },
    { value: '59.5%', label: 'Passing Grade' },
    { value: '1.50', label: 'Dean\'s List' },
    { value: '100%', label: 'Free to Use' }
  ];

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${bgColor}/95 backdrop-blur-md border-b ${border}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
              <GraduationCap className="w-4 h-4 text-emerald-500" />
            </div>
            <span className={`text-sm font-bold ${textColor}`}>STI GWA Calculator</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className={`p-2 rounded-lg transition-colors ${buttonBg}`}>
              {darkMode ? <Sun className={`w-4 h-4 ${textMuted}`} /> : <Moon className={`w-4 h-4 ${textMuted}`} />}
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cardBg} border ${border} mb-8 animate-fade-in`}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className={`text-xs font-medium ${textLight}`}>STI Grading System 2025</span>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight ${textColor}`}>
            Calculate Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              Academic Success
            </span>
          </h1>
          
          <p className={`text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${textMuted}`}>
            The smart GWA calculator built for STI students. Calculate grades, predict requirements, 
            track multiple subjects, and check your honors eligibility — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            >
              Start Calculating
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <div className={`flex items-center gap-2 text-sm ${textMuted}`}>
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Free & No Sign-up Required</span>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto`}>
            {stats.map((stat) => (
              <div key={stat.label} className={`${cardBg} rounded-xl p-4 border ${border}`}>
                <div className={`text-xl sm:text-2xl font-bold ${textColor} mb-1`}>{stat.value}</div>
                <div className={`text-xs ${textMuted}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#050505]' : 'bg-white'}`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Features</span>
            <h2 className={`text-2xl sm:text-3xl font-bold mt-2 mb-4 ${textColor}`}>Everything You Need</h2>
            <p className={`text-sm sm:text-base max-w-xl mx-auto ${textMuted}`}>
              Powerful tools designed specifically for STI students to track and improve their academic performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div 
                key={f.title} 
                className={`${cardBg} rounded-xl p-5 border ${border} transition-all hover:border-[#333] hover:scale-[1.02]`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl ${f.bgColor} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className={`text-base font-semibold mb-2 ${textColor}`}>{f.title}</h3>
                <p className={`text-sm ${textMuted} leading-relaxed`}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${textMuted}`}>Why Use This</span>
              <h2 className={`text-2xl sm:text-3xl font-bold mt-2 mb-6 ${textColor}`}>Smart & Simple</h2>
              <p className={`text-sm sm:text-base mb-8 ${textMuted} leading-relaxed`}>
                Unlike generic calculators, this tool understands the STI grading system. 
                It works with partial grades, predicts what you need, and helps you plan for success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <b.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className={`text-sm ${textLight}`}>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${cardBg} rounded-2xl p-6 border ${border}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Users className={`w-5 h-5 ${textMuted}`} />
                  <span className={`text-sm font-medium ${textColor}`}>For STI Students</span>
                </div>
                <div className={`${darkMode ? 'bg-[#000]' : 'bg-gray-50'} rounded-xl p-4 border ${border}`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-xs ${textMuted}`}>Sample Calculation</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-medium">Passed</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${textColor}`}>85</div>
                      <div className={`text-xs ${textMuted}`}>Prelim</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${textColor}`}>88</div>
                      <div className={`text-xs ${textMuted}`}>Midterm</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${textColor}`}>82</div>
                      <div className={`text-xs ${textMuted}`}>Pre-Fi</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${textColor}`}>90</div>
                      <div className={`text-xs ${textMuted}`}>Finals</div>
                    </div>
                  </div>
                  <div className={`pt-3 border-t ${border} flex items-center justify-between`}>
                    <span className={`text-sm ${textMuted}`}>Final GWA:</span>
                    <span className={`text-xl font-bold text-emerald-400`}>87.00%</span>
                  </div>
                </div>
                <div className={`flex items-center gap-2 text-xs ${textMuted}`}>
                  <BookOpen className="w-4 h-4" />
                  <span>Weights: 20% + 20% + 20% + 40% = 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${darkMode ? 'bg-[#050505]' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className={`${cardBg} rounded-2xl p-8 sm:p-12 border ${border}`}>
            <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${darkMode ? 'bg-emerald-500/15' : 'bg-emerald-50'}`}>
              <GraduationCap className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${textColor}`}>Ready to Calculate?</h3>
            <p className={`text-sm sm:text-base ${textMuted} mb-8 max-w-md mx-auto`}>
              Start calculating your GWA now. It's free, fast, and built specifically for STI students.
            </p>
            <button
              onClick={onGetStarted}
              className={`px-8 py-4 rounded-xl text-sm font-semibold transition-all ${
                darkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Start Now — It's Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${border} py-8`}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className={`w-4 h-4 ${textMuted}`} />
              <span className={`text-sm font-medium ${textMuted}`}>STI GWA Calculator</span>
            </div>
            <p className={`text-xs ${textMuted}`}>Made for STI Students • 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
