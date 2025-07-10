import { ConflictException, NotFoundException } from '@nestjs/common';

export class EmailAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super(`メールアドレス:${email}は既に登録されています`);
  }
}

export class NotFoundId extends NotFoundException {
  constructor(id: number) {
    super(`指定されたID:${id}は見つかりませんでした`);
  }
}
