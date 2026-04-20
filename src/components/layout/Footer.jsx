import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin, Clock, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-serif text-3xl md:text-4xl mb-4">
            Bella Forma Fitness
          </h3>
          <p className="text-primary-foreground/70 leading-relaxed max-w-md">
            Moda fitness feminina no atacado. Peças exclusivas, qualidade
            premium e o melhor para revendedoras apaixonadas pelo universo
            fitness.
          </p>
          <a
            href="https://www.instagram.com/bellaformafitness.oficial/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm tracking-luxe uppercase border-b border-primary-foreground/30 pb-1 hover:border-primary-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
            @bellaformafitness.oficial
          </a>
        </div>

        <div>
          <h4 className="text-xs tracking-luxe uppercase text-primary-foreground/60 mb-5">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/colecao"
                className="hover:text-accent transition-colors"
              >
                Coleção
              </Link>
            </li>
            <li>
              <Link
                to="/sobre"
                className="hover:text-accent transition-colors"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                to="/atacado"
                className="hover:text-accent transition-colors"
              >
                Atacado
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-luxe uppercase text-primary-foreground/60 mb-5">
            Contato
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-primary-foreground/80 leading-relaxed">
                Av. J-2 com a L-12
                <br />
                QD 04 Lt 32, Sala 03
                <br />
                Papillon Park
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-primary-foreground/80">
                Seg a Sex: 09h às 19h
                <br />
                Sáb: 09h às 16h
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <a
                href="https://wa.me/5562986442634"
                className="text-primary-foreground/80 hover:text-accent"
              >
                WhatsApp Atacado
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/50">
          <p>
            © {new Date().getFullYear()} Bella Forma Fitness. Todos os direitos
            reservados.
          </p>
          <p className="tracking-luxe uppercase">Moda Fitness · Atacado</p>
        </div>
      </div>
    </footer>
  );
}
