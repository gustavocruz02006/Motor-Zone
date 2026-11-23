import { useState } from "react";
import { StoreProvider } from "./context/StoreContext";
import Header from "./components/organisms/Header";
import Carousel from "./components/organisms/Carousel";
import Benefits from "./components/organisms/Benefits/index.jsx";
import CarouselVideos from "./components/organisms/CarouselVideos/index.jsx";
import ProductList from "./components/molecules/ProductList.jsx";
import Footer from "./components/organisms/Footer/index.jsx";
import AdminPanel from "./components/organisms/AdminPanel/index.jsx";
import "./App.css";

function AppContent() {
  const [view, setView] = useState("store");

  return (
    <>
      <Header currentView={view} onNavigate={setView} />

      {view === "admin" ? (
        <AdminPanel onBackToStore={() => setView("store")} />
      ) : (
        <div id="inicio">
          <Carousel />
          <Benefits />
          <CarouselVideos />
          <ProductList />
        </div>
      )}

      <Footer />
    </>
  );
}

function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;