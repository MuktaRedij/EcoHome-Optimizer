import React, { useState } from 'react';

export default function FAQs({ onNavigate }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How accurate is the optimization?',
      answer: 'Our fuzzy logic engine and genetic algorithm work together to create highly optimized schedules. The system has been tested extensively and consistently delivers 15-30% cost savings with proportional CO₂ reduction.'
    },
    {
      question: 'Will I be uncomfortable?',
      answer: 'No. The system respects your flexibility preferences and constraints. You can set which appliances must run during specific times, and the optimizer will work around those requirements.'
    },
    {
      question: 'Can I compare cost vs environment?',
      answer: 'Yes! Our scenario comparison feature lets you run the same optimization with Eco Mode ON and OFF, showing you the trade-off between cost savings and environmental impact.'
    },
    {
      question: 'How long does optimization take?',
      answer: 'Results are generated in seconds. The genetic algorithm evolves multiple generations of schedules efficiently to find optimal solutions.'
    },
    {
      question: 'What data do I need to provide?',
      answer: 'Just basic household info: family size, number of appliances, daily energy consumption, and your flexibility preferences. No personal data or smart meter integration required.'
    },
    {
      question: 'Can I adjust the schedule after optimization?',
      answer: 'Yes, you can modify any parameter and re-run the optimization. The system provides flexibility to fine-tune settings based on your preferences.'
    },
    {
      question: 'Is my data secure?',
      answer: 'All data is processed locally in your browser session. We do not store personal information, and no external tracking is involved.'
    },
    {
      question: 'How does Eco Mode differ from standard mode?',
      answer: 'Eco Mode prioritizes carbon reduction and environmental impact over cost savings, while standard mode balances both. You can compare both modes to see the trade-offs.'
    },
    {
      question: 'What appliances can be optimized?',
      answer: 'Any appliance with variable scheduling can be optimized: washing machines, dishwashers, water heaters, electric vehicles, HVAC systems, dryers, and more.'
    },
    {
      question: 'Can I track savings over time?',
      answer: 'Currently, the system provides per-optimization results. You can re-run optimizations to track how your usage patterns and potential savings evolve.'
    }
  ];

  return (
    <section className="min-h-screen w-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-24 px-4 md:px-6 lg:px-8 pt-32">
      <div className="w-full max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4"> Frequently Asked Questions</h1>
          <p className="text-xl text-gray-400">
            Find answers to common questions about EcoHome Optimizer
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 md:p-8 flex items-center justify-between hover:bg-slate-700/30 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl flex-shrink-0">🔹</span>
                  <h3 className="text-lg md:text-xl font-bold text-emerald-400">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <span className={`text-3xl font-bold text-emerald-500 transition-transform ${expandedIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </div>
              </button>

              {/* Answer Section */}
              {expandedIndex === index && (
                <div className="border-t border-slate-700/50 px-6 md:px-8 py-6 md:py-8 bg-slate-900/30">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="bg-linear-to-br from-cyan-600/20 via-cyan-500/10 to-transparent border border-cyan-500/40 rounded-3xl p-10 md:p-16 lg:p-20 mt-12">
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="text-5xl">💡</span> Need More Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📚 Documentation</h3>
              <p className="text-gray-300 text-lg">
                Check out the "How It Works" section for detailed information about our algorithms and optimization process.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">🚀 Get Started</h3>
              <p className="text-gray-300 text-lg">
                Head to the Dashboard to start optimizing your household energy consumption right away.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">📧 Contact Us</h3>
              <p className="text-gray-300 text-lg">
                Have a question we haven't answered? Visit our Contact page to reach out directly.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-14 md:py-16 lg:py-20 mt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to start optimizing?</h2>
          <p className="text-center text-gray-400 mb-10 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">Join thousands of households saving money and reducing carbon emissions.</p>
          <button onClick={() => onNavigate && onNavigate('dashboard')} className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-4 px-14 rounded-lg transition duration-300 text-lg shadow-lg hover:shadow-xl">
            Go to Dashboard
          </button>
        </div>
      </div>
    </section>
  );
}
