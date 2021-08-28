import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* import { MatIconModule } from '@angular/material/icon'; */
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCommonModule,
  MatLineModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPseudoCheckboxModule,
  MatRippleModule,
} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule ,CommonModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
  exports:[MatIconModule,  MatCommonModule,
    MatLineModule,
    MatNativeDateModule,
    MatOptionModule,
    MatPseudoCheckboxModule,
    MatRippleModule,]
})
export class AppModule {}
