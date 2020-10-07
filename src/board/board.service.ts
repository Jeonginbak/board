import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {
        this.boardRepository = boardRepository;
    }

    create(createBoardDto: CreateBoardDto): Promise<Board> {
        const board = new Board();
        board.writer = createBoardDto.writer;
        board.title = createBoardDto.title;
        board.text = createBoardDto.text;
        board.date = createBoardDto.date;

        return this.boardRepository.save(board);
    }
    //게시글 생성
    async createBoard(board: Board): Promise<void> {
        await this.boardRepository.save(board)
    }

    //게시글 조회
    loadBoard(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    //게시글수정

    //게시글 삭제
    async removeBoard(id: string): Promise<void> {
        await this.boardRepository.delete(id);
    }
}
