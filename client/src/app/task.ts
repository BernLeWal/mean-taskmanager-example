export interface Task {
    name: string;
    category: string;
    state: 'open' | 'busy' | 'done';
    _id?: string;
  }