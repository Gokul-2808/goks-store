
import { supabase } from './lib/supabase';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowDownRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  X,
  Leaf,
  Plus,
  Minus,
  Check,
  Trash2,
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Eye,
  Mail,
  ChevronRight,
  Star,
} from 'lucide-react';
import './App.css';

// ========================================
// GOKS — PREMIUM STOREFRONT
// React + Framer Motion
// Prices are in Indian Rupees (INR).
// ========================================

const PRODUCTS = [
  {
    id: 1, name: 'Sculptural Ceramic Vase', category: 'Home Decor', price: 1299, originalPrice: 1599,
    rating: 4.8, reviews: 124, badge: 'BESTSELLER', color: 'Ivory', stock: 18,
    description: 'A sculptural ceramic vase with an organic silhouette. Designed to bring understated elegance to shelves, consoles and dining tables.',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2, name: 'Everyday Canvas Tote', category: 'Accessories', price: 799, originalPrice: 999,
    rating: 4.7, reviews: 89, badge: 'POPULAR', color: 'Natural Beige', stock: 32,
    description: 'A versatile everyday tote for daily essentials, weekend outings and everything in between.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3, name: 'Minimal Ceramic Dinner Set', category: 'Tableware', price: 2499, originalPrice: 2999,
    rating: 4.9, reviews: 156, badge: 'BESTSELLER', color: 'Warm White', stock: 12,
    description: 'An elegant ceramic dinner set with clean lines and a timeless finish, made for everyday meals and special occasions.',
    image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4, name: 'Modern Desk Organizer', category: 'Workspace', price: 999, originalPrice: 1199,
    rating: 4.6, reviews: 72, badge: '', color: 'Natural Wood', stock: 21,
    description: 'Keep your workspace tidy with a minimalist organizer designed for your everyday essentials.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5, name: 'Textured Table Lamp', category: 'Home Decor', price: 1899, originalPrice: 2299,
    rating: 4.8, reviews: 103, badge: 'NEW', color: 'Sand', stock: 9,
    description: 'A softly textured table lamp that creates a warm atmosphere for quiet evenings, reading corners and bedside tables.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6, name: 'Everyday Water Bottle', category: 'Accessories', price: 599, originalPrice: 749,
    rating: 4.5, reviews: 64, badge: '', color: 'Sage Green', stock: 40,
    description: 'A simple, reusable water bottle for your commute, desk and weekend adventures.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7, name: 'Handcrafted Serving Bowl', category: 'Tableware', price: 899, originalPrice: 1099,
    rating: 4.7, reviews: 91, badge: '', color: 'Earth Brown', stock: 16,
    description: 'A beautifully understated serving bowl that adds natural texture to your table.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8, name: 'Minimal Weekly Planner', category: 'Workspace', price: 449, originalPrice: 549,
    rating: 4.6, reviews: 58, badge: 'NEW', color: 'Cream', stock: 35,
    description: 'A clean weekly planner designed to help you organise tasks, priorities and ideas.',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 9, name: 'Ribbed Ceramic Planter', category: 'Home Decor', price: 699, originalPrice: 849,
    rating: 4.7, reviews: 67, badge: 'POPULAR', color: 'Stone', stock: 24,
    description: 'A ribbed ceramic planter that gives favourite indoor plants a calm, considered home.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 10, name: 'Amber Glass Candle', category: 'Home Decor', price: 549, originalPrice: 699,
    rating: 4.8, reviews: 82, badge: '', color: 'Amber', stock: 28,
    description: 'A warm, softly glowing candle in an amber glass vessel for slow evenings and cosy corners.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 11, name: 'Woven Storage Basket', category: 'Home Decor', price: 1199, originalPrice: 1399,
    rating: 4.6, reviews: 49, badge: '', color: 'Natural', stock: 14,
    description: 'A versatile woven basket for throws, magazines and everyday essentials, adding texture without clutter.',
    image: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 12, name: 'Abstract Table Sculpture', category: 'Home Decor', price: 1499, originalPrice: 1799,
    rating: 4.8, reviews: 43, badge: 'NEW', color: 'Terracotta', stock: 8,
    description: 'An artful sculptural accent with a modern silhouette, made for shelves, sideboards and consoles.',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 13, name: 'Soft Cotton Cushion Cover', category: 'Home Decor', price: 499, originalPrice: 649,
    rating: 4.5, reviews: 76, badge: '', color: 'Oatmeal', stock: 30,
    description: 'A tactile cotton cushion cover in a versatile neutral shade to soften sofas, chairs and beds.',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 14, name: 'Everyday Crossbody Bag', category: 'Accessories', price: 1299, originalPrice: 1599,
    rating: 4.7, reviews: 93, badge: 'POPULAR', color: 'Tan', stock: 17,
    description: 'A compact crossbody bag with room for daily essentials and a clean shape that pairs with everything.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 15, name: 'Classic Card Holder', category: 'Accessories', price: 499, originalPrice: 649,
    rating: 4.6, reviews: 57, badge: '', color: 'Cognac', stock: 26,
    description: 'A slim card holder for keeping the essentials close without adding bulk to your pocket or bag.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 16, name: 'Minimal Hoop Earrings', category: 'Accessories', price: 699, originalPrice: 899,
    rating: 4.8, reviews: 118, badge: 'BESTSELLER', color: 'Gold Tone', stock: 20,
    description: 'Simple, lightweight hoops designed to move easily from everyday outfits to evening plans.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 17, name: 'Everyday Sunglasses', category: 'Accessories', price: 999, originalPrice: 1299,
    rating: 4.5, reviews: 61, badge: 'NEW', color: 'Tortoiseshell', stock: 13,
    description: 'A timeless frame with a clean silhouette for sunny commutes, weekends and holidays.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 18, name: 'Soft Everyday Scarf', category: 'Accessories', price: 899, originalPrice: 1099,
    rating: 4.7, reviews: 46, badge: '', color: 'Moss', stock: 19,
    description: 'A soft, easy-to-style scarf that adds a thoughtful layer of colour and texture.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 19, name: 'Stoneware Coffee Mug', category: 'Tableware', price: 399, originalPrice: 499,
    rating: 4.8, reviews: 142, badge: 'BESTSELLER', color: 'Speckled Cream', stock: 42,
    description: 'A comfortable stoneware mug with a tactile finish for the small ritual of your morning coffee.',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 20, name: 'Speckled Pasta Bowl', category: 'Tableware', price: 649, originalPrice: 799,
    rating: 4.7, reviews: 73, badge: '', color: 'Ivory Speckle', stock: 25,
    description: 'A generous bowl for pasta, salads and comforting meals, finished in an understated speckled glaze.',
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 21, name: 'Minimal Serving Tray', category: 'Tableware', price: 1099, originalPrice: 1299,
    rating: 4.6, reviews: 54, badge: '', color: 'Oak', stock: 11,
    description: 'A clean-lined serving tray for coffee, breakfast and thoughtful little hosting moments.',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 23, name: 'Linen Table Runner', category: 'Tableware', price: 899, originalPrice: 1099,
    rating: 4.6, reviews: 39, badge: '', color: 'Natural Flax', stock: 15,
    description: 'A relaxed linen table runner that adds natural texture to everyday meals and weekend gatherings.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 24, name: 'Hardcover Idea Journal', category: 'Workspace', price: 599, originalPrice: 749,
    rating: 4.8, reviews: 96, badge: 'POPULAR', color: 'Forest Green', stock: 33,
    description: 'A thoughtfully simple journal for notes, sketches, plans and the ideas worth keeping.',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 25, name: 'Brass Desk Pen', category: 'Workspace', price: 349, originalPrice: 449,
    rating: 4.6, reviews: 51, badge: '', color: 'Brass', stock: 29,
    description: 'A refined everyday writing instrument that brings a considered detail to your desk.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 26, name: 'Wooden Monitor Stand', category: 'Workspace', price: 1599, originalPrice: 1899,
    rating: 4.7, reviews: 64, badge: 'NEW', color: 'Natural Oak', stock: 10,
    description: 'Lift your screen and make room for the everyday essentials with this warm, minimal desk stand.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 27, name: 'Compact Desk Lamp', category: 'Workspace', price: 1399, originalPrice: 1699,
    rating: 4.7, reviews: 48, badge: '', color: 'Matte Black', stock: 7,
    description: 'A compact task lamp with a clean profile for focused work, reading and late-night notes.',
    image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 28, name: 'Felt Desk Mat', category: 'Workspace', price: 749, originalPrice: 899,
    rating: 4.5, reviews: 37, badge: '', color: 'Charcoal', stock: 23,
    description: 'A soft felt desk mat that creates a calmer workspace and gives your keyboard and notebook a home.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
  },
];

