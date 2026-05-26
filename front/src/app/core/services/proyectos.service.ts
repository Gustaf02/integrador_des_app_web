import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface ListProyectoDTO {
    id: number;
    nombre: string;
    estado: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    fechaLimite: string | null;
    retraso: boolean;
    cliente: {
        id: number;
        nombre: string;
        cuit: string | null;
        direccion: string | null;
        estado: string;
    } | null;
}
export interface ListTareaDTO {
    id: number;
    descripcion: string;
    estado: string;
    fechaCreacion: string;
    fechaActualizacion: string;
    responsable: { id: number; nombre: string; apellido: string } | null;
}
export interface ProyectoDTO extends ListProyectoDTO {
    tareas: ListTareaDTO[];
}
export interface CreateProyectoPayload {
    nombre: string;
    estado?: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    idCliente?: number;
    fechaLimite?: string;
}
export interface UpdateProyectoPayload {
    nombre?: string;
    estado?: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    idCliente?: number;
    fechaLimite?: string;
}
@Injectable({ providedIn: 'root' })
export class ProyectosService {
    private http = inject(HttpClient);
    private readonly base = '/api/v1/proyectos';
    listar(estado?: string) {
        const params = estado ? { estado } : undefined;
        return this.http.get<ListProyectoDTO[]>(this.base, { params });
    }
    obtenerPorId(id: number) {
        return this.http.get<ProyectoDTO>(`${this.base}/${id}`);
    }
    crear(data: CreateProyectoPayload) {
        return this.http.post<{ id: number }>(this.base, data);
    }
    actualizar(id: number, data: UpdateProyectoPayload) {
        return this.http.put<void>(`${this.base}/${id}`, data);
    }
}