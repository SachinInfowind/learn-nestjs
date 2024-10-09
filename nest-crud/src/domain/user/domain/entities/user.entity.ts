import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dob: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isDeleted: boolean;
}
