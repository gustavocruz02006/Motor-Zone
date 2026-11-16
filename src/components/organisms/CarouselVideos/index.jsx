
import { useRef, useState } from 'react';
import './CarouselVideos.css';

import video1 from '../../../assets/videos/video1.mp4';
import video2 from '../../../assets/videos/video2.mp4';
import video3 from '../../../assets/videos/video3.mp4';
import video4 from '../../../assets/videos/video4.mp4';


const videos = [
   video1,video2,video3,video4,video4,video4,video4,video4,video4,video4,video4,video4,video4,video4,video4
];

const CarouselVideos = () => {
    const [videoSelecionado, setVideoSelecionado] = useState(null);
    const [videoAtivo, setVideoAtivo] = useState(null);

    const carouselRef = useRef(null);
    const videoModalRef = useRef(null);

    function navegar(direcao) {
        if (!carouselRef.current) return;

        const distancia = carouselRef.current.clientWidth * 0.7;

        carouselRef.current.scrollBy({
            left: direcao === 'direita' ? distancia : -distancia,
            behavior: 'smooth'
        });
    }

    function reproduzirHover(index, videoElement) {
        setVideoAtivo(index);

        videoElement.play().catch(() => {
            setVideoAtivo(null);
        });
    }

    function pausarHover(videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        setVideoAtivo(null);
    }

    function abrirModal(video, index) {
        setVideoSelecionado({ video, index });
    }

    function fecharModal() {
        if (videoModalRef.current) {
            videoModalRef.current.pause();
            videoModalRef.current.currentTime = 0;
        }

        setVideoSelecionado(null);
    }

    return (
        <section className="carouselVideos">

            <div className="carouselVideos-header">
                <h2>MOTORZONE EXPERIENCE</h2>
                <p>Viva a experiência sobre duas rodas.</p>
            </div>

            <div className="carouselVideos-container">

                <button
                    className="carouselVideos-arrow prev"
                    onClick={() => navegar('esquerda')}
                    aria-label="Vídeos anteriores"
                >
                    &#10094;
                </button>

                <div className="carouselVideos-track" ref={carouselRef}>

                    {videos.map((video, index) => (
                        <div
                            className={`carouselVideos-item ${
                                videoAtivo === index ? 'active' : ''
                            }`}
                            key={index}
                            onMouseEnter={(event) =>
                                reproduzirHover(
                                    index,
                                    event.currentTarget.querySelector('video')
                                )
                            }
                            onMouseLeave={(event) =>
                                pausarHover(
                                    event.currentTarget.querySelector('video')
                                )
                            }
                            onClick={() => abrirModal(video, index)}
                        >
                            <video
                                src={video}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />

                            <div className="carouselVideos-overlay">
                                <span>▶</span>
                            </div>
                        </div>
                    ))}

                </div>

                <button
                    className="carouselVideos-arrow next"
                    onClick={() => navegar('direita')}
                    aria-label="Próximos vídeos"
                >
                    &#10095;
                </button>

            </div>

            {videoSelecionado && (
                <div
                    className="videoModal"
                    onClick={fecharModal}
                >
                    <button
                        className="videoModal-close"
                        onClick={fecharModal}
                        aria-label="Fechar vídeo"
                    >
                        &times;
                    </button>

                    <div
                        className="videoModal-content"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <video
                            ref={videoModalRef}
                            src={videoSelecionado.video}
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>
            )}

        </section>
    );
};

export default CarouselVideos;
