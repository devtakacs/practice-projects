import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddressService } from './addresses.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('graphql-anagular-app');
  addresses: any[] = [];

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.addressService.getAddresses().subscribe((result: any) => {
      this.addresses = result?.data?.addresses;
    });
  }

}
