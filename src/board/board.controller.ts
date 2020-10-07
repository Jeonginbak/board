import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
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
    @Get('list')
    async listBoard(): Promise<Board[]> {
        const roadList = await this.boardService.listBoard();
        return Object.assign({
            data: roadList,
            statusCode: 200,
            message: 'loading success'
        });
    }

    //특정 작성자 조회
    @Get('list/:writer')
    async writerlist(@Param('writer') name: string): Promise<Board[]> {
        const writerList = await this.boardService.wirterlist(name);
        return Object.assign({
            data: writerList,
            statusCode: 200,
            message: `loading success`
        })
    }
    

    //게시글 수정
    @Put(':id')
    async updateBoard(@Param('id') id: number, @Body('board') boardData : UpdateBoardDto) {
        return await this.boardService.updateBoard(id, boardData); 
    }
    


    //게시글 삭제
    @Delete(':id')
    async removeBoard(@Param('id') id: number): Promise<string> {
        await this.boardService.removeBoard(id);
        return Object.assign({
            message: 'delete success'
        })
    }
}
