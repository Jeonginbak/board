import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { Connection } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "jeongin",
      "password": "1234",
      "database": "nest",
      "entities": ['dist/**/*.entity{.ts,.js}'],
      "synchronize": true
    }), 
    BoardModule
]
})
export class AppModule {
    constructor(private connection: Connection) {}
}

