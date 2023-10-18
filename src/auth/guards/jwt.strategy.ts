import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  //import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate { // CanActivate : Interfaz que implementa los guards
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> { // ExecutionContext: verifica si el usuario tiene acceso a la ruta 
      const request = context.switchToHttp().getRequest(); // Extrae la solicitud del contexto
      const token = this.extractTokenFromHeader(request); // extractTokenFromHeader:  extrae el token del encabezado de autorización utilizando la función privada 
      if (!token) {
        throw new UnauthorizedException(); // Unauthorized en caso de que el token no sea encontrado
      }
      try {
        const payload = await this.jwtService.verifyAsync( // Verifica el token
          token,
          {
            secret: 'mala-practica'
          }
        );
        // 💡 Se alamacena el token 
        // Para que se pueda utilizar en otras rutas
        request['user'] = payload; 
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    // Analiza el encabezado de autorización de la solicitud y extrae el token, si es del tipo "Bearer". El token devuelve como una cadena o undefined si no se encuentra.
    private extractTokenFromHeader(request: Request): string | undefined {// 
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }