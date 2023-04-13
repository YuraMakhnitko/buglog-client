import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import ArticleCard from "../components/ArticleCard";

import Categories from "../components/Categories";

import ArticlesSkeleton from "../components/skeletons/ArticlesSkeleton";

import { fetchCategory } from "../redux/filter/athyncActions";

const Articles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { articles, categoryTitle, categoryId, isLoading } = useSelector(
    (state) => state.filter
  );

  const articlePath = categoryTitle.toLowerCase();

  useEffect(() => {
    dispatch(fetchCategory({ categoryId }));
  }, [categoryId]);

  useEffect(() => {
    navigate(`/${categoryId}`);
  }, [articles.length]);

  return !isLoading ? (
    <section className="blog__posts posts">
      {/* <Categories hidden /> */}
      <p className="posts__title">
        {categoryTitle} {articlePath === "all articles" ? "" : "POSTS"}
      </p>
      <div className="posts__content">
        {articles.map((article) => {
          {
            return <ArticleCard article={article} key={article._id} />;
          }
        })}
      </div>
    </section>
  ) : (
    <ArticlesSkeleton />
  );
};

export default Articles;
