import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ListStoresAndUserUseCase {
  constructor(private readonly http: HttpService) {}

  async execute(userId: string) {
    const baseUrl = 'http://microservicio-usuarios:3000'; // URL del microservicio anterior

    try {
      // Llamar al endpoint para obtener la información del usuario
      const userResponse = await firstValueFrom(
        this.http.get(`${baseUrl}/users/${userId}`),
      );

      // Llamar al endpoint para listar todas las tiendas/sedes
      const storesResponse = await firstValueFrom(
        this.http.get(`${baseUrl}/stores`),
      );

      return {
        user: userResponse.data,
        stores: storesResponse.data,
      };
    } catch (error) {
      console.error('Error al consumir endpoints:', error.message);
      throw new Error('No se pudieron obtener los datos');
    }
  }
}
