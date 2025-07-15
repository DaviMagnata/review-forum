import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from 'typeorm'

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id!: Number

    @Column()
    name: string

    @Column()
    description!: string

    @Column()
    rating?: Number

    @Column()
    reviews_today?: Number

    @CreateDateColumn()
    created_at!: Date

    @Column("text", { array: true, nullable: true })
    tags?: string[];


  constructor(name: string, description: string, rating: Number,reviews_today: Number, tags: string[]) {
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.reviews_today = reviews_today;
    this.tags = tags;
  }

}