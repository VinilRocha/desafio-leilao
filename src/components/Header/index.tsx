import React from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';
import { Container } from './styles';
import Button from '../Button';

const Header: React.FC = () => {
  const { logOut } = useAuth();

  return (
    <Container>
      <h1>Leilões</h1>
      <nav>
        <Button onClick={() => logOut()}>
          Logout
          <FiArrowRightCircle size={15} />
        </Button>
      </nav>
    </Container>
  );
};

export default Header;
