import React from 'react';
import {
  X,
  ChevronRight,
  Bell,
  Link2,
  Landmark,
  Settings,
  CreditCard,
  Users,
  MapPin,
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileDrawerProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onOpenNotifications: () => void;
  onOpenBranchAtm: () => void;
  onOpenAppointment: () => void;
  onOpenHotline: () => void;
  onOpenCardPromo: () => void;
  onOpenSettings: () => void;
  onOpenMemberBenefits: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  user,
  isOpen,
  onClose,
  onLogout,
  onOpenNotifications,
  onOpenBranchAtm,
  onOpenAppointment,
  onOpenHotline,
  onOpenCardPromo,
  onOpenSettings,
  onOpenMemberBenefits,
}) => {
  return (
    <>
      {/* Semi-transparent Backdrop Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out Drawer Panel (Sổ ngang qua từ bên trái) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-full max-w-[370px] bg-white shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar transition-transform duration-300 ease-out select-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menu tài khoản người dùng"
      >
        {/* ============================================================== */}
        {/* 1. TOP HEADER (Slate/Steel Grey Gradient & Watermark Polygons) */}
        {/* ============================================================== */}
        <div className="relative bg-gradient-to-b from-[#8f9baa] via-[#748293] to-[#5a6777] text-white pt-11 pb-5 px-5 overflow-hidden">
          {/* Techcombank Inspire Subtle Diamond Polygon Watermarks */}
          <div className="absolute -top-12 -right-8 w-48 h-48 bg-white/10 rounded-3xl rotate-45 pointer-events-none" />
          <div className="absolute top-4 right-10 w-28 h-28 bg-white/5 rounded-2xl rotate-12 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none" />

          {/* Close button X (Top-right corner as shown in image) */}
          <div className="flex justify-end relative z-10 mb-2">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/20 active:scale-95 transition cursor-pointer"
              title="Đóng menu"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>

          {/* User Avatar & Greeting */}
          <div className="flex items-center gap-3.5 relative z-10">
            {/* Avatar Circle LG */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-slate-300 via-slate-100 to-sky-200 border-2 border-white/90 shadow-md flex items-center justify-center text-slate-800 font-bold text-base shrink-0">
              {user.avatarText}
            </div>

            <div>
              <p className="text-xs text-slate-200 font-normal">Xin chào,</p>
              <h3 className="text-base font-bold text-white tracking-wide uppercase mt-0.5">
                {user.name}
              </h3>
            </div>
          </div>

          {/* "Quyền lợi hội viên" Pill Button */}
          <div className="mt-4 relative z-10">
            <button
              onClick={onOpenMemberBenefits}
              className="w-full bg-white/20 hover:bg-white/25 active:scale-[0.99] backdrop-blur-md rounded-xl px-4 py-3 flex items-center justify-between text-white text-xs font-semibold tracking-wide transition cursor-pointer shadow-xs border border-white/10"
            >
              <span>Quyền lợi hội viên</span>
              <ChevronRight className="w-4 h-4 text-white/90" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. MENU ITEMS LIST (Matching image_1e025473.png)               */}
        {/* ============================================================== */}
        <div className="flex-1 py-3 px-5 space-y-0.5 bg-white">
          {/* 1. Thông báo (Notice: no chevron right in reference image) */}
          <button
            onClick={onOpenNotifications}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Thông báo</span>
            </div>
          </button>

          {/* 2. Liên kết thanh toán */}
          <button
            onClick={onOpenSettings}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <Link2 className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Liên kết thanh toán</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </button>

          {/* 3. Khám phá sản phẩm */}
          <button
            onClick={onOpenMemberBenefits}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <Landmark className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Khám phá sản phẩm</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </button>

          {/* 4. Cài đặt */}
          <button
            onClick={onOpenSettings}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <Settings className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Cài đặt</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </button>

          {/* 5. Ưu đãi thẻ */}
          <button
            onClick={onOpenCardPromo}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <CreditCard className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Ưu đãi thẻ</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </button>

          {/* 6. Giới thiệu bạn bè */}
          <button
            onClick={onOpenMemberBenefits}
            className="w-full py-3.5 flex items-center justify-between text-left group hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <Users className="w-5 h-5 text-neutral-800" strokeWidth={1.7} />
              <span className="text-sm font-medium text-neutral-900">Giới thiệu bạn bè</span>
            </div>
            <ChevronRight className="w-4.5 h-4.5 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
          </button>
        </div>

        {/* ============================================================== */}
        {/* 3. BOTTOM SECTION: Map & Appointment Card + Logout/Support    */}
        {/* ============================================================== */}
        <div className="p-5 pt-1 bg-white space-y-4">
          {/* Card: Tìm chi nhánh và ATM / Đặt lịch hẹn */}
          <div className="rounded-2xl border border-neutral-200/90 overflow-hidden bg-white shadow-xs flex">
            {/* Left simulated map visual with street lines and blue pin */}
            <div className="w-24 bg-[#f4f6f8] border-r border-neutral-100 relative overflow-hidden flex items-center justify-center shrink-0">
              {/* Detailed Map Vector Roads & Grid */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full text-neutral-300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* City Blocks Background */}
                <rect x="5" y="5" width="26" height="20" rx="3" fill="#e9ecf0" />
                <rect x="38" y="5" width="56" height="20" rx="3" fill="#e9ecf0" />
                <rect x="5" y="32" width="26" height="34" rx="3" fill="#e9ecf0" />
                <rect x="38" y="32" width="56" height="34" rx="3" fill="#e9ecf0" />
                <rect x="5" y="74" width="26" height="22" rx="3" fill="#e9ecf0" />
                <rect x="38" y="74" width="56" height="22" rx="3" fill="#e9ecf0" />

                {/* White Street Roads */}
                <line x1="0" y1="28" x2="100" y2="28" stroke="#ffffff" strokeWidth="6" />
                <line x1="0" y1="70" x2="100" y2="70" stroke="#ffffff" strokeWidth="6" />
                <line x1="34" y1="0" x2="34" y2="100" stroke="#ffffff" strokeWidth="6" />

                {/* Subtle blue route accent */}
                <path
                  d="M15 88 L15 70 L55 70 L55 45"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                  opacity="0.8"
                />
              </svg>

              {/* Main Circular Blue Location Pin */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-[#0070f3] text-white flex items-center justify-center shadow-md ring-2 ring-white">
                <MapPin className="w-4.5 h-4.5 fill-white text-white" />
              </div>

              {/* Small location dot indicators */}
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-[#0070f3] ring-1 ring-white" />
              <div className="absolute top-4 right-3 w-1.5 h-1.5 rounded-full bg-[#0070f3]" />
            </div>

            {/* Right Interactive Text Options */}
            <div className="flex-1 py-1">
              {/* Row 1: Tìm chi nhánh và ATM */}
              <button
                onClick={onOpenBranchAtm}
                className="w-full px-4 py-3 text-left hover:bg-neutral-50 transition block cursor-pointer"
              >
                <h4 className="text-xs font-bold text-neutral-900">
                  Tìm chi nhánh và ATM
                </h4>
              </button>

              <div className="border-b border-neutral-100" />

              {/* Row 2: Đặt lịch hẹn */}
              <button
                onClick={onOpenAppointment}
                className="w-full px-4 py-2.5 text-left hover:bg-neutral-50 transition block cursor-pointer"
              >
                <h4 className="text-xs font-bold text-neutral-900 leading-snug">
                  Đặt lịch hẹn
                </h4>
                <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">
                  Để được phục vụ tốt nhất tại quầy
                </p>
              </button>
            </div>
          </div>

          {/* Bottom Action Row: Đăng xuất & Hỗ trợ */}
          <div className="flex items-center justify-between pt-1 pb-1">
            {/* Solid Black Pill: Đăng xuất */}
            <button
              onClick={onLogout}
              className="px-8 py-2.5 rounded-full bg-black text-white font-bold text-xs tracking-wide hover:bg-neutral-800 active:scale-95 transition cursor-pointer shadow-xs"
            >
              Đăng xuất
            </button>

            {/* Blue Text Link: Hỗ trợ */}
            <button
              onClick={onOpenHotline}
              className="text-xs font-bold text-[#0066cc] hover:underline cursor-pointer"
            >
              Hỗ trợ
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
