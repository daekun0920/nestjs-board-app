import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    // 인 메모리 데이터 베이스
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }
}
