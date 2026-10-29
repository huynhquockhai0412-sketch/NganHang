/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WebHeader } from './components/WebHeader';
import { WelcomeScreen } from './components/WelcomeScreen';
import { HomeScreen } from './components/HomeScreen';
import { PinLoginModal } from './components/PinLoginModal';
import { PersonalQrModal } from './components/PersonalQrModal';
import { TransferModal } from './components/TransferModal';
import { QrScannerModal } from './components/QrScannerModal';
import { BillPaymentModal } from './components/BillPaymentModal';
import { SavingsModal } from './components/SavingsModal';
import { LoanOfferModal } from './components/LoanOfferModal';
import { LuckyWheelModal } from './components/LuckyWheelModal';
import { OneUModal } from './components/OneUModal';
import { AccountDetailModal } from './components/AccountDetailModal';
import { ProfileModal } from './components/ProfileModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { BranchAtmModal, HotlineModal, NotificationsModal } from './components/ExtraModals';
import { UserProfile, Transaction, NotificationItem } from './types';
import { Smartphone, Monitor, Search, X } from 'lucide-react';

const INITIAL_USER: UserProfile = {
  name: 'LE NGOC GIAU',
  accountNumber: '1903 8928 668 019',
  avatarText: 'LG',
  tier: 'Inspire',
  phone: '098***412',
  pin: '123456',
  balance: 76548236, // Exactly 76.548.236 VND as requested
  points: 2450,
  isBalanceHidden: false,
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Nhận tiền từ CÔNG TY TNHH CÔNG NGHỆ Á CHÂU',
    subtitle: 'Chuyển khoản liên ngân hàng 24/7',
    amount: 15000000,
    type: 'in',
    date: '28/10/2026',
    time: '09:15',
    category: 'transfer',
  },
  {
    id: 'tx-2',
    title: 'Chuyển tiền đến NGUYEN VAN AN',
    subtitle: 'Le Ngoc Giau chuyen tien tiec toi',
    amount: 550000,
    type: 'out',
    date: '27/10/2026',
    time: '20:45',
    category: 'transfer',
  },
  {
    id: 'tx-3',
    title: 'Thanh toán tiền điện EVN HÀ NỘI',
    subtitle: 'Hóa đơn tiền điện kỳ T10/2026',
    amount: 485000,
    type: 'out',
    date: '26/10/2026',
    time: '14:20',
    category: 'bill',
  },
  {
    id: 'tx-4',
    title: 'Tiền sinh lời tự động',
    subtitle: 'Cộng lãi tiền gửi thanh toán',
    amount: 19280,
    type: 'in',
    date: '25/10/2026',
    time: '00:05',
    category: 'savings',
  },
  {
    id: 'tx-5',
    title: 'Quét mã QR - Highlands Coffee Tràng Tiền',
    subtitle: 'Thanh toán VNPAY-QR',
    amount: 55000,
    type: 'out',
    date: '24/10/2026',
    time: '10:30',
    category: 'shopping',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Biến động số dư tài khoản',
    message: 'Tài khoản 1903...019 vừa nhận được +15,000,000 VND từ CÔNG TY TNHH CÔNG NGHỆ Á CHÂU. Số dư hiện có: 76,548,236 VND.',
    time: 'Hôm nay 09:15',
    isRead: false,
    type: 'balance',
  },
  {
    id: 'notif-2',
    title: 'Ưu đãi Techcombank OneU',
    message: 'Bạn được tặng 500 điểm OneU nhân dịp chào thu Hà Nội! Đổi ngay voucher Shopee, Highlands tại mục OneU.',
    time: 'Hôm qua 14:00',
    isRead: false,
    type: 'promo',
  },
  {
    id: 'notif-3',
    title: 'Cảnh báo an toàn thông tin',
    message: 'Techcombank không bao giờ yêu cầu khách hàng cung cấp mã PIN hoặc OTP qua điện thoại hoặc tin nhắn.',
    time: '25/10/2026',
    isRead: true,
    type: 'security',
  },
];

