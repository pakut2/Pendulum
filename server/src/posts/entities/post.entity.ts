import User from "../../users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Post {
  @PrimaryGeneratedColumn("uuid")
  public id?: string;

  @Column()
  public line: string;

  @Column()
  public direction: string;

  @Column()
  public closestStop: string;

  @Column({ nullable: true })
  public vehicleCode?: string;

  @Column({ nullable: true })
  public description?: string;

  @Column("text", { default: [], array: true })
  public likes?: string[];

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;
}

export default Post;
