'use client';

import { useAddresses } from '@/lib/useAddresses';

function AddressesList() {
  const { loading, error, addresses } = useAddresses();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Addresses</h2>
      <ul>
        {addresses.map((address, index) => (
          <li key={index}>
            <p>{address.city}, {address.street}, {address.zip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <AddressesList />
      </main>
    </div>
  );
}
