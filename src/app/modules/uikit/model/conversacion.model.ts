export interface Conversacion {
id_conversacion: number;
fecha_inicio: string;
estado_conversacion: string;
id_resultado_conver: number;
resultado_conversacion: string;
mensajes: [
  // {
  //   id_mensaje: number;
  //   id_conversacion: number;
  //   fecha_mensaje: string;
  //   mensaje: string;
  //   id_usuario: number;
  //   nombre_usuario: string;
  //   avatar_usuario: string;
  // },
];
}
