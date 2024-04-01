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
const SlideShoesManFaShion = () => {
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
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219582/bannerCate/shoes/wqdlf5vwm58l8mmthhft.png"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219279/bannerCate/shoes/ioohnl3tisxikxnb9ami.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219279/bannerCate/shoes/mvhczf2frekfv15oijti.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/e8e8d1ddvsytjjjbostr.png"
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
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/fwjcjz5nj71gmgzuv0wl.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/fbcbk5kashzaictqxcus.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/zqqeeugybzh7falynznh.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/ndfvp2myx4jepqdgiwvu.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/onyquylp590xlfoegav6.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/sdmxvewfx5jkq4htqx3f.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/ycaedvwi6p6l1ptd3zlz.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219277/bannerCate/shoes/qzjmkwnqfcgdzqgcfcjy.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/ak2z9txrym8qzggly5mn.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/xhbndrsmu9zck6snrjrf.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/pi2o2fulrouwyepzrvrk.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img
              src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1711219278/bannerCate/shoes/deosobbxmyfojlj60yfp.jpg"
              alt=""
              width={180}
            />
          </Card.Grid>
        </Card>
      </div>
    </div>
  );
};

export default SlideShoesManFaShion;
