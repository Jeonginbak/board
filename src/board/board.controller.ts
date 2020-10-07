import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {
        this.boardService = boardService;
    }

    
    @Post()
    create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.create(createBoardDto);
    }

    //게시글 생성
    @Post()
    async createBoard(@Body() board: Board): Promise<string> {
        await this.boardService.createBoard(board);
        return Object.assign({
            data: { ...board },
            statusCode: 201,
            message: 'creation success'
        });
    }

    //게시글 조회
    @Get('load')
    async loadBoard(): Promise<Board[]> {
        const roadList = await this.boardService.loadBoard();
        return Object.assign({
            data: roadList,
            statusCode: 200,
            message: 'loading success'
        });
    }

    //게시글 수정

    //게시글 삭제
    @Delete(':id')
    async removeBoard(@Param('id') id: string): Promise<string> {
        await this.boardService.removeBoard(id);
        return Object.assign({
            data: { },
            statusCode: 201,
            message: 'delete success'
        })
    }
}
