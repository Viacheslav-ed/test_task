import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true with valid private key', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization:
          'Bearer 0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650',
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should return true with valid private key(with 0x)', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization:
          'Bearer 0x0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650',
      },
    });

    expect(guard.canActivate(context)).toBeTruthy();
  });

  it('should return false with not valid private key', () => {
    const context = createMock<ExecutionContext>();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization:
          'Bearer 0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1cfd6f64650----',
      },
    });

    expect(guard.canActivate(context)).toBeFalsy();

    context.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization:
          'Bearer 0be1f909285aaa1aefa77509627954bbd66011f33fceadd84c9dc1c',
      },
    });

    expect(guard.canActivate(context)).toBeFalsy();
  });
});
