import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
    query GetUsers {
        users {
            id
            email
        }
    }
`;

function Users() {
    const { loading, error, data } = useQuery(GET_USERS);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.users.map(({ id, email }) => (
                <li key={id}>
                    <p>Email: {email}</p>
                </li>
            ))}
        </ul>
    );
}

export default Users;