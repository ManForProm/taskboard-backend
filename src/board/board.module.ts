import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { MiniBoard } from './miniBoard.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, MiniBoard]),
  ],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
