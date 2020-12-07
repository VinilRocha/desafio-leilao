import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErros';

import BackgroundImg from '../../assets/background.jpg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { LoginContainer, FormContainer, BackgroundLogin } from './styles';

interface LoginFormData {
  user: string;
  password: string;
}

const LogIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { logIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.string().required('Nome de usuário é obrigatório'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.user === 'admin' && data.password === 'admin') {
          await logIn({
            user: data.user,
            password: data.password,
          });
          history.push('/leiloes');
        } else if (
          data.user === 'desativado' &&
          data.password === 'desativado'
        ) {
          addToast({
            type: 'error',
            title: 'Erro no login',
            description: 'Este usuário foi desativado',
          });
        } else {
          addToast({
            type: 'error',
            title: 'Erro no login',
            description: 'Usuário invalido',
          });
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no login',
          description: 'Ocorreu um erro ao fazer login',
        });
      }
    },
    [logIn, addToast, history],
  );

  return (
    <>
      <LoginContainer>
        <BackgroundLogin>
          <img src={BackgroundImg} alt="Leilões" />
        </BackgroundLogin>
        <FormContainer>
          <h1>Login</h1>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="user" icon={FiUser} placeholder="Usuário" />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />

            <Button type="submit">Entrar</Button>
          </Form>
        </FormContainer>
      </LoginContainer>
    </>
  );
};

export default LogIn;
