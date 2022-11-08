import { IsDateString, IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  @IsDateString()
  date: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.events)
  user: User;
}
