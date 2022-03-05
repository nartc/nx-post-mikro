import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api/message';

@Injectable()
export class LayoutMessageService {
  constructor(private messageService: MessageService) {}

  addErrorMessage(message: Omit<Message, 'severity'>) {
    this.messageService.add({ ...message, severity: 'error' });
  }

  addSuccessMessage(message: Omit<Message, 'severity'>) {
    this.messageService.add({ ...message, severity: 'success' });
  }

  clear() {
    this.messageService.clear();
  }
}
