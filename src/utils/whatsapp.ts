export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? ""

export function generateWhatsAppLink(message: string) {
  const number = WHATSAPP_NUMBER.replace(/\D/g, "")
  const recipient = number ? `/${number}` : "/"
  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`
}