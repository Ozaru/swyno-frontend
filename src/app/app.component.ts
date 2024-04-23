import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatRippleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  colunas: string[] = ["id", "nome", "acoes"]
  movimentos: Movimento[] = []

  ngOnInit(): void {
    this.movimentos = Array.from({length: 50}, (_, index) => {
      return {
        id: index + 1,
        nome: `movimento ${index + 1}`
      }
    })
  }

  inserir() {
    const movimento = new Movimento()
    let maiorId = 1
    this.movimentos.forEach(x => {
      maiorId = x.id > maiorId ? x.id : maiorId
    })
    movimento.id = maiorId + 1
    const nome = prompt("Digite o nome:", `movimento ${movimento.id}`)
    if(!nome) {
      return
    }
    movimento.nome = nome
    this.movimentos = [...this.movimentos, movimento]
  }

  editar(id: number) {
    const movimento = this.movimentos.find(x => x.id == id)
    if(!movimento) {
      return
    }
    const nome = prompt("Digite o nome:", movimento?.nome)
    if(!nome) {
      return
    }
    movimento.nome = nome
  }

  deletar(id: number) {
    this.movimentos = this.movimentos.filter(x => x.id != id)
  }

}

class Movimento {
  id!: number
  nome!: string
}