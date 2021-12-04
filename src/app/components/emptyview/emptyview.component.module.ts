import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyviewComponent } from './emptyview.component';

@NgModule({
        declarations: [
            EmptyviewComponent,
                


        ],
        imports: [
                CommonModule,
                IonicModule,
                FormsModule,
                ReactiveFormsModule

        ],
        exports: [
            EmptyviewComponent
        ],
        providers: [
                Location
        ]
})
export class EmptyviewComponentModule { }