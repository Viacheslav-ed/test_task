import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const [type, token] = request.headers?.authorization?.split(' ');
      if (type != 'Bearer' || !this.checkPrivateKey(token)) return false;
    } catch {
      throw new ForbiddenException('Forbidden resource');
    }
    return true;
  }

  private checkPrivateKey(privateKey: string): boolean {
    return (
      ethers.isHexString(privateKey, 32) ||
      ethers.isHexString('0x' + privateKey, 32)
    );
  }
}
