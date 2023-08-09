import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from './book.module';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRoot({
          driver: ApolloDriver,
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.grapgql'),
          definitions: {
            path: join(process.cwd(), 'src/graphql.ts'),
          },
         // typePaths:['./**/*.graphql'],
        }),
        BookModule
      ],
      controllers:[],
      providers:[],
})
export class AppModule {}
