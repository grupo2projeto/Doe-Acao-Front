import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../../services/Services'
import Usuario from '../../models/Usuario'
import { toastAlerta } from '../../utils/toastAlerta';
import { RotatingLines } from 'react-loader-spinner';



function Cadastro() {

    const navigate = useNavigate()
    const [tipoConta, setTipoConta] = useState('cpf');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [confirmaSenha, setConfirmaSenha] = useState<string>("")
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

    const handleToggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };


    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        cpf: '98873168060',
        cnpj: '13121278000169',
        nascimento: ''
    })

    useEffect(() => {
        if (usuario.id !== 0) {
            retornar()
        }
    }, [usuario])


    function retornar() {
        navigate('/login')
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
            setIsLoading(true)

            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario)
                toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

            } catch (error) {
                toastAlerta('Erro ao cadastrar o Usuário', 'erro')
            }

        } else {
            toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'info')
            setUsuario({ ...usuario, senha: "" })
            setConfirmaSenha("")
        }

        setIsLoading(false)
    }

    function validaNome() {
        const txtNome = document.querySelector('#txtNome') as HTMLDivElement;
        if (usuario.nome.length == 0 || usuario.nome.length < 3) {
            txtNome.innerHTML = 'Nome Inválido'
            txtNome.style.color = 'rgb(225 29 72)'


        } else if (usuario.nome === null) {
            if (txtNome) {
                txtNome.style.display = 'none'
            }
        } else {
            txtNome.innerHTML = 'Nome Válido'
            txtNome.style.color = 'rgb(21 128 61)'
        }
    }
    function validaDataNascimento() {
        const txtDataNascimento = document.querySelector('#txtDataNascimento') as HTMLDivElement;
        const dataNascimento = usuario.nascimento;
        if (!dataNascimento) {
          txtDataNascimento.innerHTML = 'Data de Nascimento Inválida';
          txtDataNascimento.style.color = 'rgb(225, 29, 72)';
        } else {
          
          txtDataNascimento.innerHTML = 'Data de Nascimento Válida';
          txtDataNascimento.style.color = 'rgb(21, 128, 61)';
        }
      }

    function validaEmail() {
        const txtEmail = document.querySelector('#txtEmail') as HTMLDivElement;
        if (usuario.usuario.indexOf('@') == -1 || usuario.usuario.indexOf('.') == -1) {
            txtEmail.innerHTML = 'E-mail inválido'
            txtEmail.style.color = 'rgb(225 29 72)'
        } else {
            txtEmail.innerHTML = 'E-mail válido'
            txtEmail.style.color = 'rgb(21 128 61)'
        }
    }
  
    function validaSenha() {
        const txtSenha = document.querySelector('#txtSenha') as HTMLDivElement;
        if (usuario.senha.length >= 8) {
            txtSenha.innerHTML = 'Senha válida'
            txtSenha.style.color = 'rgb(21 128 61)'
        } else {
            txtSenha.innerHTML = 'Senha inválida'
            txtSenha.style.color = 'rgb(225 29 72)'
        }
    }

    function validaConfirmaSenha() {
        const txtValidaSenha = document.querySelector('#txtConfirmaSenha') as HTMLDivElement;
        if (confirmaSenha.length >= 8 && usuario.senha === confirmaSenha) {
            txtValidaSenha.innerHTML = 'Senha válida'
            txtValidaSenha.style.color = 'rgb(21 128 61)'
        } else {
            txtValidaSenha.innerHTML = 'Senha inválida'
            txtValidaSenha.style.color = 'rgb(225 29 72)'
        }
    }



    return (
        <>

            <div className="min-w-screen   flex items-center justify-center">
                <div className="bg-gray-100 text-gray-500 shadow-xl w-full overflow-hidden" >
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-300 py-10 px-10  justify-items-center">
                            <div className="hidden md:block w-2/2 bg-gray-300 py-10 px-10">
                                <img src="https://i.imgur.com/ZyojHNd.png" alt="Imagem de background" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">Cadastrar</h1>
                                <p className='text-rose-500'>* Indica um item obrigatório</p>
                            </div>
                            <form className='flex justify-center items-center flex-col w-3/3 gap-3'
                                onSubmit={cadastrarNovoUsuario} >
                                <div className="flex flex-col w-full">
                                    <label htmlFor="cpf1">Tipo do cadastro:</label>
                                    <select
                                        onChange={(e) => setTipoConta(e.target.value)}
                                        title="cpf"
                                        id="cpf1"
                                        name="cpf1"
                                        placeholder="cpf"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500">

                                        <option value="cpf">Pessoa Física</option>
                                        <option value="ong">ONG</option>

                                    </select>
                                </div>

                                {tipoConta === 'cpf' && <div className="flex flex-col w-full">
                                    <label htmlFor="cpf">CPF: </label>
                                    <input

                                        type="cpf"
                                        id="cpf"
                                        name="cpf"
                                        placeholder="CPF"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>}
                                {tipoConta === 'ong' &&
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="cnpj">CNPJ:  <span className="text-rose-500">*</span></label>
                                        <input
                                            type="cnpj"
                                            id="cnpj"
                                            name="cnpj"
                                            placeholder="CNPJ"
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        />
                                    </div>}

                                <div className="flex flex-col w-full">
                                    <label htmlFor="nome">Nome:  <span className="text-rose-500">*</span></label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Nome"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        value={usuario.nome}
                                        onKeyUp={validaNome}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <div id='txtNome' className='w-full'></div>


                                <div className="flex flex-col w-full">
                                    <label htmlFor="usuario">E-mail:  <span className="text-rose-500">*</span></label>
                                    <input
                                        type="text"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="Email"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        value={usuario.usuario}
                                        onKeyUp={validaEmail}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <div id='txtEmail' className='w-full'></div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="nascimento">Data de Nascimento:  <span className="text-rose-500">*</span></label>
                                    <input
                                        type="date"
                                        id="nascimento"
                                        name="nascimento"
                                        placeholder="nascimento"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        value={usuario.nascimento}
                                        onKeyUp={validaDataNascimento}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <div id='txtDataNascimento' className='w-full'></div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="foto">Foto: </label>
                                    <input
                                        type="text"
                                        id="foto"
                                        name="foto"
                                        placeholder="Foto"
                                        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                        value={usuario.foto}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="senha">Senha:  <span className="text-rose-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type={mostrarSenha ? 'text' : 'password'}
                                            id="senha"
                                            name="senha"
                                            placeholder="Senha"
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                            value={usuario.senha}
                                            onKeyUp={validaSenha}
                                            onChange={atualizarEstado}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={handleToggleSenha}
                                        >
                                            {mostrarSenha ? 'Ocultar Senha' : 'Mostrar Senha'}
                                        </button>
                                    </div>
                                </div>
                                <div id='txtSenha' className='w-full'></div>

                                <div className="flex flex-col w-full">
                                    <label htmlFor="confirmarSenha">Confirmar Senha:  <span className="text-rose-500">*</span></label>
                                    <div className="relative">
                                        <input
                                            type={mostrarSenha ? 'text' : 'password'}
                                            id="confirmarSenha"
                                            name="confirmarSenha"
                                            placeholder="Confirmar Senha"
                                            className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-rose-500"
                                            value={confirmaSenha}
                                            onKeyUp={validaConfirmaSenha}
                                            onChange={handleConfirmarSenha}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={handleToggleSenha}
                                        >
                                            {mostrarSenha ? 'Ocultar Senha' : 'Mostrar Senha'}
                                        </button>
                                    </div>
                                </div>
                                <div id='txtConfirmaSenha' className='w-full'></div>

                                <div className="flex justify-around w-full gap-8">
                                    <button className='rounded text-black bg-gray-200 border border-black hover:bg-gray-300 w-1/2 py-2' onClick={retornar}>
                                        Cancelar
                                    </button>
                                    <button
                                        className='flex justify-center items-center w-full max-w-xs mx-auto bg-rose-500 hover:bg-rose-700 focus:bg-rose-700 text-white rounded-lg px-3 py-3 font-semibold' type='submit'>
                                        {isLoading ? <RotatingLines
                                            strokeColor="white"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            width="24"

                                            visible={true} /> : <span>Cadastrar</span>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastro