import { useQuery } from '@apollo/client/react';
import { gql } from 'graphql-tag';

const GET_ADDRESSES = gql`
  query {
    addresses {
      city
      street
      zip
    }
  }
`;

interface Address {
  city: string;
  street: string;
  zip: string;
}

interface GetAddressesData {
  addresses: Address[];
}

export function useAddresses() {
  const { loading, error, data } = useQuery<GetAddressesData>(GET_ADDRESSES);
  
  return {
    loading,
    error,
    addresses: data?.addresses || []
  };
}
