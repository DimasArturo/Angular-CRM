import { Component, OnInit } from '@angular/core';
import {tablaPrincipalComponent } from '../../components/nft/tabla-principal-component/tabla-principal-component';
import { NftHeaderComponent } from '../../components/nft/nft-header/nft-header.component';
import { Nft } from '../../models/nft';

@Component({
  selector: 'app-nft',
  templateUrl:'./nft.component.html',
  imports: [
    NftHeaderComponent,
    tablaPrincipalComponent,
],
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
        estado: 'Finalizado',//asignado //finalizado
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
