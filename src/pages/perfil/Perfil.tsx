import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { toastAlerta } from "../../utils/toastAlerta";
import ListaPostagens from "../../components/postagens/listaPostagem/ListaPostagens";

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta('Você precisa estar logado', "info")
            navigate("/login")
        }
    }, [usuario.token])



    return (
        <>
            <div className=" flex justify-center items-center">
                <div className="container mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl ">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center ">
                            <div className="w-full flex justify-center ">
                                <div className="relative w-40 h-40 overflow-hidden rounded-full shadow-xl border-none -m-16 -ml-20 lg:-ml-16">
                                <img src={usuario.foto !== '' ? usuario.foto : 'https://i.imgur.com/bRpa5Bk.jpg'}
                                className="object-cover w-full h-full" />
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                                {usuario.nome}</h3>
                        </div >

                        <div className="text-center mt-2">
                            <p className="text-1xl text-slate-700 font-bold leading-normal mb-1">
                                {usuario.usuario}</p>
                        </div >
                       
                        <div className="text-center mt-2">
                            <p className="text-1xl text-slate-700 font-bold leading-normal mb-1">
                            {usuario.nascimento !== undefined ? new Date(usuario.nascimento).toLocaleDateString() : ''}</p>
                        </div >
                        <ListaPostagens />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Perfil