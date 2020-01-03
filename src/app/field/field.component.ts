import { PadleService } from './../services/padle.service';

import { BollService } from './../services/boll.service';
import { AlianService } from './../services/alian.service';
import { RectService } from './../services/rect.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-field',
  template: '<canvas #field></canvas>'
})
export class FieldComponent implements OnInit, AfterViewInit {

  constructor(
    private rect: RectService,
    private alian: AlianService,
    private boll: BollService,
    private padle: PadleService
  ) { }

  @ViewChild('field', {static: false}) field: ElementRef;

  width = 1200;
  height = 600;
  ctx = null;

  ngOnInit() {
  }
  start() {
    this.alian.generateAliens(40, this.width);
    this.alian.drawAliens(this.ctx);

    this.boll.bollMuving(this.ctx);
  }

  ngAfterViewInit() {
    const field = this.field.nativeElement;
    field.width = this.width;
    field.height = this.height;

    // create canvas context & peint to black;
    const ctx = field.getContext('2d');
    this.rect.rect(ctx, 0, 0, this.width, this.height, '#000');
    this.ctx = ctx;

    field.addEventListener('mousemove', (event: any) => this.padle.drawPadle(event, ctx));

    this.start();
  }

}
