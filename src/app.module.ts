import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { Connection } from 'typeorm';
import { Board } from './board/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "jeongin",
      "password": "1234",
      "database": "nest",
      "entities": [Board],
      // root폴더에 ormconfig.json으로 내보내서 아래와 같은 경로로 사용할 수 있다.
      // ['dist/**/*.entity{.ts,.js}'] 
      // 폴더 내에 모든 entity파일과 databases를 연결할 수 있다.
      "synchronize": true
    }), 
    BoardModule
]
})
export class AppModule {
    constructor(private connection: Connection) {}
}

