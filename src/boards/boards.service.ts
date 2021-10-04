import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    // 인 메모리 데이터 베이스
    private boards: Board[] = [];

    // 메소드명: 리턴타입
    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string): Board {
        const board: Board = {
            id: uuid(),
            title, // title: title
            description, // description: description
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }
}
