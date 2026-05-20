import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cliente } from './entities/cliente.entity';
import { Proyecto } from './entities/proyecto.entity';
import { Tarea } from './entities/tarea.entity';
import { AsignacionProyecto } from './entities/asignacion-proyecto.entity';
import { Usuario } from '../auth/entities/usuario.entity';
import { ClientesController } from './controllers/clientes.controller';
import { AsignacionesController } from './controllers/asignaciones.controller';
import { ProyectosController } from './controllers/proyectos.controller'; 
import { ClientesService } from './services/clientes.service';
import { AsignacionesService } from './services/asignaciones.service';
import { ProyectosService } from './services/proyectos.service';
import { StatsService } from './services/stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Proyecto, Tarea, AsignacionProyecto, Usuario]), AuthModule],
  controllers: [ClientesController, AsignacionesController, StatsController, ProyectosController],
  providers: [ClientesService, AsignacionesService, StatsService, ProyectosService],
})
export class GestionModule {}
