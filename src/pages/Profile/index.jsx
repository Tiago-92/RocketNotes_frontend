import { useState } from 'react';

import { api } from '../../../../Aulas/API/src/services/api';

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

import { useNavigate } from "react-router-dom";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { Input } from '../../components/Input';

import { Button } from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container, Form, Avatar } from "./styles";

export function Profile() {
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState("");
    const [passwordNew, setPasswordNew] = useState("");

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder; // busca no backend o avatar do usuário ou mostra imagem placeholder

    const [avatar, setAvatar] = useState(avatarUrl); // carrega o avatar se o usuário ja tiver um
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld,
        }

        const userUpdated = Object.assign(user, updated)

        await updateProfile({ user: userUpdated, avatarFile })
    }

    function handleChangeAvatar(event) {
        const file = event.target.files[0]; // carrega a imagem
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file); // exibe a imagem, muda o estado com setAvatar
        setAvatar(imagePreview);
    }

    return(
        <Container>
            <header>
                <button type="button" onClick={handleBack}>
                    <FiArrowLeft />
                </button>
            </header>

            <Form>
                <Avatar>
                    <img 
                        src={avatar} 
                        alt="Foto do usuário"
                    />

                    <label htmlFor="avatar">
                        <FiCamera />

                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar} 
                        />
                    </label>    
                </Avatar>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}  
                />

                <Input
                    placeholder="E-mail"
                    type="email"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                />

                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}  
                />

                <Input
                    placeholder="Nova senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}  
                />

                <Button title="salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    );
}