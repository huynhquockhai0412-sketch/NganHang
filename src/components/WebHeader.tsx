import React from 'react';
import { TechcombankLogo } from './TechcombankLogo';
import { Phone, MapPin, Search, Bell, LogIn, LogOut, User, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface WebHeaderProps {
  user: UserProfile;
  isLoggedIn: boolean;
  onOpenPinLogin: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
  onOpenBranchAtm: () => void;
  onOpenHotline: () => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
}

export const WebHeader: React.FC<WebHeaderProps> = ({
  user,
  isLoggedIn,
  onOpenPinLogin,
  onOpenProfile,
  onLogout,
  onOpenBranchAtm,
  onOpenHotline,
  onOpenNotifications,
  onOpenSearch,
}) => {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-xs">
      {/* Top Utility Ribbon */}
      <div className="bg-[#fcf8f0] border-b border-[#f0e4cc] py-1 px-6 text-xs text-neutral-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-red-600">Khách hàng Cá nhân</span>
            <span className="hover:text-neutral-900 cursor-pointer transition">Khách hàng Doanh nghiệp</span>
            <span className="hover:text-neutral-900 cursor-pointer transition">Techcombank Priority</span>
          </div>
          <div className="flex items-center gap-5 text-[11px]">
            <button
              onClick={onOpenHotline}
              className="flex items-center gap-1 hover:text-red-600 transition cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Hotline 24/7: <strong>1800 588 822</strong></span>
            </button>
            <button
              onClick={onOpenBranchAtm}
              className="flex items-center gap-1 hover:text-red-600 transition cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>Mạng lưới Chi nhánh & ATM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <TechcombankLogo size={36} />
            <div>
              <span className="font-black tracking-wider text-base uppercase text-neutral-950 block leading-tight">
                TECHCOMBANK
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
                Ngân hàng số vượt trội
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-700">
            <span className="text-red-600 font-bold border-b-2 border-red-600 pb-1 cursor-pointer">
              Trang chủ
            </span>
            <span className="hover:text-red-600 cursor-pointer transition">Tài khoản & Thẻ</span>
            <span className="hover:text-red-600 cursor-pointer transition">Chuyển tiền & Thanh toán</span>
            <span className="hover:text-red-600 cursor-pointer transition">Tiết kiệm & Sinh lời</span>
            <span className="hover:text-red-600 cursor-pointer transition">Vay tiêu dùng</span>
            <span className="hover:text-red-600 cursor-pointer transition">Techcombank OneU</span>
          </nav>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition cursor-pointer"
            title="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </button>

          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenNotifications}
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 transition cursor-pointer relative"
                title="Thông báo"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full" />
              </button>

              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-semibold text-neutral-900 transition cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-300 to-sky-200 flex items-center justify-center text-[10px] font-bold text-slate-800">
                  {user.avatarText}
                </div>
                <span>{user.name}</span>
              </button>

              <button
                onClick={onLogout}
                className="p-2 rounded-full text-neutral-500 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenPinLogin}
              className="px-5 py-2 rounded-full bg-black hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng nhập mã PIN</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
