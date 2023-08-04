import { Entity, Column, Unique } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
@Unique(['id', 'email'])
export class Admin {
  @Column({ primary: true, type: 'uuid', default: uuid() })
  id: string;

  @Column({ nullable: true, type: 'varchar' })
  firstname: string;

  @Column({ nullable: true, type: 'varchar' })
  lastname: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  updatedAt: string;
}
