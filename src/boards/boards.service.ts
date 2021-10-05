import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    // 인 메모리 데이터 베이스
    private boards: Board[] = [];

    // 메소드명: 리턴타입
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto): Board {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title, // title: title
            description, // description: description
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}.`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.boards.find((board) => board.id === id);
        board.status = status;
        return board;
    }
}
