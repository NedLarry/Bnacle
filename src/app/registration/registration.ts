import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {}
