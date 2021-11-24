import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllBoard(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        
        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return this.boardRepository.find();
    }

    // // 메소드명: 리턴타입
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto): Board {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title, // title: title
    //         description, // description: description
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoardDto(createBoardDto, user);
    }

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Can't find Board with id ${id}.`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        console.log('result', result);
    }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== id);
    // }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.boards.find((board) => board.id === id);
    //     board.status = status;
    //     return board;
    // }
}
