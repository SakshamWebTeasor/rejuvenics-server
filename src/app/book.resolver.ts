import {Query , Resolver } from '@nestjs/graphql';
import { Book } from './book.schema';
import { Book as BookModel } from '../graphql';

@Resolver((of)=> Book)
export class BookResolver{
@Query((returns)=>[Book],{name:"books"})
    getAllBooks(){
        let arr: BookModel[] = [
            {id:1, title: "Math", price:500},
            {id:2, title: "Science", price:900},
            {id:2, title: "SST", price:1200},
        ];
        return arr;
    }
}