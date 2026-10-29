import React, { useState } from 'react';
import { X, CreditCard, Copy, Check, Eye, EyeOff, Search, TrendingUp, ArrowDownLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile, Transaction } from '../types';

interface AccountDetailModalProps {
  user: UserProfile;
  transactions: Transaction[];
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  user,
  transactions,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'account' | 'card' | 'history'>('account');
  const [copied, setCopied] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(user.accountNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.amount.toString().includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Chi tiết Tài khoản & Thẻ</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Control */}
        <div className="p-3 bg-neutral-100 flex gap-1 mx-4 mt-3 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('account')}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'account' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Tài khoản
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'card' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Thẻ ngân hàng
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 rounded-lg transition ${
              activeTab === 'history' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500'
            }`}
          >
            Lịch sử GD
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {activeTab === 'account' && (
            <div className="space-y-4">
              {/* Primary Account Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white shadow-md space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium">Tài khoản thanh toán VND</span>
                    <h3 className="text-xl font-bold mt-0.5">{user.name}</h3>
                  </div>
                  <TechcombankLogo size={24} />
                </div>

                <div className="pt-2">
                  <span className="text-[10px] text-neutral-400">Số dư khả dụng:</span>
                  <p className="text-2xl font-extrabold tabular-numbers tracking-tight">
                    {user.balance.toLocaleString('vi-VN')} VND
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-700/80 flex justify-between items-center text-xs">
                  <span className="font-mono tracking-wider text-neutral-300">
                    {user.accountNumber}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
              </div>

              {/* Account Parameters */}
              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tên chủ tài khoản:</span>
                  <span className="font-bold text-neutral-900 uppercase">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Chi nhánh mở:</span>
                  <span className="text-neutral-800 font-medium">Hội sở chính - Techcombank Tower</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Trạng thái tài khoản:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" /> Hoạt động bình thường
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Gói hội viên:</span>
                  <span className="font-semibold text-red-600">Inspire Member</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-4">
              {/* Virtual Visa Platinum Card */}
              <div className="relative rounded-2xl p-5 bg-gradient-to-tr from-stone-900 via-neutral-800 to-stone-700 text-white shadow-xl overflow-hidden aspect-[1.58/1] flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400">
                      Techcombank Visa Platinum
                    </span>
                    <p className="text-xs text-neutral-300 mt-0.5">Thẻ ghi nợ quốc tế</p>
                  </div>
                  <TechcombankLogo size={26} />
                </div>

                {/* EMV Chip & Contactless */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-7 rounded bg-amber-300/80 border border-amber-200 shadow-inner" />
                  <span className="text-xs text-neutral-300">)))</span>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base tracking-widest font-semibold">
                      {showCardNumber ? '4507 8901 2345 6789' : '4507 •••• •••• 6789'}
                    </span>
                    <button
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      className="p-1 hover:text-amber-300 text-neutral-400 transition"
                    >
                      {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-neutral-300 mt-1">
                    <span className="font-bold uppercase">{user.name}</span>
                    <span>EXP: 09/29</span>
                  </div>
                </div>
              </div>

              {/* Card Controls */}
              <div className="space-y-2">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-neutral-900">Khóa thẻ tạm thời</p>
                    <p className="text-neutral-500 text-[11px]">Bảo vệ thẻ khi chưa có nhu cầu sử dụng</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4 accent-red-600" />
                </div>

                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-neutral-900">Thanh toán trực tuyến (E-commerce)</p>
                    <p className="text-neutral-500 text-[11px]">Cho phép quẹt thẻ trên Shopee, Grab, Apple...</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-600" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm giao dịch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-xl bg-white"
                />
              </div>

              {/* History list */}
              <div className="divide-y divide-neutral-100 border border-neutral-200/90 rounded-2xl overflow-hidden bg-white">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="p-3 flex items-center justify-between hover:bg-neutral-50">
                    <div>
                      <p className="text-xs font-semibold text-neutral-900">{tx.title}</p>
                      <p className="text-[10px] text-neutral-500">{tx.date} · {tx.time}</p>
                    </div>
                    <span
                      className={`text-xs font-bold tabular-numbers ${
                        tx.type === 'in' ? 'text-emerald-600' : 'text-neutral-900'
                      }`}
                    >
                      {tx.type === 'in' ? '+' : '-'} {tx.amount.toLocaleString('vi-VN')} đ
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
