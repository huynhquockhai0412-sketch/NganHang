import React, { useState } from 'react';
import {
  Search,
  Bell,
  Eye,
  EyeOff,
  ChevronDown,
  PiggyBank,
  Receipt,
  QrCode,
  TrendingUp,
  ArrowRight,
  ArrowLeftRight,
  Gift,
  Wallet,
  Sparkles,
  Copy,
  Check,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile, Transaction, NotificationItem } from '../types';
import hanoiAutumnImg from '../assets/images/hanoi_autumn_vendor_1793278984899.jpg';
import piggySavingsImg from '../assets/images/piggy_savings_banner_1793279000289.jpg';

interface HomeScreenProps {
  user: UserProfile;
  transactions: Transaction[];
  notifications: NotificationItem[];
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  onToggleHideBalance: () => void;
  onOpenTransfer: () => void;
  onOpenQrScanner: () => void;
  onOpenPersonalQr: () => void;
  onOpenBillPayment: () => void;
  onOpenSavings: () => void;
  onOpenLoanOffer: () => void;
  onOpenLuckyWheel: () => void;
  onOpenOneU: () => void;
  onOpenProfile: () => void;
  onOpenNotifications: () => void;
  onOpenSearch: () => void;
  onOpenMoreFeatures: () => void;
  onOpenAccountDetail: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  transactions,
  notifications,
  activeNavTab,
  setActiveNavTab,
  onToggleHideBalance,
  onOpenTransfer,
  onOpenQrScanner,
  onOpenPersonalQr,
  onOpenBillPayment,
  onOpenSavings,
  onOpenLoanOffer,
  onOpenLuckyWheel,
  onOpenOneU,
  onOpenProfile,
  onOpenNotifications,
  onOpenSearch,
  onOpenMoreFeatures,
  onOpenAccountDetail,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(user.accountNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full">
      {/* ============================================================== */}
      {/* 1. MOBILE RESPONSIVE VIEW (Matches Image 2 exactly on phone)   */}
      {/* ============================================================== */}
      <div className="block md:hidden relative min-h-screen w-full flex flex-col justify-between bg-[#fbf8f2] text-neutral-900 pb-24 select-none">
        {/* Upper Area with Scenic Hanoi Background */}
        <div className="relative w-full overflow-hidden pb-6">
          {/* Background image matching Image 2 */}
          <div className="absolute inset-0 z-0 h-[480px] bg-[#e9b867]">
            <img
              src={hanoiAutumnImg}
              alt="Techcombank Autumn Hanoi"
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/hanoi_autumn_vendor.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-[#fbf8f2]" />
          </div>

          {/* Top Header Bar */}
          <header className="relative z-10 pt-10 px-5 flex items-center justify-between">
            <button
              onClick={onOpenProfile}
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-slate-300 via-slate-100 to-sky-200 border-2 border-white/80 shadow-md flex items-center justify-center text-slate-800 font-bold text-sm cursor-pointer active:scale-95 transition"
              title="Hồ sơ người dùng"
            >
              {user.avatarText}
            </button>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenSearch}
                className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300/80 flex items-center justify-center text-neutral-800 shadow-xs hover:bg-white active:scale-95 transition cursor-pointer"
                title="Tìm kiếm"
              >
                <Search className="w-5 h-5 text-neutral-800" strokeWidth={2} />
              </button>

              <button
                onClick={onOpenNotifications}
                className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-neutral-300/80 flex items-center justify-center text-neutral-800 shadow-xs hover:bg-white active:scale-95 transition cursor-pointer relative"
                title="Thông báo"
              >
                <Bell className="w-5 h-5 text-neutral-800" strokeWidth={2} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white" />
                )}
              </button>
            </div>
          </header>

          {/* Main Account Balance Card (Matching Image 2) */}
          <div className="relative z-10 mt-6 px-4 max-w-lg mx-auto">
            <div className="rounded-[24px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-neutral-200/80 bg-white">
              {/* Top part: White balance section */}
              <div className="p-5 bg-white">
                <div className="flex items-center justify-between">
                  <button
                    onClick={onOpenAccountDetail}
                    className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 group cursor-pointer"
                  >
                    <span className="text-sm font-normal">Số dư hiện có</span>
                    <ChevronDown className="w-4 h-4 text-neutral-500 group-hover:translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={onToggleHideBalance}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                    title={user.isBalanceHidden ? 'Hiển thị số dư' : 'Ẩn số dư'}
                  >
                    {user.isBalanceHidden ? (
                      <EyeOff className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-neutral-800" strokeWidth={1.8} />
                    )}
                  </button>
                </div>

                {/* Balance Amount */}
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-neutral-600">VND</span>
                  <span className="text-[28px] font-extrabold tracking-tight text-neutral-950 tabular-numbers">
                    {user.isBalanceHidden ? '••••••••' : formatVND(user.balance)}
                  </span>
                </div>

                {/* Sub-info: Account number */}
                <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                  <span>Số TK: {user.accountNumber}</span>
                  <button
                    onClick={handleCopyAccount}
                    className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Đã sao chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom part: Connected Loan Offer Banner */}
              <div className="bg-gradient-to-r from-[#fae7b9] via-[#f9e2aa] to-[#f4d68e] p-4.5 border-t border-[#efd396]/60 flex items-end justify-between gap-3">
                <div className="space-y-1 max-w-[70%]">
                  <h3 className="text-sm font-bold text-neutral-950 leading-snug">
                    Vay nhanh, không cần giấy tờ
                  </h3>
                  <p className="text-xs text-neutral-800 leading-relaxed">
                    Hạn mức có sẵn đến 100 Triệu VND, miễn lãi 07 ngày đầu
                  </p>
                </div>
                <button
                  onClick={onOpenLoanOffer}
                  className="px-4 py-2 bg-black text-white rounded-full text-xs font-semibold shrink-0 shadow-sm hover:bg-neutral-800 active:scale-95 transition cursor-pointer"
                >
                  Nhận ngay
                </button>
              </div>
            </div>
          </div>

          {/* Small floating promo badge on left: "Quét QR Chạm vận may" */}
          <div className="relative z-10 px-4 mt-3 max-w-lg mx-auto flex items-center justify-between">
            <button
              onClick={onOpenLuckyWheel}
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-amber-200/90 rounded-full px-3 py-1.5 shadow-sm active:scale-95 transition cursor-pointer group hover:bg-white"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-xs group-hover:rotate-12 transition-transform">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-[11px] font-bold text-red-600 leading-tight block">
                  Quét QR Chạm vận may
                </span>
              </div>
            </button>

            <button
              onClick={onOpenPersonalQr}
              className="text-[11px] font-medium text-neutral-700 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-white transition cursor-pointer"
            >
              Mã QR của tôi
            </button>
          </div>

          {/* Quick Actions 5-Grid Card (Matching Image 2) */}
          <div className="relative z-10 mt-3 px-4 max-w-lg mx-auto">
            <div className="bg-[#fef3d8]/95 backdrop-blur-md border border-[#edd7a6] rounded-2xl p-4 shadow-sm">
              <div className="grid grid-cols-5 gap-1 text-center">
                {/* 1. Gửi tiết kiệm */}
                <button
                  onClick={onOpenSavings}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center group-hover:shadow-md transition">
                    <PiggyBank className="w-5.5 h-5.5 text-neutral-800" strokeWidth={1.7} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-800 mt-2 leading-tight">
                    Gửi<br />tiết kiệm
                  </span>
                </button>

                {/* 2. Thanh toán hóa đơn */}
                <button
                  onClick={onOpenBillPayment}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center group-hover:shadow-md transition">
                    <Receipt className="w-5.5 h-5.5 text-neutral-800" strokeWidth={1.7} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-800 mt-2 leading-tight">
                    Thanh toán<br />hóa đơn
                  </span>
                </button>

                {/* 3. Quét mã QR */}
                <button
                  onClick={onOpenQrScanner}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center group-hover:shadow-md transition">
                    <QrCode className="w-5.5 h-5.5 text-neutral-800" strokeWidth={1.7} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-800 mt-2 leading-tight">
                    Quét<br />mã QR
                  </span>
                </button>

                {/* 4. Sinh lời tự động */}
                <button
                  onClick={onOpenSavings}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center group-hover:shadow-md transition">
                    <TrendingUp className="w-5.5 h-5.5 text-neutral-800" strokeWidth={1.7} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-800 mt-2 leading-tight">
                    Sinh lời<br />tự động
                  </span>
                </button>

                {/* 5. Tính năng khác */}
                <button
                  onClick={onOpenMoreFeatures}
                  className="flex flex-col items-center group cursor-pointer active:scale-95 transition"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200/80 shadow-xs flex items-center justify-center group-hover:shadow-md transition">
                    <ArrowRight className="w-5.5 h-5.5 text-neutral-800" strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-medium text-neutral-800 mt-2 leading-tight">
                    Tính năng<br />khác
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* "Dành cho bạn" Section (Matching Image 2) */}
        <section className="px-4 max-w-lg mx-auto w-full mt-2">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-base font-bold text-neutral-900 tracking-tight">
              Dành cho bạn
            </h2>
            <button
              onClick={onOpenMoreFeatures}
              className="text-xs text-neutral-500 hover:text-neutral-800 font-medium flex items-center gap-0.5"
            >
              <span>Xem thêm</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Featured Card (Piggy savings banner) */}
          <div
            onClick={onOpenSavings}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#fff3dc] via-[#faebd0] to-[#f9e0b8] border border-[#f0dac0] shadow-sm p-4.5 cursor-pointer hover:shadow-md transition group"
          >
            <div className="flex items-center justify-between">
              <div className="max-w-[62%] space-y-1.5 z-10">
                <p className="text-sm font-bold text-neutral-900 leading-snug">
                  Gửi góp mỗi ngày, xây quỹ chi tiêu. Tự do mua sắm và du lịch cho tương lai
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 group-hover:translate-x-1 transition-transform">
                  <span>Khám phá ngay</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="w-28 h-24 shrink-0 relative overflow-hidden rounded-xl bg-[#faebd0]">
                <img
                  src={piggySavingsImg}
                  alt="Piggy savings"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/piggy_savings_banner.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Transfer & Bill Pay Strip */}
          <div className="grid grid-cols-2 gap-2.5 mt-3">
            <button
              onClick={onOpenTransfer}
              className="p-3 bg-white rounded-xl border border-neutral-200/90 shadow-xs flex items-center gap-3 text-left hover:border-red-300 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">Chuyển tiền 24/7</p>
                <p className="text-[10px] text-neutral-500">Miễn phí trọn đời</p>
              </div>
            </button>

            <button
              onClick={onOpenBillPayment}
              className="p-3 bg-white rounded-xl border border-neutral-200/90 shadow-xs flex items-center gap-3 text-left hover:border-amber-300 transition cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-900">Thanh toán hóa đơn</p>
                <p className="text-[10px] text-neutral-500">Điện, Nước, Internet</p>
              </div>
            </button>
          </div>
        </section>

        {/* Recent Transactions List */}
        <section className="px-4 max-w-lg mx-auto w-full mt-5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-neutral-900 tracking-tight">
              Giao dịch gần đây
            </h2>
            <button
              onClick={onOpenAccountDetail}
              className="text-xs text-red-600 hover:text-red-700 font-semibold"
            >
              Xem tất cả
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs divide-y divide-neutral-100 overflow-hidden">
            {transactions.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={onOpenAccountDetail}
                className="p-3.5 flex items-center justify-between hover:bg-neutral-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      item.type === 'in'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {item.type === 'in' ? (
                      <TrendingUp className="w-4.5 h-4.5" />
                    ) : (
                      <ArrowRight className="w-4.5 h-4.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-900 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-neutral-500">
                      {item.date} · {item.time}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-bold tabular-numbers ${
                      item.type === 'in' ? 'text-emerald-600' : 'text-neutral-900'
                    }`}
                  >
                    {item.type === 'in' ? '+' : '-'} {formatVND(item.amount)} đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fixed Bottom Navigation Bar (5 tabs matching Image 2) */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg">
          <div className="max-w-lg mx-auto grid grid-cols-5 h-16 items-center px-1">
            <button
              onClick={() => setActiveNavTab('home')}
              className="flex flex-col items-center justify-center py-1 cursor-pointer active:scale-95 transition relative"
            >
              {activeNavTab === 'home' && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-md" />
              )}
              <TechcombankLogo size={22} />
              <span
                className={`text-[10px] tracking-tight mt-1 font-semibold ${
                  activeNavTab === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                Trang chủ
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNavTab('accounts');
                onOpenAccountDetail();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer active:scale-95 transition relative"
            >
              {activeNavTab === 'accounts' && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-md" />
              )}
              <Wallet
                className={`w-5.5 h-5.5 ${
                  activeNavTab === 'accounts' ? 'text-red-600' : 'text-neutral-700'
                }`}
                strokeWidth={1.8}
              />
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium ${
                  activeNavTab === 'accounts' ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                Tài khoản & Thẻ
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNavTab('transfer');
                onOpenTransfer();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer active:scale-95 transition relative"
            >
              {activeNavTab === 'transfer' && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-md" />
              )}
              <div className="w-5.5 h-5.5 rounded-full border border-neutral-700 flex items-center justify-center">
                <ArrowLeftRight className="w-3.5 h-3.5 text-neutral-800" strokeWidth={1.8} />
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium text-center leading-none ${
                  activeNavTab === 'transfer' ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                Chuyển tiền<br />& Thanh toán
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNavTab('oneu');
                onOpenOneU();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer active:scale-95 transition relative"
            >
              {activeNavTab === 'oneu' && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-md" />
              )}
              <div className="relative">
                <Gift
                  className={`w-5.5 h-5.5 ${
                    activeNavTab === 'oneu' ? 'text-red-600' : 'text-neutral-700'
                  }`}
                  strokeWidth={1.8}
                />
                <span className="absolute text-[7px] font-bold top-[6px] left-[7px] text-neutral-900">
                  U
                </span>
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium text-center leading-none ${
                  activeNavTab === 'oneu' ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                Techcombank<br />OneU
              </span>
            </button>

            <button
              onClick={() => {
                setActiveNavTab('wealth');
                onOpenSavings();
              }}
              className="flex flex-col items-center justify-center py-1 cursor-pointer active:scale-95 transition relative"
            >
              {activeNavTab === 'wealth' && (
                <span className="absolute top-0 w-8 h-1 bg-red-600 rounded-b-md" />
              )}
              <div className="w-5.5 h-5.5 rounded-full border border-neutral-700 flex items-center justify-center">
                <span className="text-[10px] font-bold text-neutral-800">₫</span>
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium text-center leading-none ${
                  activeNavTab === 'wealth' ? 'text-neutral-950 font-bold' : 'text-neutral-600'
                }`}
              >
                Tổng quan<br />tài sản
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* ============================================================== */}
      {/* 2. DESKTOP RESPONSIVE WEB VIEW (Expands into web banking UI)   */}
      {/* ============================================================== */}
      <div className="hidden md:block w-full max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Top Scenic Banner Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-neutral-200 bg-[#e9b867] min-h-[220px] flex items-center">
          <div className="absolute inset-0 z-0 bg-[#e9b867]">
            <img
              src={hanoiAutumnImg}
              alt="Hanoi Autumn"
              className="w-full h-full object-cover object-[center_35%]"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = '/images/hanoi_autumn_vendor.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-[#faecd0]/90" />
          </div>

          <div className="relative z-10 px-8 py-6 text-white flex justify-between items-center w-full">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white inline-block">
                Tài khoản thanh toán đa tiện ích
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight mt-1">
                Xin chào, {user.name}
              </h2>
              <p className="text-xs text-neutral-200">
                Số tài khoản: <strong className="font-mono text-white">{user.accountNumber}</strong> • Hội viên Inspire
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenLuckyWheel}
                className="px-4 py-2.5 rounded-full bg-white/90 hover:bg-white text-red-600 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-red-600" />
                <span>Quét QR Chạm vận may</span>
              </button>
              <button
                onClick={onOpenPersonalQr}
                className="px-4 py-2.5 rounded-full bg-black text-white hover:bg-neutral-800 font-semibold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Mã QR của tôi</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Web Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Main Left Column (7 cols) */}
          <div className="col-span-7 space-y-6">
            {/* Account Balance Card (Desktop Expansion) */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-neutral-200/90 bg-white">
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-600">Số dư khả dụng</span>
                    <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold">
                      Đang sinh lời 4.3%/năm
                    </span>
                  </div>

                  <button
                    onClick={onToggleHideBalance}
                    className="p-1.5 rounded-full text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                    title={user.isBalanceHidden ? 'Hiển thị' : 'Ẩn số dư'}
                  >
                    {user.isBalanceHidden ? <EyeOff className="w-5 h-5 text-neutral-500" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-neutral-600">VND</span>
                  <span className="text-4xl font-extrabold tracking-tight text-neutral-950 tabular-numbers">
                    {user.isBalanceHidden ? '••••••••' : formatVND(user.balance)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-3 text-xs text-neutral-500">
                  <span>Số TK: <strong className="font-mono text-neutral-800">{user.accountNumber}</strong></span>
                  <button
                    onClick={handleCopyAccount}
                    className="text-red-600 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              {/* Connected Loan Offer Banner */}
              <div className="bg-gradient-to-r from-[#fae7b9] via-[#f9e2aa] to-[#f4d68e] p-5 border-t border-[#efd396]/60 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-neutral-950">Vay nhanh, không cần giấy tờ</h4>
                  <p className="text-xs text-neutral-800 mt-0.5">
                    Hạn mức có sẵn đến 100 Triệu VND, miễn lãi 07 ngày đầu tiên
                  </p>
                </div>
                <button
                  onClick={onOpenLoanOffer}
                  className="px-5 py-2.5 bg-black text-white rounded-full text-xs font-bold hover:bg-neutral-800 active:scale-95 transition cursor-pointer shadow-sm"
                >
                  Nhận ngay
                </button>
              </div>
            </div>

            {/* Quick Actions 5-Grid Card (Desktop Style) */}
            <div className="bg-[#fef3d8]/90 border border-[#edd7a6] rounded-3xl p-5 shadow-xs">
              <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-3">
                Tiện ích thanh toán & giao dịch nhanh
              </span>
              <div className="grid grid-cols-5 gap-3 text-center">
                <button
                  onClick={onOpenSavings}
                  className="p-3 rounded-2xl bg-white hover:shadow-md transition flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition">
                    <PiggyBank className="w-6 h-6 text-neutral-900" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 mt-2">Gửi tiết kiệm</span>
                </button>

                <button
                  onClick={onOpenBillPayment}
                  className="p-3 rounded-2xl bg-white hover:shadow-md transition flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition">
                    <Receipt className="w-6 h-6 text-neutral-900" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 mt-2">Thanh toán hóa đơn</span>
                </button>

                <button
                  onClick={onOpenQrScanner}
                  className="p-3 rounded-2xl bg-white hover:shadow-md transition flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition">
                    <QrCode className="w-6 h-6 text-neutral-900" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 mt-2">Quét mã QR</span>
                </button>

                <button
                  onClick={onOpenSavings}
                  className="p-3 rounded-2xl bg-white hover:shadow-md transition flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition">
                    <TrendingUp className="w-6 h-6 text-neutral-900" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 mt-2">Sinh lời tự động</span>
                </button>

                <button
                  onClick={onOpenMoreFeatures}
                  className="p-3 rounded-2xl bg-white hover:shadow-md transition flex flex-col items-center cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-neutral-200 flex items-center justify-center group-hover:scale-105 transition">
                    <ArrowRight className="w-6 h-6 text-neutral-900" />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 mt-2">Tính năng khác</span>
                </button>
              </div>
            </div>

            {/* "Dành cho bạn" Feature Banner */}
            <div
              onClick={onOpenSavings}
              className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#fff3dc] via-[#faebd0] to-[#f9e0b8] border border-[#f0dac0] p-6 flex items-center justify-between cursor-pointer hover:shadow-md transition group"
            >
              <div className="space-y-2 max-w-lg">
                <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest">
                  Ưu đãi sinh lời
                </span>
                <h3 className="text-lg font-bold text-neutral-950 leading-snug">
                  Gửi góp mỗi ngày, xây quỹ chi tiêu. Tự do mua sắm và du lịch cho tương lai
                </h3>
                <p className="text-xs text-neutral-700">
                  Lãi suất tới 5.8%/năm, rút gốc linh hoạt không mất lãi!
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-red-600 group-hover:translate-x-1 transition">
                  <span>Xem chi tiết gói tích lũy</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="w-36 h-28 relative rounded-2xl overflow-hidden shadow-sm shrink-0 bg-[#faebd0]">
                <img
                  src={piggySavingsImg}
                  alt="Piggy savings"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = '/images/piggy_savings_banner.jpg';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Transactions & Card (5 cols) */}
          <div className="col-span-5 space-y-6">
            {/* Quick 24/7 Transfer Trigger Bar */}
            <div className="p-5 bg-white rounded-3xl border border-neutral-200/90 shadow-xs flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Chuyển tiền nhanh 24/7</h4>
                <p className="text-xs text-neutral-500">Miễn phí chuyển khoản liên ngân hàng</p>
              </div>
              <button
                onClick={onOpenTransfer}
                className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>Chuyển tiền</span>
              </button>
            </div>

            {/* Virtual Card Showcase */}
            <div
              onClick={onOpenAccountDetail}
              className="p-5 rounded-3xl bg-gradient-to-tr from-stone-900 via-neutral-800 to-stone-700 text-white shadow-md cursor-pointer hover:shadow-xl transition group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400">
                    Techcombank Visa Platinum
                  </span>
                  <p className="text-xs text-neutral-300">Thẻ ghi nợ quốc tế sẵn sàng chi tiêu</p>
                </div>
                <TechcombankLogo size={24} />
              </div>
              <div className="my-4 font-mono text-base tracking-widest">
                4507 •••• •••• 6789
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-300 border-t border-neutral-700/80 pt-2">
                <span className="font-bold uppercase">{user.name}</span>
                <span className="text-red-400 group-hover:underline font-medium">Chi tiết thẻ →</span>
              </div>
            </div>

            {/* Recent Transactions List on Desktop */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-neutral-900">Giao dịch gần đây</h4>
                <button
                  onClick={onOpenAccountDetail}
                  className="text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Xem tất cả
                </button>
              </div>

              <div className="divide-y divide-neutral-100">
                {transactions.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={onOpenAccountDetail}
                    className="py-3 flex items-center justify-between hover:bg-neutral-50 rounded-xl px-2 transition cursor-pointer"
                  >
                    <div>
                      <p className="text-xs font-semibold text-neutral-900 line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-neutral-500">{item.date} · {item.time}</p>
                    </div>
                    <span
                      className={`text-xs font-bold tabular-numbers ${
                        item.type === 'in' ? 'text-emerald-600' : 'text-neutral-900'
                      }`}
                    >
                      {item.type === 'in' ? '+' : '-'} {formatVND(item.amount)} đ
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
