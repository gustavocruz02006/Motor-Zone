import './ProductCard.css';

const ProductCard = ({ imagem, nome, preco, categoria }) => {
    return (
        <div className='product-card'>
            <img src={imagem} alt={nome} className='product-image' />
            <span className='product-category'>{categoria}</span>
            <h3 className='product-title'>{nome}</h3>
            <p className='product-price'>R$ {preco}</p>
            <button className='product-btn'>
                Adicionar ao carrinho
            </button>
        </div>
    );
};

export default ProductCard;