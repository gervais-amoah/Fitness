import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
};

const useStore = create<State & Actions>()((set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
