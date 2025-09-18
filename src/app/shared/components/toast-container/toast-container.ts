import { Component, inject } from '@angular/core';
import {ToastComponent} from '../toast/toast.component';
import {AsyncPipe} from '@angular/common';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  imports: [
    ToastComponent,
    AsyncPipe
  ],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss'
})
export class ToastContainer {
  private readonly toastService = inject(ToastService);
  toasts$ = this.toastService.getToasts();

  onCloseToast(id: number): void {
    this.toastService.removeToast(id);
  }
}
