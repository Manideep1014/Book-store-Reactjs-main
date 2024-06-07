import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import loadingImg from "./assets/loader.gif";
import "./style.css";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import Register from "../src/components/Register/Register"
import SignIn from "../src/components/SignIn/SignIn"

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5129/api/books/GetAllBooks');

    const data = await response.json();

    setProducts(data.data);
  };

  const fetchMangaProducts = async () => {
    const response = await fetch('http://localhost:5129/api/books/GetAllBooks');

    const data = await response.json();
    const filteredData = data.data.filter((item) => item.category.categoryName === "manga");

    setMangaProducts(filteredData);
  };

  const fetchFeatureProducts = async () => {
    const response = await fetch('http://localhost:5129/api/books/GetAllBooks');

    const data = await response.json();
    const filteredData = data.data.filter((item) => item.category.categoryName === "featured");

    setFeatureProducts(filteredData);
  };

  const fetchFictionProducts = async () => {
    const response = await fetch('http://localhost:5129/api/books/GetAllBooks');

    const data = await response.json();
    const filteredData = data.data.filter((item) => item.category.categoryName === "Mystery");
    console.log(filteredData);

    setFictionProducts(filteredData);
    // const { data } = await commerce.products.list({
    //   category_slug: ["fiction"],
    // });
    // console.log("developer data",data);
    // setFictionProducts(data);
  };

  const fetchBioProducts = async () => {
    const { data } = await commerce.products.list({
      category_slug: ["biography"],
    });

    setBioProducts(data);
  };

  const fetchCart = async () => {
    const response = await fetch('http://localhost:5129/api/Cart/GetAllCarts');

    const data = await response.json();

    if (data.data != undefined) {
      const filteredData = data.data.filter((item) => item.userId === 1);
      console.log("cart data", data.data);

      setCart(filteredData);
    }
    else {
      setCart([]);
    }

  };

  const handleAddToCart = async (productId, quantity) => {
    const userId = 1;
    const response = await fetch(`http://localhost:5129/api/Cart/GetCartById/${userId}`);
    const data = await response.json();
    console.log("handle add to cart ", data.data);
    if (data.success) {
      //already thee=re is a cart foir the suser add the book in that
      const response = await fetch(`http://localhost:5129/api/Books/GetBookById/${productId}`);
    const bookdata = await response.json();

      const cartId = data.data.cartID;
      console.log("book data",bookdata.data.bookPrice);
      const userId = 1;
      fetch(`http://localhost:5129/api/CartDetail/CreateCartDetail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
          //add here the jwt authroization token
        },
        body: JSON.stringify({
          // Add the request payload here
          "cartID": cartId,
          "bookId": productId,
          "cartQuantity": 1,
          "subTotalCart": 0
        })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data here
          console.log(data);

        })
        .catch(error => {
          // Handle any errors that occur during the fetch call
        });

    }
    //if this is false then create a new cart for the user and the add the boom in that cart
    else {
      const userId = 1;
      fetch(`http://localhost:5129/api/Cart/CreateCart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
          //add here the jwt authroization token
        },
        body: JSON.stringify({
          // Add the request payload here
          "userId": userId,
          "cartTotal": 0
        })
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response data here
          console.log(data);

        })
        .catch(error => {
          // Handle any errors that occur during the fetch call
        });

    }

    fetchCart();
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    // const userId = localStorage.getItem("userId")
    console.log("from the main method ",lineItemId);
   
    try {
      const response = await fetch(`http://localhost:5129/api/CartDetail/DeleteCartDetail/${lineItemId}`, {
        method: 'DELETE'
      }).then(response => response.json()).then(data => {
        // Handle the response data here
        console.log(data);

      })
      .catch(error => {
        // Handle any errors that occur during the fetch call
        console.log(error);
      });;
      
    } catch (error) {
      console.error(error);
    }
    


    // const data = await response.json();
    //console.log(response);
    // if (response === "true") {
    //   console.log("came here ");
    //   setCart([]);
    // }
    // else {
    //   console.log(response);
    // }

  };

 const handleEmptyCart = async () =>{
  console.log("empyty cart");
 }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);

      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeatureProducts();
    fetchCart();
    fetchMangaProducts();
    fetchFictionProducts();
    fetchBioProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Router>
            <div style={{ display: "flex" }}>
              <CssBaseline />
              <Navbar
                totalItems={cart.total_items}
                handleDrawerToggle={handleDrawerToggle}
              />
              <Switch>
                <Route exact path="/">
                  <Products
                    products={products}
                    featureProducts={featureProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route exact path="/cart">
                  <Cart
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                </Route>
                <Route path="/product-view/:id" exact>
                  <ProductView />
                </Route>
                <Route path="/manga" exact>
                  <Manga
                    mangaProducts={mangaProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/fiction" exact>
                  <Fiction
                    fictionProducts={fictionProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/biography" exact>
                  <Biography
                    bioProducts={bioProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/register" exact>
                 <Register/>
                </Route>
                
                  <Route path="/login" exact>
                  <SignIn/>
                </Route>
              
                
              </Switch>
            </div>
          </Router>
          <Footer />
        </>
      ) : (
        <div className="loader">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default App;
