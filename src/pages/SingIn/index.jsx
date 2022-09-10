import { useState } from 'react';

import { FiMail, FiLock } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SingIn() {
    const [email, setEmail] = useState(""); // criar estado para armazenar os dados que o usuário digitar nos input 
    const [password, setPassword] = useState(""); // começa  estado vazio

    const { signIn } = useAuth();  // buscar hook de contexto em auth.jsx

    function handleSignIn(){
        signIn({ email, password });
    }

    return (
        <Container>
            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Faça seu login</h2>

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    onChange={e => setEmail(e.target.value)} // atualiza para o novo valor de email, ou seja muda seu estado
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)}  
                />

                <Button title="Entrar" onClick={handleSignIn} />

                <Link to="/register">
                    Criar conta
                </Link>
            </Form>

            <Background />
        </Container>
    );
}