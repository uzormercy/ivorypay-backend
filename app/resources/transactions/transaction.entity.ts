import { Entity, Column, Unique, JoinColumn, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '@app/resources/users/user.entity';
import { TransactionTypes } from '@app/resources/transactions/transaction.types';
import { generateRandomDigits } from '@app/utils/helpers';

@Entity()
@Unique(['id'])
export class Transaction<User> {
  @Column({ primary: true, type: 'uuid', default: uuid() })
  id: string;

  @Column({ nullable: true, type: 'float', default: 0.0 })
  amount: number;

  @JoinColumn()
  @ManyToOne(() => User, user => user.transactions)
  user: User;

  @Column({ nullable: false, type: 'enum', enum: TransactionTypes, default: TransactionTypes.UNKNOWN })
  type: string;

  @Column({ type: 'float' })
  previousBalance: number;

  @Column({ nullable: false, type: 'varchar', default: generateRandomDigits(8) })
  reference: string;

  @Column({ nullable: true, type: 'varchar' })
  recipient: string;

  @Column({ nullable: true, type: 'varchar' })
  localAccountNumber: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  updatedAt: string;
}
