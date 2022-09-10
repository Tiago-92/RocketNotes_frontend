import { useState } from 'react'; // criar estados

import { api } from '../../services/api';

import { FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Link, useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SignUp() {
    const [name, setName] = useState(""); // name: nome do estado. SetName: nome da função que atualiza o estado.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSignUp(){
        if(!name || !email ||!password){
            return alert('Todos os campos devem ser preenchidos!')
        }

        console.log(name, email, password)

        api.post("/users", { name, email, password}) // busco no backend na rota de usuários 
        .then(() => {
            alert("Usuário cadastrado com sucesso") // se deu certo
            navigate("/");
        })
        .catch(error => {
            if(error.response) {
                alert(error.response.data.message);
            }else{
                alert("Nao foi possível cadastrar.") 
            }
        });
    }

    return (
        <Container>
            <Background />

            <Form>
                <h1>Rocket Notes</h1>
                <p>Aplicação para salvar e gerenciar seus links úteis</p>

                <h2>Crie sua conta</h2>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    onChange={e => setName(e.target.value)} // toda vez que o valor do input muda ela dispara um evento 
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail} 
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassword(e.target.value)} 
                />

                <Button title="Cadastrar" onClick={handleSignUp} />

                <Link to="/">
                    Voltar para o login
                </Link>
            </Form>
        </Container>
    );
}