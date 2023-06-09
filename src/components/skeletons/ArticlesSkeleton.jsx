import Skeleton from '@mui/material/Skeleton';

const ArticlesSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="blog__posts posts">
      <p className="posts__title">
        <Skeleton variant="text" sx={{ fontSize: '20px' }} width={150} />
        <Skeleton variant="text" sx={{ fontSize: '15px' }} width={0} />
      </p>
      <div className="posts__content">
        {skeletons.map((_, index) => {
          {
            return <Skeleton variant="rounded" height={366} key={index} />;
          }
        })}
      </div>
    </section>
  );
};

export default ArticlesSkeleton;
