import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItreeNode, Itree } from '../interfaces';
import { nodeType } from '../enums';

@Injectable()
export class MainService {
  private readonly _jsonPath = 'assets/data.json';
  private _counter = 0;
  openFolders: any = {};

  @Output() treeChange = new EventEmitter<void>();

  constructor(
    private http: HttpClient
  ) { }

  // метод инициализации json-объекта
  private _initTree(data: ItreeNode[]): ItreeNode[] {
    return data
      .sort(this.sortByName)
      .map((element: ItreeNode) => {
        element.id = ++this._counter;
        if (element.children) {
          element.filesCount = element.children.filter(node => node.type === nodeType.File).length;
          this._initTree(element.children);
        }
        return element;
      });
  }

  // метод загрузки json-файла
  private _loadTreeData(): Promise<Itree> {
    return this.http.get(this._jsonPath).toPromise() as Promise<Itree>;
  }

  // метод сортировки по имени с параметром направления сортировки
  sortByName(a: ItreeNode, b: ItreeNode, isAscending: boolean = true) {
    if (a.type === nodeType.Folder && b.type === nodeType.Folder || a.type === nodeType.File && b.type === nodeType.File) {
      let name1: string;
      let name2: string;
      if (isAscending) {
        name1 = a.name;
        name2 = b.name;
      } else {
        name1 = b.name;
        name2 = a.name;
      }

      const comparison = name1.localeCompare(name2);

      if (comparison === 0) {
        return name1.localeCompare(name2);
      }

      return comparison;
    } else if (a.type === nodeType.File && b.type === nodeType.Folder) {
      return 1;
    } else if (a.type === nodeType.Folder && b.type === nodeType.File) {
      return -1;
    }

  }

  // метод получения проинициализированного дерева файлов
  getTree(): Promise<ItreeNode[]> {
    const data = this._loadTreeData()
      .then((result: Itree) => result.tree)
      .then(res => this._initTree(res));

    return data;
  }

  // метод раскрытия/сворачивания папки
  toggleFolder(id: number) {
    /* id разворачиваемых папок записываются в качестве полей в объект с целью оптимизации, 
    поскольку при использовании массива было бы необходимо при каждом сворачивании / разворачивании проходить поиском 
    по всему массиву для обнаружения требуемого
    */
    if (!(id in this.openFolders)) {
      this.openFolders[id] = null;
    } else {
      delete this.openFolders[id];
    }
    this.treeChange.emit();
  }
}



