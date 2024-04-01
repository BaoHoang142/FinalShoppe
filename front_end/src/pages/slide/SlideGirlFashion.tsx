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
const SlideGirlFaShion = () => {
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
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1708381321/az5jy8uuc9uip8hjdwkz.png"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1708381323/nkutkaveiujgn8rxzfn5.jpg"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/ojh6aac0tiu7xqmjijev.png"
                alt=""
              />
              <img
                src="https://res.cloudinary.com/dzmiglgd4/image/upload/v1708381323/nkutkaveiujgn8rxzfn5.jpg"
                alt=""
              />
            </Slider>
          </div>
        </div>
      </div>
      <div style={slideStyle}>
        <Card title="SHOPEE MALL" style={{ color: "red" }}>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product1} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product2} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product3} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product4} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product5} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product6} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product7} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product8} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product9} alt="" width={180} />
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <img src={product10} alt="" width={180} />
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

export default SlideGirlFaShion;
