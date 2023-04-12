import Skeleton from "@mui/material/Skeleton";
import { useScreenSize } from "../../hooks/useScreenSize";

const ArticleSkeleton = () => {
  const screenSize = useScreenSize();
  console.log(screenSize.width);
  const imgSckeletonHeigtht = (screenSize.width - 40) * 0.6;

  return (
    <>
      <div className="full-article">
        <div className="full-article__image">
          {/* <div className="full-article__image-ibg">
          </div> */}
          <Skeleton variant="rounded" height={imgSckeletonHeigtht} />
        </div>
        <p className="full-article__category">
          <Skeleton variant="text" sx={{ fontSize: "12px" }} width={150} />
        </p>
        <div className="full-article__content">
          <h2 className="full-article__title">
            <Skeleton variant="text" sx={{ fontSize: "36px" }} />
          </h2>
          <div className="full-article__add-info">
            <Skeleton variant="circular" width={32} height={32} />
            <div>
              <p className="full-article__author">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "12px" }}
                  width={100}
                />
              </p>
              <p className="article__data">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "10px" }}
                  width={100}
                />
              </p>
            </div>
          </div>
          <p className="full-article__text">
            <Skeleton variant="rounded" height={150} />
          </p>
        </div>
      </div>
      <Skeleton variant="rounded" height={100} />
    </>
  );
};

export default ArticleSkeleton;
