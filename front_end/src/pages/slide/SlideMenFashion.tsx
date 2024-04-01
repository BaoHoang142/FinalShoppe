import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";
import slide1 from "../../assets/slide/1.png";
import slide2 from "../../assets/slide/2.png";
import slide3 from "../../assets/slide/3.png";
import slide4 from "../../assets/slide/4.png";
import slide5 from "../../assets/slide/5.png";
import product1 from "../../assets/thoitrangnu/1.jpg";
import product2 from "../../assets/thoitrangnu/2.jpg";
import product3 from "../../assets/thoitrangnu/3.jpg";
import product4 from "../../assets/thoitrangnu/4.jpg";
import product5 from "../../assets/thoitrangnu/5.jpg";
import product6 from "../../assets/thoitrangnu/6.jpg";
import product7 from "../../assets/thoitrangnu/7.jpg";
import product8 from "../../assets/thoitrangnu/8.jpg";
import product9 from "../../assets/thoitrangnu/9.jpg";
import product10 from "../../assets/thoitrangnu/10.jpg";

const gridStyle: React.CSSProperties = {
  width: "16.66667%",
  textAlign: "center",
  height: "10em",
};
const SlideMenFaShion = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const slideStyle = {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  };

  return (
    <div>
      <div style={slideStyle}>
        <div>
          <div>
            <Slider {...settings}>
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220019/bannerCate/menfashion/y0qlkf1aq6ogszvs6pyr.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220018/bannerCate/menfashion/oezypkpyr6s7ydrfruk1.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220018/bannerCate/menfashion/k9dx2q6gpv3bwuydv5cb.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220018/bannerCate/menfashion/e7iemsbuhkxunnl4crtu.jpg"
                alt=""
              />
            </Slider>
          </div>
        </div>
      </div>
      <div style={slideStyle}>
        <Card title="SHOPEE MALL" style={{ color: "red" }}>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220015/bannerCate/menfashion/y6v1f2lvve6sokrz8vqt.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220015/bannerCate/menfashion/rbcihxjhmrffwg5cgjqq.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/ckeccaf88a1unadioo83.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/mdwagbaourkuajsktsvn.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/evoqptknq6ntur9w1p46.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/epnh7nbgrelzkqcsm1vg.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/oabdxrg8tvlj6kcvml7p.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/kt1d5tabbufxfkhtqdvr.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/vhji0x6kokrvtykdqxhv.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220016/bannerCate/menfashion/puoadc2ruvc6nvxhdn6w.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220017/bannerCate/menfashion/ctywivof6bro5jk91end.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711220018/bannerCate/menfashion/w89b8t8jksd8znd43gaq.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
        </Card>
      </div>
    </div>
  );
};

export default SlideMenFaShion;
