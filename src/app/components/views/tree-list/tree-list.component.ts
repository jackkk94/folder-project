import { Component, OnInit, Input } from '@angular/core';
import { ItreeNode } from '../../../interfaces';
import { MainService } from '../../../services/main.service';


@Component({
  selector: 'tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.less']
})
export class TreeListComponent implements OnInit {
  @Input() treeList: ItreeNode[];
  sortIsAscending: boolean = true;
  constructor(
    private service: MainService,
  ) { }

  ngOnInit() {

  }

  sort() {
    this.sortIsAscending = !this.sortIsAscending;
    this.treeList.sort((a, b) => this.service.sortByName(a, b, this.sortIsAscending));
  }

}
