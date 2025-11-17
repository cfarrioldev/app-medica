import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HealthService } from './core/services/health.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mediflow-front';
  private healthService: HealthService = inject(HealthService)
  ngOnInit() {
   this.healthService.ping().subscribe(console.log)
  }
}
