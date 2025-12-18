import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  image: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
}

interface ImageCarouselProps {
  images: CarouselSlide[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-white md:py-32">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-[#e0312c] uppercase tracking-wider text-sm font-bold">
              Nuestra Especialización
            </span>
          </motion.div>
          <h2 
            className="text-[#0b4aa2] text-4xl md:text-5xl lg:text-6xl mb-6 italic font-extrabold"
            style={{ 
              textShadow: '2px 2px 4px rgba(11, 74, 162, 0.3)',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            Áreas de <span className="text-[#e0312c]">formación</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden shadow-2xl rounded-3xl"
        >
          {/* Images */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {images.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentIndex === index ? 1 : 0,
                  scale: currentIndex === index ? 1 : 1.1,
                }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                {/* Blue overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b4aa2]/60 via-[#0b4aa2]/40 to-transparent" />
              </motion.div>
            ))}

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="z-10 px-4 text-center"
              >
                <h3 
                  className="text-3xl italic font-extrabold text-white md:text-5xl lg:text-6xl"
                  style={{ 
                    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7), -1px -1px 2px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {images[currentIndex].title} <span className="text-[#00D4FF]">{images[currentIndex].titleHighlight}</span>
                </h3>
                <p 
                  className="mt-4 text-lg italic font-semibold text-white md:text-2xl"
                  style={{ 
                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.6)',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  {images[currentIndex].subtitle}
                </p>
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute z-20 flex items-center justify-center w-12 h-12 transition-all duration-200 -translate-y-1/2 border rounded-full left-4 top-1/2 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 group"
            >
              <ChevronLeft className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
            </button>
            <button
              onClick={goToNext}
              className="absolute z-20 flex items-center justify-center w-12 h-12 transition-all duration-200 -translate-y-1/2 border rounded-full right-4 top-1/2 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 group"
            >
              <ChevronRight className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute z-20 flex gap-3 -translate-x-1/2 bottom-6 left-1/2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-12 bg-white"
                        : "w-2 bg-white/50 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
