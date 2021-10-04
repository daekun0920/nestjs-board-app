import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // 암묵적 선언
    constructor(private boardService: BoardsService) {}

    @Get('/')
    getAllBoards() {
        return this.boardService.getAllBoards();
    }
}
