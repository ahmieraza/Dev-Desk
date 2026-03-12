import { MessageCircle } from "lucide-react";

const FloatingWhatsApp = () => {
  const whatsappNumber = "923047974977";
  const message = "Hi, I'm interested in your services!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-20 right-4 md:top-24 md:right-8 z-30 p-2.5 md:p-3 rounded-full bg-success text-white shadow-lg hover:scale-110 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
    </a>
  );
};

export default FloatingWhatsApp;
