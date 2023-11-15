import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { stringify } from 'querystring';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (this.isCodice(value)) return stringify(value);
    else throw new BadRequestException('Non è un codice valido');
  }

  private isCodice(value: string): Boolean {
    return (
      value != null &&
      typeof value === 'string' &&
      value.length == 5 &&
      /^[A-Z]+$/.test(value)
    );
  }
}
