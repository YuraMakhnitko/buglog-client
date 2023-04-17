import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ArticleCard from '../components/ArticleCard';
import HomeSlider from '../components/slider';
import Categories from '../components/Categories';

import { fetchCategory } from '../redux/filter/athyncActions';
import { setCategory, setIsLoading } from '../redux/filter/slice';

import HomeSkeleton from '../components/skeletons/HomeSkeleton';

import { useScreenSize } from '../hooks/useScreenSize';

const Home = () => {
  const dispatch = useDispatch();
  const screenSize = useScreenSize();

  const { articles, isLoading } = useSelector((state) => state.filter);

  const categoryTitle = useSelector(
    (state) => state.filter.categoryTitle
  ).toLowerCase();

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(setCategory('Latest'));
    dispatch(fetchCategory({ categoryId: 1 }));
  }, [dispatch]);

  return !isLoading ? (
    <>
      {screenSize.width > 767.98 && (
        <section className="blog__slider">
          <HomeSlider />
        </section>
      )}

      <section className="blog__posts posts">
        {screenSize.width > 767.98 ? (
          <p className="posts__title">
            {categoryTitle} {categoryTitle === 'All Articles' ? '' : 'POSTS'}
          </p>
        ) : (
          <Categories />
        )}
        <div className="posts__content">
          {articles.map((article) => {
            return <ArticleCard article={article} key={article._id} />;
          })}
        </div>
      </section>
    </>
  ) : (
    <HomeSkeleton />
  );
};

export default Home;
