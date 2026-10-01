// Atualize para o número oficial antes de divulgar a landing page.
export const WHATSAPP_NUMBER = "5500000000000"
export const INSTAGRAM_URL = "https://www.instagram.com/5camadas.studio3d/"

export function generateWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
