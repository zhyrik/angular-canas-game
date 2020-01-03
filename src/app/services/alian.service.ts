import { RectService } from './rect.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlianService {

  constructor(private rect: RectService) { }

  public alians = [];
  rowLeft = 20; // left start position
  public colTop = 20; // top start position
  gap = 10;
  width = 60;
  alienColors = [
    '#000',
    '#fff',
    '#f00',
    '#ff0',
    '#00f',
    '#0f0'
  ];

  generateAliens(countAliens: number, widthField: number) {
    for (let i = 0; i < countAliens; i++) {
      const random = Math.floor(Math.random() * 5 + 1);

      if (this.rowLeft > widthField - this.width - this.gap) {
        // drawing new line aliens
        this.rowLeft = 20;
        this.colTop = this.colTop + 20;
      }
      this.alians.push({
        random,
        left: this.rowLeft,
        top: this.colTop,
        right: this.rowLeft + this.width,
        bottom: this.colTop + this.gap,
      });

      // calkulate next left position
      this.rowLeft = this.rowLeft + this.width + this.gap;
    }
  }

  drawAliens(ctx: any) {
    for (const alian of this.alians) {
      let color = '#000';
      // drawing present alien
      color = this.alienColors[alian.random];
      this.rect.rect(
        ctx,
        alian.left,
        alian.top,
        this.width,
        this.gap,
        color
      );
    }
  }

}
