import Slider from "react-slick";
import { useSelector } from "react-redux";

import Slide from "./Slide";

const HomeSlider = () => {
  const articles = useSelector((state) => state.filter.articles).slice(0, 5);

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  return (
    <Slider {...settings}>
      {articles.map((slide) => {
        return <Slide slide={slide} key={slide._id} />;
      })}
    </Slider>
  );
};

export default HomeSlider;
