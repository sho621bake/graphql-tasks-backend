import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task as TaskModel } from '../task/models/task.model';
import { TaskService } from '../task/task.service';
import { CreateTaskInput } from 'src/task/dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from 'src/task/dto/updateTask.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard)
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Task[]> {
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return await this.taskService.createTask(createTaskInput);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    return await this.taskService.updateTask(updateTaskInput);
  }

  @Mutation(() => TaskModel)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
