import Header from './components/organisms/Header'
import Carousel from './components/organisms/Carousel'
import ProductCard from './components/molecules/ProductCard'
import './App.css'

function App() {
   
  const produtos = [
    {id: 1, nome: "Moto custom", preco: "10,90", categoria: "Chaveiros", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_938283-MLB80382376487_112024-F-chaveiro-punisher-justiceiro-caveira-automototivo-moto-metal.webp"},
    {id: 2, nome: "Jaqueta preta", preco: "495,90", categoria: "Jaquetas", imagem: "https://http2.mlstatic.com/D_NQ_NP_2X_833593-MLA113612640465_062026-F.webp"},
    {id: 3, nome: "Capacete MotorZone", preco: "599,90", categoria: "Capacetes", imagem: "https://ae-pic-a1.aliexpress-media.com/kf/S887351b242bb45198361dad2fbd98b721.jpg_960x960q75.jpg_.avif"},
  ]

  return (
    <>
      <Header />
      <Carousel />

      <section className="products-grid">
        {produtos.map((item) => (
          <ProductCard
            key={item.id}
            imagem={item.imagem}
            nome={item.nome}
            preco={item.preco}
            categoria={item.categoria}
          />
        ))}
      </section>
    </>
  )
}

export default App