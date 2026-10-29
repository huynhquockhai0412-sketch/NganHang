import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, Delete, Fingerprint, ShieldCheck, HelpCircle, Lock } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { UserProfile } from '../types';

interface PinLoginModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PinLoginModal: React.FC<PinLoginModalProps> = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [showForgotPin, setShowForgotPin] = useState<boolean>(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState<boolean>(false);

  // Reset PIN when modal opens
  useEffect(() => {
    if (isOpen) {
      setPin('');
      setIsError(false);
      setIsVerifying(false);
    }
  }, [isOpen]);

  const handleCompletePin = useCallback((enteredPin: string) => {
    setIsVerifying(true);
    // Allow either the user's configured PIN or standard default '123456' or any 6-digit PIN in demo mode
    setTimeout(() => {
      if (enteredPin === user.pin || enteredPin === '123456' || enteredPin.length === 6) {
        setIsVerifying(false);
        onSuccess();
      } else {
        setIsVerifying(false);
        setIsError(true);
        setPin('');
        setTimeout(() => setIsError(false), 1200);
      }
    }, 300);
  }, [user.pin, onSuccess]);

  const handleKeyPress = useCallback((digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 6) {
        handleCompletePin(nextPin);
      }
    }
  }, [pin, handleCompletePin]);

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
    setIsError(false);
  }, []);

  const handleBiometricLogin = () => {
    setIsBiometricScanning(true);
    setTimeout(() => {
      setIsBiometricScanning(false);
      onSuccess();
    }, 900);
  };

  // Keyboard event listener for desktop convenience
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyPress, handleDelete, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md h-full md:h-auto md:max-h-[92vh] md:rounded-3xl bg-white shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Top App Bar */}
        <div className="pt-8 pb-3 px-6 flex items-center justify-between border-b border-neutral-100">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-95 transition"
            aria-label="Quay lại"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <TechcombankLogo size={32} />

          <button
            onClick={() => setShowForgotPin(true)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition"
            title="Trợ giúp"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
          {/* Avatar icon */}
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-400 border-2 border-white shadow-md flex items-center justify-center text-neutral-800 font-bold text-lg">
              {user.avatarText}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-red-600 border-2 border-white flex items-center justify-center">
              <Lock className="w-3 h-3 text-white" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 tracking-tight text-center">
            {user.name}
          </h2>
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Vui lòng nhập mã PIN 6 số để đăng nhập
          </p>

          {/* Test Hint Pill */}
          <div className="mt-3 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full flex items-center gap-1.5 text-xs text-amber-800">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Mã PIN mặc định: <strong>123456</strong> (hoặc bất kỳ 6 số)</span>
          </div>

          {/* 6 PIN Indicator Dots */}
          <div
            className={`flex items-center justify-center gap-4 my-8 ${
              isError ? 'animate-bounce text-red-500' : ''
            }`}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => {
              const isFilled = index < pin.length;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    isError
                      ? 'bg-red-500 ring-4 ring-red-100 scale-110'
                      : isFilled
                      ? 'bg-red-600 ring-4 ring-red-100 scale-110'
                      : 'border-2 border-neutral-300 bg-neutral-100'
                  }`}
                />
              );
            })}
          </div>

          {/* Biometric Scanning Feedback overlay */}
          {isBiometricScanning && (
            <div className="flex items-center gap-2 text-sm text-red-600 font-medium animate-pulse mb-2">
              <Fingerprint className="w-5 h-5 animate-spin" />
              <span>Đang xác thực Face ID / Vân tay...</span>
            </div>
          )}

          {isVerifying && (
            <p className="text-xs text-neutral-500 mb-2">Đang xác thực tài khoản...</p>
          )}

          {/* Quick link: Quên mã PIN? */}
          <button
            onClick={() => setShowForgotPin(true)}
            className="text-xs font-medium text-neutral-600 hover:text-red-600 hover:underline transition mb-2"
          >
            Quên mã PIN?
          </button>
        </div>

        {/* Custom Numeric Keypad */}
        <div className="bg-neutral-50 border-t border-neutral-200/80 px-6 pt-4 pb-8 md:pb-6">
          <div className="grid grid-cols-3 gap-3 max-w-[320px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                onClick={() => handleKeyPress(digit)}
                className="h-14 rounded-2xl bg-white border border-neutral-200/90 text-2xl font-semibold text-neutral-900 shadow-xs hover:bg-neutral-100 active:bg-neutral-200 active:scale-95 transition flex items-center justify-center tabular-numbers"
              >
                {digit}
              </button>
            ))}

            {/* Biometric Face ID / Touch ID Button */}
            <button
              onClick={handleBiometricLogin}
              className="h-14 rounded-2xl bg-white/70 border border-neutral-200/90 text-neutral-700 hover:bg-neutral-100 active:scale-95 transition flex flex-col items-center justify-center gap-0.5 group"
              title="Đăng nhập bằng Face ID"
            >
              <Fingerprint className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-medium text-neutral-600">Sinh trắc học</span>
            </button>

            {/* Digit 0 */}
            <button
              onClick={() => handleKeyPress('0')}
              className="h-14 rounded-2xl bg-white border border-neutral-200/90 text-2xl font-semibold text-neutral-900 shadow-xs hover:bg-neutral-100 active:bg-neutral-200 active:scale-95 transition flex items-center justify-center tabular-numbers"
            >
              0
            </button>

            {/* Backspace Delete Button */}
            <button
              onClick={handleDelete}
              className="h-14 rounded-2xl bg-white/70 border border-neutral-200/90 text-neutral-700 hover:bg-neutral-100 active:scale-95 transition flex items-center justify-center"
              title="Xóa"
              aria-label="Xóa số"
            >
              <Delete className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>

        {/* Forgot PIN Recovery Dialog */}
        {showForgotPin && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 p-6 flex flex-col justify-between animate-in fade-in">
            <div className="pt-6">
              <h3 className="text-lg font-bold text-neutral-900">Khôi phục mã PIN</h3>
              <p className="text-sm text-neutral-600 mt-2">
                Mã xác thực OTP đã được gửi đến số điện thoại <strong>{user.phone}</strong>.
              </p>
              <div className="mt-6 p-4 bg-neutral-100 rounded-xl border border-neutral-200">
                <p className="text-xs text-neutral-500 mb-1">Mã xác thực nhanh:</p>
                <p className="text-xl font-bold tracking-widest text-neutral-900">892 410</p>
              </div>
              <p className="text-xs text-neutral-500 mt-4">
                Hoặc bạn có thể dùng mã PIN thử nghiệm <strong>123456</strong> để tiếp tục ngay.
              </p>
            </div>
            <div className="flex gap-3 pb-4">
              <button
                onClick={() => setShowForgotPin(false)}
                className="flex-1 py-3 rounded-xl border border-neutral-300 font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setShowForgotPin(false);
                  setPin('123456');
                  handleCompletePin('123456');
                }}
                className="flex-1 py-3 rounded-xl bg-black text-white font-semibold hover:bg-neutral-800"
              >
                Nhập tự động & Đăng nhập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
