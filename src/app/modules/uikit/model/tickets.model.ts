export interface Ticket{
  id: number;
  titulo: string;
  empresa: string;
  descripcion: string;
  status: string;
  fecha_generado: string;
  fecha_asignado: string;
  fecha_atendido: string;
  fecha_resuelto: string;
  username: string;
  id_user: number;
  prioridad: string;
  categoria: string;
  observaciones: string;
}
