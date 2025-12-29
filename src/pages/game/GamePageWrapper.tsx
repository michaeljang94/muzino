import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../components/auth/AuthProvider';
import { TokenPayload } from '../PlayerProfilePage';
import { GamePage } from './GamePage';
import { DealerGamePage } from './DealerGamePage';

export const GamePageWrapper: React.FC = () => {
  const { token } = useAuth();
  const decoded = jwtDecode<TokenPayload>(token || '');

  const role = decoded.role;

  if (role === 'dealer') {
    return (
      <>
        <DealerGamePage />
      </>
    );
  }

  return (
    <>
      <GamePage />
    </>
  );
};
