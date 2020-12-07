import React, { useEffect, useState } from 'react';
import { FiTrash, FiPlusCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/Toast';

import Header from '../../components/Header';
import api from '../../services/api';
import { Container, Card, CardButtons } from './styles';
import Button from '../../components/Button';

interface Leilao {
  id: number;
  name: string;
  valorInicial: number;
  usado: boolean;
  user: string;
  andamento: boolean;
  dataCriacao: Date;
}

const Dashboard: React.FC = () => {
  const [leiloes, setLeiloes] = useState<Leilao[]>([]);
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    handleLoadProducts();
  }, []);

  async function handleLoadProducts() {
    const response = await api.get('products');
    setLeiloes(response.data);
  }

  function handleNewTask() {
    history.push('/leiloes/cadastro');
  }

  function handleEditLeilao(id: number) {
    history.push(`/leiloes/cadastro/${id}`);
  }

  function handleSeeLeilao(id: number) {
    history.push(`/leiloes/${id}`);
  }

  async function handleDeleteLeilao(id: number) {
    await api.delete(`/products/${id}`);
    handleLoadProducts();
    addToast({
      type: 'success',
      title: 'Leilão excluído!',
    });
  }

  return (
    <>
      <Header />
      <br />
      <Button onClick={handleNewTask} className="navigation-button">
        Novo Leilão
        <FiPlusCircle size={20} />
      </Button>
      <Container>
        {leiloes.map(leilao => (
          <Card
            key={leilao.id}
            type={leilao.andamento === true ? 'andamento' : 'finalizado'}
          >
            <div className="card-title">
              <h2>{leilao.name}</h2>
              {leilao.usado && <span>Usado</span>}
            </div>
            <div className="card-info">
              <p>
                Valor inicial:
                <span>
                  <b>R$ </b>
                  {leilao.valorInicial}
                </span>
              </p>
              <p>
                Publicado por:
                <span>{leilao.user}</span>
              </p>
            </div>
            <div className="card-status">
              <p>{leilao.andamento === true ? 'Em andamento' : 'Finalizado'}</p>
            </div>
            <CardButtons>
              <Button onClick={() => handleEditLeilao(leilao.id)}>
                Editar
              </Button>
              <Button onClick={() => handleSeeLeilao(leilao.id)}>
                Visualizar
              </Button>
              <Button onClick={() => handleDeleteLeilao(leilao.id)}>
                <FiTrash />
              </Button>
            </CardButtons>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Dashboard;
