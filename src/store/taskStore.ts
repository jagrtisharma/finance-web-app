import { create } from 'zustand';
import { iTaskStore } from '../type/task';


const useUserStore = create<iTaskStore>((set) => ({
  task: [],
  setTask: (task) => {
    set({ task });
  }
}));

export default useUserStore;
