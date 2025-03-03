import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';

@Component({
  selector: '[app-tabla-principal]',
  templateUrl: './tabla-principal-component.html',
})
export class tablaPrincipalComponent implements OnInit {
  @Input() nft: any;

  constructor() {}

  ngOnInit(): void {}
}
