import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ItreeNode } from '../../../interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit, OnDestroy {
  data: ItreeNode[] = [];

  constructor(
    private service: MainService,
  ) { }

  ngOnInit() {
    this.service.getTree()
    .then((result: ItreeNode[]) => {
      this.data = result;
    })
    .catch(e => alert(`ошибка: ${e.message}`));
  }

  ngOnDestroy() { }

}
