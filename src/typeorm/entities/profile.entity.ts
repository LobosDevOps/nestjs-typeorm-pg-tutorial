import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', {
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column('character varying', {
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column('integer', {
    nullable: false,
  })
  age: number;

  @Column('character varying', {
    nullable: false,
    default: '',
  })
  dob: string;

  @Column({
    default: new Date(),
  })
  createdAt: Date;
}
