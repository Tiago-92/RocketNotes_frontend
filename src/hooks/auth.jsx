import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({}); // criar hook de contexto de autentitação para usar em toda a aplicação

function AuthProvider ({ children }) {
    const [data, setData] = useState({}); // criar estado para armazenar user e token por enquanto

    async function signIn({ email, password }) { // buscar a rota de autenticação do backend
        
        try{ // tenta buscar a rota
            const response = await api.post("/sessions", { email, password}); 
            const { user, token } = response.data; // preciso somente do user e token

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // armazenar o objeto user e converter para texto
            localStorage.setItem("@rocketnotes:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // inserir um token tipo Bearer de autorização no cabeçalho por padrão de todas as req.
            setData({ user, token }) // armazena os valores  de user e token em um estado
        
        } catch (error) { // se der errado mostar mensagem de erro, a mesma do backend
            if(error.response) {
                alert(error.response.data.message);
            } else { // ou uma mensagem comum
                alert("Não foi possível entrar");
            }
        }            
    }

    function signOut() { // função para sair da aplicação
        localStorage.removeItem("@rocketnotes:token");
        localStorage.removeItem("@rocketnotes:user");

        setData({});
    }

    async function updateProfile({ user, avatarFile }) { // função para utualizar dados do usuário
        try {

            if(avatarFile){
                const fileUploadForm = new FormData(); // criar um arquivo pq no banco espera um campo chamado avatar
                fileUploadForm.append("avatar", avatarFile); // campo avatar e o arquivo

                const response = await api.patch("users/avatar", fileUploadForm); // atualizar avatar no banco
                user.avatar = response.data.avatar;
            }

            await api.put("/users", user);
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // atualiza os dados no localStorage
        
            setData({ user, token: data.token });
            alert("Perfil atualizado!");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            }else{
                alert("Não foi possível atualizar o perfil.")
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token"); // buscar de localStorage
        const user = localStorage.getItem("@rocketnotes:user");

        if(token && user){ // garantir que tem usuário e token armazenados 
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            setData({
                token,
                user: JSON.parse(user) 
            });
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{ 
            signIn,
            signOut,
            updateProfile,
            user: data.user 
        }}
        >
            {children} // recebe as rotas como children
        </AuthContext.Provider>
    )
}        

function useAuth(){
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };