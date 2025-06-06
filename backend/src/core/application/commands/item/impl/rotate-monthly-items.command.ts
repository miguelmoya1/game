import { ICommand } from '@nestjs/cqrs';

export class RotateMonthlyItemsCommand implements ICommand {
  // Puedes añadir propiedades si necesitas contexto (ej: usuario, fecha, etc)
  constructor() {}
}
