import { create } from 'zustand';
import { auth } from '../config/firebaseConfig';


const useUserStore = create((set) => ({
  user: {
    name: auth.currentUser?.displayName,
    image: auth.currentUser?.photoURL,
    email: auth.currentUser?.email,
    role: 'User',
    phone: auth.currentUser?.phoneNumber,
  },
  setUser: (newUser) => set({ user: newUser }),
  updateUser: (key, value) =>
    set((state) => ({ user: { ...state.user, [key]: value } })),
  resetUser: () =>
    set({
      user: {
        name: '',
        image: '',
        email: '',
        role: '',
        phone: '',
      },
    }),
}));

export default useUserStore;
