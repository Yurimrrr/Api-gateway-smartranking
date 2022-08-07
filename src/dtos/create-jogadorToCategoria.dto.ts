import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateJogadorToCategoria {
  @IsString()
  @IsNotEmpty()
  readonly jogador_id: string;
}
