import React, { useState } from 'react';
import { X, Zap, Droplets, Wifi, Smartphone, GraduationCap, CheckCircle2 } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface BillPaymentModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onPaySuccess: (title: string, amount: number) => void;
}

const BILL_SERVICES = [
  { id: 'electric', name: 'Tiền điện EVN', icon: Zap, color: 'text-amber-500 bg-amber-50', defaultAmount: 485000, provider: 'Tổng Công ty Điện lực EVN' },
  { id: 'water', name: 'Tiền nước', icon: Droplets, color: 'text-blue-500 bg-blue-50', defaultAmount: 145000, provider: 'Nước sạch Hà Nội / Sawaco' },
  { id: 'internet', name: 'Internet & TV', icon: Wifi, color: 'text-indigo-500 bg-indigo-50', defaultAmount: 220000, provider: 'Viettel / FPT Telecom' },
  { id: 'mobile', name: 'Nạp ĐT trả sau', icon: Smartphone, color: 'text-emerald-500 bg-emerald-50', defaultAmount: 100000, provider: 'Mobifone / Vinaphone' },
  { id: 'tuition', name: 'Học phí', icon: GraduationCap, color: 'text-rose-500 bg-rose-50', defaultAmount: 1200000, provider: 'Đại học Quốc Gia' },
];

export const BillPaymentModal: React.FC<BillPaymentModalProps> = ({
  user,
  isOpen,
  onClose,
  onPaySuccess,
}) => {
  const [selectedService, setSelectedService] = useState(BILL_SERVICES[0]);
  const [customerCode, setCustomerCode] = useState('PD120098411');
  const [billAmount, setBillAmount] = useState(BILL_SERVICES[0].defaultAmount);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    if (billAmount > user.balance) return;
    onPaySuccess(`Thanh toán ${selectedService.name} (${customerCode})`, billAmount);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Thanh toán hóa đơn</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-4">
          {/* Services Grid */}
          <div>
            <span className="text-xs font-medium text-neutral-700 block mb-2">Chọn loại dịch vụ:</span>
            <div className="grid grid-cols-3 gap-2">
              {BILL_SERVICES.map((s) => {
                const Icon = s.icon;
                const isSelected = selectedService.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedService(s);
                      setBillAmount(s.defaultAmount);
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition ${
                      isSelected
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${s.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold leading-tight">{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form details */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Nhà cung cấp:
              </label>
              <input
                type="text"
                disabled
                value={selectedService.provider}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50 text-xs font-medium text-neutral-800"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Mã khách hàng / Số hợp đồng:
              </label>
              <input
                type="text"
                value={customerCode}
                onChange={(e) => setCustomerCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono font-bold text-neutral-900 bg-white focus:border-red-600 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-700 block mb-1">
                Số tiền thanh toán:
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 bg-white focus:border-red-600 outline-none tabular-numbers"
                />
                <span className="absolute right-3.5 top-3 text-xs font-bold text-neutral-500">
                  VND
                </span>
              </div>
            </div>
          </div>

          {/* Account balance note */}
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs flex justify-between items-center">
            <span className="text-neutral-500">Số dư khả dụng:</span>
            <span className="font-bold text-neutral-900 tabular-numbers">
              {user.balance.toLocaleString('vi-VN')} đ
            </span>
          </div>

          {isSuccess ? (
            <div className="p-3.5 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thanh toán hóa đơn thành công!</span>
            </div>
          ) : (
            <button
              onClick={handlePay}
              disabled={billAmount <= 0 || billAmount > user.balance}
              className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-xs hover:bg-neutral-800 disabled:opacity-40 transition cursor-pointer"
            >
              Xác nhận thanh toán ({billAmount.toLocaleString('vi-VN')} đ)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
