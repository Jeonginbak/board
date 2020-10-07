import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity("board")
export class Board {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 10, unique: true })
    writer: string;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "varchar", length: 1000 })
    text: string;

    @CreateDateColumn()
    date
    
}