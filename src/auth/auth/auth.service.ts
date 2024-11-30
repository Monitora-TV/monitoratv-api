import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
//Reactive X
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    const { data } = await firstValueFrom(
      this.http.post(
        'https://keycloak.gustavokanashiro.com/auth/realms/monitoratv/protocol/openid-connect/token',
        new URLSearchParams({
          client_id: 'localhost-backend',
          client_secret: 'Ni9HaVdGjkqm9hpkbqJ4PAEnnG94t3wb',
          grant_type: 'password',
          scope: 'openid',
          username,
          password,
        }),
      ),
    );
    return data;
  }
}
//auth0 - jsonwebtoken

// client_id=nest
// &client_secret=625baf8d-2be8-4850-95cc-ec19c0be2752
// &grant_type=password
// &username=user1@user.com
// &password=123456
