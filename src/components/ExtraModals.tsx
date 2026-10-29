import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Navigation, CheckCircle2, Headphones, ShieldAlert, Calendar } from 'lucide-react';
import { TechcombankLogo } from './TechcombankLogo';
import { NotificationItem } from '../types';

interface BranchAtmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRANCHES = [
  { name: 'Chi nhánh Hoàn Kiếm', type: 'Chi nhánh & ATM 24/7', address: '6 Quang Trung, Trần Hưng Đạo, Hoàn Kiếm, Hà Nội', distance: '0.8 km', hours: '08:00 - 17:00' },
  { name: 'Hội sở Techcombank Tower', type: 'Hội sở & ATM 24/7', address: '119 Trần Duy Hưng, Cầu Giấy, Hà Nội', distance: '2.4 km', hours: '08:00 - 17:30' },
  { name: 'Techcombank Sài Gòn', type: 'Chi nhánh & Smart ATM', address: '23 Lê Duẩn, Bến Nghé, Quận 1, TP. HCM', distance: '1.2 km', hours: '08:00 - 17:00' },
  { name: 'Techcombank Thăng Long', type: 'ATM Rút & Nộp tiền CDM 24/7', address: '18 Phạm Hùng, Mỹ Đình, Hà Nội', distance: '3.6 km', hours: 'Mở cửa 24/7' },
];

export const BranchAtmModal: React.FC<BranchAtmModalProps> = ({ isOpen, onClose }) => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Chi nhánh & ATM gần nhất</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto no-scrollbar flex-1 space-y-3">
          {BRANCHES.map((b, i) => (
            <div key={i} className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1.5 hover:bg-neutral-100/80 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">{b.name}</h4>
                  <span className="text-[10px] text-red-600 font-semibold">{b.type}</span>
                </div>
                <span className="text-xs font-bold text-neutral-600 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                  {b.distance}
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 flex items-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <span>{b.address}</span>
              </p>
              <div className="flex justify-between items-center pt-1 border-t border-neutral-200 text-[10px] text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {b.hours}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(b.address);
                    setCopiedAddress(b.name);
                    setTimeout(() => setCopiedAddress(null), 2000);
                  }}
                  className="text-red-600 font-bold hover:underline"
                >
                  {copiedAddress === b.name ? 'Đã chép địa chỉ' : 'Chỉ đường'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const HotlineModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Phone className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-neutral-900">Tổng đài hỗ trợ 24/7</h3>
          <p className="text-xs text-neutral-500 mt-1">Techcombank luôn sẵn sàng hỗ trợ bạn bất kỳ lúc nào</p>
        </div>

        <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400">Khách hàng Cá nhân (Miễn phí)</span>
            <p className="text-xl font-extrabold text-red-600 tracking-wider">1800 588 822</p>
          </div>
          <div className="pt-2 border-t border-neutral-200">
            <span className="text-[10px] uppercase font-bold text-neutral-400">Từ Nước ngoài / Quốc tế</span>
            <p className="text-sm font-bold text-neutral-900">+84 24 3944 6699</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export const NotificationsModal: React.FC<{
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
}> = ({ notifications, isOpen, onClose, onMarkAllRead }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        <div className="pt-4 pb-3 px-5 flex items-center justify-between border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <TechcombankLogo size={24} />
            <h2 className="text-sm font-bold text-neutral-900">Thông báo</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-2 flex justify-end">
          <button onClick={onMarkAllRead} className="text-xs text-red-600 font-semibold hover:underline">
            Đánh dấu đã đọc tất cả
          </button>
        </div>

        <div className="p-5 pt-1 overflow-y-auto no-scrollbar flex-1 space-y-2.5">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-2xl border transition ${
                n.isRead ? 'bg-white border-neutral-200' : 'bg-red-50/40 border-red-200/80 shadow-xs'
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className="text-xs font-bold text-neutral-900">{n.title}</h4>
                <span className="text-[10px] text-neutral-400">{n.time}</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
