import { PadleService } from './padle.service';
import { AlianService } from './alian.service';
import { RectService } from './rect.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BollService {

  constructor(
    private rect: RectService,
    private aliens: AlianService,
    private padle: PadleService
  ) { }

  interval = null;
  top = 150;
  left = 200;
  speadCol = -4;
  speadRow = 4;
  size = 5;

  // changeing direction boll vectors
  rowVector() {
    this.speadRow = this.speadRow * (-1);
  }
  colVector() {
    this.speadCol = this.speadCol * (-1);
  }

  borderChangeVectors() {
    if (this.top < 0) {
      this.colVector();
    }
    if (this.left > 1200 || this.left < 0) {
      this.rowVector();
    }
  }

  alienChangeVectors(ctx: any, topAddSize: number, leftAddSize: number) {
    for (const alien of this.aliens.alians) {
      // check alian exist
      if (alien.random >= 1) {
        // check boll in alian roww
        if (topAddSize > alien.top && this.top < alien.bottom) {
          // check boll in alian col
          if ( leftAddSize  > alien.left && this.left < alien.right) {
            // check boll move from right
            if ( this.left > alien.right - this.size && this.speadRow < 0) {
              this.rowVector();
            } else if (this.left < alien.left + this.size && this.speadRow > 0) {
              // boll move from left
              this.rowVector();
            } else {
              this.colVector();
            }
            // sub alien level !!!
            alien.random += -1;
            // repeint aliens !!!
            this.aliens.drawAliens(ctx);
          }
        }
      }
    }
  }

  // boll main logick
  bollVector(ctx: any) {
    this.borderChangeVectors();
    const topAddSize = this.top + this.size;
    const leftAddSize = this.left + this.size;
    // check boll is heigh aliens field
    if (this.top < this.aliens.colTop + 15) {
      this.alienChangeVectors(ctx, topAddSize, leftAddSize);
    } else if (topAddSize > this.padle.padleY && topAddSize < this.padle.padleY + 10) {
      if (leftAddSize > this.padle.padleXOld && this.left < this.padle.padleXOld + 100) {
        this.speadCol = this.speadCol * (-1);
      }
    }
  }

  bollMuving(ctx: any) {
    const size = this.size;

    this.interval = setInterval(() => {
      // calculate vectors
      this.bollVector(ctx);

      // new boll position
      this.top = this.top + this.speadCol;
      this.left = this.left + this.speadRow;
      // drawing boll
      this.rect.rect(ctx, this.left - this.speadRow, this.top - this.speadCol, size, size, '#000');
      this.rect.rect(ctx, this.left, this.top, size, size);

      if (this.top > 600) {
        clearInterval(this.interval);
        alert('you louse');
      }
    }, 10);
  }
}
