import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  const whatsappText = encodeURIComponent(
    `Olá! Tenho interesse na peça "${product.name}" (${product.category}). Gostaria de saber mais sobre preços no atacado.`
  );

  const mainImage =
    product.image_url ||
    (product.images && product.images.length > 0 ? product.images[0] : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group"
    >
      <div className="aspect-[3/4] overflow-hidden bg-muted mb-4 relative">
        {mainImage ? (
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
          <a
            href={`https://wa.me/5562986442634?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-xs tracking-luxe uppercase hover:bg-[#1ebe57] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>
      </div>
      <h3 className="font-serif text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      {product.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {product.description}
        </p>
      )}
    </motion.div>
  );
}
