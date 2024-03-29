import { create, SetState } from "zustand";

type Todo = {
  title: string;
  description: string;
};

type TodoStore = {
  todo: Todo[];
  done: Todo[];
  handleSave: (form: Todo) => void;
  handleDelete: (key: number) => void;
  handleDone: (item:Todo, key: number) => void;
  handleUndone: (item:Todo, key: number) => void;
  handleDeleteDone: (key: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todo: [],
  done: [],
  handleSave: (form: Todo) => {
    set((state) => ({
      todo: [...state.todo, form], // Adding a new todo, so create a new array
      done: state.done, // No change to undone array
    }));
  },
  handleDelete: (key: number) => {
    set((state) => ({
      todo: state.todo.filter((_, index) => index !== key), // Filter out the deleted todo
      done: state.done, // No change to undone array
    }));
  },
  handleDone: (item:Todo, key:number) => {
    set((state) => ({
      todo: state.todo.filter((_, index) => index !== key),
      done: [...state.done, item],
    }));
  },
  handleUndone: (item:Todo, key:number) => {
    set((state) => ({
      done: state.done.filter((_, index) => index !== key),
      todo: [...state.todo, item],
    }));
  },
  handleDeleteDone: (key: number) => {
    set((state) => ({
      done: state.done.filter((_, index) => index !== key), // Filter out the deleted todo
      todo: state.todo, // No change to undone array
    }));
  }
}));
