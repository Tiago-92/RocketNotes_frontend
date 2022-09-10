import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { FiPlus } from 'react-icons/fi';

import { Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Header } from '../../components/Header';

import { Input } from '../../components/Input';

import { Note } from '../../components/Note';

import { Section } from '../../components/Section';

import { ButtonText } from '../../components/ButtonText';

import { api } from '../../../../Aulas/API/src/services/api';

export function Home(){
    const [tags, setTags] = useState();
    const [tagsSelected, setTagsSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);

    const navigate = useNavigate();

    function handleTagSelected(tagName) {
        if(tagName === "all") {
            return setTagsSelected([]);
        }
        const alreadySelected = tagsSelected.includes(tagName);

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName);
            setTagsSelected(filteredTags);
        } else {
            setTagsSelected(prevState =>[...prevState, tagName]);
        }
    }
    
    function handleDetails(id) { // função para exibir os detalhes da nota
        navigate(`/details/${id}`);
    }

    useEffect(() => { // para disparar tags uma vez quando a página é renderizada
        async function fetchTags() { // buscar tags
            const response = await api.get("/tags");
            setTags(response.data)
        }

        fetchTags();
    }, []);

    useEffect(() => {
        async function fetchNotes() {
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
            setNotes(response.data);
        }

        fetchNotes();
    }, [tagsSelected, search]); // carrega toda vez que uma tag selecionada ou quando o usuário pesquisa no campo de busca. Serve como filtro.

    return (
        <Container>
            <Brand>
                <h1>Rocketnotes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText
                        title="Todos"
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                title={tag.name}
                                onClick={() => handleTagSelected(tag.name)}
                                isActive={tagsSelected.includes(tag.name)} 
                            />
                        </li>
                    ))
                }          
            </Menu>

            <Search>
                <Input 
                    placeholder="Pesquisar pelo título" 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)} 
                            />
                        ))
                    }
                </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}