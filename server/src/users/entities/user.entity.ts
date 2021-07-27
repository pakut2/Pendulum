import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import PublicFile from "../../files/entities/publicFile.entity";
import { Exclude } from "class-transformer";
import { Role } from "./role.enum";

@Entity()
class User {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  // @Column({
  //   default:
  //     "http://www.gravatar.com/avatar/6a6c19fea4a3676970167ce51f39e6ee?s=200&r=pg&d=mm",
  // })
  // public image?: string;

  // @BeforeInsert()
  // private avatar() {
  //   this.image = gravatar.url(this.email, {
  //     s: "200",
  //     r: "pg",
  //     d: "mm",
  //   });
  // }

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  public avatar?: PublicFile;

  @Column({ default: Role.User })
  public role?: Role;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;
}

export default User;