export default function App() {
  // State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [forceMobilePreview, setForceMobilePreview] = useState<boolean>(false);

  // Modals state
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [isPersonalQrOpen, setIsPersonalQrOpen] = useState<boolean>(false);
  const [isTransferOpen, setIsTransferOpen] = useState<boolean>(false);
  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);
  const [isBillPayOpen, setIsBillPayOpen] = useState<boolean>(false);
  const [isSavingsOpen, setIsSavingsOpen] = useState<boolean>(false);
  const [isLoanOpen, setIsLoanOpen] = useState<boolean>(false);
  const [isLuckyWheelOpen, setIsLuckyWheelOpen] = useState<boolean>(false);
  const [isOneUOpen, setIsOneUOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBranchAtmOpen, setIsBranchAtmOpen] = useState<boolean>(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Handlers
  const handleToggleHideBalance = () => {
    setUser((prev) => ({ ...prev, isBalanceHidden: !prev.isBalanceHidden }));
  };

  const handlePinSuccess = () => {
    setIsPinModalOpen(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsLoggedIn(false);
    setActiveNavTab('home');
  };

  const handleUpdatePin = (newPin: string) => {
    setUser((prev) => ({ ...prev, pin: newPin }));
  };

  const handleTransferSuccess = (
    amount: number,
    recipientName: string,
    bankName: string,
    memo: string
  ) => {
    setUser((prev) => ({ ...prev, balance: Math.max(0, prev.balance - amount) }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: `Chuyển tiền đến ${recipientName}`,
      subtitle: `${bankName} - ${memo}`,
      amount: amount,
      type: 'out',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'transfer',
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title: 'Biến động số dư',
      message: `Tài khoản 1903...019 bị trừ -${amount.toLocaleString('vi-VN')} VND (Chuyển khoản đến ${recipientName}).`,
      time: 'Vừa xong',
      isRead: false,
      type: 'balance',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleBillPaySuccess = (title: string, amount: number) => {
    setUser((prev) => ({ ...prev, balance: Math.max(0, prev.balance - amount) }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: title,
      subtitle: 'Thanh toán trực tuyến thành công',
      amount: amount,
      type: 'out',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'bill',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleScanResult = (title: string, amount: number) => {
    setUser((prev) => ({ ...prev, balance: Math.max(0, prev.balance - amount) }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: title,
      subtitle: 'Thanh toán quét mã QR VNPAY',
      amount: amount,
      type: 'out',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'shopping',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleLoanDisburseSuccess = (amount: number) => {
    setUser((prev) => ({ ...prev, balance: prev.balance + amount }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: 'Giải ngân khoản vay tín chấp Techcombank',
      subtitle: 'Hạn mức vay nhanh phê duyệt tức thì',
      amount: amount,
      type: 'in',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'reward',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleLuckyReward = (amount: number, description: string) => {
    setUser((prev) => ({ ...prev, balance: prev.balance + amount, points: prev.points + 50 }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: 'Trúng thưởng Quét QR Chạm vận may',
      subtitle: description,
      amount: amount,
      type: 'in',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'reward',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleDepositSuccess = (amount: number, term: string) => {
    setUser((prev) => ({ ...prev, balance: Math.max(0, prev.balance - amount) }));

    const now = new Date();
    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      title: `Mở sổ tiết kiệm điện tử (${term})`,
      subtitle: 'Techcombank Tiết kiệm Phát Lộc',
      amount: amount,
      type: 'out',
      date: now.toLocaleDateString('vi-VN'),
      time: now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      category: 'savings',
    };

    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen w-full bg-[#fbf8f2] flex flex-col text-neutral-900 overflow-x-hidden selection:bg-red-500 selection:text-white">
      {/* 1. Desktop Web Header (Visible on Desktop / hidden when force mobile preview is active) */}
      {!forceMobilePreview && (
        <WebHeader
          user={user}
          isLoggedIn={isLoggedIn}
          onOpenPinLogin={() => setIsPinModalOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={handleLogout}
          onOpenBranchAtm={() => setIsBranchAtmOpen(true)}
          onOpenHotline={() => setIsHotlineOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* 2. Main Content Body */}
      <main
        className={`flex-1 w-full ${
          forceMobilePreview ? 'max-w-md mx-auto shadow-2xl min-h-screen bg-[#fbf8f2]' : 'w-full'
        }`}
      >
        {!isLoggedIn ? (
          <WelcomeScreen
            user={user}
            onOpenPinLogin={() => setIsPinModalOpen(true)}
            onOpenPersonalQr={() => setIsPersonalQrOpen(true)}
            onOpenTransfer={() => setIsPinModalOpen(true)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
            onOpenOneU={() => setIsOneUOpen(true)}
            onOpenBranchAtm={() => setIsBranchAtmOpen(true)}
            onOpenHotline={() => setIsHotlineOpen(true)}
            onOpenSupport={() => setIsHotlineOpen(true)}
            onOpenAppointment={() => setIsBranchAtmOpen(true)}
          />
        ) : (
          <HomeScreen
            user={user}
            transactions={transactions}
            notifications={notifications}
            activeNavTab={activeNavTab}
            setActiveNavTab={setActiveNavTab}
            onToggleHideBalance={handleToggleHideBalance}
            onOpenTransfer={() => setIsTransferOpen(true)}
            onOpenQrScanner={() => setIsQrScannerOpen(true)}
            onOpenPersonalQr={() => setIsPersonalQrOpen(true)}
            onOpenBillPayment={() => setIsBillPayOpen(true)}
            onOpenSavings={() => setIsSavingsOpen(true)}
            onOpenLoanOffer={() => setIsLoanOpen(true)}
            onOpenLuckyWheel={() => setIsLuckyWheelOpen(true)}
            onOpenOneU={() => setIsOneUOpen(true)}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenMoreFeatures={() => setIsAccountDetailOpen(true)}
            onOpenAccountDetail={() => setIsAccountDetailOpen(true)}
          />
        )}
      </main>

      {/* 3. Floating Desktop Viewport Tester Switcher (Convenient for desktop browsers to test mobile view instantly) */}
      <div className="hidden lg:flex fixed bottom-5 right-5 z-50 items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white px-3.5 py-2 rounded-full shadow-2xl border border-neutral-700/80 text-xs">
        <span className="text-neutral-400 font-medium">Chế độ xem:</span>
        <button
          onClick={() => setForceMobilePreview(false)}
          className={`px-2.5 py-1 rounded-full font-semibold transition flex items-center gap-1 ${
            !forceMobilePreview ? 'bg-red-600 text-white shadow-xs' : 'text-neutral-300 hover:text-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Web Desktop</span>
        </button>
        <button
          onClick={() => setForceMobilePreview(true)}
          className={`px-2.5 py-1 rounded-full font-semibold transition flex items-center gap-1 ${
            forceMobilePreview ? 'bg-red-600 text-white shadow-xs' : 'text-neutral-300 hover:text-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile (như ảnh)</span>
        </button>
      </div>

      {/* MODALS */}
      <PinLoginModal
        user={user}
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handlePinSuccess}
      />

      <PersonalQrModal
        user={user}
        isOpen={isPersonalQrOpen}
        onClose={() => setIsPersonalQrOpen(false)}
      />

      <TransferModal
        user={user}
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        onTransferSuccess={handleTransferSuccess}
      />

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanResult={handleScanResult}
      />

      <BillPaymentModal
        user={user}
        isOpen={isBillPayOpen}
        onClose={() => setIsBillPayOpen(false)}
        onPaySuccess={handleBillPaySuccess}
      />

      <SavingsModal
        user={user}
        isOpen={isSavingsOpen}
        onClose={() => setIsSavingsOpen(false)}
        onDepositSuccess={handleDepositSuccess}
      />

      <LoanOfferModal
        isOpen={isLoanOpen}
        onClose={() => setIsLoanOpen(false)}
        onDisburseSuccess={handleLoanDisburseSuccess}
      />

      <LuckyWheelModal
        isOpen={isLuckyWheelOpen}
        onClose={() => setIsLuckyWheelOpen(false)}
        onWinReward={handleLuckyReward}
      />

      <OneUModal
        user={user}
        isOpen={isOneUOpen}
        onClose={() => setIsOneUOpen(false)}
      />

      <AccountDetailModal
        user={user}
        transactions={transactions}
        isOpen={isAccountDetailOpen}
        onClose={() => setIsAccountDetailOpen(false)}
      />

      <ProfileDrawer
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={handleLogout}
        onOpenNotifications={() => {
          setIsProfileOpen(false);
          setIsNotificationsOpen(true);
        }}
        onOpenBranchAtm={() => {
          setIsProfileOpen(false);
          setIsBranchAtmOpen(true);
        }}
        onOpenAppointment={() => {
          setIsProfileOpen(false);
          setIsBranchAtmOpen(true);
        }}
        onOpenHotline={() => {
          setIsProfileOpen(false);
          setIsHotlineOpen(true);
        }}
        onOpenCardPromo={() => {
          setIsProfileOpen(false);
          setIsAccountDetailOpen(true);
        }}
        onOpenSettings={() => {
          setIsProfileOpen(false);
          setIsSettingsOpen(true);
        }}
        onOpenMemberBenefits={() => {
          setIsProfileOpen(false);
          setIsOneUOpen(true);
        }}
      />

      <ProfileModal
        user={user}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLogout={handleLogout}
        onUpdatePin={handleUpdatePin}
      />

      <BranchAtmModal
        isOpen={isBranchAtmOpen}
        onClose={() => setIsBranchAtmOpen(false)}
      />

      <HotlineModal
        isOpen={isHotlineOpen}
        onClose={() => setIsHotlineOpen(false)}
      />

      <NotificationsModal
        notifications={notifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllRead={handleMarkAllRead}
      />

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-5 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-sm font-bold text-neutral-900">Tìm kiếm nhanh</span>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchFilter('');
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm tính năng: chuyển tiền, tiền điện, tiết kiệm..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white outline-none focus:border-red-600"
              />
            </div>

            <div className="mt-4 flex-1 overflow-y-auto no-scrollbar space-y-2">
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Gợi ý phổ biến:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsTransferOpen(true);
                  }}
                  className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-left font-medium border border-neutral-200"
                >
                  🚀 Chuyển tiền 24/7
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsPersonalQrOpen(true);
                  }}
                  className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-left font-medium border border-neutral-200"
                >
                  📱 Mã QR nhận tiền
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsSavingsOpen(true);
                  }}
                  className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-left font-medium border border-neutral-200"
                >
                  📈 Sinh lời tự động 4.3%
                </button>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setIsLoanOpen(true);
                  }}
                  className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-left font-medium border border-neutral-200"
                >
                  💳 Vay nhanh không giấy tờ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
