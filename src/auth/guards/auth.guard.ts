import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth.service";
import { JwtPayload } from "src/helpers/interfaces";
import { environments } from "src/environments/environment";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    //obtengo request
    const request = context.switchToHttp().getRequest();
    //obtengo token de la request
    const elToken = this.buscarEnHeader(request);
    if (!elToken) throw new UnauthorizedException('Token invalido');

    //valido token
    let payload: JwtPayload
    try {
      payload = await this.jwtService.verifyAsync(elToken, { secret: environments.SECRETA });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    //busco usuario segun id del token
    const usuario = await this.authService.findUserById(payload.id);
    if (!usuario) throw new UnauthorizedException('Token inválido');
    if (!usuario.confirmado) throw new UnauthorizedException('El usuario no está confirmado');

    const { password, token, confirmado, createAt, updateAt, ...user } = usuario

    request['usuario'] = user;

    return true;
  }

  private buscarEnHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}