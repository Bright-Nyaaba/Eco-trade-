import { User, WasteTransaction, ForumPost, Reward, WasteStatus } from '../types';

const STORAGE_KEYS = {
  USERS: 'ecotrade_users',
  TRANSACTIONS: 'ecotrade_transactions',
  POSTS: 'ecotrade_posts',
  CURRENT_USER: 'ecotrade_current_user',
};

// Mock Initial Data
const MOCK_LOCATIONS = [
  { id: '1', name: 'Accra Central Recycling', address: 'Derby Ave, Accra', coordinates: { lat: 5.556, lng: -0.205 }, types: ['Plastic', 'Paper'] },
  { id: '2', name: 'Kumasi Eco Hub', address: 'Prempeh II St, Kumasi', coordinates: { lat: 6.688, lng: -1.624 }, types: ['Plastic', 'Metal'] },
  { id: '3', name: 'Tema Waste Partners', address: 'Harbour Rd, Tema', coordinates: { lat: 5.669, lng: -0.016 }, types: ['Hard-to-recycle', 'Plastic'] },
];

const MOCK_REWARDS: Reward[] = [
  { id: 'r1', title: 'GH₵ 10 Airtime', description: 'Redeem for any network', cost: 500, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=100&h=100' },
  { id: 'r2', title: 'Eco Bag', description: 'Reusable cotton shopping bag', cost: 300, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=100&h=100' },
  { id: 'r3', title: 'GH₵ 50 Mobile Money', description: 'Direct deposit to your wallet', cost: 2000, image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=100&h=100' },
];

export const storage = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUser: (user: User) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) users[index] = user;
    else users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },
  
  getTransactions: (): WasteTransaction[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]'),
  addTransaction: (tx: WasteTransaction) => {
    const txs = storage.getTransactions();
    txs.push(tx);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
  },
  
  updateTransactionStatus: (id: string, status: WasteStatus) => {
    const txs = storage.getTransactions();
    const index = txs.findIndex(t => t.id === id);
    if (index >= 0) {
      txs[index].status = status;
      txs[index].lifecycle.push({
        status,
        timestamp: new Date().toISOString(),
        description: `Waste moved to ${status} stage.`
      });
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs));
    }
  },
  
  getPosts: (): ForumPost[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || '[]'),
  addPost: (post: ForumPost) => {
    const posts = storage.getPosts();
    posts.unshift(post);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  },
  
  getLocations: () => MOCK_LOCATIONS,
  getRewards: () => MOCK_REWARDS,
};
