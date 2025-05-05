import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-register',
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = { login: '', password: '' };
  errorMessage = '';
  showSuccessPopup = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: () => {
        this.errorMessage = 'Rejestracja nie powiodła się.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
}

