import { ReactNode, useContext } from 'react'
import { GithubLogo } from '@phosphor-icons/react'

import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="flex justify-center bg-gradient-to-tr from-rose-500 to-rose-600 bg-clip-border text-white shadow-lg shadow-pink-500/40 rounded-xl">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Doe Ação | © {data}
                    </p>
                    <p className='text-lg'>Acesse o nosso GitHub</p>
                    <div className='flex gap-2'>
                        <a href='https://linktr.ee/doeacao' className="shadow hover:shadow-slate-200 animate-neon-hover" target='_blank' rel='noopener noreferrer'>
                            <GithubLogo size={48} weight='bold' />
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {component}
        </>
    )
}

export default Footer
