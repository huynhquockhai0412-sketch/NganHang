import React from 'react';
import { TechcombankLogo } from './TechcombankLogo';
import { FallingLeaves } from './FallingLeaves';
import { ArrowLeftRight, QrCode, Gift, Calendar, MapPin, Phone, Headphones, ShieldCheck, ChevronRight, Lock } from 'lucide-react';
import { UserProfile } from '../types';
import hanoiAutumnImg from '../assets/images/hanoi_autumn_vendor_1793278984899.jpg';

interface WelcomeScreenProps {
  user: UserProfile;
  onOpenPinLogin: () => void;
  onOpenPersonalQr: () => void;
  onOpenTransfer: () => void;
  onOpenQrScanner: () => void;
  onOpenOneU: () => void;
  onOpenBranchAtm: () => void;
  onOpenHotline: () => void;
  onOpenSupport: () => void;
  onOpenAppointment: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  user,
  onOpenPinLogin,
  onOpenPersonalQr,
  onOpenTransfer,
  onOpenQrScanner,
  onOpenOneU,
  onOpenBranchAtm,
  onOpenHotline,
  onOpenSupport,
  onOpenAppointment,
}) => {
  const currentHour = new Date().getHours();
  let greeting = 'Chào buổi tối,';
  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Chào buổi sáng,';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Chào buổi chiều,';
  }

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* 1. MOBILE VIEW (Matches Image 1 exactly on mobile viewports) */}
      {/* ============================================================== */}
      <div className="block md:hidden relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#e9b867]">
        {/* Background Autumn Street Artwork */}
        <div className="absolute inset-0 z-0 bg-[#e9b867]">
          <img
            src={hanoiAutumnImg}
            alt="Techcombank Autumn Hanoi"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = '/images/hanoi_autumn_vendor.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#f5dfb8]/90" />
        </div>

        {/* Floating autumn leaves */}
        <FallingLeaves />

        {/* Top Header / Greeting */}
        <header className="relative z-10 pt-10 px-6">
          <div className="flex flex-col items-start gap-3">
            <TechcombankLogo size={42} />
            <div className="mt-1 text-slate-900 drop-shadow-sm">
              <p className="text-base font-normal tracking-wide text-neutral-800">
                {greeting}
              </p>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-950 uppercase mt-0.5">
                {user.name}
              </h1>
            </div>
          </div>
        </header>

        {/* Spacer to let the poetic illustration shine */}
        <div className="flex-1 min-h-[140px] pointer-events-none" />

        {/* Bottom Floating Interactive Card (Matching Image 1) */}
        <div className="relative z-20 px-4 pb-4 w-full max-w-lg mx-auto">
          <div className="bg-[#fcf5e5]/95 backdrop-blur-md border border-[#ede0c3] rounded-[32px] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.14)]">
            {/* 3 Quick Action Icons */}
            <div className="grid grid-cols-3 gap-2 text-center pb-5 pt-1">
              <button
                onClick={onOpenTransfer}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/40 group-hover:bg-white/80 transition-colors shadow-sm">
                  <ArrowLeftRight className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                </div>
                <span className="text-[12px] font-medium text-neutral-800 mt-2 leading-tight px-1 line-clamp-2">
                  Chuyển tiền<br />& Thanh toán
                </span>
              </button>

              <button
                onClick={onOpenQrScanner}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/40 group-hover:bg-white/80 transition-colors shadow-sm">
                  <QrCode className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                </div>
                <span className="text-[12px] font-medium text-neutral-800 mt-2 leading-tight px-1">
                  Quét mã<br />QR
                </span>
              </button>

              <button
                onClick={onOpenOneU}
                className="flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/40 group-hover:bg-white/80 transition-colors shadow-sm relative">
                  <Gift className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                  <span className="absolute text-[8px] font-bold top-[21px] text-neutral-900">U</span>
                </div>
                <span className="text-[12px] font-medium text-neutral-800 mt-2 leading-tight px-1">
                  Techcombank<br />OneU
                </span>
              </button>
            </div>

            {/* Primary & Secondary Pill Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onOpenPinLogin}
                className="w-full h-12.5 rounded-full bg-black text-white font-semibold text-[15px] flex items-center justify-center tracking-wide shadow-md active:scale-[0.98] transition cursor-pointer hover:bg-neutral-800"
              >
                Đăng nhập
              </button>

              <button
                onClick={onOpenPersonalQr}
                className="w-full h-12.5 rounded-full bg-[#faedd2]/80 border border-neutral-800/80 text-neutral-900 font-semibold text-[15px] flex items-center justify-center tracking-wide shadow-sm active:scale-[0.98] transition cursor-pointer hover:bg-[#f6e6c4]"
              >
                Mã QR cá nhân
              </button>
            </div>
          </div>

          {/* 4 Bottom Footer Quick Links */}
          <nav className="grid grid-cols-4 gap-1 text-center pt-4 pb-2">
            <button
              onClick={onOpenAppointment}
              className="flex flex-col items-center py-1 group cursor-pointer active:scale-95 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <Calendar className="w-5.5 h-5.5 text-neutral-900" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-medium text-neutral-900 tracking-tight mt-0.5">
                Đặt lịch hẹn
              </span>
            </button>

            <button
              onClick={onOpenBranchAtm}
              className="flex flex-col items-center py-1 group cursor-pointer active:scale-95 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <MapPin className="w-5.5 h-5.5 text-neutral-900 fill-neutral-900" />
              </div>
              <span className="text-[11px] font-medium text-neutral-900 tracking-tight mt-0.5 whitespace-nowrap">
                Chi nhánh & ATM
              </span>
            </button>

            <button
              onClick={onOpenHotline}
              className="flex flex-col items-center py-1 group cursor-pointer active:scale-95 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <Phone className="w-5.5 h-5.5 text-neutral-900 fill-neutral-900" />
              </div>
              <span className="text-[11px] font-medium text-neutral-900 tracking-tight mt-0.5">
                Tổng đài
              </span>
            </button>

            <button
              onClick={onOpenSupport}
              className="flex flex-col items-center py-1 group cursor-pointer active:scale-95 transition"
            >
              <div className="w-9 h-9 flex items-center justify-center">
                <Headphones className="w-5.5 h-5.5 text-neutral-900" strokeWidth={2.2} />
              </div>
              <span className="text-[11px] font-medium text-neutral-900 tracking-tight mt-0.5">
                Hỗ trợ
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. DESKTOP WEB VIEW (Expands into responsive desktop banking) */}
      {/* ============================================================== */}
      <div className="hidden md:block w-full">
        {/* Hero Section */}
        <div className="relative min-h-[540px] w-full overflow-hidden bg-[#e9b867]">
          {/* Background Street Art */}
          <div className="absolute inset-0 z-0 bg-[#e9b867]">
            <img
              src={hanoiAutumnImg}
              alt="Techcombank Autumn Hanoi"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/hanoi_autumn_vendor.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-[#f5dfb8]/90" />
          </div>

          <FallingLeaves />

          {/* Desktop Hero Content Grid */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 py-16 flex items-center justify-between gap-12">
            {/* Left Column: Brand Message & Greeting */}
            <div className="max-w-xl text-white space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                <TechcombankLogo size={18} />
                <span>Ngân hàng số vượt trội 2026</span>
              </div>
              <div>
                <p className="text-xl font-medium text-neutral-100">{greeting}</p>
                <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mt-1">
                  {user.name}
                </h1>
              </div>
              <p className="text-sm text-neutral-200 leading-relaxed max-w-lg">
                Trải nghiệm ngân hàng số Techcombank thế hệ mới với giao diện lấy cảm hứng từ mùa thu Hà Nội, bảo mật mã PIN 6 số tiện lợi, sinh lời tự động và thanh toán 24/7 hoàn toàn miễn phí.
              </p>
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={onOpenPinLogin}
                  className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-full font-bold text-sm shadow-xl active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-red-500" />
                  <span>Đăng nhập bằng mã PIN 6 số</span>
                </button>
                <button
                  onClick={onOpenPersonalQr}
                  className="px-6 py-3.5 bg-white/90 hover:bg-white text-neutral-900 rounded-full font-bold text-sm shadow-md active:scale-95 transition flex items-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-neutral-900" />
                  <span>Mã QR cá nhân</span>
                </button>
              </div>
            </div>

            {/* Right Column: Pre-login Card as seen in App */}
            <div className="w-full max-w-md bg-[#fcf5e5]/95 backdrop-blur-md border border-[#ede0c3] rounded-[32px] p-6 shadow-2xl">
              <div className="text-center pb-4 border-b border-neutral-200/60">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                  Cổng đăng nhập nhanh
                </span>
                <h3 className="text-lg font-extrabold text-neutral-950 mt-1">
                  Techcombank Mobile Web
                </h3>
              </div>

              {/* 3 Quick Action Icons */}
              <div className="grid grid-cols-3 gap-2 text-center py-5">
                <button
                  onClick={onOpenTransfer}
                  className="flex flex-col items-center group cursor-pointer hover:scale-105 transition"
                >
                  <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/60 group-hover:bg-white transition shadow-sm">
                    <ArrowLeftRight className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-neutral-800 mt-2 leading-tight">
                    Chuyển tiền<br />& Thanh toán
                  </span>
                </button>

                <button
                  onClick={onOpenQrScanner}
                  className="flex flex-col items-center group cursor-pointer hover:scale-105 transition"
                >
                  <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/60 group-hover:bg-white transition shadow-sm">
                    <QrCode className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-medium text-neutral-800 mt-2 leading-tight">
                    Quét mã<br />QR
                  </span>
                </button>

                <button
                  onClick={onOpenOneU}
                  className="flex flex-col items-center group cursor-pointer hover:scale-105 transition"
                >
                  <div className="w-13 h-13 rounded-full border border-neutral-800 flex items-center justify-center bg-white/60 group-hover:bg-white transition shadow-sm relative">
                    <Gift className="w-6 h-6 text-neutral-900" strokeWidth={1.8} />
                    <span className="absolute text-[8px] font-bold top-[21px] text-neutral-900">U</span>
                  </div>
                  <span className="text-xs font-medium text-neutral-800 mt-2 leading-tight">
                    Techcombank<br />OneU
                  </span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={onOpenPinLogin}
                  className="w-full h-12.5 rounded-full bg-black text-white font-semibold text-sm flex items-center justify-center tracking-wide shadow-md active:scale-[0.98] transition cursor-pointer hover:bg-neutral-800"
                >
                  Đăng nhập
                </button>
                <button
                  onClick={onOpenPersonalQr}
                  className="w-full h-12.5 rounded-full bg-[#faedd2]/90 border border-neutral-800 text-neutral-900 font-semibold text-sm flex items-center justify-center tracking-wide shadow-xs active:scale-[0.98] transition cursor-pointer hover:bg-[#f6e6c4]"
                >
                  Mã QR cá nhân
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Quick Service Strip */}
        <div className="max-w-7xl mx-auto px-8 py-10">
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={onOpenAppointment}
              className="p-5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:border-red-400 hover:shadow-md transition text-left flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Đặt lịch hẹn trực tuyến</h4>
                <p className="text-xs text-neutral-500 mt-1">Chủ động thời gian đến quầy giao dịch, không cần chờ đợi</p>
              </div>
            </button>

            <button
              onClick={onOpenBranchAtm}
              className="p-5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:border-red-400 hover:shadow-md transition text-left flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Chi nhánh & ATM 24/7</h4>
                <p className="text-xs text-neutral-500 mt-1">Tìm điểm giao dịch và ATM rút nộp tiền tự động gần nhất</p>
              </div>
            </button>

            <button
              onClick={onOpenHotline}
              className="p-5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:border-red-400 hover:shadow-md transition text-left flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Tổng đài 1800 588 822</h4>
                <p className="text-xs text-neutral-500 mt-1">Đội ngũ chuyên viên tư vấn phục vụ 24/7 hoàn toàn miễn phí</p>
              </div>
            </button>

            <button
              onClick={onOpenSupport}
              className="p-5 bg-white rounded-2xl border border-neutral-200/90 shadow-xs hover:border-red-400 hover:shadow-md transition text-left flex items-start gap-4 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Trung tâm Hỗ trợ</h4>
                <p className="text-xs text-neutral-500 mt-1">Hướng dẫn sử dụng ngân hàng số và giải đáp thắc mắc</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
