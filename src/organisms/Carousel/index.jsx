import {useState} from 'react'
import './Carousel.css'

import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'

const Carousel = () => {

    const imagens = [banner1, banner2,];

    const [imagemAtual, setImagemAtual] = useState(0);

    function proximaImagem() {
        setImagemAtual((prev) => (prev + 1) % imagens.length);
    }

    function imagemAnterior() {
        setImagemAtual((prev) => (prev - 1 + imagens.length) % imagens.length);
    }

    return(
        <section className="carousel">
            <button onClick={imagemAnterior}>❮</button>

            <img src={imagens[imagemAtual]} alt="Banner Motor Zone" />

            <button onClick={proximaImagem}>❯</button>
        </section>
    )
}

export default Carousel