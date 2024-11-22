import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './tasks.entity';
@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column({
    type: 'enum',
    enum: ['email', 'push', 'sms', 'popup'],
  })
  type: 'email' | 'push' | 'sms' | 'popup';

  @Column({ type: 'text', nullable: true })
  message: string;
}