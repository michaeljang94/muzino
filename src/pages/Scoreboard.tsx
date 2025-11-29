import React from 'react';
import './Scoreboard.css';

interface Player {
  name: string;
  score: string;
}

export const Scoreboard: React.FC = () => {
  const examplePlayersMap: Player[] = [
    {
      name: 'Muone',
      score: '1000',
    },
    {
      name: 'Babo',
      score: '1000',
    },
  ];

  return (
    <div className="scoreboard">
      <table>
        <thead >
          <tr>
            <td>
              <p>
                <b>Name</b>
              </p>
            </td>
            <td>
              <p>
                <b>Point</b>
              </p>
            </td>
          </tr>
        </thead>
        <tbody>
          {examplePlayersMap.map(player => (
            <tr>
              <td>
                <p>{player.name}</p>
              </td>
              <td>
                <p>{player.score}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
