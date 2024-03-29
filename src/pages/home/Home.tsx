import ListaPostagens from "../../components/postagens/listaPostagem/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagens"


function Home() {
    
    return (
        <>
            <div className="bg-white flex justify-center">
                <div className='container grid grid-cols-2 text-black'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4 h-screen">
                        <h2 className='text-5xl font-bold text-rose-500'>
                            Onde boas intenções encontram boas doações
                        </h2>
                        <p className='text-xl'>
                        A plataforma Doe Ação é uma rede caritativa que visa promover uma cultura de solidariedade, permitindo que pessoas se envolvam em causas sociais e façam a diferença no mundo.
                        </p>

                        <div className="flex justify-around gap-4 self-start">

                            <a 
                            href="#listaPostagensSection"
                            className=' text-white bg-rose-500   border-2 border-rose-500 py-2 px-4 mr-2
                            rounded font-bold border-solid 
                            transition-all hover:shadow-lg hover:shadow-rose-500/40 active:opacity-[0.85]
                            '>Ver Postagens</a>
                            <div className='rounded text-rose-500 border-rose-500 font-bold border-solid border-2 py-2 px-4
                                            transition-all hover:shadow-lg hover:shadow-rose-500/40 active:opacity-[0.85]
                                            '>
                                 <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="object-contain w-full h-full flex items-center ">
                        <img
                            src="https://i.imgur.com/ncSVCT9.png"
                            alt="Imagem Página Home"
                            className='w-3/3'
                        />
                    </div>
                </div>
            </div>
            <div id="listaPostagensSection">
                <ListaPostagens />
            </div>

        </>
    )
}

export default Home