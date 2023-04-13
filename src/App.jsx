import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "./redux/auth/athyncActions";

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import AddArticle from "./pages/AddArticle";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <main className="page">
          <div className="blog__container">
            <div className="blog__content">
              <Routes>
                <Route path={`/`} element={<Home />} />
                <Route path={`/:categoryId`} element={<Articles />} />
                <Route path={`/:categoryId/:id`} element={<Article />} />
                <Route path={`/addarticle`} element={<AddArticle />} />
                <Route path={`/article/:id/edit`} element={<AddArticle />} />
                <Route path="/auth/login" element={<SignIn />} />
                <Route path="/auth/register" element={<SignUp />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
