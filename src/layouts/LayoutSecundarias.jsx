import Header from 'components/Header';
import MenuLateral from 'components/Menu_Lateral';
import React from 'react'

const LayoutSecundarias = ({children}) => {
    return (
        <div>
            <Header/>
            <body>
                <MenuLateral />
                <main>
                    {children}
                </main>
            </body>
        </div>
    )
}

export default LayoutSecundarias;
