import Header from "components/Header"
import MenuLateral from "components/Menu_Lateral"
import React from 'react'

const LayoutAdmin = ({children}) => {
    return (
        <div>
            <Header/>
            <body>
                <main>
                    {/* Barra lateral, si se desea modificar 
                    ir a components/Menu_Lateral */}
                    <MenuLateral />
                    {children}
                </main>
            </body>
        </div>
    )
}

export default LayoutAdmin;
