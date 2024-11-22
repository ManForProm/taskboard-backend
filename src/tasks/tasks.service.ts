import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async createTask(
    title: string,
    description: string,
    status: 'todo' | 'in-progress' | 'done',
    deskId: string,
    miniDeskId: string | null,
    location: string | null,
    dueDate: Date | null,
  ): Promise<Task> {
    const task = this.taskRepository.create({ title, description, status, desk: { id: deskId }, miniDesk: miniDeskId ? { id: miniDeskId } : null, location, dueDate });
    return await this.taskRepository.save(task);
  }

  async findAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['desk', 'miniDesk'] });
  }

  async findTaskById(id: string): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id }, relations: ['desk', 'miniDesk'] });
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  // Notification
  async createNotification(taskId: string, time: Date, type: 'email' | 'push' | 'sms' | 'popup', message: string): Promise<Notification> {
    const notification = this.notificationRepository.create({ task: { id: taskId }, time, type, message });
    return await this.notificationRepository.save(notification);
  }

  async findNotificationsByTaskId(taskId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({ where: { task: { id: taskId } } });
  }

  async deleteNotification(id: string): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
