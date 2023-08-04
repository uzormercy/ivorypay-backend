import { Entity, Column, Unique, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Transaction } from '@app/resources/transactions/transaction.entity';
import { Wallet } from '@app/resources/wallets/wallet.entity';

@Entity()
@Unique(['id', 'email'])
export class User {
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

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction<User>[];

  @OneToOne(() => Wallet)
  wallet: Wallet;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  createdAt: string;

  @Column({ type: 'timestamptz', default: new Date().toISOString() })
  updatedAt: string;
}
