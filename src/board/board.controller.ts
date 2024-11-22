import { Controller } from '@nestjs/common';

import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { MiniBoard } from './miniBoard.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(
    @Body() body: { name: string; description: string; ownerId: string },
  ): Promise<Board> {
    return await this.boardService.createBoard(body.name, body.description, body.ownerId);
  }

  @Get()
  async findAllBoards(): Promise<Board[]> {
    return await this.boardService.findAllBoards();
  }

  @Get(':id')
  async findBoardById(@Param('id') id: string): Promise<Board | null> {
    return await this.boardService.findBoardById(id);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    await this.boardService.deleteBoard(id);
  }


  @Post(':boardId/mini-boards')
  async createMiniBoard(
    @Param('boardId') boardId: string,
    @Body() body: { name: string; description: string },
  ): Promise<MiniBoard> {
    return await this.boardService.createMiniBoard(body.name, body.description, boardId);
  }

  @Get(':boardId/mini-boards')
  async findMiniBoards(@Param('boardId') boardId: string): Promise<MiniBoard[]> {
    return await this.boardService.findMiniBoardsByBoardId(boardId);
  }
}