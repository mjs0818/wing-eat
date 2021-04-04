import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Slider from 'react-slick';
import './Feature.scss';

const Feature = () => {
  const [images, setImages] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);
  const isPc = useMediaQuery({
    query: '(min-width:1024px)',
  });
  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    afterChange: (current) => setCurrentSlide(current),
  };

  const getImage = async () => {
    try {
      const res = await axios.get('https://node.wingeat.com/test-api/features');
      setImages(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className={isPc ? 'wrapper' : 'wrapper mobile'}>
      <Slider {...settings}>
        {images &&
          images.map((image, idx) => (
            <div key={idx} className="slide">
              <img
                src={`https://image.wingeat.com/${
                  isPc ? image.image : image.mobileImage
                }`}
                alt="feature-img"
              />
            </div>
          ))}
      </Slider>
      {!isPc && images && (
        <div className="page">{`${currentSlide + 1}/${images.length}`}</div>
      )}
    </div>
  );
};

export default Feature;
