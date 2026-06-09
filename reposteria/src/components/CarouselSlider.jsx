import { useEffect, useState, useRef } from "react";
import "./css/carousel.css";
import { getCarousel } from "../services/carouselService";
import { API_URL } from "../services/api";

function CarouselSlider() {

  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {

    const load = async () => {
      try {
        const data = await getCarousel();
        setSlides(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();

  }, []);

  useEffect(() => {

    if (!slides.length) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timerRef.current);

  }, [slides]);

  if (!slides.length) return null;

  return (
    <div className="carousel">

      <div
        className="carousel-slides"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >

        {slides.map((s) => (
          <div key={s.id} className="carousel-slide">

            <img
              src={s.imagen}
              alt={s.nombre}
              className="carousel-img"
            />

            <div className="carousel-overlay" />
          </div>
        ))}

      </div>

    </div>
  );
}

export default CarouselSlider;