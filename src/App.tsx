import { useEffect, useRef, useState } from "react"
import { products } from "./data/products"
import { generateWhatsAppLink, INSTAGRAM_URL } from "./lib/contact"

const brandContact = { whatsapp: "", email: "", location: "" }
const defaultMessage =
  "Olá! Conheci a 5 Camadas 3D pelo site e gostaria de solicitar um orçamento."
const photo = (id: string, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
// Real photographs of 3D-printed pieces; references, not the brand's own portfolio.
const images = {
  vases: photo("photo-1703221561813-cdaa308cf9e7"),
  clay: photo("photo-1750069685806-1353ddc24b5b"),
  teddy: photo("photo-1782383872645-85cd669841c8"),
  gift: photo("photo-1744974573355-57a51c6db813"),
  family: photo("photo-1744974573252-b437cc3e3507"),
  toys: photo("photo-1747228984031-7f1ae2c4befa"),
  nursery: photo("photo-1779792495496-a26f748f57b0"),
  flowers: photo("photo-1750069685806-1353ddc24b5b"),
  paper: photo("photo-1644698245541-66a16547f247"),
  dinosaur: photo("photo-1779792495493-28fefc176597"),
  creatures: photo("photo-1779792495476-d59e4f9a1c12"),
  castle: photo("photo-1728724569841-05305ee197df"),
  functional: photo("photo-1740625940423-a59a65c753c0"),
}

type IconName = "arrow" | "heart" | "spark" | "whatsapp" | "instagram" | "menu" | "close" | "check" | "leaf" | "cross" | "gift"
function Icon({
  name,
  className = "",
}: { name: IconName } & { className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M4 12h15M13 6l6 6-6 6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    spark: (
      <>
        <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.2-4.5A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.1 7.2c-.9 2.1 2.6 6.6 5.9 7.3 1.1.2 2-.9 2-1.5l-2.4-1.2-.9.9c-1.3-.6-2.2-1.6-2.8-2.8l.7-.8-1-2.1Z" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".7" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    leaf: (
      <>
        <path d="M19 3C6 2 2 8 6 15s14 3 13-12Z" />
        <path d="m4 21 11-12" />
      </>
    ),
    cross: <path d="M10 3h4v6h6v4h-6v8h-4v-8H4V9h6Z" />,
    gift: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="1" />
        <path d="M3 6h18v4H3zM12 6v15" />
        <path d="M12 6C4 7 5 0 9 3l3 3Zm0 0c8 1 7-6 3-3l-3 3Z" />
      </>
    ),
  }
  return (
    <svg
      className={`icon ${className}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="5 Camadas 3D — Início">
      <span className="logo-mark">
        <svg viewBox="0 0 45 48" fill="none" aria-hidden="true">
          {[0, 6, 12, 18, 24].map((y) => (
            <path
              key={y}
              d={`M4 ${9 + y} Q10 ${2 + y} 22 ${9 + y} Q34 ${2 + y} 41 ${9 + y} L22 ${21 + y} Z`}
              stroke="currentColor"
              strokeWidth="1.15"
            />
          ))}
        </svg>
      </span>
      <span className="logo-text">
        5 camadas<span>3D · FEITO COM CARINHO</span>
      </span>
    </a>
  )
}
function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flourish ${className}`}
      viewBox="0 0 150 160"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 155c30-27 62-69 63-119M63 111c-31-3-49-18-42-26 12-10 28 14 42 26Zm17-30c20-2 43-20 35-27-9-6-28 14-35 27ZM89 56c-20-8-30-29-21-34 10-4 18 19 21 34Zm3-16c18-5 26-27 16-30-9-2-15 15-16 30Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  )
}
const nav = [
  ["Início", "inicio"],
  ["Nossos Produtos", "produtos"],
  ["Família & Kids", "familia"],
  ["Fé", "fe"],
  ["Personalizados", "personalizados"],
  ["Sobre Nós", "sobre"],
  ["Contato", "contato"],
]
const categories = [
  {
    name: "Família",
    image: images.family,
    description: "Pessoas e histórias que merecem ficar para sempre.",
    icon: "heart" as IconName,
    filter: "Família",
  },
  {
    name: "Kids",
    image: images.teddy,
    description: "Um pouquinho de magia para o mundo dos pequenos.",
    icon: "spark" as IconName,
    filter: "Kids",
  },
  {
    name: "Fé",
    image: "",
    description: "Devoção e carinho em cada pequeno detalhe.",
    icon: "cross" as IconName,
    filter: "Fé",
  },
  {
    name: "Presentes",
    image: images.gift,
    description: "Afeto que ganha forma e surpreende quem você ama.",
    icon: "gift" as IconName,
    filter: "Presentes",
  },
]
const filters = [
  "Todos",
  "Família",
  "Kids",
  "Fé",
  "Presentes",
  "Personalizados",
  "Professores",
  "Academia",
  "Utilitários",
  "Decoração",
  "Lembranças",
]

