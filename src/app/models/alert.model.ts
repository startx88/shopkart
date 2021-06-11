import { Color } from '../utility/enums/color.enum ';
import { Size } from '../utility/enums/size.enum';

export interface IAlert {
  color: Color;
  message: string;
  size?: Size;
  direction?: string;
}

export class Alert implements IAlert {
  constructor(
    public message: string,
    public color: Color,
    public size: Size,
    public direction: string
  ) {}
}
