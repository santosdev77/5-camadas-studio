export const WHATSAPP_NUMBER = "5575983281770"
export const INSTAGRAM_URL = "https://www.instagram.com/5camadas.studio3d/"

export function generateWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
