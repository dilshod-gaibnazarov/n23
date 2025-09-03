import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsStrongPassword, Min } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({
        type: 'string',
        description: 'Username for admin',
        example: 'eshmat1'
    })
    @Min(5)
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: 'string',
        description: 'Password for admin',
        example: 'Eshmat123!'
    })
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
