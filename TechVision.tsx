import { motion, useInView } from "framer-motion";
import { Shield, Network, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

interface TechVisionProps {
  onNavigate?: (page: string) => void;
}

export default function TechVision({ onNavigate }: TechVisionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const floatingIcons = [
    { Icon: Shield, x: "15%", y: "20%", delay: 0 },
    { Icon: Network, x: "80%", y: "30%", delay: 0.5 },
    { Icon: Sparkles, x: "70%", y: "70%", delay: 1 },
  ];

  return (
    <section ref={ref} className="relative py-32 md:py-40 bg-gradient-to-br from-[#0b4aa2] via-[#0a3a7f] to-[#0b4aa2] overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tech-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>
      </div>

      {/* Circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M 0,200 Q 400,100 800,200 T 1600,200"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M 0,400 Q 400,300 800,400 T 1600,400"
          stroke="white"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? {
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
            rotate: [0, 360],
          } : {}}
          transition={{
            duration: 8,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <item.Icon className="w-16 h-16 md:w-24 md:h-24 text-white/20" />
        </motion.div>
      ))}

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#e0312c]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 text-white/90 text-sm">
            Nuestra Misión
          </div>
        </motion.div>

        {/* Main Text */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight italic font-extrabold"
          style={{ 
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6), -1px -1px 2px rgba(0, 0, 0, 0.4)',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          Formamos profesionales que lideran la{" "}
          <span className="text-[#00D4FF]">
            transformación digital
          </span>
          {" "}de Guatemala
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-semibold"
          style={{ 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          Desarrollamos talento tecnológico con visión global, preparado para enfrentar los desafíos del futuro digital.
        </motion.p>

        {/* Icons row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-12 mb-12"
        >
          {[Shield, Network, Sparkles].map((Icon, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate?.('pensum')}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0b4aa2] text-lg px-10 shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300"
          >
            Conoce más
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
