import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiStar } from 'react-icons/fi';
import { addToCart, updateQuantity } from '../../modules/user/store/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

  // Find if this product is already in the cart to render quantity selector instead of ADD
  const cartItem = cartItems.find(item => item.id === product.id && item.type === 'medicine');
  const quantityInCart = cartItem ? cartItem.qty : 0;

  const handleAdd = (e) => {
    e.stopPropagation(); // Avoid triggering card click navigation
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      type: 'medicine',
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      packSize: product.packSize,
      brand: product.brand
    }));
  };

  const handleQtyChange = (change, e) => {
    e.stopPropagation();
    dispatch(updateQuantity({
      id: product.id,
      type: 'medicine',
      change
    }));
  };

  const navigateToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={navigateToDetails}
      className="bg-white rounded-3xl p-4 border border-slate-100 hover:border-forest/30 shadow-premium hover:shadow-premium-hover hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden select-none transition-all duration-300 group"
    >
      {/* Discount Badge */}
      {product.discountPercent > 0 && (
        <span className="absolute top-3.5 left-3.5 bg-coral text-white text-[10px] font-black px-2.5 py-0.5 rounded-full z-10 shadow-sm animate-pulse-subtle">
          {product.discountPercent}% OFF
        </span>
      )}

      {/* Product Image */}
      <div className="w-full h-32 flex items-center justify-center mb-3 bg-slate-50/60 rounded-2xl overflow-hidden p-2">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.06] transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand/Mfg */}
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-0.5 truncate">
            {product.brand}
          </span>
          {/* Title */}
          <h4 className="text-sm font-extrabold text-slate-800 line-clamp-2 leading-tight min-h-[36px] hover:text-forest transition-colors">
            {product.name}
          </h4>
          {/* Pack Size */}
          <span className="text-[11px] text-slate-500 font-medium block mt-1">
            {product.packSize}
          </span>
        </div>

        {/* Rating and Pricing Row */}
        <div className="mt-3.5 pt-3 border-t border-slate-50">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5 bg-yellow-50 text-gold-dark text-[10px] font-black px-1.5 py-0.5 rounded">
              <FiStar className="fill-gold stroke-gold" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold">({product.reviewsCount} reviews)</span>
          </div>

          <div className="flex items-end justify-between">
            {/* Pricing */}
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-[11px] text-slate-400 line-through font-medium leading-none">
                    ₹{product.price}
                  </span>
                  <span className="text-base font-black text-slate-900 leading-tight">
                    ₹{product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-base font-black text-slate-900">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* Add to Cart / Quantity Selector */}
            <div className="relative z-10">
              {quantityInCart > 0 ? (
                <div className="flex items-center bg-forest text-white rounded-full overflow-hidden p-1 shadow-sm">
                  <button
                    onClick={(e) => handleQtyChange(-1, e)}
                    className="p-1 hover:bg-forest-dark text-white rounded-full transition-colors"
                  >
                    <FiMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 text-xs font-black select-none">{quantityInCart}</span>
                  <button
                    onClick={(e) => handleQtyChange(1, e)}
                    className="p-1 hover:bg-forest-dark text-white rounded-full transition-colors"
                  >
                    <FiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdd}
                  className="bg-forest hover:bg-forest-dark text-white font-bold text-xs px-5 py-2 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1"
                >
                  <FiPlus className="w-3.5 h-3.5 stroke-[3px]" />
                  <span>ADD</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
