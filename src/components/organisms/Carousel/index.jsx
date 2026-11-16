import {useState} from 'react'
import './Carousel.css'

<<<<<<< HEAD:src/organisms/Carousel/index.jsx
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.png'
import banner4 from '../../assets/banner4.png'
import banner5 from '../../assets/banner5.png'
=======
import banner1 from "../../../assets/banner1.jpg";
import banner2 from "../../../assets/banner2.jpg";
>>>>>>> ed36e4c64ea1b0e4eedaf8ab4fd1cd80fb8d195d:src/components/organisms/Carousel/index.jsx

const Carousel = () => {

    const imagens = [banner1, banner2, banner3, banner4, banner5];

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