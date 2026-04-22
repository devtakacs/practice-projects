import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private apollo: Apollo) {}

  getAddresses() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          addresses {
            city
            street
            zip
          }
        }
      `,
    }).valueChanges;
  }
}
