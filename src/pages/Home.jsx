import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ArticleCard from "../components/ArticleCard";
import HomeSlider from "../components/slider";

import { fetchCategory } from "../redux/filter/athyncActions";
import { setCategory, setIsLoading } from "../redux/filter/slice";

import HomeSkeleton from "../components/skeletons/HomeSkeleton";

import { useScreenSize } from "../hooks/useScreenSize";

const Home = () => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();
  console.log(screenSize.height);

  const { articles, isLoading } = useSelector((state) => state.filter);
  // const { isAuth, user } = useSelector((state) => state.auth);

  const categoryTitle = useSelector(
    (state) => state.filter.categoryTitle
  ).toLowerCase();

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setCategory("Latest"));
    dispatch(fetchCategory({ categoryId: 1 }));
  }, []);

  return !isLoading ? (
    <>
      {screenSize.width > 767.98 && (
        <section className="blog__slider">
          <HomeSlider />
        </section>
      )}

      <section className="blog__posts posts">
        <p className="posts__title">
          {categoryTitle} {categoryTitle === "all articles" ? "" : "POSTS"}
        </p>
        <div className="posts__content">
          {articles.map((article) => {
            {
              return <ArticleCard article={article} key={article._id} />;
            }
          })}
        </div>
      </section>
    </>
  ) : (
    <HomeSkeleton />
  );
};

export default Home;
