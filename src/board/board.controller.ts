import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ){
        this.boardService = boardService;
    }
    // controller에 service를 주입함. 종속성을 주입하기 위해서는 class의 constructor를 통해 주입해야함.
    // boardService를 Injectable()을 사용하면 별도의 작업 없이 클래스 내부에서 this로 접근해 사용할 수 있다.
    // nestjs는 constructor-based injection(생성자 기반 주입)이다.
    // 특정상황에서는 property-based injection(속성 기반 주입)이 사용될 수 있다.

    @Post()
    mapper(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardService.mapper(createBoardDto);
    }

    //게시글 생성
    @Post()
    async save(@Body() board: Board): Promise<string> {
        await this.boardService.save(board);
        return Object.assign({
            data: { ...board },
            statusCode: 201,
            message: 'creation success'
        });
    }

    //게시글 조회
    @Get('list')
    async getBoardRequestList(): Promise<Board[]> {
        const getList = await this.boardService.getBoardRequestList();
        return Object.assign({
            data: getList,
            statusCode: 200,
            message: 'loading success'
        });
    }

    //특정 작성자 조회
    @Get('list/:writer')
    async getBoardRequestListByWriter(@Param('writer') writer: string): Promise<Board[]> {
        const getWriterList = await this.boardService.getBoardRequestListByWriter(writer);
        return Object.assign({
            data: getWriterList,
            statusCode: 200,
            message: `loading successss`
        })
    }
    
    //게시글 수정
    @Put(':id')
    async update(@Param('id') id: number, @Body() update: UpdateBoardDto) {
        const updateWriter = await this.boardService.update(id, update); 
        return Object.assign({
            data: updateWriter,
            message: `updated`
        })
    }
    
    //게시글 삭제
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<string> {
        await this.boardService.delete(id);
        return Object.assign({
            message: 'delete success'
        })
    }
}
