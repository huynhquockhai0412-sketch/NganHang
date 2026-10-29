import React, { useState } from 'react';
import { X, User, Shield, Fingerprint, LogOut, KeyRound, Bell, Globe, ChevronRight } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onUpdatePin: (newPin: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onUpdatePin,
}) => {
  const [showPinChange, setShowPinChange] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  if (!isOpen) return null;

  const handleSavePin = () => {
    if (newPin.length !== 6) {
      setPinChangeMsg('Mã PIN phải gồm đúng 6 chữ số');
      return;
    }
    onUpdatePin(newPin);
    setPinChangeMsg('Đã đổi mã PIN thành công!');
    setTimeout(() => {
      setShowPinChange(false);
      setPinChangeMsg('');
      setNewPin('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Thông tin cá nhân & Cài đặt</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {/* Avatar Lockup */}
          <div className="flex items-center gap-3.5 pb-2">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-300 via-slate-100 to-sky-200 border-2 border-white shadow-md flex items-center justify-center text-slate-800 font-bold text-base">
              {user.avatarText}
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-base">{user.name}</h3>
              <p className="text-xs text-neutral-500">Gói hội viên Inspire Member</p>
              <p className="text-[11px] text-neutral-400 font-mono mt-0.5">SĐT: {user.phone}</p>
            </div>
          </div>

          {/* Settings list */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200/80 divide-y divide-neutral-200/60 overflow-hidden text-xs">
            {/* Biometric toggle */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Fingerprint className="w-4.5 h-4.5 text-neutral-700" />
                <span className="font-semibold text-neutral-800">Đăng nhập Face ID / Vân tay</span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-600" />
            </div>

            {/* Change PIN button */}
            <button
              onClick={() => setShowPinChange(!showPinChange)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4.5 h-4.5 text-neutral-700" />
                <span className="font-semibold text-neutral-800">Đổi mã PIN 6 số</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>

            {/* Language */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4.5 h-4.5 text-neutral-700" />
                <span className="font-semibold text-neutral-800">Ngôn ngữ hiển thị</span>
              </div>
              <span className="text-xs font-semibold text-red-600">Tiếng Việt</span>
            </div>
          </div>

          {/* Change PIN Drawer */}
          {showPinChange && (
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-2 animate-in fade-in">
              <label className="font-semibold text-neutral-800 block">Nhập mã PIN 6 số mới:</label>
              <input
                type="password"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Ví dụ: 654321"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-center text-lg tracking-widest font-mono"
              />
              {pinChangeMsg && (
                <p className="text-[11px] font-semibold text-center text-red-600">{pinChangeMsg}</p>
              )}
              <button
                onClick={handleSavePin}
                className="w-full py-2 bg-black text-white font-semibold rounded-xl text-xs hover:bg-neutral-800 transition"
              >
                Lưu mã PIN mới
              </button>
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={onLogout}
            className="w-full py-3.5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất khỏi tài khoản</span>
          </button>
        </div>
      </div>
    </div>
  );
};
