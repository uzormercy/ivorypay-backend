import { Entity, Column, Unique, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '@app/resources/users/user.entity';

@Entity()
@Unique(['id'])
export class Wallet {
  @Column({ primary: true, type: 'uuid', default: uuid() })
  id: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ nullable: true, type: 'float', default: 0.0 })
  balance: number;

  @Column({ nullable: false, type: 'varchar' })
  accountNumber: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  updatedAt: string;
}
