import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsuariosApiClient {
  private readonly baseUrl =
    process.env.USUARIOS_SERVICE_URL || 'http://localhost:3002/api/users';

  constructor(private readonly http: HttpService) {}

  async getUserById(userId: string) {
    const url = `${this.baseUrl}/${userId}`;
    const response = await firstValueFrom(this.http.get(url));
    return response.data;
  }

  async listAllStores(ownerId: string) {
    const url = `${this.baseUrl}/${ownerId}/stores/all`;
    const response = await firstValueFrom(this.http.get(url));
    return response.data;
  }
}
