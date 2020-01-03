import { Injectable } from '@angular/core';
import { RectService } from './rect.service';

@Injectable({
  providedIn: 'root'
})
export class PadleService {

  constructor(
    private rect: RectService
  ) { }

  // padle positions
  public padleXOld = 0;
  public padleY = 550;

  drawPadle(event: any, ctx: any) {
    const X = event.layerX - 50;
    this.rect.rect(ctx, this.padleXOld, this.padleY, 100, 10, '#000');
    this.padleXOld = X;
    this.rect.rect(ctx, X, this.padleY, 100, 10);
  }
}
