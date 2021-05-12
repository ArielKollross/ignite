import { v4 as uuidV4 } from 'uuid';

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  // this a method is call when class is instantiated
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
