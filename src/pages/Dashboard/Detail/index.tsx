import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useParams } from 'react-router-dom';

import { Container } from './styles';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import api from '../../../services/api';

interface RouteParams {
  id: string;
}

interface Leilao {
  id: number;
  name: string;
  valorInicial: number;
  usado: boolean;
  user: string;
  andamento: boolean;
  dataCriacao: Date;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const params: RouteParams = useParams();
  const [leilao, setLeilao] = useState<Leilao>();

  const handleFinLeilao = useCallback(async () => {
    const response = await api.get<Leilao>(`/products/${params.id}`);
    setLeilao(response.data);
  }, [params.id]);

  useEffect(() => {
    handleFinLeilao();
  }, [handleFinLeilao]);

  return (
    <>
      <Header />
      <Button onClick={() => history.goBack()} className="navigation-button">
        Voltar
        <FiArrowLeft size={20} />
      </Button>
      <Container type={leilao?.andamento === true ? 'andamento' : 'finalizado'}>
        <div className="card-title">
          <h2>{leilao?.name}</h2>
          {leilao?.usado && <span>Usado</span>}
        </div>
        <div className="card-info">
          <p>
            Valor inicial:
            <span>
              <b>R$ </b>
              {leilao?.valorInicial}
            </span>
          </p>
          <p>
            Publicado por:
            <span>{leilao?.user}</span>
          </p>
        </div>
        <div className="card-status">
          <p>{leilao?.andamento === true ? 'Em andamento' : 'Finalizado'}</p>
        </div>
      </Container>
    </>
  );
};

export default Detail;
