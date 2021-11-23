import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    // 암묵적 선언
    constructor(private boardService: BoardsService) {}

    @Get('/')
    getAllBoard(): Promise<Board[]> {
        return this.boardService.getAllBoard();
    }
    
    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoard: CreateBoardDto,
    @GetUser() user: User): Promise<Board> {
        return this.boardService.createBoard(createBoard, user);
    }

    @Get("/:id")
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardService.getBoardById(id);;
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): void {
        this.boardService.deleteBoard(id);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardService.updateBoardStatus(id, status); 
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardService.updateBoardStatus(id, status);
    // }
}
