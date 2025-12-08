import React, { useEffect, useState } from 'react';
import { Scoreboard } from './Scoreboard';
import { PaginationTable } from '../components/PaginationTable';
import { EnvironmentVariables } from '../config';
import { useAuth } from '../components/auth/AuthProvider';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(null)
  const {token} = useAuth()

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/users`, {
          headers: {
            "Authorization": "Bearer " + token
          }
        });

        const usersList = await response.json();

        setUsers(usersList.users);
        setError(null)
      } catch (error: any) {
        console.error(error);
        setError(error)
      } finally {
      }
    };

    fetchTables();
  }, []);

  if (error) {
    return <>Error</>
  }

  return (
    <PaginationTable
      tableHeaders={['Username', 'Name', 'Score']}
      tableData={users}
      dataType="PLAYER"
    />
  );
};
