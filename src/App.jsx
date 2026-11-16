import Header from './organisms/Header'
import Carousel from './organisms/Carousel'
import Benefits from './organisms/Benefits/index.jsx'
import CarouselVideos from './organisms/CarouselVideos/index.jsx'

import './App.css'

function App() {
  return (
    <>
      <Header />
      <Carousel />

      <Benefits />

      <CarouselVideos />
    </>
  )
}

export default App