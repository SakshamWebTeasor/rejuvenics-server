import { PartialType } from '@nestjs/swagger';
import { CreateShoppingSessionDto } from './create-shopping_session.dto';

export class UpdateShoppingSessionDto extends PartialType(CreateShoppingSessionDto) {}
