import React, { useState } from 'react';
import { X, Copy, Check, Share2, Download, QrCode } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface PersonalQrModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalQrModal: React.FC<PersonalQrModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [customMemo, setCustomMemo] = useState('');
  const [showCustomSettings, setShowCustomSettings] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.accountNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="pt-4 pb-2 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <span className="text-sm font-bold text-neutral-900">Mã QR Cá Nhân</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VietQR Frame */}
        <div className="p-5 flex flex-col items-center">
          <div className="w-full bg-gradient-to-b from-red-600 to-red-700 rounded-2xl p-4 text-white shadow-md">
            {/* VietQR Header */}
            <div className="flex items-center justify-between pb-3 border-b border-red-500/50">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tighter">VietQR</span>
                <span className="text-[10px] bg-white text-red-700 font-bold px-1.5 py-0.5 rounded">
                  NAPAS 247
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-100">
                TECHCOMBANK
              </span>
            </div>

            {/* QR Code Canvas Representation */}
            <div className="my-4 bg-white p-4 rounded-xl flex flex-col items-center shadow-inner relative">
              {/* Synthetic high-detail QR code SVG */}
              <div className="relative w-52 h-52 flex items-center justify-center bg-neutral-900 rounded-lg p-3">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-white fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Position detection corners */}
                  <rect x="0" y="0" width="28" height="28" rx="2" fill="white" />
                  <rect x="4" y="4" width="20" height="20" rx="1" fill="#171717" />
                  <rect x="8" y="8" width="12" height="12" rx="1" fill="white" />

                  <rect x="72" y="0" width="28" height="28" rx="2" fill="white" />
                  <rect x="76" y="4" width="20" height="20" rx="1" fill="#171717" />
                  <rect x="80" y="8" width="12" height="12" rx="1" fill="white" />

                  <rect x="0" y="72" width="28" height="28" rx="2" fill="white" />
                  <rect x="4" y="76" width="20" height="20" rx="1" fill="#171717" />
                  <rect x="8" y="80" width="12" height="12" rx="1" fill="white" />

                  {/* High density QR pixel grid */}
                  <rect x="36" y="4" width="6" height="6" fill="white" />
                  <rect x="48" y="4" width="14" height="6" fill="white" />
                  <rect x="36" y="14" width="10" height="6" fill="white" />
                  <rect x="52" y="14" width="10" height="6" fill="white" />
                  <rect x="36" y="24" width="6" height="6" fill="white" />
                  <rect x="56" y="24" width="6" height="6" fill="white" />

                  <rect x="4" y="36" width="18" height="6" fill="white" />
                  <rect x="28" y="36" width="8" height="6" fill="white" />
                  <rect x="68" y="36" width="12" height="6" fill="white" />
                  <rect x="86" y="36" width="10" height="6" fill="white" />

                  <rect x="4" y="48" width="8" height="8" fill="white" />
                  <rect x="20" y="48" width="12" height="8" fill="white" />
                  <rect x="74" y="48" width="22" height="8" fill="white" />

                  <rect x="4" y="60" width="16" height="6" fill="white" />
                  <rect x="26" y="60" width="8" height="6" fill="white" />
                  <rect x="70" y="60" width="10" height="6" fill="white" />
                  <rect x="86" y="60" width="10" height="6" fill="white" />

                  <rect x="36" y="72" width="10" height="8" fill="white" />
                  <rect x="52" y="72" width="12" height="8" fill="white" />
                  <rect x="72" y="72" width="8" height="8" fill="white" />
                  <rect x="36" y="86" width="20" height="10" fill="white" />
                  <rect x="64" y="86" width="14" height="10" fill="white" />
                  <rect x="84" y="86" width="12" height="10" fill="white" />
                </svg>

                {/* Center Techcombank Emblem Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded-lg p-1 shadow-md flex items-center justify-center border border-red-500">
                    <TechcombankLogo size={24} />
                  </div>
                </div>
              </div>

              {customAmount && (
                <div className="mt-2 text-center text-xs font-bold text-red-600">
                  Số tiền yêu cầu: {Number(customAmount).toLocaleString('vi-VN')} VND
                </div>
              )}
            </div>

            {/* Account Details */}
            <div className="text-center pt-1">
              <h3 className="font-bold text-sm tracking-wide uppercase text-white">
                {user.name}
              </h3>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-red-100 font-mono">
                <span>{user.accountNumber}</span>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:text-white transition"
                  title="Sao chép"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-red-200 mt-0.5">Ngân hàng TMCP Kỹ thương Việt Nam</p>
            </div>
          </div>

          {/* Custom Amount Toggle */}
          <div className="w-full mt-3">
            <button
              onClick={() => setShowCustomSettings(!showCustomSettings)}
              className="text-xs text-neutral-600 hover:text-red-600 font-medium underline block text-center w-full"
            >
              {showCustomSettings ? 'Ẩn cài đặt số tiền' : '+ Thêm số tiền & lời nhắn nhận tiền'}
            </button>

            {showCustomSettings && (
              <div className="mt-2 p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs space-y-2">
                <div>
                  <label className="block text-neutral-600 mb-1">Số tiền (VND):</label>
                  <input
                    type="number"
                    placeholder="VD: 500000"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-600 mb-1">Nội dung chuyển khoản:</label>
                  <input
                    type="text"
                    placeholder="VD: Le Ngoc Giau nhan tien"
                    value={customMemo}
                    onChange={(e) => setCustomMemo(e.target.value)}
                    className="w-full px-3 py-1.5 border border-neutral-300 rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="w-full grid grid-cols-2 gap-2.5 mt-4">
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-50 active:scale-95 text-xs font-semibold text-neutral-800 flex items-center justify-center gap-1.5 transition"
            >
              <Download className="w-4 h-4 text-neutral-700" />
              <span>Lưu ảnh QR</span>
            </button>

            <button
              onClick={handleCopy}
              className="py-2.5 px-3 rounded-xl bg-black text-white hover:bg-neutral-800 active:scale-95 text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép STK'}</span>
            </button>
          </div>

          {savedToast && (
            <p className="text-[11px] text-emerald-600 font-medium mt-2 animate-pulse">
              Đã lưu ảnh mã QR vào thư viện ảnh!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
