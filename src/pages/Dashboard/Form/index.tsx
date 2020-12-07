import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form as FormContainer } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../../hooks/Auth';
import { useToast } from '../../../hooks/Toast';
import getValidationErrors from '../../../utils/getValidationErros';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import CheckboxInput from '../../../components/Checkbox';

import { Container } from './style';
import api from '../../../services/api';

interface RouteParams {
  id: string;
}

interface CheckboxOption {
  id: string;
  value: string;
  label: string;
}

interface formData {
  name: string;
  valorInicial: string;
  checkbox: [string];
}

const Form: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const { addToast } = useToast();
  const params: RouteParams = useParams();

  const checkboxOptions: CheckboxOption[] = [
    { id: 'usado', value: 'usado', label: 'Esse item é usado?' },
    {
      id: 'andamento',
      value: 'andamento',
      label: 'Esse item está disponível?',
    },
  ];

  const handleFindTask = useCallback(async id => {
    const response = await api.get(`/products/${id}`);
    formRef.current?.setFieldValue('name', response.data.name);
    formRef.current?.setFieldValue('valorInicial', response.data.valorInicial);
    if (response.data.usado === true) {
      formRef.current?.setFieldValue('checkbox', ['usado']);
    }
    if (response.data.andamento === true) {
      formRef.current?.setFieldValue('checkbox', ['andamento']);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      handleFindTask(params.id);
    }
  }, [params.id, handleFindTask]);

  const handleSubmit = useCallback(
    async (data: formData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do Leilao é obrigatório'),
          valorInicial: Yup.string().required('Valor inicial é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const payload = {
          name: data.name,
          valorInicial: data.valorInicial,
          usado: !!data.checkbox.includes('usado'),
          andamento: !!data.checkbox.includes('andamento'),
          data_criacao: new Date().toISOString(),
          user,
        };

        if (params.id) {
          await api.put(`/products/${params.id}`, payload);
        } else {
          await api.post('/products', payload);
        }

        addToast({
          type: 'success',
          title: 'Salvo com sucesso!',
        });

        history.push('/');

        return;
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no login',
          description: 'Ocorreu um erro ao cadastrar o produto',
        });
      }
    },
    [user, addToast, history, params.id],
  );

  return (
    <>
      <Header />
      <Button onClick={() => history.goBack()} className="navigation-button">
        Voltar
        <FiArrowLeft size={20} />
      </Button>
      <Container>
        <h2>Preencha o formulário com os dados do Leilão:</h2>
        <FormContainer onSubmit={handleSubmit} ref={formRef}>
          <Input name="name" placeholder="Nome do Leilão" />
          <Input name="valorInicial" placeholder="Valor inicial" />
          <CheckboxInput name="checkbox" options={checkboxOptions} />

          <Button type="submit">Salvar</Button>
        </FormContainer>
      </Container>
    </>
  );
};

export default Form;
