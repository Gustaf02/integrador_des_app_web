import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoContacto } from '../../entities/contacto.entity';

export class CreateContactoDto {
  @ApiProperty({ enum: TipoContacto })
  @IsEnum(TipoContacto)
  @IsNotEmpty()
  tipo!: TipoContacto;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  valor!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observacion?: string;
}