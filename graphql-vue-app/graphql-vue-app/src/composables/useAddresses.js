import { useQuery } from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { computed } from 'vue';

const GET_ADDRESSES = gql`
  query {
    addresses {
      city
      street
      zip
    }
  }
`;

export function useAddresses() {
  const { result, loading, error } = useQuery(GET_ADDRESSES);

  const addresses = computed(() => result.value?.addresses || []);

  return {
    loading,
    error,
    addresses
  };
}
