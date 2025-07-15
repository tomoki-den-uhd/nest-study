import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types/jwtPayload';
import { RequestUser } from 'src/types/requestUser';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiretion: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payloard: JwtPayload): Promise<RequestUser> {
    return {
      id: payloard.sub,
      userName: payloard.userName,
      role: payloard.role,
    };
  }
}
