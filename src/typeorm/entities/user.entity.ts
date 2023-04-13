import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    unique: true,
    nullable: false,
    default: '',
  })
  username: string;

  @Column('character varying', {
    nullable: false,
    default: '',
  })
  password: string;

  @Column('character varying', {
    nullable: true,
    default: '',
  })
  email: string;

  @Column({
    default: new Date(),
  })
  createdAt: Date;

  @Column('character varying', {
    nullable: true,
    default: '',
  })
  authStrategy: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
