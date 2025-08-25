import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    genre?: string;

    @IsNumber()
    @IsNotEmpty()
    author_id: number;
}
