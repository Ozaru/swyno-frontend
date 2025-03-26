import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movimento-formulario',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './movimento-formulario.component.html',
  styleUrl: './movimento-formulario.component.scss',
})
export class MovimentoFormularioComponent {

  private httpClient = inject(HttpClient)

  id?: number
  @Output() idChange = new EventEmitter<number | undefined>()

  formulario = new MovimentoFormulario()

  obter() {
    if (!this.id) {
      return
    }
    this.httpClient.get<MovimentoFormulario>(`/api/movimento/${this.id}`).subscribe({
      next: formulario => {
        this.formulario = formulario
      },
      error: error => {
        alert(JSON.stringify(error.message))
      }
    })
  }

  cancelar() {
    this.idChange.emit(this.id)
  }

  salvar() {
    this.httpClient.post<{ id: number }>(`/api/movimento`, this.formulario).subscribe({
      next: idModel => {
        this.idChange.emit(idModel.id)
      },
      error: error => {
        alert(JSON.stringify(error.message))
      }
    })
  }

}

class MovimentoFormulario {
  id?: number
  nome!: string
}