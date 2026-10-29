import React, { useState } from 'react';
import { X, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface OneUModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

const REWARDS = [
  { id: '1', title: 'Voucher Shopee 50,000 đ', points: 500, partner: 'Shopee', code: 'TCBSHOPEE50' },
  { id: '2', title: 'Starbucks Coffee Size L', points: 800, partner: 'Starbucks', code: 'TCBSTARBUCKS' },
  { id: '3', title: 'Voucher GrabCar 30,000 đ', points: 300, partner: 'Grab', code: 'TCBGRAB30' },
  { id: '4', title: 'Vé xem phim CGV 2D', points: 950, partner: 'CGV Cinema', code: 'TCBCGV2D' },
];

export const OneUModal: React.FC<OneUModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100 bg-[#fdfaf3]">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Techcombank OneU</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {/* Member Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] text-red-200 uppercase tracking-widest font-semibold">
                  Hội viên Inspire
                </span>
                <h3 className="text-lg font-bold mt-0.5">{user.name}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-end">
              <div>
                <span className="text-[10px] text-red-200">Điểm thưởng khả dụng:</span>
                <p className="text-2xl font-black">{user.points} OneU</p>
              </div>
              <span className="text-xs bg-white text-red-700 px-2.5 py-1 rounded-full font-bold">
                Tích điểm x2
              </span>
            </div>
          </div>

          {/* Reward list */}
          <div>
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wide mb-2">
              Đổi ưu đãi đặc quyền
            </h4>
            <div className="space-y-2.5">
              {REWARDS.map((r) => (
                <div
                  key={r.id}
                  className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/90 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-semibold text-red-600 block">{r.partner}</span>
                    <h5 className="text-xs font-bold text-neutral-900">{r.title}</h5>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      {r.points} điểm OneU
                    </span>
                  </div>
                  <button
                    onClick={() => setRedeemedCode(r.code)}
                    className="px-3 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-800 active:scale-95 transition"
                  >
                    Đổi ngay
                  </button>
                </div>
              ))}
            </div>
          </div>

          {redeemedCode && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1 animate-in zoom-in-95">
              <span className="text-xs font-bold text-emerald-800">Mã ưu đãi của bạn:</span>
              <p className="font-mono text-base font-black text-emerald-950 tracking-wider">
                {redeemedCode}
              </p>
              <span className="text-[10px] text-emerald-600 block">
                Đã lưu mã vào ví voucher của bạn!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
