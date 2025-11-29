import React from 'react';
import logo from '../logo.svg';
import './Manager.css';

export const Manager: React.FC = () => {
  return (
    <div className="manager">
      <section>
        <header>
          <p>Muzino</p>
        </header>
      </section>
      <section>
        <table>
          <tbody>
            <tr>
              <td className="manager-td">
                <p>1,000</p>
              </td>
              <td>
                <p>Muone</p>
              </td>
            </tr>
            <tr>
              <img src={logo} alt="logo" />
            </tr>
            <tr>
              <td>
                <button style={{ height: '50px', width: '50px' }}>Send</button>
              </td>
              <td>
                <button style={{ height: '50px', width: 'fit-content' }}>Scoreboard</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};
