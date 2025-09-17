import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Toast } from '../../../core/@types/Toast';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})

export class ToastComponent implements OnInit {
  @Input() toast!: Toast;
  @Output() toastClose = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.toast.duration) {
      setTimeout(() => this.onClose(), this.toast.duration);
    }
  }

  onClose(): void {
    this.toastClose.emit(this.toast.id);
  }

  get toastClasses(): Record<string, boolean> {
    return {
      'toast': true,
      [`toast--${this.toast.type}`]: true
    };
  }
}
