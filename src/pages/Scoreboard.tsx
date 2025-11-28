import React from 'react';

export const Scoreboard: React.FC = () => {
  return (
    <div>
      <table>
        <thead>
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
          <tr>
            <td>
              <p>Muone</p>
            </td>
            <td>
              <p>1,000</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
