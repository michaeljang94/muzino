import React, { useEffect, useState } from 'react';
import { Scoreboard } from './Scoreboard';
import { PaginationTable } from '../components/PaginationTable';
import { EnvironmentVariables } from '../config';

interface User {
  id: string;
  name: string;
  score: number;
  username: string;
}

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const addr = EnvironmentVariables.ZIKEEPER_ENDPOINT;

        const response = await fetch(`${addr}/api/users`);

        const usersList = await response.json();

        setUsers(usersList.users);
      } catch (error: any) {
        console.error(error);
      } finally {
      }
    };

    fetchTables();
  }, []);

  return (
    <PaginationTable
      tableHeaders={['Username', 'Name', 'Score']}
      tableData={users}
      dataType="PLAYER"
    />
  );
};
