import { Component, OnInit } from '@angular/core';
import { tablaPrincipalComponent } from '../../components/nft/tabla-principal-component/tabla-principal-component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { Nft } from '../../models/nft';
import { GraphicComponent } from '../../components/nft/Estadisticas/grafica_circular/graphic-component';
import { UsuarioAcComponent } from '../../components/nft/Estadisticas/usuarios_activos/usuario_ac-component';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  imports: [NftHeaderComponent, tablaPrincipalComponent, GraphicComponent, UsuarioAcComponent ],
})
export class NftComponent implements OnInit {
  nft: Array<Nft>;

  constructor() {
    this.nft = [
      {
        id: 34356771,
        empresa: 'Corporativo Grupo Magno',
        servicio: 'Control de acceso',
        vendedor: 'Lucas Zamora',
        precio: 234.88,
        Fecha_de_asignacion: '22-02-2021',
        concluido: '24-02-2021',
        estado: 'Finalizado', //asignado //finalizado
      },
      {
        id: 34356772,
        empresa: 'Instituto Césare',
        servicio: 'Sistema de alarmas',
        estado: 'Pendiente', //asignado //finalizado
      },
      {
        id: 34356773,
        empresa: 'La salle Cancún',
        servicio: 'Cámaras de seguridad',
        estado: 'pendiente', //asignado //finalizado
      },
    ];
  }

  ngOnInit(): void {}
}
