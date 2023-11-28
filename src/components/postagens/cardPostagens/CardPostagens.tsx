import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import CurtirPostagem from '../curtirPostagem/CurtirPostagem';
import { Pencil, Trash } from '@phosphor-icons/react'
import Comentarios from '../comentarios/Comentarios';
import Postagem from '../../../models/Postagem';

interface CardPostagensProps {
  post: Postagem;
}

function CardPostagens({ post }: CardPostagensProps) {
  const { usuario } = useContext(AuthContext);

  const [comentarios, setComentarios] = useState<string[]>([]);
  const [novoComentarioTexto, setNovoComentarioTexto] = useState('');
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const toggleComentarios = () => {
    setMostrarComentarios(!mostrarComentarios);
  };


  const perfilUsuario = `/perfil/${post.usuario?.id}`;

  function criarNovoComentario(event: FormEvent) {
    event.preventDefault();
    if (novoComentarioTexto.trim() !== '') {
      setComentarios([...comentarios, novoComentarioTexto]);
      setNovoComentarioTexto('');

      setMostrarComentarios(true);
    }
  }

  function atualizarNovoComentario(event: ChangeEvent<HTMLTextAreaElement>) {
    setNovoComentarioTexto(event.target.value);
  }

  return (
    <div className="bg-gray-100  flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-2/4 ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Link to={perfilUsuario}><img src={post.usuario?.foto || 'https://i.imgur.com/bRpa5Bk.jpg'} alt="User Avatar" className="w-8 h-8 rounded-full" /></Link>
            <div>
              <p className="text-gray-800 font-semibold">
                <Link to={perfilUsuario}>{post.usuario?.nome}</Link>
              </p>
              <p className="text-gray-500 text-sm"> {new Intl.DateTimeFormat(undefined, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(post.data))} </p>


            </div>
              {post.usuario?.id === usuario.id ?
                <div className="flex justify-end pl-64">

                  <Link to={`/editarPostagem/${post.id}`} className='rounded text-rose-300 p-2 transition-all hover:text-rose-500 active:opacity-[0.85]'>
                    <button><Pencil size={24} weight='bold' /></button>
                  </Link>
                  <Link to={`/deletarPostagem/${post.id}`}
                    className='rounded text-rose-300 p-2 transition-all hover:text-rose-500 active:opacity-[0.85]'>
                    <button><Trash size={24} weight='bold' /></button>
                  </Link>
                </div>
                : null}
            </div>
          {post.usuario?.id === usuario.id && (
            <div className="text-gray-500 cursor-pointer">
            </div>
          )}
        </div>

        <div className=''>


          <div className="mb-4 ml-50">
            <h3 className="text-gray-800 font-bold text-xl">{post.titulo}</h3>
          </div>

          <div className="mb-4">
            <p className="text-gray-800">{post.conteudo}</p>
          </div>

          {post.foto && (
            <div className="mb-4">
              <img src={post.foto} alt="Post Image" className="w-full  object-cover rounded-md" />
            </div>
          )}

          <div className=" hover:underline">
           <Link to={"/temas"}><p className="text-gray-800 ">{post.tema?.descricao}</p></Link> 
          </div>
        </div>

        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <CurtirPostagem />
          </div>
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1"
            onClick={toggleComentarios}>
            <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
              </g>
            </svg>
            <span>{comentarios.length} Comentário{comentarios.length !== 1 ? 's' : ''}</span>
          </button>
        </div>

        <hr className="mt-2 mb-2" />
        <p className="text-gray-800 font-semibold">Comentários</p>
        <hr className="mt-2 mb-2" />


        {mostrarComentarios && (
          <div className="mt-4">
            {comentarios.length > 0 ? (
              comentarios.map((comentario, index) => (
                <Comentarios key={index} conteudo={comentario} />
              ))
            ) : (
              <p>Sem comentários</p>
            )}
          </div>

        )}


        <div className="flex items-center justify-center shadow-xl">
          <form onSubmit={criarNovoComentario} className="w-full bg-white rounded-lg px-4 pt-2">

            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="comment"
                placeholder="Adicione um comentário"


                value={novoComentarioTexto}
                onChange={atualizarNovoComentario}
                required
              />
            </div>
            <div className="w-full md:w-full flex items-start md:w-full px-3">


            </div>
            <footer className='flex justify-end  mr-4 mb-2'>
              <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold  py-1 px-4 rounded-full"
                type="submit"
              >
                Publicar
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CardPostagens;