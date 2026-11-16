import './Benefits.css'

const Benefits = () => {
    return (
        <section className="benefits">

            <div className="benefit-item">
                <span className="benefit-icon">🚚</span>
                <div>
                    <h3>Frete Grátis</h3>
                    <p>Confira as regras</p>
                </div>
            </div>

            <div className="benefit-item">
                <span className="benefit-icon">📍</span>
                <div>
                    <h3>Nossas Lojas</h3>
                    <a href=""
                       rel="noopener noreferrer">
                        Encontre a mais próxima
                    </a>
                </div>
            </div>

            <div className="benefit-item">
                <span className="benefit-icon">💳</span>
                <div>
                    <h3>Até 10% OFF</h3>
                    <p>No PIX</p>
                </div>
            </div>

            <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div>
                    <h3>Até 10X</h3>
                    <p>Sem juros</p>
                </div>
            </div>

        </section>
    )
}

export default Benefits