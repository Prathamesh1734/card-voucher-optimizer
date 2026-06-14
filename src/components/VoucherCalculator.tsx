import { useState, useMemo } from "react";
import { voucherData, popularCards } from "../data/rewards";
import {
  Wallet,
  ShoppingBag,
  CreditCard,
  Sparkles,
  TrendingUp,
  IndianRupee,
  Moon,
  Sun,
} from "lucide-react";

export default function PremiumVoucherOptimizer() {
  const [selectedBrand, setSelectedBrand] = useState<string>("AmazonPay");
  const [amount, setAmount] = useState<number>(5000);
  const [wallet, setWallet] = useState<string[]>(["hdfc_mill", "sbi_cb"]);
  const [isDark, setIsDark] = useState<boolean>(true);

  const brands = Object.keys(voucherData);
  const quickAmounts = [1000, 2500, 5000, 10000];

  // Theme Toggle Handler
  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleCard = (id: string) => {
    setWallet((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const rankedResults = useMemo(() => {
    if (wallet.length === 0) return [];

    const portalsForBrand = voucherData[selectedBrand] || {};
    let allCombinations: any[] = [];

    Object.entries(portalsForBrand).forEach(([_, offer]) => {
      wallet.forEach((cardId) => {
        const card = popularCards.find((c) => c.id === cardId);
        if (!card) return;

        const portalDiscountAmount = amount * offer.instantDiscount;
        const amountPaidToPortal = amount - portalDiscountAmount;

        const portalRewardAmount = amount * (offer.portalCashback || 0);
        const cardCashbackAmount = amountPaidToPortal * card.cashbackRate;

        const totalSavings =
          portalDiscountAmount + cardCashbackAmount + portalRewardAmount;
        const effectiveReturn = (totalSavings / amount) * 100;

        allCombinations.push({
          portal: offer.portalName,
          cardName: card.name,
          totalSavings,
          effectiveReturn: effectiveReturn.toFixed(1),
          finalPrice: amount - totalSavings,
          breakdown: `${(offer.instantDiscount * 100).toFixed(0)}% Portal + ${(card.cashbackRate * 100).toFixed(1)}% Card`,
        });
      });
    });

    return allCombinations
      .sort((a, b) => b.totalSavings - a.totalSavings)
      .slice(0, 3);
  }, [selectedBrand, amount, wallet]);

  return (
    // Outer Background
    <div className="flex items-center justify-center p-4 md:p-12 font-sans w-full h-full">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
        {/* LEFT COLUMN: Inputs & Wallet */}
        <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
          {/* Header & Theme Toggle */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-500" />
                Voucher
                <span className="text-blue-600 dark:text-blue-500">Opt</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm font-medium">
                Maximize your credit card rewards on every purchase.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-8">
            {/* Wallet Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
                <Wallet className="w-4 h-4" /> 1. Select Your Cards
              </label>
              <div className="flex flex-wrap gap-2">
                {popularCards.map((card) => {
                  const isSelected = wallet.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      onClick={() => toggleCard(card.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20 dark:shadow-blue-900/30"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      {card.name}
                    </button>
                  );
                })}
              </div>
              {wallet.length === 0 && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-3 font-medium">
                  Please select at least one card to calculate.
                </p>
              )}
            </div>

            {/* Brand & Amount */}
            <div className="space-y-5">
              <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                <ShoppingBag className="w-4 h-4" /> 2. What are you buying?
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full appearance-none p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all cursor-pointer"
                  >
                    {brands.map((b) => (
                      <option key={b} value={b}>
                        {b} Voucher
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                    ▼
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <IndianRupee className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input
                    type="number"
                    value={amount || ""}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-11 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Quick Amounts */}
              <div className="flex flex-wrap gap-2 pt-1">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className="flex-1 min-w-17.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    ₹{amt.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results */}
        <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-10 flex flex-col transition-colors duration-300">
          <label className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6">
            <TrendingUp className="w-4 h-4" /> Live Calculation
          </label>

          <div className="flex-1 space-y-4">
            {rankedResults.map((result, index) => (
              <div
                key={index}
                className={`relative p-5 md:p-6 rounded-2xl transition-all duration-300 ${
                  index === 0
                    ? "bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-900/20 scale-100"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm opacity-90 scale-95 origin-left"
                }`}
              >
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 md:-right-4 bg-linear-to-r from-emerald-500 to-emerald-400 dark:from-emerald-600 dark:to-emerald-500 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                    🏆 BEST COMBO
                  </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                      Buy via
                    </p>
                    <p className="text-xl font-black text-slate-900 dark:text-white">
                      {result.portal}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold border border-slate-200 dark:border-slate-800">
                        {result.cardName}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right bg-slate-50 dark:bg-slate-950/50 sm:bg-transparent dark:sm:bg-transparent p-3 sm:p-0 rounded-xl">
                    <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 line-through decoration-red-400/50 mb-1">
                      ₹{amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      ₹{result.finalPrice.toLocaleString("en-IN")}
                    </p>
                    <div className="inline-block bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded text-xs font-black mt-2 border border-emerald-200 dark:border-emerald-800/50">
                      Save ₹{result.totalSavings.toLocaleString("en-IN")} (
                      {result.effectiveReturn}%)
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex justify-between">
                    <span>Savings Logic:</span>
                    <span>{result.breakdown}</span>
                  </p>
                </div>
              </div>
            ))}

            {rankedResults.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 dark:text-slate-500 p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
                <CreditCard className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-semibold">
                  Select cards to see your savings.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
