'use client';
import { useState } from 'react';
import { Button } from './ui';
import { loadStripe } from '@stripe/stripe-js';

export function PricingModal() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({
      lineItems: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE!, quantity: 1 }],
      mode: 'subscription',
      successUrl: `${window.location.origin}/dashboard`,
      cancelUrl: window.location.href,
    });
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Upgrade</h2>
      <p className="mb-4">Unlock unlimited sessions and tasks.</p>
      <Button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Loading...' : 'Subscribe'}
      </Button>
    </div>
  );
}
