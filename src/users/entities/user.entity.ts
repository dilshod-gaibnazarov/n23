import { ObjectType, Field, Int } from '@nestjs/graphql';
import { v4 } from 'uuid';

@ObjectType()
export class User {
  @Field(()=>String, {defaultValue: v4()})
  id?: string;

  @Field(() => String)
  fullName?: string;

  @Field(() => Int)
  age?: number;

  @Field(() => String)
  email?: string;
}
