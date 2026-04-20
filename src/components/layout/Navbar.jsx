import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

const links = [
  { label: "Início", path: "/" },
  { label: "Coleção", path: "/colecao" },
  { label: "Sobre", path: "/sobre" },
  { label: "Atacado", path: "/atacado" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl md:text-3xl font-medium text-foreground">
              Bella Forma
            </span>
            <span className="text-[10px] tracking-luxe uppercase text-muted-foreground mt-0.5">
              Fitness Atacado
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-sm tracking-wide transition-colors relative ${
                pathname === l.path
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {l.label}
              {pathname === l.path && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="text-foreground/70 hover:text-primary transition-colors"
            aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
          <a
            href="https://www.instagram.com/bellaformafitness.oficial/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex text-foreground/70 hover:text-primary transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <Link
            to="/atacado"
            className="hidden md:inline-flex items-center px-5 py-2.5 text-xs tracking-luxe uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Fazer Pedido
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-base ${
                    pathname === l.path
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/atacado"
                className="inline-flex items-center justify-center px-5 py-3 text-xs tracking-luxe uppercase bg-primary text-primary-foreground mt-2"
              >
                Fazer Pedido
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