const CATEGORIES = [
  { name: 'All Products', count: PRODUCTS.length },
  { name: 'Home Decor', count: PRODUCTS.filter((p) => p.category === 'Home Decor').length },
  { name: 'Accessories', count: PRODUCTS.filter((p) => p.category === 'Accessories').length },
  { name: 'Tableware', count: PRODUCTS.filter((p) => p.category === 'Tableware').length },
  { name: 'Workspace', count: PRODUCTS.filter((p) => p.category === 'Workspace').length },
];

const SHIPPING_THRESHOLD = 1999;
const DELIVERY_FEE = 99;

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const revealViewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -35px 0px',
};

// ========================================
// REUSABLE COMPONENTS
// ========================================

function IconButton({ label, onClick, children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`icon-button ${className}`}
      aria-label={label}
      title={label}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

function Reveal({ children, className = '', delay = 0, reducedMotion }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reducedMotion ? false : 'hidden'}
      whileInView={reducedMotion ? undefined : 'visible'}
      viewport={revealViewport}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ========================================
// PRODUCT CARD
// ========================================

function ProductCard({
  product,
  isWishlisted,
  onWishlist,
  onAddToCart,
  onQuickView,
  reducedMotion,
  index,
}) {
  return (
    <motion.article
      className="product-card"
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : (index % 4) * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="product-image-wrap">
        <button
          type="button"
          className="product-image-button"
          onClick={() => onQuickView(product)}
          aria-label={`View ${product.name}`}
        >
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              // If the Supabase image fails, retry with the original local image.
              const imageElement = event.currentTarget;
              const localProduct = PRODUCTS.find(
                (item) => item.name === product.name,
              );
              const fallbackImage = localProduct?.image;

              if (
                fallbackImage &&
                imageElement.dataset.fallbackTried !== 'true' &&
                imageElement.src !== fallbackImage
              ) {
                imageElement.dataset.fallbackTried = 'true';
                imageElement.src = fallbackImage;
              } else {
                imageElement.style.opacity = '0.25';
              }
            }}
          />
        </button>

        {product.badge && (
          <span className="product-badge">{product.badge}</span>
        )}

        <IconButton
          label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`wishlist-button ${isWishlisted ? 'is-wishlisted' : ''}`}
          aria-pressed={isWishlisted}
          onClick={() => onWishlist(product.id)}
        >
          <motion.span
            animate={
              isWishlisted && !reducedMotion
                ? { scale: [1, 1.2, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.25 }}
          >
            <Heart
              size={19}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </motion.span>
        </IconButton>

        <button
          type="button"
          className="quick-view-button"
          onClick={() => onQuickView(product)}
        >
          <Eye size={15} />
          Quick view
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <button
          type="button"
          className="product-name-button"
          onClick={() => onQuickView(product)}
        >
          <h3 className="product-name">{product.name}</h3>
        </button>

        <div
          className="product-rating"
          aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}
        >
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price-row">
          <div className="product-prices">
            <span className="product-price">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="product-original-price">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <IconButton
            label={`Add ${product.name} to cart`}
            className="add-product-button"
            onClick={() => onAddToCart(product)}
          >
            <Plus size={18} />
          </IconButton>
        </div>
      </div>
    </motion.article>
  );
}

