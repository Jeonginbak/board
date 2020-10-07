import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
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
    listBoard(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    //특정 작성자 게시글 조회
    wirterlist(name: string): Promise<Board[]> {
        return this.boardRepository.find({ writer:name })
    }

    //게시글수정
    async updateBoard(id: number, dto: UpdateBoardDto): Promise<Board> {
        const toUpdate = await this.boardRepository.findOne(id);
        delete toUpdate.title;
        delete toUpdate.text;

        const updated = Object.assign(toUpdate, dto);
        return await this.boardRepository.save(updated);
    }

    //게시글 삭제
    async removeBoard(id: number): Promise<void> {
        await this.boardRepository.delete(id);
    }
}
