import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    providers: [BoardService],
    controllers: [BoardController],
})
// module에 providers(service)와 controller(customer)를 등록하는 이유는 
// 의존성 주입을 위해서 nest에 등록해야 하기 때문.
export class BoardModule {}
