import { create } from "zustand";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

type Todo = {
  id: number;
  title: string;
  description: string;
};

type TodoStore = {
  todo: Todo[];
  done: Todo[];
  db: any;
  handleSave: (form: Todo, db: any) => Promise<void>;
  handleDelete: (key: number, item:Todo, db: any) => Promise<void>;
  handleDone: (item:Todo, key: number, db: any) => Promise<void>;
  handleUndone: (item:Todo, key: number, db:any) => Promise<void>;
  handleDeleteDone: (item:Todo, key: number, db:any) => Promise<void>;
  importDb: () => Promise<void>;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todo: [],
  done: [],
  db: null,
  handleSave: async(form: Todo, db: any) => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('INSERT INTO todo(title, description, done) VALUES (?,?,?);', [form.title, form.description, 0]);
      const id = await tx.executeSqlAsync('SELECT MAX(id) from todo;');
      form.id = id.rows[0]['MAX(id)'];
    });
    set((state) => ({
      todo: [...state.todo, form], // Adding a new todo, so create a new array
      done: state.done, // No change to undone array
    }));
  },

  handleDelete: async(key: number, item: Todo, db: any) => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('DELETE FROM todo where id = ?', [item.id]);
    });
    set((state) => ({
      todo: state.todo.filter((_, index) => index !== key), // Filter out the deleted todo
      done: state.done, // No change to undone array
    }));
  },
  handleDone: async(item:Todo, key:number, db:any) => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('UPDATE todo set done = 1 where id = ?', [item.id]);
    });
    set((state) => ({
      todo: state.todo.filter((_, index) => index !== key),
      done: [...state.done, item],
    }));
  },
  handleUndone: async(item:Todo, key:number, db:any) => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('UPDATE todo set done = 0 where id = ?', [item.id]);
    });
    set((state) => ({
      done: state.done.filter((_, index) => index !== key),
      todo: [...state.todo, item],
    }));
  },
  handleDeleteDone: async(item:Todo, key: number, db: any) => {
    await db.transactionAsync(async tx => {
      const result = await tx.executeSqlAsync('DELETE FROM todo where id = ?', [item.id]);
    });
    set((state) => ({
      done: state.done.filter((_, index) => index !== key), // Filter out the deleted todo
      todo: state.todo, // No change to undone array
    }));
  },
  importDb: async() =>{
    const db = SQLite.openDatabase("todo.db");
    await db.execAsync(
    [
      {
        sql: "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, done INTEGER);",
        args: [],
      },
    ],
    false,
  );
  let todos: Todo[] = [];
  let dones: Todo[] =[];
  await db.transactionAsync(async tx => {
    const result = await tx.executeSqlAsync('SELECT * FROM todo');
      for (const row of result.rows) {
        if(row.done == 0){
          const todotemp: Todo = {
            id: row.id,
            title: row.title,
            description: row.description
          };
          todos.push(todotemp);
        }
        else{
          const todotemp: Todo = {
            id: row.id,
            title: row.title,
            description: row.description
          };
          dones.push(todotemp);
        }
      }
  });
  set((state) =>({
    db: db,
    todo: todos,
    done: dones,
  }));
  },
}));

