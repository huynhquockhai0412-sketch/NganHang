import React, { useState } from 'react';
import { X, Sparkles, Gift, CheckCircle2 } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';

interface LuckyWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWinReward: (amount: number, description: string) => void;
}

const PRIZES = [
  { label: 'Cộng 20,000 đ', amount: 20000, desc: 'Thưởng tiền may mắn Quét QR' },
  { label: 'Cộng 50,000 đ', amount: 50000, desc: 'Thưởng trúng lớn Quét QR Chạm vận may' },
  { label: 'Voucher Highlands 30k', amount: 30000, desc: 'Voucher cà phê Highlands Coffee 30,000đ' },
  { label: 'Cộng 10,000 đ', amount: 10000, desc: 'Thưởng lộc xuân may mắn' },
  { label: '100 Điểm OneU', amount: 10000, desc: 'Thưởng 100 Điểm OneU đổi quà' },
];

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  isOpen,
  onClose,
  onWinReward,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState<typeof PRIZES[0] | null>(null);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    setTimeout(() => {
      const selected = PRIZES[Math.floor(Math.random() * PRIZES.length)];
      setWonPrize(selected);
      setIsSpinning(false);
      onWinReward(selected.amount, selected.desc);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-red-600 to-amber-700 text-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </div>

        <h3 className="text-lg font-black uppercase tracking-wide">Quét QR Chạm Vận May</h3>
        <p className="text-xs text-red-100 mt-1">
          Chạm để quay thưởng may mắn mỗi ngày cùng Techcombank!
        </p>

        {/* Wheel / Visual Prize Box */}
        <div className="my-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col items-center justify-center min-h-[140px]">
          {isSpinning ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-10 h-10 border-4 border-yellow-300 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-yellow-200">Đang tìm giải thưởng may mắn...</span>
            </div>
          ) : wonPrize ? (
            <div className="space-y-2 animate-in zoom-in-95">
              <Gift className="w-10 h-10 text-yellow-300 mx-auto" />
              <span className="text-xs text-yellow-200 block">Chúc mừng bạn đã trúng!</span>
              <h4 className="text-xl font-black text-white">{wonPrize.label}</h4>
              <p className="text-[11px] text-red-100">Tiền đã được cộng ngay vào tài khoản thanh toán</p>
            </div>
          ) : (
            <div className="space-y-1">
              <Gift className="w-10 h-10 text-yellow-300 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">Bạn có 1 lượt quay miễn phí hôm nay!</p>
              <p className="text-[11px] text-red-100">Cơ hội nhận đến 500,000 VND</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-3.5 rounded-full bg-yellow-400 text-neutral-950 font-bold text-sm hover:bg-yellow-300 active:scale-95 transition shadow-lg disabled:opacity-50 cursor-pointer"
        >
          {isSpinning ? 'Đang quay...' : wonPrize ? 'Quay thêm lượt nữa' : 'Mở quà ngay'}
        </button>
      </div>
    </div>
  );
};
