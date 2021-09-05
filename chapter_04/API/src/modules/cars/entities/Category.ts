import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

// entidade ("table name")
@Entity('categories')
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  // this a method is call when class is instantiated
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
