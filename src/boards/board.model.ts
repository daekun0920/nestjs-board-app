export interface Board { // interface 는 타입만 체크, class는 인스턴스화도 가능
    id: string;
    title: string;
    description: string;
    status: BoardStatus
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}