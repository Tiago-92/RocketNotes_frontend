import { api } from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'

import { RiShutDownLine } from 'react-icons/ri'

import { useAuth } from '../../hooks/auth';

import { Container, Profile, Logout } from './styles';

export function Header() {
    const { signOut, user } = useAuth();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

    return(
        <Container>
            <Profile to="/profile">
                <img
                    src={avatarUrl}
                    alt="Foto do usuário"
                />

                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>    
            </Profile>

            <Logout>
                <RiShutDownLine onClick={signOut} />
            </Logout>
        </Container>
    );
}