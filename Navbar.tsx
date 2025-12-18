import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoUMG from 'figma:asset/0fa0348a08bf905c15b8aceb346fe9ebc6649707.png';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navbar({
  currentPage: _currentPage = 'inicio',
  onNavigate: _onNavigate,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      { label: 'Inicio', to: '/' },
      { label: 'Pensum', to: '/pensum' },
      { label: 'Inscripción', to: '/inscripcion' },
      { label: 'Jornada', to: '/jornada' },
      { label: 'Galería', to: '/galeria' },
      { label: 'Contacto', to: '/contacto' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-white/90 backdrop-blur-md shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logoUMG}
                alt="Logo Universidad Mariano Gálvez"
                className="w-14 h-14 object-contain"
              />
              <div className="hidden lg:block">
                <div
                  className="text-[#0b4aa2] font-bold"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Universidad Mariano Gálvez
                </div>
                <div
                  className="text-xs text-gray-600 font-semibold"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  Sede Huehuetenango
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <motion.div key={to} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                  <Link
                    to={to}
                    className={`text-gray-700 hover:text-[#0b4aa2] transition-colors relative group font-semibold ${isActive ? 'text-[#0b4aa2]' : ''}`}
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#0b4aa2] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Login Button */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={() => window.location.href = "http://localhost:3000/login"}
              className="bg-[#e0312c] hover:bg-[#c02823] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar sesión
            </Button>
          </div> */}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 space-y-3"
          >
            {menuItems.map(({ label, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-gray-700 hover:text-[#0b4aa2] w-full text-left ${isActive ? 'text-[#0b4aa2]' : ''}`}
                >
                  {label}
                </Link>
              );
            })}
            {/* <Button 
              onClick={() => window.location.href = "http://localhost:3000/login"}
              className="w-full bg-[#e0312c] hover:bg-[#c02823] text-white mt-4"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar sesión
            </Button> */}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
