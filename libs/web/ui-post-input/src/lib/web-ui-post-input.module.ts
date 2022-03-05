import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'ct-post-input',
  template: `
    <div class="flex">
      <div class="p-field flex-grow-1">
        <span class="p-float-label">
          <textarea
            pInputTextarea
            class="w-12"
            id="input"
            [autoResize]="true"
            [(ngModel)]="text"
          ></textarea>
          <label for="input">Say something...</label>
        </span>
      </div>
      <button
        pButton
        pRipple
        label="Submit"
        class="ml-2 align-self-start p-button-sm"
        (click)="onSubmit()"
      ></button>
    </div>
  `,
  styles: [
    `
      textarea::placeholder {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol';
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostInputComponent {
  text = '';

  @Output() inputSubmit = new EventEmitter<string>();

  onSubmit() {
    if (!this.text) return;

    this.inputSubmit.emit(this.text);
    this.text = '';
  }
}

@NgModule({
  declarations: [PostInputComponent],
  exports: [PostInputComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    FormsModule,
  ],
})
export class WebUiPostInputModule {}
