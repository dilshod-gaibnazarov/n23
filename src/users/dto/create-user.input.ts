import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  fullName: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  email: string;
}
