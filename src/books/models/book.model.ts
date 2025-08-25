import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AuthorModel } from "src/authors/models/author.model";

interface IBook {
    id?: number;
    title: string;
    genre?: string;
    author_id: number;
}

@Table({ tableName: 'books' })
export class BookModel extends Model<IBook> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({
        type: DataType.STRING
    })
    genre: string;

    @ForeignKey(() => AuthorModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    author_id: number;

    @BelongsTo(() => AuthorModel)
    author: AuthorModel;
}