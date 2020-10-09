import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
//@Injectable decorator는 metadata를 붙여준다.
//nest에 boardService가 nestProvider임을 알림.
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>
    ) {
        this.boardRepository = boardRepository;
    }
    // nest에서 지원하는 repository로 연결 이 로직에서는 interface가 없어도 됨.

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
    async getBoardRequestList(): Promise<Board[]> {
        const boardList = await this.boardRepository.find()
        if (boardList === []) {
            const error = { board: 'Empty List' }
            throw new HttpException({ error }, 404)
        }
        return boardList
    }

    //특정 작성자 게시글 조회
    async getBoardRequestListByWriter(writer: string): Promise<Board[]> {
        const writerList = this.boardRepository.findOne(writer)
        if (!writerList) {
            const error = { writer: `${writer} is Do Not Exists` }
            throw new HttpException({ error }, 404)
        }
        return await this.boardRepository.find({ writer: writer })
    }

    //게시글 수정
    async update(id: number, update: UpdateBoardDto): Promise<void> {
        await this.boardRepository.update(id, { 
            title: update.title, 
            text: update.text 
        })
    }

    //게시글 삭제
    async delete(id: number): Promise<void> {
        const isExist = await this.boardRepository.findOne(id);
        if (!isExist) {
            const error = { id: 'Do Not Exists' }
            throw new HttpException({ error }, 404)
        } else {
        await this.boardRepository.delete(id);
        }
    }
}
