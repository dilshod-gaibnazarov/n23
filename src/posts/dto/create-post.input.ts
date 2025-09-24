import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
}
