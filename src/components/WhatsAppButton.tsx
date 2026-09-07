"use client";

import { motion } from "framer-motion";
import { WhatsappIcon } from "./icons/BrandIcons";

export function WhatsAppButton({
  whatsappNumber,
  message = "Bonjour, j'ai vu votre portfolio et j'aimerais échanger avec vous.",
}: {
  whatsappNumber: string;
  message?: string;
}) {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="animate-pulse-ring fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/20"
    >
      <WhatsappIcon className="h-7 w-7 text-white" />
    </motion.a>
  );
}
