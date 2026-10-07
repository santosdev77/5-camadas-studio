export type Product = {
  id: number
  name: string
  category: string
  image: string
  description: string
  price?: number
  featured: boolean
  contain?: boolean
}

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`

// Imagens de referência temporárias. Substitua os caminhos quando as fotos da marca estiverem disponíveis.
export const products: Product[] = [
  { id: 1, name: "Coelhinhos para celebrar em família", category: "Família", image: photo("photo-1744974573252-b437cc3e3507"), description: "Peças decorativas para guardar momentos especiais.", price: 49.9, featured: true },
  { id: 2, name: "Ursinho cheio de carinho", category: "Kids", image: photo("photo-1782383872645-85cd669841c8"), description: "Um companheiro especial, impresso em 3D.", price: 59.9, featured: true },
  { id: 3, name: "Tartaruguinha articulada 30,99", category: "Kids", image: photo("photo-1779792495496-a26f748f57b0"), description: "Personagem colorido com partes articuladas.", price: 39.9, featured: true, contain: true },
  { id: 4, name: "Coelhinho para presentear", category: "Presentes", image: photo("photo-1744974573355-57a51c6db813"), description: "Um presente personalizável feito com cuidado.", price: 45, featured: true },
  { id: 5, name: "Vasos com personalidade", category: "Utilitários", image: photo("photo-1703221561813-cdaa308cf9e7"), description: "Design autoral para dar vida aos seus espaços.", price: 79.9, featured: true },
  { id: 6, name: "Pequeno mundo de aventuras", category: "Kids", image: photo("photo-1747228984031-7f1ae2c4befa"), description: "Cores e formas para imaginar novas histórias.", price: 69.9, featured: true },
  { id: 7, name: "Mini barquinhos em 3D", category: "Fé", image: photo("photo-1644698245541-66a16547f247"), description: "Lembranças delicadas para momentos de fé.", price: 29.9, featured: true },
  { id: 8, name: "Porta-lápis personalizado", category: "Professores", image: photo("photo-1740625940423-a59a65c753c0"), description: "Um detalhe especial com nome, cor e tema à sua escolha.", price: 34.9, featured: true },
  { id: 9, name: "Dinossauro cheio de cor", category: "Kids", image: photo("photo-1779792495493-28fefc176597"), description: "Miniatura multicolorida com detalhes que ganham vida.", price: 49.9, featured: false, contain: true },
  { id: 10, name: "Pequenos dinos articulados", category: "Presentes", image: photo("photo-1779792495476-d59e4f9a1c12"), description: "Personagens com partes móveis, impressos camada por camada.", price: 89.9, featured: false, contain: true },
  { id: 11, name: "Castelo em miniatura", category: "Personalizados", image: photo("photo-1728724569841-05305ee197df"), description: "Torres e texturas em uma maquete cheia de detalhes.", price: 149.9, featured: false, contain: true },
  { id: 12, name: "Ideias que funcionam", category: "Utilitários", image: photo("photo-1740625940423-a59a65c753c0"), description: "Protótipos e peças funcionais para uma solução sob medida.", price: 129.9, featured: false, contain: true },
  { id: 13, name: "Mini halteres decorativos", category: "Academia", image: photo("photo-1534438327276-14e5300c3a48"), description: "Lembranças e brindes criativos para academias e profissionais.", price: 99.9, featured: false },
]
