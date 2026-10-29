import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';

interface LoanOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDisburseSuccess: (amount: number) => void;
}

export const LoanOfferModal: React.FC<LoanOfferModalProps> = ({
  isOpen,
  onClose,
  onDisburseSuccess,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(30000000);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDisburse = () => {
    setIsSuccess(true);
    onDisburseSuccess(loanAmount);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  const monthlyEstimate = Math.round((loanAmount / tenureMonths) + (loanAmount * 0.008));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100 bg-[#fdf7ea]">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Vay nhanh phê duyệt tức thì</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {/* Hero Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fae7b9] to-[#f4d68e] border border-[#ecd295] text-neutral-900">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-700 block">
              Ưu đãi dành riêng cho LE NGOC GIAU
            </span>
            <h3 className="text-xl font-extrabold mt-1">Hạn mức lên đến 100,000,000 VND</h3>
            <p className="text-xs text-neutral-700 mt-1">
              • Miễn lãi 07 ngày đầu tiên<br />
              • Không cần thế chấp tài sản, giải ngân sau 60 giây
            </p>
          </div>

          {/* Amount slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-neutral-700">Số tiền muốn vay:</label>
              <span className="text-base font-extrabold text-neutral-950 tabular-numbers">
                {loanAmount.toLocaleString('vi-VN')} VND
              </span>
            </div>
            <input
              type="range"
              min={10000000}
              max={100000000}
              step={5000000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-red-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
              <span>10 Tr</span>
              <span>50 Tr</span>
              <span>100 Tr</span>
            </div>
          </div>

          {/* Tenure choices */}
          <div>
            <label className="text-xs font-medium text-neutral-700 block mb-1.5">
              Thời hạn vay (tháng):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[6, 12, 18, 24].map((m) => (
                <button
                  key={m}
                  onClick={() => setTenureMonths(m)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    tenureMonths === m
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {m} tháng
                </button>
              ))}
            </div>
          </div>

          {/* Repayment estimate */}
          <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-neutral-500">Ước tính trả hàng tháng:</span>
              <span className="font-bold text-neutral-900 tabular-numbers">
                ~{monthlyEstimate.toLocaleString('vi-VN')} đ/tháng
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Tài khoản nhận tiền:</span>
              <span className="font-medium text-neutral-800">1903 8928 668 019</span>
            </div>
          </div>

          {isSuccess ? (
            <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" />
              <span>Giải ngân {loanAmount.toLocaleString('vi-VN')} đ vào tài khoản thành công!</span>
            </div>
          ) : (
            <button
              onClick={handleDisburse}
              className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-xs hover:bg-neutral-800 active:scale-[0.98] transition cursor-pointer shadow-md"
            >
              Nhận tiền ngay vào tài khoản
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