function normalizeCategory(value: string) {
  const repaired = /[ÃÂ]/.test(value) ? decodeURIComponent(escape(value)) : value
  return repaired.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState("Todos")
  const [dialog, setDialog] = useState<"contact" | "instagram" | null>(null)
  const [message, setMessage] = useState(defaultMessage)
  const [copied, setCopied] = useState(false)
  const modal = useRef<HTMLDialogElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08 },
    )
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (dialog) {
      previousFocus.current = (document.activeElement as HTMLElement)
      modal.current?.showModal()
      document.body.style.overflow = "hidden"
    } else {
      modal.current?.close()
      document.body.style.overflow = ""
      previousFocus.current?.focus()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [dialog])

  function contact(text = defaultMessage) {
    window.open(generateWhatsAppLink(text), "_blank", "noopener,noreferrer")
  }
  function instagram() {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")
  }
  function showCollection(category: string) {
    setFilter(category)
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })
  }
  const contactButton = (
    label: string,
    secondary = false,
    text = defaultMessage,
  ) => (
    <button
      className={`button ${secondary ? "button-outline" : "button-primary"}`}
      onClick={() => contact(text)}
    >
      <Icon name="whatsapp" />
      {label}
      <Icon name="arrow" />
    </button>
  )

  return (
    <>
      <div className="announcement">
        <Icon name="heart" /> Pequenas peças. Grandes sentimentos.{" "}
        <span>Feito especialmente para você.</span>
      </div>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <button className="header-quote" onClick={() => contact()}>
            Pedir orçamento <Icon name="arrow" />
          </button>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-menu"
            aria-label="Navegação mobile"
          >
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
            <button
              className="button button-primary"
              onClick={() => {
                setMenuOpen(false)
                contact()
              }}
            >
              Pedir orçamento <Icon name="arrow" />
            </button>
          </nav>
        )}
      </header>
      <main>
        <section className="hero" id="inicio">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span /> FEITO EM CAMADAS. CHEIO DE SIGNIFICADO.
              </p>
              <h1>
                Criamos mais
                <br />
                do que peças.
                <br />
                <em>Criamos memórias.</em>
              </h1>
              <p className="hero-description">
                Presentes, lembranças e peças personalizadas feitas para
                celebrar pessoas, momentos e histórias especiais.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#produtos">
                  Ver nossos produtos <Icon name="arrow" />
                </a>
                {contactButton("Falar pelo WhatsApp", true)}
              </div>
              <div className="hero-note">
                <Icon name="heart" />
                <span>Da nossa família, com carinho, para a sua.</span>
              </div>
            </div>
            <div className="hero-composition">
              <div className="hero-main-photo">
                <img
                  src={images.teddy}
                  alt="Ursinho marrom impresso em 3D com uma estrela branca, fotografado em uma prateleira"
                  fetchPriority="high"
                />
                <span className="photo-caption">
                  Pequenos detalhes, grandes significados.
                </span>
              </div>
              <div className="hero-small-photo">
                <img
                  src={images.vases}
                  alt="Vaso decorativo espiral produzido por impressão 3D"
                />
              </div>
              <div className="hero-bottom-photo">
                <img
                  src={images.family}
                  alt="Coelhinhos em bege e rosa produzidos por impressão 3D"
                />
                <span>um carinho que ganha forma</span>
              </div>
              <div className="love-seal">
                <Icon name="heart" />
                <span>
                  feito com
                  <br />
                  <i>amor</i>
                </span>
                <small>CAMADA POR CAMADA</small>
              </div>
              <Icon name="spark" className="hero-star" />
              <Flourish className="hero-flourish" />
              <span className="hero-handwritten">para guardar no coração</span>
            </div>
          </div>
          <div className="hero-bottom-line">
            <span>FAMÍLIA</span>
            <i />
            <span>KIDS</span>
            <i />
            <span>FÉ</span>
            <i />
            <span>PRESENTES</span>
            <i />
            <span>PERSONALIZAÇÃO</span>
          </div>
        </section>
        <section className="story-quote reveal">
          <div className="quote-line" />
          <Icon name="heart" />
          <div className="quote-line" />
          <h2>“Cada peça carrega uma história.”</h2>
          <p>E algumas histórias merecem ser guardadas para sempre.</p>
        </section>
        <section className="section categories-section" id="categorias">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">CARINHO EM CADA DETALHE</p>
              <h2>
                Feito para <em>momentos especiais</em>
              </h2>
              <p>
                Encontre uma peça para celebrar quem você ama, marcar uma
                ocasião
                <br className="desktop-break" /> especial ou transformar uma
                ideia em presente.
              </p>
            </div>
            <div className="category-grid">
              {categories.map((category) => (
                <button
                  className={`category-card reveal category-${category.filter}`}
                  key={category.name}
                  onClick={() => showCollection(category.filter)}
                >
                  <div className="category-image">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={`Peça produzida por impressão 3D — referência para ${category.name}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="faith-preview">
                        <Icon name="cross" />
                        <span>Fé que ganha forma</span>
                        <small>PROJETOS EM 3D SOB ENCOMENDA</small>
                      </div>
                    )}
                    <span className="category-icon">
                      <Icon name={category.icon} />
                    </span>
                  </div>
                  <div className="category-info">
                    <div>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>
                    <span className="round-arrow">
                      <Icon name="arrow" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="family-section section" id="familia">
          <div className="container split-section">
            <div className="family-collage reveal">
              <img
                className="family-main"
                src={images.family}
                alt="Par de coelhinhos impressos em 3D em tons de bege e rosa"
                loading="lazy"
              />
              <img
                className="family-detail"
                src={images.gift}
                alt="Coelhinho de Páscoa produzido por impressão 3D"
                loading="lazy"
              />
              <div className="family-label">
                <Icon name="heart" />
                <span>
                  O amor mora
                  <br />
                  nos detalhes.
                </span>
              </div>
              <Flourish />
            </div>
            <div className="split-copy reveal">
              <p className="eyebrow">A NOSSA PRIMEIRA INSPIRAÇÃO</p>
              <h2>
                Para quem faz parte
                <br />
                da <em>nossa história</em>
              </h2>
              <p>
                Família é feita de histórias, pessoas e pequenos momentos que
                ficam para sempre.
              </p>
              <p>
                Um presente para a mãe. Uma lembrança para os avós. Uma peça que
                representa vocês. Transformamos esses laços em algo que pode ser
                guardado bem pertinho.
              </p>
              <div className="tags">
                <span>Família</span>
                <span>Casais</span>
                <span>Pais & avós</span>
              </div>
              <button
                className="button button-primary"
                onClick={() => showCollection("Família")}
              >
                Ver produtos para família <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>
        <section className="section kids-section" id="kids">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">PEQUENOS MUNDOS, GRANDES SONHOS</p>
              <h2>
                Um mundo feito para <em>os pequenos</em>
              </h2>
              <p>
                Personagens, lembranças e peças especiais para transformar a
                imaginação
                <br className="desktop-break" /> das crianças em algo que pode
                ser tocado e guardado.
              </p>
            </div>
            <div className="kids-grid">
              {[
                {
                  name: "Amigos de todas as aventuras",
                  text: "Personagens & peças lúdicas",
                  image: images.teddy,
                },
                {
                  name: "Um pequeno amigo articulado",
                  text: "Miniaturas & personagens em 3D",
                  image: images.nursery,
                },
                {
                  name: "Imaginação camada por camada",
                  text: "Personagens & personalizados em 3D",
                  image: images.toys,
                },
              ].map((item, i) => (
                <button
                  key={item.name}
                  className={`kids-card kids-card-${i} reveal`}
                  onClick={() =>
                    contact(
                      `Olá! Gostaria de conhecer as opções de ${item.text.toLowerCase()} da coleção Kids da 5 Camadas 3D.`,
                    )
                  }
                >
                  <div className="kids-image">
                    <img
                      src={item.image}
                      alt={`${item.name} — fotografia de uma peça impressa em 3D`}
                      loading="lazy"
                    />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                  <span className="kids-arrow">
                    <Icon name="arrow" />
                  </span>
                </button>
              ))}
            </div>
            <div className="center-action">
              <button
                className="button button-outline"
                onClick={() => showCollection("Kids")}
              >
                Ver coleção Kids <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>
        <section className="faith-section section" id="fe">
          <div className="container split-section">
            <div className="split-copy reveal">
              <p className="eyebrow">DEVOÇÃO QUE GANHA FORMA</p>
              <h2>
                Fé que também
                <br />
                pode ser <em>guardada</em>
              </h2>
              <p>
                Peças criadas para acompanhar momentos de fé, devoção e
                celebração.
              </p>
              <p>
                De uma imagem de Nossa Senhora a uma lembrança de batizado, cada
                criação é pensada com delicadeza e respeito por aquilo que é
                sagrado para você.
              </p>
              <div className="tags">
                <span>Batizados</span>
                <span>Primeira comunhão</span>
                <span>Devoção</span>
              </div>
              <button
                className="button button-primary"
                onClick={() => showCollection("Fé")}
              >
                Ver coleção de fé <Icon name="arrow" />
              </button>
              <span className="handwritten faith-note">
                A fé nos une. O carinho nos inspira.
              </span>
            </div>
            <div className="faith-image reveal">
              <div className="faith-preview faith-preview-large">
                <Icon name="cross" />
                <p className="eyebrow">PERSONALIZAÇÃO COM PROPÓSITO</p>
                <h3>
                  Sua devoção,
                  <br />
                  <em>camada por camada.</em>
                </h3>
                <p>
                  Imagens, cruzes e lembranças religiosas personalizadas por
                  impressão 3D.
                </p>
                <small>FOTOGRAFIAS DAS PEÇAS DA MARCA EM BREVE</small>
              </div>
              <Flourish />
            </div>
          </div>
        </section>
        <section className="section catalog-section" id="produtos">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">IDEIAS QUE GANHARAM FORMA</p>
              <h2>
                Algumas das <em>nossas criações</em>
              </h2>
              <p>
                Um universo de possibilidades. Qual delas tem a ver com a sua
                história?
              </p>
            </div>
            <div
              className="catalog-filters"
              aria-label="Filtrar criações por categoria"
            >
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="product-grid" aria-live="polite">
              {products
                .filter(
                  (product) =>
                    filter === "Todos" ||
                      normalizeCategory(product.category) === normalizeCategory(filter),
                )
                .map((product) => (
                  <article className="product-card" key={product.name}>
                    <div
                      className={`product-image${
                        product.contain ? " product-image-contained" : ""
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={`${product.name} — fotografia de uma peça produzida por impressão 3D`}
                        loading="lazy"
                      />
                      <span>SOB ENCOMENDA</span>
                      <button
                        className="product-heart"
                        aria-label={`Solicitar informações sobre ${product.name}`}
                        onClick={() =>
                          contact(
                            `Olá! Vi o produto ${product.name} no site da 5 Camadas 3D e gostaria de saber mais.`,
                          )
                        }
                      >
                        <Icon name="heart" />
                      </button>
                    </div>
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    {product.description && (
                      <p className="product-description">
                        {product.description}
                      </p>
                    )}
                    <button
                      className="product-cta"
                      onClick={() =>
                        contact(
                          `Olá! Vi o produto ${product.name} no site da 5 Camadas 3D e gostaria de saber mais.`,
                        )
                      }
                    >
                      Quero este <Icon name="arrow" />
                    </button>
                  </article>
                ))}
              {filter === "Fé" && (
                <div className="faith-catalog-request">
                  <Icon name="cross" />
                  <h3>Uma peça para a sua devoção.</h3>
                  <p>
                    Conte qual imagem ou lembrança religiosa você deseja criar
                    em 3D. As fotografias da coleção da marca serão adicionadas
                    em breve.
                  </p>
                  {contactButton(
                    "Consultar peças de fé",
                    false,
                    "Olá! Gostaria de conhecer os projetos de fé católica produzidos por impressão 3D pela 5 Camadas 3D.",
                  )}
                </div>
              )}
            </div>
            <p className="catalog-note">
              Cada peça é feita sob encomenda. Consulte possibilidades de cores,
              tamanhos e personalização.
              <br />
              <small>
                Fotografias de peças reais produzidas por impressão 3D, usadas
                como referências. Não representam o portfólio próprio da 5
                Camadas 3D.
              </small>
            </p>
          </div>
        </section>
        <section className="custom-section section" id="personalizados">
          <div className="container split-section">
            <div className="custom-image reveal">
              <img
                src={images.clay}
                alt="Coleção de vasos, coelhos e objetos decorativos produzidos por impressão 3D"
                loading="lazy"
              />
              <span className="custom-badge">
                <Icon name="spark" /> ÚNICO, COMO A SUA IDEIA
              </span>
            </div>
            <div className="split-copy reveal">
              <p className="eyebrow">FEITO DO SEU JEITO</p>
              <h2>
                Você imagina.
                <br />
                <em>A gente cria.</em>
              </h2>
              <p>
                Tem uma ideia diferente? Envie uma referência, desenho ou
                simplesmente conte o que você imaginou.
              </p>
              <p>
                Nossa equipe pode transformar sua ideia em uma peça
                personalizada.
              </p>
              {contactButton(
                "Enviar minha ideia",
                false,
                "Olá! Tenho uma ideia e gostaria de criar uma peça personalizada com a 5 Camadas 3D.",
              )}
              <span className="handwritten custom-note">
                Sua imaginação é o ponto de partida.
              </span>
            </div>
          </div>
        </section>
        <section className="section process-section">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">DO PRIMEIRO OLÁ AO ÚLTIMO DETALHE</p>
              <h2>
                É simples criar <em>algo especial</em>
              </h2>
            </div>
            <div className="steps">
              {[
                {
                  title: "Você tem uma ideia",
                  text: "Conte o que você deseja.",
                },
                {
                  title: "A gente conversa",
                  text: "Entendemos seu projeto e suas necessidades.",
                },
                {
                  title: "Criamos sua peça",
                  text: "Transformamos sua ideia em uma peça personalizada.",
                },
                {
                  title: "Você recebe",
                  text: "Sua peça pronta para presentear, guardar ou celebrar.",
                },
              ].map((step, i) => (
                <div className="step reveal" key={step.title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section about-section" id="sobre">
          <div className="container split-section">
            <div className="about-art reveal">
              <img
                src={images.flowers}
                alt="Peças decorativas impressas em 3D com diferentes formas, cores e texturas"
                loading="lazy"
              />
              <div className="about-art-note">
                <Icon name="heart" />
                <span>
                  Da nossa família
                  <br />
                  <em>para a sua.</em>
                </span>
              </div>
            </div>
            <div className="split-copy reveal">
              <p className="eyebrow">PRAZER, SOMOS A 5 CAMADAS 3D</p>
              <h2>
                Por trás de cada peça,
                <br />
                existe <em>uma história.</em>
              </h2>
              <p>
                A 5 Camadas 3D é uma empresa que acredita que objetos podem
                carregar sentimentos, histórias e momentos especiais.
              </p>
              <p>
                Por isso, cada projeto é desenvolvido com atenção aos detalhes e
                carinho em cada etapa. A tecnologia é a nossa ferramenta. O
                afeto é o que dá sentido a tudo.
              </p>
              <div className="about-values">
                <span>
                  <Icon name="heart" /> Família
                </span>
                <span>
                  <Icon name="spark" /> Criatividade
                </span>
                <span>
                  <Icon name="gift" /> Personalização
                </span>
                <span>
                  <Icon name="leaf" /> Fé
                </span>
              </div>
              <span className="handwritten">
                Mais do que imprimir. É criar com propósito.
              </span>
            </div>
          </div>
        </section>
        <section className="section instagram-section">
          <div className="container">
            <div className="section-heading reveal">
              <p className="eyebrow">
                <Icon name="instagram" /> NOSSO DIA A DIA, EM PEQUENOS DETALHES
              </p>
              <h2>
                Já viu o que <em>estamos criando?</em>
              </h2>
              <p>
                Acompanhe nossos projetos, novidades e criações pelo Instagram.
              </p>
            </div>
            <div className="instagram-grid">
              {[
                images.vases,
                images.teddy,
                images.gift,
                images.toys,
                images.paper,
                images.clay,
              ].map((image, i) => (
                <button
                  key={image}
                  onClick={instagram}
                  aria-label={`Conhecer a marca no Instagram — referência visual ${i + 1}`}
                >
                  <img
                    src={image}
                    alt={`Peça produzida por impressão 3D — referência para o feed ${i + 1}`}
                    loading="lazy"
                  />
                  <span>
                    <Icon name="instagram" />
                  </span>
                </button>
              ))}
            </div>
            <div className="center-action">
              <button className="button button-outline" onClick={instagram}>
                <Icon name="instagram" /> Seguir no Instagram{" "}
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>
        <section className="final-cta" id="contato">
          <Flourish className="cta-flourish-left" />
          <div className="container reveal">
            <p className="eyebrow">VAMOS CRIAR UMA MEMÓRIA?</p>
            <h2>
              Qual história você quer
              <br />
              transformar em <em>uma peça?</em>
            </h2>
            <p>
              Conte sua ideia para a 5 Camadas 3D.
              <br />
              Vamos criar algo especial juntos.
            </p>
            <div className="hero-actions">
              {contactButton("Falar pelo WhatsApp")}
              <a className="button button-outline" href="#produtos">
                Ver nossos produtos <Icon name="arrow" />
              </a>
            </div>
            <span className="handwritten">
              Vai ser um carinho criar para você.
            </span>
          </div>
          <Flourish className="cta-flourish-right" />
        </section>
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Impressão 3D personalizada
              <br />
              feita com carinho.
            </p>
            <div className="social-buttons">
              <button onClick={instagram} aria-label="Instagram">
                <Icon name="instagram" />
              </button>
              <button onClick={() => contact()} aria-label="WhatsApp">
                <Icon name="whatsapp" />
              </button>
            </div>
          </div>
          <div className="footer-links">
            <h3>Explore</h3>
            {nav.slice(0, 4).map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-links">
            <h3>Vamos criar juntos</h3>
            <a href="#personalizados">Personalizados</a>
            <a href="#sobre">Sobre nós</a>
            <button onClick={() => contact()}>Pedir orçamento</button>
            <button onClick={instagram}>Instagram</button>
          </div>
          <div className="footer-contact">
            <h3>Um primeiro olá</h3>
            <button onClick={() => contact()}>
              <Icon name="whatsapp" /> Fale com a gente
            </button>
            <p>{brandContact.whatsapp || "Telefone · em breve"}</p>
            <p>{brandContact.email || "E-mail · em breve"}</p>
            <p>{brandContact.location || "Localização · em breve"}</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 5 Camadas 3D — Todos os direitos reservados.</span>
          <span>
            Feito em camadas. Feito com <Icon name="heart" />.
          </span>
        </div>
      </footer>
      <button
        className="floating-whatsapp"
        onClick={() => contact()}
        aria-label="Falar pelo WhatsApp"
      >
        <Icon name="whatsapp" />
        <span>Vamos conversar?</span>
      </button>
      <dialog
        ref={modal}
        className="contact-dialog"
        onCancel={() => setDialog(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setDialog(null)
        }}
      >
        <button
          className="dialog-close"
          aria-label="Fechar"
          onClick={() => setDialog(null)}
        >
          <Icon name="close" />
        </button>
        <Icon
          name={dialog === "instagram" ? "instagram" : "heart"}
          className="dialog-icon"
        />
        <p className="eyebrow">UM PRIMEIRO OLÁ</p>
        <h2>
          {dialog === "instagram"
            ? "Nos vemos no Instagram."
            : "Vamos criar algo especial?"}
        </h2>
        {dialog === "instagram" ? (
          <p>
            O perfil oficial da marca será conectado em breve. Por enquanto,
            explore nossas inspirações e conte qual ideia tem a ver com você.
          </p>
        ) : (
          <>
            <p>
              O número oficial da marca ainda não foi configurado. Você pode
              copiar seu pedido ou compartilhá-lo no WhatsApp com o contato da 5
              Camadas 3D que já conhece.
            </p>
            <label htmlFor="quote-message">Sua mensagem</label>
            <textarea
              id="quote-message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                setCopied(false)
              }}
              rows={4}
            />
            <div className="dialog-actions">
              <button
                className="button button-outline"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(message)
                    setCopied(true)
                  } catch {
                    document.getElementById("quote-message")?.focus()
                  }
                }}
              >
                {copied ? (
                  <>
                    <Icon name="check" /> Mensagem copiada
                  </>
                ) : (
                  "Copiar mensagem"
                )}
              </button>
              <a
                className="button button-primary"
                href={`https://wa.me/?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> Compartilhar no WhatsApp
              </a>
            </div>
          </>
        )}
      </dialog>
    </>
  )
}
