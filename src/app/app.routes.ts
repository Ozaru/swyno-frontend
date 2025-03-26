import { Routes } from '@angular/router';
import { MovimentoComponent } from './pages/movimento/movimento.component';

export const routes: Routes = [
    {
        pathMatch: "full",
        path: "",
        redirectTo: "movimento",
    },
    {
        path: "movimento",
        component: MovimentoComponent,
    },
    {
        path: "**",
        redirectTo: "movimento",
    },
];
