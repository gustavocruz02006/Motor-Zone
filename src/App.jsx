import Header from './components/organisms/Header'
import Carousel from './components/organisms/Carousel'
import Benefits from './components/organisms/Benefits/index.jsx'
import CarouselVideos from './components/organisms/CarouselVideos/index.jsx'
import './App.css'
import ProductList from './components/molecules/ProductList.jsx'

function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Benefits />
      <CarouselVideos />
      <ProductList/>
    </>
  )
}

export default App