import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MovimentoFiltroComponent } from './filtro/movimento-filtro.component';
import { MovimentoFormularioComponent } from './formulario/movimento-formulario.component';

@Component({
  selector: 'app-movimento',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSortModule,
    MovimentoFiltroComponent,
    MatDialogModule,
  ],
  templateUrl: './movimento.component.html',
  styleUrl: './movimento.component.scss'
})
export class MovimentoComponent implements OnInit {

  private httpClient = inject(HttpClient)
  private dialog = inject(MatDialog)

  colunas = ["id", "nome", "acoes"]
  tabela = new MovimentoTabela()

  ngOnInit(): void {
    this.filtrar()
  }

  filtrar() {
    this.httpClient.get<MovimentoTabela>(`/api/movimento`, {
      params: JSON.parse(JSON.stringify(this.tabela.filter)),
    }).subscribe({
      next: tabela => {
        this.tabela = tabela
      },
      error: error => {
        alert(JSON.stringify(error.message))
      }
    })
  }

  changePage(event: PageEvent) {
    this.tabela.filter.page = event.pageIndex + 1
    this.filtrar()
  }

  changeSort(sort: Sort) {
    this.tabela.filter.order = sort.active || "id"
    this.tabela.filter.direction = sort.direction?.toUpperCase() || "ASC"
    this.filtrar()
  }

  getPages() {
    return Math.ceil(this.tabela.count / this.tabela.filter.size)
  }

  inserir() {
    const dialogRef = this.dialog.open(MovimentoFormularioComponent, { disableClose: true })
    const component = dialogRef.componentInstance
    component.id = undefined
    component.obter()
    component.idChange.subscribe(x => {
      dialogRef.close()
      this.filtrar()
    })
  }

  editar(id: number) {
    const dialogRef = this.dialog.open(MovimentoFormularioComponent, { disableClose: true })
    const component = dialogRef.componentInstance
    component.id = id
    component.obter()
    component.idChange.subscribe(x => {
      dialogRef.close()
      this.filtrar()
    })
  }

  deletar(id: number) {
    this.httpClient.delete(`/api/movimento/${id}`).subscribe({
      next: () => {
        this.filtrar()
      },
      error: error => {
        alert(JSON.stringify(error.message))
      }
    })
  }

}

export class MovimentoFiltro {
  page = 1
  size = 12
  order = "nome"
  direction = "ASC"
  id?: number
  nome?: string
}

class MovimentoItem {
  id!: number
  nome!: string
}

class MovimentoTabela {
  items = new Array<MovimentoItem>()
  count = 0
  filter = new MovimentoFiltro()
}