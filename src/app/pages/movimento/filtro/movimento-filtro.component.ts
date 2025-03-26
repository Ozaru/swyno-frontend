import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MovimentoFiltro } from '../movimento.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movimento-filtro',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './movimento-filtro.component.html',
  styleUrl: './movimento-filtro.component.scss',
})
export class MovimentoFiltroComponent implements OnInit {

  @Input() filtro!: MovimentoFiltro
  @Output() filtroChange = new EventEmitter<MovimentoFiltro>()

  filtroCopy = new MovimentoFiltro()

  ngOnInit(): void {
    Object.assign(this.filtroCopy, this.filtro)
  }

  confirmar() {
    this.filtroCopy.id = this.filtroCopy.id || undefined
    this.filtroChange.emit(this.filtroCopy)
  }

  resetar() {
    this.filtroCopy = new MovimentoFiltro()
  }

}
