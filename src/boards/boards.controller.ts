import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // 암묵적 선언
    constructor(private boardService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string
    ): Board {
        return this.boardService.createBoard(title, description);
    }
}
