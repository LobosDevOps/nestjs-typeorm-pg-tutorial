import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    nullable: false,
    default: '',
  })
  title: string;

  @Column('character varying', {
    nullable: true,
    default: '',
  })
  description: string;

  @Column({
    default: new Date(),
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
