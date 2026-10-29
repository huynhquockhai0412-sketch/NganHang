import React, { useState } from 'react';
import { X, Flashlight, Image, Sparkles, CheckCircle2 } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (title: string, amount: number) => void;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult,
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [scannedSuccess, setScannedSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (title: string, amount: number) => {
    setScannedSuccess(title);
    setTimeout(() => {
      setScannedSuccess(null);
      onScanResult(title, amount);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[560px]">
        {/* Top Header */}
        <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <span className="text-white text-sm font-bold">Quét mã QR / VNPAY</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewfinder View */}
        <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden">
          {/* Animated scanning laser line */}
          <div className="relative w-64 h-64 border-2 border-white/60 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {/* 4 Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500 rounded-br-xl" />

            {/* Laser scanning beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ff0000] animate-bounce duration-1000" />

            {/* Success message overlay if scanned */}
            {scannedSuccess && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-pulse mb-2" />
                <span className="text-sm font-bold text-white">Đã nhận diện QR!</span>
                <span className="text-xs text-neutral-300 mt-1">{scannedSuccess}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-neutral-300 mt-4 text-center px-6">
            Di chuyển camera đến mã QR của hóa đơn, cửa hàng hoặc tài khoản để thanh toán
          </p>

          {/* Quick Mock QR Scan buttons for instant testing */}
          <div className="w-full px-5 mt-4 space-y-2 z-10">
            <span className="text-[11px] text-neutral-400 block text-center font-medium">
              Chạm để quét mã mẫu thử nghiệm:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSimulateScan('Thanh toán Highlands Coffee', 55000)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition active:scale-95 text-left border border-white/10"
              >
                ☕ Highlands Coffee (55k)
              </button>
              <button
                onClick={() => handleSimulateScan('Thanh toán siêu thị WinMart', 128000)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition active:scale-95 text-left border border-white/10"
              >
                🛒 Siêu thị WinMart (128k)
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar controls */}
        <div className="p-4 bg-black/60 flex items-center justify-around border-t border-neutral-800">
          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`flex flex-col items-center text-xs ${torchOn ? 'text-amber-400' : 'text-neutral-400'}`}
          >
            <Flashlight className="w-5 h-5 mb-1" />
            <span>{torchOn ? 'Tắt đèn' : 'Bật đèn'}</span>
          </button>

          <button
            onClick={() => handleSimulateScan('Quét QR VNPAY-QR Quầy thanh toán', 85000)}
            className="flex flex-col items-center text-xs text-neutral-400 hover:text-white"
          >
            <Image className="w-5 h-5 mb-1" />
            <span>Chọn ảnh QR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
