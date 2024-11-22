import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Notification } from './notification.entity';
import { Task } from './tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  // Работа с Task
  @Post()
  async createTask(
    @Body()
    body: {
      title: string;
      description: string;
      status: 'todo' | 'in-progress' | 'done';
      deskId: string;
      miniDeskId?: string;
      location?: string;
      dueDate?: Date;
    },
  ): Promise<Task> {
    return await this.taskService.createTask(
      body.title,
      body.description,
      body.status,
      body.deskId,
      body.miniDeskId || null,
      body.location || null,
      body.dueDate || null,
    );
  }

  @Get()
  async findAllTasks(): Promise<Task[]> {
    return await this.taskService.findAllTasks();
  }

  @Get(':id')
  async findTaskById(@Param('id') id: string): Promise<Task | null> {
    return await this.taskService.findTaskById(id);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    await this.taskService.deleteTask(id);
  }


  @Post(':taskId/notifications')
  async createNotification(
    @Param('taskId') taskId: string,
    @Body() body: { time: Date; type: 'email' | 'push' | 'sms' | 'popup'; message: string },
  ): Promise<Notification> {
    return await this.taskService.createNotification(taskId, body.time, body.type, body.message);
  }

  @Get(':taskId/notifications')
  async findNotificationsByTaskId(@Param('taskId') taskId: string): Promise<Notification[]> {
    return await this.taskService.findNotificationsByTaskId(taskId);
  }

  @Delete('notifications/:id')
  async deleteNotification(@Param('id') id: string): Promise<void> {
    await this.taskService.deleteNotification(id);
  }
}