import React, { useState } from 'react';
import { X, TrendingUp, PiggyBank, ShieldCheck, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface SavingsModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onDepositSuccess: (amount: number, term: string) => void;
}

export const SavingsModal: React.FC<SavingsModalProps> = ({
  user,
  isOpen,
  onClose,
  onDepositSuccess,
}) => {
  const [tab, setTab] = useState<'yield' | 'term'>('yield');
  const [isAutoYieldActive, setIsAutoYieldActive] = useState<boolean>(true);
  const [termMonths, setTermMonths] = useState<number>(6);
  const [depositAmount, setDepositAmount] = useState<string>('5000000');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // 4.3% per annum for Tiền sinh lời tự động
  const annualYieldRate = 4.3;
  const estimatedDailyYield = Math.round((user.balance * (annualYieldRate / 100)) / 365);
  const estimatedMonthlyYield = Math.round((user.balance * (annualYieldRate / 100)) / 12);

  // Term interest rates
  const getRateForTerm = (months: number) => {
    switch (months) {
      case 1: return 3.4;
      case 3: return 3.8;
      case 6: return 5.1;
      case 12: return 5.8;
      default: return 5.1;
    }
  };

  const currentTermRate = getRateForTerm(termMonths);
  const numDeposit = Number(depositAmount) || 0;
  const estimatedTermProfit = Math.round(numDeposit * (currentTermRate / 100) * (termMonths / 12));

  const handleCreateDeposit = () => {
    if (numDeposit <= 0 || numDeposit > user.balance) return;
    onDepositSuccess(numDeposit, `${termMonths} tháng`);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Tiết kiệm & Sinh lời</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="p-3 bg-neutral-100 flex gap-1 mx-4 mt-3 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setTab('yield')}
            className={`flex-1 py-2 rounded-lg transition ${
              tab === 'yield' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Sinh lời tự động
          </button>
          <button
            onClick={() => setTab('term')}
            className={`flex-1 py-2 rounded-lg transition ${
              tab === 'term' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Mở sổ tiết kiệm
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {tab === 'yield' ? (
            <div className="space-y-4">
              {/* Feature card */}
              <div className="p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl border border-amber-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                    Tiền sinh lời tự động
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full">
                    Đang bật
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-neutral-600">Lãi suất thực nhận:</span>
                  <h3 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                    {annualYieldRate}% <span className="text-sm font-normal text-neutral-500">/ năm</span>
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Tiền trong tài khoản thanh toán tự động sinh lời mỗi ngày mà vẫn thoải mái chi tiêu bất cứ lúc nào!
                  </p>
                </div>
              </div>

              {/* Yield estimates based on user balance */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Số dư đang sinh lời:</span>
                  <span className="font-bold text-neutral-900 tabular-numbers">
                    {user.balance.toLocaleString('vi-VN')} VND
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-500">Ước tính nhận mỗi ngày:</span>
                  <span className="font-bold text-emerald-600 tabular-numbers">
                    +{estimatedDailyYield.toLocaleString('vi-VN')} VND/ngày
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-neutral-200 pt-2 font-semibold">
                  <span className="text-neutral-700">Ước tính nhận mỗi tháng:</span>
                  <span className="font-bold text-emerald-600 tabular-numbers">
                    +{estimatedMonthlyYield.toLocaleString('vi-VN')} VND/tháng
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200 rounded-2xl">
                <div>
                  <p className="text-xs font-bold text-neutral-900">Tự động cộng lãi vào tài khoản</p>
                  <p className="text-[11px] text-neutral-500">Nhận tiền lời vào ngày 01 hàng tháng</p>
                </div>
                <input
                  type="checkbox"
                  checked={isAutoYieldActive}
                  onChange={(e) => setIsAutoYieldActive(e.target.checked)}
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Term Selection */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Chọn kỳ hạn gửi:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      onClick={() => setTermMonths(m)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        termMonths === m
                          ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                          : 'border-neutral-200 bg-white text-neutral-700'
                      }`}
                    >
                      <p className="text-xs">{m} tháng</p>
                      <p className="text-[11px] font-semibold mt-0.5">{getRateForTerm(m)}%</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount input */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Số tiền gửi (Tối thiểu 1,000,000 đ):
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-white"
                />
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Số dư khả dụng: {user.balance.toLocaleString('vi-VN')} đ
                </span>
              </div>

              {/* Profit summary */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/90 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-amber-900">Lãi suất áp dụng:</span>
                  <span className="font-bold text-neutral-900">{currentTermRate}% / năm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-900">Tiền lãi dự kiến khi đáo hạn:</span>
                  <span className="font-bold text-red-600 tabular-numbers">
                    +{estimatedTermProfit.toLocaleString('vi-VN')} VND
                  </span>
                </div>
              </div>

              {showSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mở sổ tiết kiệm thành công!</span>
                </div>
              ) : (
                <button
                  onClick={handleCreateDeposit}
                  disabled={numDeposit <= 0 || numDeposit > user.balance}
                  className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-xs hover:bg-neutral-800 disabled:opacity-40 transition"
                >
                  Xác nhận mở sổ tiết kiệm
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
