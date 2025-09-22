import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class HealthService {
  private http = inject(HttpClient);
  private base = environment.apiBase_url;
  ping() {
    return this.http.get<{ status: string }>(`${this.base}/health`);
  }
}