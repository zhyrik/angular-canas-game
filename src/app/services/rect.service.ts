import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RectService {

  constructor() { }

  // draw rectangle, default color fff;
  rect(ctx: any, left: number, top: number, right: number, down: number, color?: any) {
    const fill = color || '#fff';
    ctx.fillStyle = fill;
    ctx.fillRect(left, top, right, down);
  }
}
