import logo from '../../assets/logo.png'

import './Header.css'

const Header = () => {
    
     const itens = [
        {id: 1, href: "/inicio", item: "Início"},
        {id: 2, href: "/sobre nós", item: "Marcas"},
        {id: 3, href: "/carrinho", item: "Sobre nós"},
    ]

    return (
        <>
            <header>
                <div className="logo">
                    <img src={logo} alt="Logo Motor Zone" />
                </div>

                <nav>
                    {itens.map((item) => (
                        <a key={item.id} href={item.href}>
                            {item.item}
                        </a>
                    ))}
                </nav>
            </header>
        </>
    )
}

export default Header