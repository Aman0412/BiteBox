import { Link } from "react-router-dom";
import "../components/Navbar"
import Navbar from "../components/Navbar";
import 'boxicons'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Footer from "../components/Footer";
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function Homepage(){
    return (
      <div className="homepage">
        <Navbar page="homepage" />
        <div className="homepage-body">
          <div className="homepage-banner">
            <img src="/homepage1.png" alt="banner-image" />
            <div className="overlay">
              <h2>Enjoy a gourmet meal, in the comfort of your home</h2>
              <Link
                to="/join-now/plans/"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  textDecoration: "none",
                }}
              >
                <button
                  className="overlay-button"
                  style={{
                    backgroundColor: "#679b09",
                    border: "none",
                    color: "#ffffff",
                  }}
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="how-it-works">
          <h2>How it Works</h2>
          <div className="card-wrapper" style={{ height: "100%" }}>
            <div className="how-it-works-card">
              <box-icon type="solid" color="#333333" name="package"></box-icon>
              <h3>Free delivery</h3>
              <p>Delivery is always free. We deliver to most of the UK</p>
            </div>
            <div className="how-it-works-card">
              <box-icon name="time-five" color="#333333"></box-icon>
              <h3>Choose your time</h3>
              <p>You can schedule your delivery up to 2 weeks in advance. </p>
            </div>
            <div className="how-it-works-card">
              <box-icon name="check"></box-icon>
              <h3>No commitment</h3>
              <p>You can skip or cancel at any time. No commitment required.</p>
            </div>
            <div className="how-it-works-card">
              <box-icon name="credit-card-alt" color="#333333"></box-icon>
              <h3>Safe and secure</h3>
              <p>
                We accept all major credit cards, as well as Apple Pay and
                Google Pay.
              </p>
            </div>
          </div>
        </div>
        <div className="homepage-testimonial">
          <h2>Testimonials</h2>
          <Swiper
            // install Swiper modules
            modules={[Autoplay, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
            style={{
              "--swiper-pagination-color": "#679b09",
              padding: "2rem",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            className="swiper-container"
          >
            <SwiperSlide>
              <div className="testimonial-card">
                <p>
                  "The entire dining experience was exquisite! Each dish was a
                  perfect blend of flavors and textures. I especially loved the
                  roasted chicken with vegetables – tender and seasoned to
                  perfection."
                </p>
                <h4>- Sarah Mitchell</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonial-card">
                <p>
                  "A wonderful experience from start to finish. The vegan quinoa
                  bowl was refreshing, and the tofu was perfectly cooked. Great
                  ambiance and friendly staff. Highly recommended for anyone who
                  loves good food!"
                </p>
                <h4>- David Rodriguez</h4>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <p>
                "I was skeptical at first, but after trying the vegan Buddha
                bowl, I’m hooked! The ingredients were fresh, and the flavors
                were well-balanced. It’s nice knowing I can get healthy,
                plant-based meals delivered every week."
              </p>
              <h4>- James Carter</h4>
            </SwiperSlide>
            <SwiperSlide>
              <p>
                "I’ve been using this meal service for a month, and I’m
                impressed! The vegan quinoa bowl was a pleasant surprise.
                Everything was packed beautifully, and the portions were just
                right. It’s so convenient to have healthy meals delivered
                straight to my door!"
              </p>
              <h4>- Emily Thompson</h4>
            </SwiperSlide>
            <div className="swiper-custom-pagination" />
          </Swiper>
        </div>
        <Footer />
      </div>
    );
    
}