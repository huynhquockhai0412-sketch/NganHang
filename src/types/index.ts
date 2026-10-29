export interface UserProfile {
  name: string;
  accountNumber: string;
  avatarText: string;
  tier: string;
  phone: string;
  pin: string; // default '123456'
  balance: number;
  points: number;
  isBalanceHidden: boolean;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'in' | 'out';
  date: string;
  time: string;
  category: 'transfer' | 'shopping' | 'bill' | 'savings' | 'reward';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'balance' | 'promo' | 'security';
}