// ========================================
// MAIN APP
// ========================================

export default function App() {
  const reducedMotion = useReducedMotion();

  // Start with the local catalogue, then replace it with Supabase data.
  // Local metadata is retained as a fallback for fields not yet filled in the database.
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showSearch, setShowSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  // Load active products from Supabase while preserving the current storefront details.
  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, original_price, image_url, category, stock, rating, reviews, badge, color')
        .eq('is_active', true)
        .order('id', { ascending: true });

      if (error) {
        console.error('Could not load products from Supabase:', error.message);
        return; // Keep the local catalogue visible if the request fails.
      }

      if (cancelled || !data) return;

      const localByName = new Map(PRODUCTS.map((product) => [product.name, product]));
      const databaseProducts = data
        .filter((row) => row.name !== 'Ripple Glass Tumbler Set')
        .map((row) => {
        const local = localByName.get(row.name) || {};
        return {
          ...local,
          id: row.id,
          name: row.name,
          description: row.description || local.description || '',
          price: Number(row.price ?? local.price ?? 0),
          originalPrice: Number(row.original_price ?? local.originalPrice ?? row.price ?? 0),
          image: row.image_url || local.image || '',
          category: row.category || local.category || 'Other',
          stock: Number(row.stock ?? local.stock ?? 0),
          rating: Number(row.rating ?? local.rating ?? 4.5),
          reviews: Number(row.reviews ?? local.reviews ?? 0),
          badge: row.badge ?? local.badge ?? '',
          color: row.color ?? local.color ?? 'Natural',
        };
      });

      setProducts(databaseProducts);
    }

    loadProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  const toastTimeout = useRef(null);
  const searchInputRef = useRef(null);

  // ----------------------------------------
  // CLEANUP
  // ----------------------------------------

  useEffect(() => {
    return () => {
      if (toastTimeout.current) {
        window.clearTimeout(toastTimeout.current);
      }
    };
  }, []);

  // ----------------------------------------
  // STICKY HEADER STATE
  // ----------------------------------------

  useEffect(() => {
    let previousScrolledState = false;

    const handleScroll = () => {
      const nextScrolledState = window.scrollY > 24;

      if (nextScrolledState !== previousScrolledState) {
        previousScrolledState = nextScrolledState;
        setIsScrolled(nextScrolledState);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // ----------------------------------------
  // BODY SCROLL LOCK FOR OVERLAYS
  // ----------------------------------------

  const hasOverlay =
    showCart || Boolean(quickViewProduct) || Boolean(orderConfirmation);

  useEffect(() => {
    if (!hasOverlay) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasOverlay]);

  // ----------------------------------------
  // KEYBOARD ACCESSIBILITY
  // ----------------------------------------

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;

      if (orderConfirmation) {
        setOrderConfirmation(null);
      } else if (quickViewProduct) {
        setQuickViewProduct(null);
      } else if (showCart) {
        setShowCart(false);
        setCheckoutStep(false);
      } else if (showSearch) {
        setShowSearch(false);
      } else if (showMobileMenu) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    orderConfirmation,
    quickViewProduct,
    showCart,
    showSearch,
    showMobileMenu,
  ]);

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  // ----------------------------------------
  // TOAST NOTIFICATIONS
  // ----------------------------------------

  const notify = useCallback((message) => {
    if (toastTimeout.current) {
      window.clearTimeout(toastTimeout.current);
    }

    setToast(message);

    toastTimeout.current = window.setTimeout(() => {
      setToast('');
      toastTimeout.current = null;
    }, 2600);
  }, []);

  // ----------------------------------------
  // FILTER AND SORT PRODUCTS
  // ----------------------------------------

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'All Products') {
      result = result.filter(
        (product) => product.category === activeCategory,
      );
    }

    if (showWishlistOnly) {
      result = result.filter((product) => wishlist.includes(product.id));
    }

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        [
          product.name,
          product.category,
          product.description,
          product.color,
        ].some((value) => value.toLowerCase().includes(query)),
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy, showWishlistOnly, wishlist]);

  // ----------------------------------------
  // CART TOTALS
  // ----------------------------------------

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee =
    subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : DELIVERY_FEE;

  const total = subtotal + deliveryFee;

  const remainingForFreeShipping = Math.max(
    0,
    SHIPPING_THRESHOLD - subtotal,
  );

  // ----------------------------------------
  // WISHLIST
  // ----------------------------------------

  const toggleWishlist = (productId) => {
    const alreadySaved = wishlist.includes(productId);

    setWishlist((previous) =>
      alreadySaved
        ? previous.filter((id) => id !== productId)
        : [...previous, productId],
    );

    notify(
      alreadySaved
        ? 'Removed from your wishlist'
        : 'Added to your wishlist',
    );
  };

  // ----------------------------------------
  // CART ACTIONS
  // ----------------------------------------

  const addToCart = (product, quantity = 1) => {
    setCart((previous) => {
      const existingItem = previous.find((item) => item.id === product.id);

      if (existingItem) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...previous, { ...product, quantity }];
    });

    notify(`${product.name} added to your bag`);
    setQuickViewProduct(null);
  };

  const updateQuantity = (productId, change) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((previous) => previous.filter((item) => item.id !== productId));
    notify('Item removed from your bag');
  };

  // ----------------------------------------
  // NAVIGATION
  // ----------------------------------------

  const goToProducts = () => {
    setShowMobileMenu(false);
    setShowWishlistOnly(false);

    document.getElementById('products')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const chooseCategory = (category) => {
    setActiveCategory(category);
    setShowWishlistOnly(false);
    setShowMobileMenu(false);

    document.getElementById('products')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const openWishlist = () => {
    setShowWishlistOnly((previous) => !previous);
    setActiveCategory('All Products');
    setShowMobileMenu(false);

    window.setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }, 50);
  };

  // ----------------------------------------
  // NEWSLETTER
  // ----------------------------------------

  const handleNewsletter = (event) => {
    event.preventDefault();

    const email = newsletterEmail.trim();

    if (!email) {
      setNewsletterMessage('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    // Demo only. Connect a backend to save subscriptions.
    setNewsletterMessage('Thank you for joining the GOKS community!');
    setNewsletterEmail('');
  };

  // ----------------------------------------
  // CHECKOUT
  // ----------------------------------------

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    setCheckoutError('');

    if (!cart.length) {
      setCheckoutError('Your shopping bag is empty.');
      return;
    }

    const { name, email, phone, address, city, pincode } = customer;

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      setCheckoutError('Please complete all delivery details.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setCheckoutError('Please enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      setCheckoutError('Enter a valid 10-digit mobile number.');
      return;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      setCheckoutError('Enter a valid 6-digit PIN code.');
      return;
    }

    // Demo only: order is kept in React state.
    // No payment is collected and no database is written.
    const order = {
      id: `GKS${Date.now().toString().slice(-8)}`,
      items: cart.map((item) => ({ ...item })),
      subtotal,
      deliveryFee,
      total,
      customer: { ...customer },
      createdAt: new Date().toISOString(),
    };

    setOrderConfirmation(order);
    setCart([]);
    setCheckoutStep(false);
    setShowCart(false);

    setCustomer({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      pincode: '',
    });
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className={`app ${isScrolled ? 'is-scrolled' : ''}`}>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <p>
          Thoughtful finds for everyday living
          <span className="announcement-separator"> · </span>
          Free delivery on orders above {formatINR(SHIPPING_THRESHOLD)}
        </p>
      </div>

      {/* Header */}
      <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="header-inner">
          <div className="header-left">
            <IconButton
              label={showMobileMenu ? 'Close menu' : 'Open menu'}
              className="mobile-menu-button"
              aria-expanded={showMobileMenu}
              onClick={() => setShowMobileMenu((previous) => !previous)}
            >
              {showMobileMenu ? <X size={22} /> : <Menu size={22} />}
            </IconButton>

            <nav className="desktop-nav" aria-label="Main navigation">
              <button type="button" onClick={goToProducts}>
                Shop
              </button>
              <button
                type="button"
                onClick={() => chooseCategory('Home Decor')}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => chooseCategory('Accessories')}
              >
                Accessories
              </button>
              <button
                type="button"
                onClick={() =>
                  document.getElementById('our-story')?.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                  })
                }
              >
                Our Story
              </button>
            </nav>
          </div>

          <button
            type="button"
            className="brand-logo"
            aria-label="GOKS home"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? 'auto' : 'smooth',
              });
              setActiveCategory('All Products');
              setShowWishlistOnly(false);
              setSearchQuery('');
            }}
          >
            GOKS<span className="brand-dot">.</span>
            <span className="brand-tagline">THOUGHTFULLY CURATED</span>
          </button>

          <div className="header-actions">
            <IconButton
              label={showSearch ? 'Close search' : 'Search products'}
              aria-expanded={showSearch}
              onClick={() => setShowSearch((previous) => !previous)}
            >
              {showSearch ? <X size={21} /> : <Search size={21} />}
            </IconButton>

            <IconButton
              label={`Wishlist, ${wishlist.length} saved items`}
              className="header-wishlist"
              aria-pressed={showWishlistOnly}
              onClick={openWishlist}
            >
              <Heart
                size={21}
                fill={showWishlistOnly ? 'currentColor' : 'none'}
              />
              {wishlist.length > 0 && (
                <span className="header-count">{wishlist.length}</span>
              )}
            </IconButton>

            <IconButton
              label={`Shopping bag, ${cartCount} items`}
              className="cart-header-button"
              onClick={() => {
                setCheckoutStep(false);
                setShowCart(true);
              }}
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="header-count"
                  initial={reducedMotion ? false : { scale: 0.75 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </IconButton>
          </div>
        </div>

        {/* Search panel */}
        <AnimatePresence initial={false}>
          {showSearch && (
            <motion.div
              className="search-panel"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
            >
              <div className="search-panel-inner">
                <Search size={20} />

                <input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search products, categories and more..."
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setShowWishlistOnly(false);
                  }}
                  aria-label="Search products"
                />

                {searchQuery && (
                  <IconButton
                    label="Clear search"
                    onClick={() => setSearchQuery('')}
                  >
                    <X size={18} />
                  </IconButton>
                )}

                <IconButton
                  label="Close search"
                  onClick={() => setShowSearch(false)}
                >
                  <X size={20} />
                </IconButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile navigation */}
        <AnimatePresence initial={false}>
          {showMobileMenu && (
            <motion.nav
              className="mobile-nav"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
              aria-label="Mobile navigation"
            >
              <button type="button" onClick={goToProducts}>
                Shop all products <ChevronRight size={17} />
              </button>

              {CATEGORIES.slice(1).map((category) => (
                <button
                  type="button"
                  key={category.name}
                  onClick={() => chooseCategory(category.name)}
                >
                  {category.name} <ChevronRight size={17} />
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowMobileMenu(false);
                  document.getElementById('our-story')?.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                  });
                }}
              >
                Our Story <ChevronRight size={17} />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero */}
        <section className="hero-section">
          <motion.div
            className="hero-copy"
            initial={reducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              LESS, BUT BETTER
            </div>

            <h1>
              Little things.
              <br />
              <em>Lasting</em> joy.
            </h1>

            <p className="hero-description">
              Discover thoughtfully curated essentials that bring beauty,
              simplicity and a little more meaning to your everyday.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="primary-button"
                onClick={goToProducts}
              >
                Explore the collection <ArrowRight size={17} />
              </button>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  document.getElementById('our-story')?.scrollIntoView({
                    behavior: reducedMotion ? 'auto' : 'smooth',
                  })
                }
              >
                Our philosophy <ArrowDownRight size={17} />
              </button>
            </div>

            <div className="hero-note">
              <div className="hero-note-icon">
                <Leaf size={18} />
              </div>
              <div>
                <strong>Made for everyday living</strong>
                <span>Thoughtful design. Timeless appeal.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.8,
              delay: reducedMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90"
              alt="Calm, minimal home interior with natural textures"
              className="hero-image"
              fetchPriority="high"
            />

            <div className="hero-image-label">
              <span className="hero-label-dot" />
              A LITTLE MORE INTENTIONAL
            </div>

            <div className="hero-floating-card">
              <Sparkles size={20} />
              <div>
                <strong>Everyday essentials</strong>
                <span>Curated with care</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Benefits */}
        <Reveal reducedMotion={reducedMotion}>
          <section className="benefits-strip" aria-label="Our benefits">
            <div className="benefit-item">
              <Leaf size={21} />
              <div>
                <strong>Thoughtfully chosen</strong>
                <span>Quality over quantity</span>
              </div>
            </div>

            <div className="benefit-item">
              <Truck size={21} />
              <div>
                <strong>Easy delivery</strong>
                <span>Free above {formatINR(SHIPPING_THRESHOLD)}</span>
              </div>
            </div>

            <div className="benefit-item">
              <ShieldCheck size={21} />
              <div>
                <strong>Secure experience</strong>
                <span>Checkout-ready design</span>
              </div>
            </div>

            <div className="benefit-item">
              <RotateCcw size={21} />
              <div>
                <strong>Here to help</strong>
                <span>Customer-first service</span>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Product collection */}
        <section className="products-section" id="products">
          <Reveal reducedMotion={reducedMotion}>
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  THE GOKS COLLECTION
                </div>

                <h2>
                  Find your <em>everyday</em> favourite.
                </h2>

                <p className="section-description">
                  Useful, beautiful things that feel right at home.
                </p>
              </div>

              <button
                type="button"
                className="text-button view-all-button"
                onClick={() => {
                  setActiveCategory('All Products');
                  setShowWishlistOnly(false);
                  setSearchQuery('');
                }}
              >
                View all <ArrowRight size={17} />
              </button>
            </div>
          </Reveal>

          <div className="product-toolbar">
            <div className="category-filters" aria-label="Filter by category">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category.name}
                  className={`category-chip ${
                    activeCategory === category.name && !showWishlistOnly
                      ? 'active'
                      : ''
                  }`}
                  aria-pressed={
                    activeCategory === category.name && !showWishlistOnly
                  }
                  onClick={() => {
                    setActiveCategory(category.name);
                    setShowWishlistOnly(false);
                  }}
                >
                  {category.name}
                </button>
              ))}

              <button
                type="button"
                className={`category-chip wishlist-filter ${
                  showWishlistOnly ? 'active' : ''
                }`}
                aria-pressed={showWishlistOnly}
                onClick={() => {
                  setShowWishlistOnly((previous) => !previous);
                  setActiveCategory('All Products');
                }}
              >
                <Heart size={14} /> Wishlist
              </button>
            </div>

            <label className="sort-control">
              <SlidersHorizontal size={16} />
              <span className="sort-label">Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>

          {(searchQuery || showWishlistOnly) && (
            <div className="results-message">
              <span>
                {showWishlistOnly
                  ? 'Your wishlist'
                  : `Search results for "${searchQuery}"`}
              </span>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowWishlistOnly(false);
                  setActiveCategory('All Products');
                }}
              >
                Clear filters <X size={14} />
              </button>
            </div>
          )}

          <div className="product-results-count" aria-live="polite">
            Showing {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              className="products-grid"
              layout={!reducedMotion}
              transition={{
                layout: { duration: reducedMotion ? 0 : 0.25 },
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    reducedMotion={reducedMotion}
                    isWishlisted={wishlist.includes(product.id)}
                    onWishlist={toggleWishlist}
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="empty-products"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
            >
              <div className="empty-products-icon">
                <Search size={28} />
              </div>

              <h3>No products found</h3>
              <p>Try another search or explore our full collection.</p>

              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSearchQuery('');
                  setShowWishlistOnly(false);
                  setActiveCategory('All Products');
                }}
              >
                Show all products <ArrowRight size={17} />
              </button>
            </motion.div>
          )}
        </section>

        {/* Brand story */}
        <section className="story-section" id="our-story">
          <Reveal
            className="story-image-wrap"
            reducedMotion={reducedMotion}
          >
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
              alt="Warm and thoughtfully styled living space"
              className="story-image"
              loading="lazy"
            />

            <div className="story-image-caption">
              <Leaf size={17} />
              Designed around the everyday
            </div>
          </Reveal>

          <Reveal
            className="story-copy"
            delay={0.08}
            reducedMotion={reducedMotion}
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              A NOTE FROM GOKS
            </div>

            <h2>
              A little less noise.
              <br />
              <em>A little more meaning.</em>
            </h2>

            <p>
              We believe the things we bring into our lives should earn their
              place. Not through excess, but through usefulness, thoughtful
              design and the quiet joy of something made well.
            </p>

            <p>
              GOKS is a curated collection of everyday essentials for people
              who appreciate simplicity, warmth and the little details that
              make a house feel like home.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={goToProducts}
            >
              Discover GOKS <ArrowRight size={17} />
            </button>

            <div className="story-signature">
              <span>Thoughtfully yours,</span>
              <strong>GOKS.</strong>
            </div>
          </Reveal>
        </section>

        {/* Newsletter */}
        <Reveal reducedMotion={reducedMotion}>
          <section className="newsletter-section">
            <div className="newsletter-icon">
              <Mail size={23} />
            </div>

            <div className="newsletter-copy">
              <div className="eyebrow">A LITTLE NOTE FROM US</div>
              <h2>Good things, occasionally.</h2>
              <p>
                Be the first to hear about new finds, thoughtful ideas and
                special updates.
              </p>
            </div>

            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <div className="newsletter-input-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  aria-label="Email address for newsletter"
                  required
                />

                <button type="submit" aria-label="Subscribe to newsletter">
                  <ArrowRight size={19} />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {newsletterMessage ? (
                  <motion.p
                    key={newsletterMessage}
                    className="newsletter-message"
                    role="status"
                    initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {newsletterMessage}
                  </motion.p>
                ) : (
                  <span className="newsletter-disclaimer">
                    No noise, just the good stuff.
                  </span>
                )}
              </AnimatePresence>
            </form>
          </section>
        </Reveal>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <button
              type="button"
              className="brand-logo footer-logo"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
            >
              GOKS<span className="brand-dot">.</span>
            </button>

            <p>
              Thoughtfully curated essentials
              <br />
              for everyday living.
            </p>

            <span className="footer-motto">
              Less, but better. Always.
            </span>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>

            <button type="button" onClick={goToProducts}>
              All products
            </button>

            {CATEGORIES.slice(1).map((category) => (
              <button
                type="button"
                key={category.name}
                onClick={() => chooseCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="footer-column">
            <h3>About GOKS</h3>

            <button
              type="button"
              onClick={() =>
                document.getElementById('our-story')?.scrollIntoView({
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
            >
              Our story
            </button>

            <button
              type="button"
              onClick={() => notify('More details coming soon.')}
            >
              Our philosophy
            </button>

            <button
              type="button"
              onClick={() => notify('Please contact us for support.')}
            >
              Contact us
            </button>
          </div>

          <div className="footer-column footer-contact">
            <h3>Need a hand?</h3>
            <p>We are here to help with your shopping experience.</p>

            <button
              type="button"
              className="footer-contact-link"
              onClick={() => {
                window.location.href =
                  'mailto:hello@goks.store?subject=GOKS%20Customer%20Support';
              }}
            >
              <Mail size={16} /> hello@goks.store
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GOKS. All rights reserved.</p>
          <p>Made with care for everyday living.</p>

          <button
            type="button"
            className="back-to-top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reducedMotion ? 'auto' : 'smooth',
              })
            }
          >
            Back to top <ArrowDownRight size={15} />
          </button>
        </div>
      </footer>

      {/* Shopping cart drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.button
              type="button"
              className="drawer-backdrop"
              aria-label="Close shopping bag"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={() => {
                setShowCart(false);
                setCheckoutStep(false);
              }}
            />

            <motion.aside
              className="cart-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping bag"
              initial={reducedMotion ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reducedMotion ? undefined : { x: '100%' }}
              transition={{
                type: 'tween',
                duration: reducedMotion ? 0 : 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="drawer-header">
                <div>
                  <h2>{checkoutStep ? 'Delivery details' : 'Your bag'}</h2>
                  <p>
                    {checkoutStep
                      ? 'Where should we send your order?'
                      : `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
                  </p>
                </div>

                <IconButton
                  label="Close bag"
                  onClick={() => {
                    setShowCart(false);
                    setCheckoutStep(false);
                  }}
                >
                  <X size={22} />
                </IconButton>
              </div>

              {checkoutStep ? (
                <form className="checkout-form" onSubmit={handleCheckout}>
                  <div className="checkout-summary">
                    <span>Order total</span>
                    <strong>{formatINR(total)}</strong>
                  </div>

                  <p className="checkout-demo-note">
                    Demo checkout only. No payment will be collected.
                  </p>

                  <label>
                    Full name
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      placeholder="you@example.com"
                      required
                    />
                  </label>

                  <label>
                    Mobile number
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="10-digit mobile number"
                      required
                    />
                  </label>

                  <label>
                    Delivery address
                    <textarea
                      name="address"
                      autoComplete="street-address"
                      value={customer.address}
                      onChange={handleCustomerChange}
                      placeholder="House number, street, area"
                      rows={3}
                      required
                    />
                  </label>

                  <div className="checkout-two-columns">
                    <label>
                      City
                      <input
                        type="text"
                        name="city"
                        autoComplete="address-level2"
                        value={customer.city}
                        onChange={handleCustomerChange}
                        placeholder="City"
                        required
                      />
                    </label>

                    <label>
                      PIN code
                      <input
                        type="text"
                        name="pincode"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        maxLength={6}
                        value={customer.pincode}
                        onChange={handleCustomerChange}
                        placeholder="6 digits"
                        required
                      />
                    </label>
                  </div>

                  {checkoutError && (
                    <p className="checkout-error" role="alert">
                      {checkoutError}
                    </p>
                  )}

                  <button type="submit" className="checkout-button">
                    Place demo order <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    className="checkout-back-button"
                    onClick={() => {
                      setCheckoutStep(false);
                      setCheckoutError('');
                    }}
                  >
                    Back to bag
                  </button>
                </form>
              ) : cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="empty-cart-icon">
                    <ShoppingBag size={32} />
                  </div>

                  <h3>Your bag is taking a little break.</h3>
                  <p>Find something lovely to bring home.</p>

                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => {
                      setShowCart(false);
                      goToProducts();
                    }}
                  >
                    Explore products <ArrowRight size={17} />
                  </button>
                </div>
              ) : (
                <>
                  {remainingForFreeShipping > 0 ? (
                    <div className="shipping-progress">
                      <p>
                        Add{' '}
                        <strong>{formatINR(remainingForFreeShipping)}</strong>{' '}
                        more for free delivery.
                      </p>

                      <div className="shipping-progress-track">
                        <motion.div
                          className="shipping-progress-fill"
                          initial={false}
                          animate={{
                            width: `${Math.min(
                              100,
                              (subtotal / SHIPPING_THRESHOLD) * 100,
                            )}%`,
                          }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.3,
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="shipping-success">
                      <Check size={16} /> You've unlocked free delivery!
                    </div>
                  )}

                  <div className="cart-items">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.div
                          className="cart-item"
                          key={item.id}
                          layout={!reducedMotion}
                          initial={
                            reducedMotion ? false : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            reducedMotion ? undefined : { opacity: 0, x: 20 }
                          }
                          transition={{ duration: reducedMotion ? 0 : 0.2 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                          />

                          <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <p>{item.category}</p>
                            <strong>{formatINR(item.price)}</strong>

                            <div className="quantity-control">
                              <IconButton
                                label={`Decrease quantity of ${item.name}`}
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                <Minus size={14} />
                              </IconButton>

                              <span aria-label={`Quantity ${item.quantity}`}>
                                {item.quantity}
                              </span>

                              <IconButton
                                label={`Increase quantity of ${item.name}`}
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                <Plus size={14} />
                              </IconButton>
                            </div>
                          </div>

                          <div className="cart-item-actions">
                            <strong>
                              {formatINR(item.price * item.quantity)}
                            </strong>

                            <IconButton
                              label={`Remove ${item.name}`}
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={17} />
                            </IconButton>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="cart-footer">
                    <div className="cart-totals">
                      <div>
                        <span>Subtotal</span>
                        <span>{formatINR(subtotal)}</span>
                      </div>

                      <div>
                        <span>Delivery</span>
                        <span>
                          {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                        </span>
                      </div>

                      <div className="cart-total-row">
                        <strong>Total</strong>
                        <strong>{formatINR(total)}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="checkout-button"
                      onClick={() => {
                        setCheckoutError('');
                        setCheckoutStep(true);
                      }}
                    >
                      Continue to checkout <ArrowRight size={18} />
                    </button>

                    <p className="cart-security-note">
                      <ShieldCheck size={15} />
                      Demo checkout. Payment processing is not enabled.
                    </p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Product quick view */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.button
              type="button"
              className="modal-backdrop"
              aria-label="Close product details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onClick={() => setQuickViewProduct(null)}
            />

            <motion.div
              className="quick-view-modal"
              role="dialog"
              aria-modal="true"
              aria-label={quickViewProduct.name}
              initial={
                reducedMotion ? false : { opacity: 0, y: 12, scale: 0.99 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.99 }
              }
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
            >
              <IconButton
                label="Close product details"
                className="modal-close-button"
                onClick={() => setQuickViewProduct(null)}
              >
                <X size={22} />
              </IconButton>

              <div className="quick-view-layout">
                <div className="quick-view-image-wrap">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="quick-view-image"
                  />
                </div>

                <div className="quick-view-info">
                  <p className="product-category">
                    {quickViewProduct.category}
                  </p>

                  <h2>{quickViewProduct.name}</h2>

                  <div className="product-rating">
                    <Star size={15} fill="currentColor" />
                    <span>{quickViewProduct.rating}</span>
                    <span className="review-count">
                      ({quickViewProduct.reviews} reviews)
                    </span>
                  </div>

                  <div className="quick-view-prices">
                    <strong>{formatINR(quickViewProduct.price)}</strong>

                    {quickViewProduct.originalPrice >
                      quickViewProduct.price && (
                      <span>
                        {formatINR(quickViewProduct.originalPrice)}
                      </span>
                    )}
                  </div>

                  <p className="quick-view-description">
                    {quickViewProduct.description}
                  </p>

                  <p
                    className="quick-view-stock"
                    style={{
                      color: quickViewProduct.stock <= 8 ? '#9a5b35' : '#42634d',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      margin: '0.75rem 0',
                    }}
                  >
                    {quickViewProduct.stock <= 5
                      ? `Only ${quickViewProduct.stock} left in stock`
                      : quickViewProduct.stock <= 8
                        ? 'Low stock — order soon'
                        : 'In stock · Ready to ship'}
                  </p>

                  <div className="quick-view-color">
                    <span>Colour / finish</span>
                    <strong>{quickViewProduct.color}</strong>
                  </div>

                  <button
                    type="button"
                    className="checkout-button"
                    onClick={() => addToCart(quickViewProduct)}
                  >
                    <ShoppingBag size={18} /> Add to bag
                  </button>

                  <button
                    type="button"
                    className="quick-view-wishlist"
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                  >
                    <Heart
                      size={18}
                      fill={
                        wishlist.includes(quickViewProduct.id)
                          ? 'currentColor'
                          : 'none'
                      }
                    />

                    {wishlist.includes(quickViewProduct.id)
                      ? 'Remove from wishlist'
                      : 'Save to wishlist'}
                  </button>

                  <div className="quick-view-delivery">
                    <Truck size={18} />
                    <span>
                      Free delivery on orders above{' '}
                      {formatINR(SHIPPING_THRESHOLD)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Order confirmation */}
      <AnimatePresence>
        {orderConfirmation && (
          <motion.div
            className="confirmation-overlay"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <motion.div
              className="confirmation-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirmation-title"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
            >
              <div className="confirmation-icon">
                <Check size={32} />
              </div>

              <div className="eyebrow">THANK YOU</div>
              <h2 id="confirmation-title">Your demo order is ready!</h2>

              <p>
                Thank you, {orderConfirmation.customer.name}. Your sample
                checkout has been completed successfully.
              </p>

              <div className="confirmation-order-number">
                <span>Reference number</span>
                <strong>{orderConfirmation.id}</strong>
              </div>

              <div className="confirmation-order-total">
                <span>Order total</span>
                <strong>{formatINR(orderConfirmation.total)}</strong>
              </div>

              <p className="confirmation-note">
                This is a frontend demonstration. No payment was taken, and
                this order has not been saved to a database or sent for
                fulfilment.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setOrderConfirmation(null);
                  goToProducts();
                }}
              >
                Continue shopping <ArrowRight size={17} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast-notification"
            role="status"
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 5 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <span className="toast-icon">
              <Check size={16} />
            </span>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
