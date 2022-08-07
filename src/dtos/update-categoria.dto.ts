import { PartialType } from '@nestjs/mapped-types';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}

interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}
