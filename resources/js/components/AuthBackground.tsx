import React from 'react';
import { ShoppingCart, TrendingUp, Shield, CreditCard } from 'lucide-react';

const AuthBackground: React.FC = () => {
  const features = [
    { icon: ShoppingCart, text: "Easy Shopping" },
    { icon: TrendingUp, text: "Best Deals" },
    { icon: Shield, text: "Secure Payments" },
    { icon: CreditCard, text: "Fast Checkout" }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-800 via-orange-600 to-amber-500 flex items-center justify-center p-6">
      {/* Glass Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl max-w-md w-full p-8 text-center space-y-8">
        
        {/* Icon Container */}
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white">Welcome to Our Store</h2>
        <p className="text-white/85 text-sm leading-relaxed">
          Discover amazing products, exclusive deals, and a seamless shopping experience. 
          Join millions of happy customers worldwide.
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition"
            >
              <feature.icon className="w-6 h-6 text-orange-300" />
              <span className="mt-2 text-xs text-white/80">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 pt-4 text-white/90">
          <div className="text-center">
            <div className="font-semibold text-lg">1M+</div>
            <div className="text-xs text-white/70">Products</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">50K+</div>
            <div className="text-xs text-white/70">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-lg">4.9★</div>
            <div className="text-xs text-white/70">Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBackground;
