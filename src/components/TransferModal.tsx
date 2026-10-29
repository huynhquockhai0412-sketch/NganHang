import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, User, Building, Check } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile, Transaction } from '../types';

interface TransferModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onTransferSuccess: (amount: number, recipientName: string, bankName: string, memo: string) => void;
}

const POPULAR_BANKS = [
  { id: 'tcb', name: 'Techcombank', code: 'TCB', short: 'Techcombank' },
  { id: 'vcb', name: 'Vietcombank', code: 'VCB', short: 'Vietcombank' },
  { id: 'mb', name: 'MB Bank', code: 'MB', short: 'MBBank' },
  { id: 'vpb', name: 'VPBank', code: 'VPB', short: 'VPBank' },
  { id: 'acb', name: 'ACB', code: 'ACB', short: 'ACB' },
  { id: 'bidv', name: 'BIDV', code: 'BIDV', short: 'BIDV' },
];

const SAVED_BENEFICIARIES = [
  { name: 'NGUYEN VAN AN', account: '1029384756', bank: 'Techcombank' },
  { name: 'TRAN THI BICH', account: '0071000987654', bank: 'Vietcombank' },
  { name: 'HOANG MINH DUC', account: '0345678912', bank: 'MB Bank' },
];

export const TransferModal: React.FC<TransferModalProps> = ({
  user,
  isOpen,
  onClose,
  onTransferSuccess,
}) => {
  const [step, setStep] = useState<'form' | 'confirm' | 'pin' | 'receipt'>('form');
  const [selectedBank, setSelectedBank] = useState<string>('Techcombank');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('LE NGOC GIAU chuyen tien');
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [txId, setTxId] = useState<string>('');

  if (!isOpen) return null;

  const numAmount = Number(amount) || 0;

  const handleSelectBeneficiary = (b: typeof SAVED_BENEFICIARIES[0]) => {
    setSelectedBank(b.bank);
    setAccountNumber(b.account);
    setRecipientName(b.name);
  };

  const handleNextToConfirm = () => {
    if (!accountNumber) {
      setErrorMsg('Vui lòng nhập số tài khoản người nhận');
      return;
    }
    if (numAmount < 10000) {
      setErrorMsg('Số tiền tối thiểu là 10,000 VND');
      return;
    }
    if (numAmount > user.balance) {
      setErrorMsg('Số dư tài khoản không đủ');
      return;
    }
    setErrorMsg('');
    const finalRecipient = recipientName || 'NGUYEN VAN PHUC (Người nhận)';
    setRecipientName(finalRecipient);
    setStep('confirm');
  };

  const handleConfirmToPin = () => {
    setPin('');
    setStep('pin');
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 6) {
        setTimeout(() => {
          const generatedTxId = 'FT' + Math.floor(100000000 + Math.random() * 900000000);
          setTxId(generatedTxId);
          onTransferSuccess(numAmount, recipientName, selectedBank, memo);
          setStep('receipt');
        }, 400);
      }
    }
  };

  const resetAndClose = () => {
    setStep('form');
    setAccountNumber('');
    setRecipientName('');
    setAmount('');
    setPin('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">
              {step === 'form' && 'Chuyển tiền nhanh 24/7'}
              {step === 'confirm' && 'Xác nhận giao dịch'}
              {step === 'pin' && 'Xác thực bảo mật'}
              {step === 'receipt' && 'Chuyển tiền thành công'}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto no-scrollbar flex-1">
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <div className="space-y-4">
              {/* Source Account info */}
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block">Tài khoản nguồn</span>
                <div className="flex justify-between items-center mt-0.5">
                  <span className="text-xs font-bold text-neutral-900">{user.accountNumber}</span>
                  <span className="text-xs font-bold text-neutral-900 tabular-numbers">
                    Khả dụng: {user.balance.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>

              {/* Saved Beneficiaries Carousel */}
              <div>
                <span className="text-xs font-medium text-neutral-600 block mb-1.5">
                  Người nhận đã lưu gần đây:
                </span>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {SAVED_BENEFICIARIES.map((b) => (
                    <button
                      key={b.account}
                      onClick={() => handleSelectBeneficiary(b)}
                      className="shrink-0 p-2.5 rounded-xl border border-neutral-200 bg-white hover:border-red-400 text-left active:scale-95 transition"
                    >
                      <p className="text-xs font-semibold text-neutral-900">{b.name}</p>
                      <p className="text-[10px] text-neutral-500">{b.bank}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Selection */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Ngân hàng thụ hưởng:
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white font-medium focus:border-red-600 outline-none"
                >
                  {POPULAR_BANKS.map((bank) => (
                    <option key={bank.id} value={bank.name}>
                      {bank.code} - {bank.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Account Number */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Số tài khoản nhận:
                </label>
                <input
                  type="text"
                  placeholder="Nhập số tài khoản hoặc số thẻ"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white font-mono focus:border-red-600 outline-none"
                />
              </div>

              {/* Recipient Name optional auto-fill */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Tên người thụ hưởng:
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên người nhận"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm bg-white uppercase font-medium focus:border-red-600 outline-none"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Số tiền chuyển (VND):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-base font-bold text-neutral-900 bg-white pr-12 focus:border-red-600 outline-none tabular-numbers"
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-bold text-neutral-500">
                    VND
                  </span>
                </div>

                {/* Quick amount chips */}
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {[100000, 200000, 500000, 1000000, 2000000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(String(val))}
                      className="px-2.5 py-1 text-[11px] font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg text-neutral-700 tabular-numbers transition"
                    >
                      +{(val / 1000).toLocaleString()}k
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount(String(user.balance))}
                    className="px-2.5 py-1 text-[11px] font-semibold bg-red-50 text-red-600 rounded-lg transition"
                  >
                    Tất cả
                  </button>
                </div>
              </div>

              {/* Memo */}
              <div>
                <label className="text-xs font-medium text-neutral-700 block mb-1">
                  Lời nhắn chuyển khoản:
                </label>
                <input
                  type="text"
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs bg-white text-neutral-800 focus:border-red-600 outline-none"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="button"
                onClick={handleNextToConfirm}
                className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-[0.98] transition cursor-pointer mt-2"
              >
                Tiếp tục
              </button>
            </div>
          )}

          {/* STEP 2: CONFIRM */}
          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="text-center py-2">
                <span className="text-xs text-neutral-500">Số tiền chuyển</span>
                <h3 className="text-2xl font-extrabold text-neutral-950 mt-1 tabular-numbers">
                  {numAmount.toLocaleString('vi-VN')} VND
                </h3>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-full">
                  Phí giao dịch: 0 VND (Miễn phí 24/7)
                </span>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ngân hàng thụ hưởng</span>
                  <span className="font-semibold text-neutral-900">{selectedBank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Số tài khoản nhận</span>
                  <span className="font-mono font-semibold text-neutral-900">{accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Người thụ hưởng</span>
                  <span className="font-bold text-neutral-900 uppercase">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Nội dung</span>
                  <span className="text-neutral-800 text-right max-w-[60%]">{memo}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-2 font-medium">
                  <span className="text-neutral-500">Tài khoản nguồn</span>
                  <span className="font-mono text-neutral-800">{user.accountNumber}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="flex-1 py-3 rounded-full border border-neutral-300 font-medium text-xs text-neutral-700 hover:bg-neutral-50"
                >
                  Quay lại sửa
                </button>
                <button
                  type="button"
                  onClick={handleConfirmToPin}
                  className="flex-1 py-3 rounded-full bg-black text-white font-semibold text-xs hover:bg-neutral-800 shadow-sm"
                >
                  Xác nhận chuyển
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 6-DIGIT PIN */}
          {step === 'pin' && (
            <div className="py-4 text-center">
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Xác thực mã PIN giao dịch</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Nhập mã PIN 6 số để xác nhận lệnh chuyển tiền {numAmount.toLocaleString('vi-VN')} đ
              </p>

              {/* PIN dots */}
              <div className="flex justify-center gap-3 my-6">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-full transition-all ${
                      i < pin.length ? 'bg-red-600 ring-2 ring-red-200' : 'border border-neutral-300 bg-neutral-100'
                    }`}
                  />
                ))}
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2 max-w-[260px] mx-auto">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handlePinInput(digit)}
                    className="h-12 rounded-xl bg-neutral-100 text-lg font-bold text-neutral-900 active:bg-neutral-200"
                  >
                    {digit}
                  </button>
                ))}
                <div />
                <button
                  onClick={() => handlePinInput('0')}
                  className="h-12 rounded-xl bg-neutral-100 text-lg font-bold text-neutral-900 active:bg-neutral-200"
                >
                  0
                </button>
                <button
                  onClick={() => setPin((p) => p.slice(0, -1))}
                  className="h-12 rounded-xl bg-neutral-100 text-xs font-semibold text-neutral-700 active:bg-neutral-200 flex items-center justify-center"
                >
                  Xóa
                </button>
              </div>

              {/* Fast test bypass */}
              <button
                onClick={() => {
                  setPin('123456');
                  setTimeout(() => {
                    const generatedTxId = 'FT' + Math.floor(100000000 + Math.random() * 900000000);
                    setTxId(generatedTxId);
                    onTransferSuccess(numAmount, recipientName, selectedBank, memo);
                    setStep('receipt');
                  }, 200);
                }}
                className="mt-4 text-xs text-red-600 font-semibold underline block mx-auto"
              >
                Xác thực nhanh (Demo)
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 'receipt' && (
            <div className="text-center py-2 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs text-emerald-600 font-bold uppercase tracking-wider">
                  Giao dịch thành công
                </span>
                <h3 className="text-2xl font-black text-neutral-950 mt-1 tabular-numbers">
                  -{numAmount.toLocaleString('vi-VN')} VND
                </h3>
                <p className="text-xs text-neutral-500 mt-1">Mã GD: {txId}</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 text-xs space-y-2.5 text-left">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Người nhận:</span>
                  <span className="font-bold text-neutral-900">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ngân hàng:</span>
                  <span className="font-semibold text-neutral-900">{selectedBank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Số tài khoản:</span>
                  <span className="font-mono font-medium text-neutral-900">{accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Thời gian:</span>
                  <span className="text-neutral-800">
                    {new Date().toLocaleTimeString('vi-VN')} - {new Date().toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Nội dung:</span>
                  <span className="text-neutral-800 text-right max-w-[60%]">{memo}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-[0.98] transition cursor-pointer"
              >
                Hoàn tất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
