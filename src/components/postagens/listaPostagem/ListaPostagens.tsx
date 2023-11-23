import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dna } from 'react-loader-spinner';

import { buscar } from '../../../services/Services';
import { AuthContext } from '../../../contexts/AuthContext';

import Postagem from '../../../models/Postagem';
import CardPostagens from '../cardPostagens/CardPostagens';
import { toastAlerta } from '../../../utils/toastAlerta';
import ModalPostagem from '../modalPostagem/ModalPostagens';



function ListaPostagens() {

    const navigate = useNavigate();

    const [postagens, setPostagens] = useState<Postagem[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const location = useLocation();

    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])


    const listaUsuario = location.pathname === '/perfil';

    return (
        <>

            {postagens.length === 0 && (
                <Dna
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            {listaUsuario ? (



                <div>
                    {postagens.slice()
                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                        .map((postagem) => (
                        postagem.usuario?.id === usuario.id ? (
                            <CardPostagens key={postagem.id} post={postagem} />
                        ) : null
                    ))}
                </div>
            ) : (
                <div>
                    
                    <div className='container mx-auto py-8'>

                        {postagens.slice()
                        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
                        .map((postagem) => (
                            <CardPostagens key={postagem.id} post={postagem} />
                        ))}

                    </div>
                </div>

            )
            }





        </>
    )
}

export default ListaPostagens