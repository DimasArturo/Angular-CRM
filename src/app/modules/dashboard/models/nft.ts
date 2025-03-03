export interface Nft {
  id: number;
  empresa: string;
  servicio: string;
  Fecha_de_asignacion?: string;
  concluido?: string;
  precio?: number;
  vendedor?: string | undefined;
  avatar?: string;
  estado: string;
}
