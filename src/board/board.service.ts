import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {
        this.boardRepository = boardRepository;
    }

    mapper(createBoardDto: CreateBoardDto): Promise<Board> {
        const board = new Board();
        board.writer = createBoardDto.writer;
        board.title = createBoardDto.title;
        board.text = createBoardDto.text;
        board.date = createBoardDto.date;

        return this.boardRepository.save(board);
    }
    
    //게시글 생성
    async save(board: Board): Promise<void> {
        await this.boardRepository.save(board)
    }

    //게시글 조회
    getBoardRequestList(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    //특정 작성자 게시글 조회
    getBoardRequestListByWriter(writer: string): Promise<Board[]> {
        return this.boardRepository.find({ 
            writer: writer
        })
    }

    //게시글수정
    async update(id: number, update: UpdateBoardDto) {
        await this.boardRepository.update(id, { 
            title: update.title, 
            text: update.text 
        })
    }

    //게시글 삭제
    async delete(id: number): Promise<void> {
        await this.boardRepository.delete(id);
    }
}
