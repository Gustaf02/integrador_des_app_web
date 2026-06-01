import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoContacto } from '../../entities/contacto.entity';

export class UpdateContactoDto {
  @ApiPropertyOptional({ enum: TipoContacto })
  @IsEnum(TipoContacto)
  @IsOptional()
  tipo?: TipoContacto;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  valor?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  observacion?: string;
}