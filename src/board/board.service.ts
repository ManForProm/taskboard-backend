import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { MiniBoard } from './miniBoard.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(MiniBoard)
    private readonly miniBoardRepository: Repository<MiniBoard>,
  ) {}

  async createBoard(name: string, description: string, ownerId: string): Promise<Board> {
    const board = this.boardRepository.create({ name, description, owner: { id: ownerId } });
    return await this.boardRepository.save(board);
  }

  async findAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find({ relations: ['owner'] });
  }

  async findBoardById(id: string): Promise<Board | null> {
    return await this.boardRepository.findOne({ where: { id }, relations: ['owner'] });
  }

  async deleteBoard(id: string): Promise<void> {
    await this.boardRepository.delete(id);
  }

  async createMiniBoard(name: string, description: string, parentBoardId: string): Promise<MiniBoard> {
    const miniBoard = this.miniBoardRepository.create({ name, description, parentBoard: { id: parentBoardId } });
    return await this.miniBoardRepository.save(miniBoard);
  }

  async findMiniBoardsByBoardId(boardId: string): Promise<MiniBoard[]> {
    return await this.miniBoardRepository.find({ where: { parentBoard: { id: boardId } } });
  }
}