import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ItreeNode } from '../../../interfaces';
import { Subscription } from 'rxjs';
import { MainService } from '../../../services/main.service';
import { nodeType } from '../../../enums';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.less']
})
export class TreeNodeComponent implements OnInit, OnDestroy {
  @Input() model: ItreeNode;
  subscription: Subscription = null;
  isOpen: boolean = false;
  folderType = nodeType.Folder;
  constructor(
    private service: MainService
  ) {
    this.subscription = this.service.treeChange.subscribe(() => {
      if (!(this.model.id in this.service.openFolders)) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    });
  }

  ngOnInit() {
    if (!(this.model.id in this.service.openFolders)) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  toggleFolder(id: number) {
    this.service.toggleFolder(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }
}
