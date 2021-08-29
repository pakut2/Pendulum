import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PublicFile } from "../../files/entities/publicFile.entity";
import { Exclude } from "class-transformer";
import { Role } from "./role.enum";
import { Post } from "../../posts/entities/post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: PublicFile;

  @Column({ default: Role.User })
  public role?: Role;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}
