import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ClientesService } from '../services/clientes.service';
import { CreateClienteDto } from '../dtos/input/create-cliente.dto';
import { UpdateClienteDto } from '../dtos/input/update-cliente.dto';
import { ListClienteDTO } from '../dtos/output/list-cliente.dto';
import { EstadosClientesEnum } from '../enums/estados-clientes.enum';
import { CreateContactoDto } from '../dtos/input/create-contacto.dto';
import { UpdateContactoDto } from '../dtos/input/update-contacto.dto';

@ApiTags('clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiOkResponse({ type: ListClienteDTO, isArray: true })
  @Get()
  listar(@Query('estado') estado?: EstadosClientesEnum): Promise<ListClienteDTO[]> {
    return this.clientesService.listar(estado);
  }

  @ApiOkResponse({ type: ListClienteDTO })
  @Get(':id')
  obtenerPorId(@Param('id', ParseIntPipe) id: number): Promise<ListClienteDTO> {
    return this.clientesService.obtenerPorId(id);
  }
  
  @Post(':id/contactos')
  agregarContacto(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateContactoDto) {
    return this.clientesService.agregarContacto(id, dto);
  }

  @Put('contactos/:contactoId')
  modificarContacto(@Param('contactoId', ParseIntPipe) cId: number, @Body() dto: UpdateContactoDto) {
    return this.clientesService.modificarContacto(cId, dto);
  }

  @Delete('contactos/:contactoId')
  eliminarContacto(@Param('contactoId', ParseIntPipe) cId: number) {
    return this.clientesService.eliminarContacto(cId);
  }

  @Post()
  crear(@Body() dto: CreateClienteDto): Promise<{ id: number }> {
    return this.clientesService.crear(dto);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteDto,
  ): Promise<void> {
    return this.clientesService.actualizar(id, dto);
  }
}
