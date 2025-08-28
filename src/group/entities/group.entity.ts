import { Student } from 'src/student/entities/student.entity';
import { University } from 'src/university/entities/university.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => University, (university) => university.groups, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  university: University;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];
}
