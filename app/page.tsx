'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: 'Basic',
      price: '$9',
      priceId: 'price_basic',
      description: 'Single resume optimization',
      features: ['AI-powered optimization', 'ATS keyword analysis', 'Format review', 'One revision'],
    },
    {
      name: 'Professional',
      price: '$29',
      priceId: 'price_pro',
      description: 'Multiple resumes and interviews',
      features: ['Unlimited resumes', 'Interview prep', 'Cover letter builder', 'Email templates', '10 revisions/month'],
    },
    {
      name: 'Elite',
      price: '$99',
      priceId: 'price_enterprise',
      description: 'Complete career transformation',
      features: ['Everything in Pro', 'LinkedIn optimization', '1-on-1 coaching calls', 'Job board access', 'Unlimited revisions', 'Lifetime updates'],
    },
  ];

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();
      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">📄 Resume Optimizer</h1>
          <nav className="flex gap-4">
            <a href="#features" className="text-slate-300 hover:text-white">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white">Pricing</a>
          </nav>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">Land Your Dream Job</h2>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">AI-powered resume optimization that passes ATS systems and impresses hiring managers. Get more interviews faster.</p>
        <button
          onClick={() => document.getElementById('pricing')?.scrollIntoView()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Get Started
        </button>
      </section>

      <section id="pricing" className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="border border-slate-700 rounded-lg p-8 bg-slate-800/50">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-slate-400 mb-6">{plan.price}/month</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-slate-300">✓ {f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {loading ? 'Processing...' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-700 py-8 text-center text-slate-400">
        <p>&copy; 2026 Revenue Product. All rights reserved.</p>
      </footer>
    </main>
  );
}
