// Catálogo Two Little Layers — editado pela Layla (/layla).
// preco: número em USD, ou null = "Price on request" (nunca inventar preço).
// precos: lista [{ label, preco }] quando há tamanhos/kits (substitui preco).
// foto: caminho em fotos/ (vazio = mostra o cartão sem foto até a Raiany mandar).
// fotoInteira: true = mostra a foto sem cortar (fotos horizontais e conjuntos).
// rascunho: true = NÃO aparece no catálogo publicado (só na prévia com ?preview).
// colecao: em qual página o produto aparece (christmas, kids, home-gifts).
// customizavel: true = kit com personagens trocáveis (mostra os preços de troca).
window.LOJA = {
  nome: "Two Little Layers",
  instagram: "twolittlelayers.co",
  whatsapp: "15083673567",
  cidade: "Cape Cod, MA",
  titulo: "Holiday Gift Guide 2026",
  subtitulo: "Personalized 3D creations, made with love, layer by layer.",
  prazoEntrega: "3 to 5 days", // prazo de entrega de cada pedido (Raiany/Israel, 2026-10-17)
  pedidoAte: "Fri, Dec 18", // último dia de pedido: 1 semana antes do Natal (Raiany/Israel, 2026-10-17)
  categorias: ["Christmas", "Kids", "Home", "Gifts", "Personalized"],
  // Coleções do site. A primeira com destaque: true vira o banner da página inicial.
  // publicada: false = escondida do menu e da página inicial (aparece só com ?preview).
  colecoes: [
    { id: "christmas", nome: "Christmas", titulo: "Holiday Gift Guide 2026", chamada: "Cozy handmade pieces for your home and the people you love.", foto: "fotos/christmas-mini-set.webp", destaque: true },
    { id: "kids", nome: "Kids & Toys", titulo: "Kids & Toys", chamada: "Playful little pieces made to be loved.", foto: "fotos/veggie-garden.webp", publicada: false },
    { id: "home-gifts", nome: "Home & Gifts", titulo: "Home & Gifts", chamada: "Everyday pieces that make home a little sweeter.", foto: "fotos/kitty-planter.webp", publicada: false }
  ],
  // Troca de personagens nos kits customizáveis (Raiany/Israel, 2026-10-17).
  troca: { preco: 5, precoJesus: 8 }
};

// Personagens que podem entrar nos kits customizáveis.
window.PERSONAGENS = [
  { id: "jesus", nome: "Mini Jesus", foto: "fotos/character-jesus.webp", destaque: true },
  { id: "santa", nome: "Santa", foto: "fotos/character-santa.webp" },
  { id: "reindeer", nome: "Reindeer", foto: "fotos/character-reindeer.webp" },
  { id: "snowman", nome: "Snowman", foto: "fotos/character-snowman.webp" },
  { id: "polar-bear", nome: "Polar Bear", foto: "fotos/character-polar-bear.webp" },
  { id: "gingerbread", nome: "Gingerbread", foto: "fotos/character-gingerbread.webp" },
  { id: "tree", nome: "Christmas Tree", foto: "fotos/character-tree.webp" },
  { id: "puppy", nome: "Holiday Puppy", foto: "fotos/character-puppy.webp" },
  { id: "penguin", nome: "Penguin", foto: "fotos/character-penguin.webp" }
];

window.PRODUTOS = [
  { id: "christmas-mini-set", nome: "Christmas Mini Set", descricao: "6 cozy knit-look minis: Santa, reindeer, snowman, polar bear, gingerbread and tree, with tray.", preco: 39.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/christmas-mini-set.webp", fotoInteira: true, customizavel: true, personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "modern-reindeer", nome: "Modern Reindeer", descricao: "Ribbed Scandi-style reindeer. Mix the colors for a cozy mantel.", precos: [{ label: "Small", preco: 7.99 }, { label: "Large", preco: 10.99 }, { label: "Set of 3 small", preco: 19.99 }, { label: "Set of 3 large", preco: 27.99 }], categoria: "Christmas", colecao: "christmas", foto: "fotos/modern-reindeer.webp", fotoInteira: true, personalizavel: false, opcoes: ["Sage green", "Beige", "Red"], destaque: true, rascunho: false },
  { id: "tree-trays", nome: "Christmas Tree Trays", descricao: "Tree-shaped trays for cookies, candy and holiday snacks.", precos: [{ label: "1 tray", preco: 5.99 }, { label: "Set of 6", preco: 29.99 }], categoria: "Christmas", colecao: "christmas", foto: "fotos/tree-trays.webp", personalizavel: false, opcoes: ["Red", "Green"], destaque: false, rascunho: false },
  { id: "tree-napkin-holder", nome: "Christmas Tree Napkin Holder", descricao: "Gold swirl tree napkin holder. Instant holiday table.", preco: 5.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/tree-napkin-holder.webp", personalizavel: false, opcoes: ["Gold"], destaque: false, rascunho: false },
  { id: "reindeer-sleigh", nome: "Reindeer & Sleigh", descricao: "Elegant cream reindeer with sleigh. Fill it with ornaments, candy or pine.", preco: 19.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/reindeer-sleigh.webp", personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "feliz-natal-snowflake", nome: "Feliz Natal Snowflake Decor", descricao: "\"Feliz Natal\" sign with a snowflake. Merry Christmas, Brazilian style.", preco: 14.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/feliz-natal-snowflake.webp", personalizavel: false, opcoes: [], destaque: false, rascunho: false },
  { id: "rotating-cookie-stand", nome: "Rotating Cookie Tower", descricao: "3-tier rotating treat stand with a star on top. The star of your dessert table.", preco: 44.90, categoria: "Christmas", colecao: "christmas", foto: "fotos/rotating-cookie-stand.webp", personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "nativity-set", nome: "Holy Family Tray Set", descricao: "Holy Family with a little tree on a ribbed tray. A peaceful centerpiece.", preco: 29.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/nativity-set.webp", fotoInteira: true, personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "knit-nativity-scene", nome: "Christmas Nativity Scene", descricao: "Knit-look nativity under a star arch: Holy Family, Three Kings and animals.", preco: 30, categoria: "Christmas", colecao: "christmas", foto: "fotos/knit-nativity-scene.webp", fotoInteira: true, personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "christmas-village-set", nome: "Christmas Village Set", descricao: "Glowing little houses, knit-look reindeer and tree on a ribbed tray. LED candles included.", preco: 29.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/christmas-village-set.webp", fotoInteira: true, customizavel: true, personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "shelf-sitters", nome: "Santa & Snowman Shelf Sitters", descricao: "Set of 2 flexible-leg buddies that sit on any shelf, mantel or desk edge.", preco: 15.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/shelf-sitters.webp", fotoInteira: true, personalizavel: false, opcoes: [], destaque: false, rascunho: false },
  { id: "feliz-natal-set", nome: "Feliz Natal Christmas Set", descricao: "4 pieces: \"Feliz Natal\" snowflake sign, knit-look Santa, tree and ribbed tray.", preco: 34.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/feliz-natal-set.webp", fotoInteira: true, customizavel: true, personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "reindeer-candle-holder", nome: "Reindeer Candle Holder", descricao: "Smiling reindeer candle holder. Jar candle included.", preco: 14.99, categoria: "Christmas", colecao: "christmas", foto: "fotos/reindeer-candle-holder.webp", personalizavel: false, opcoes: [], destaque: true, rascunho: false },

  // Produtos do feed (2026-10-17). Fotos tiradas do Instagram; preço sob consulta até a Raiany mandar.
  { id: "umbrella-spinner", nome: "Umbrella Spinner", descricao: "Color-shifting spinning top. A fidget toy kids can't put down.", preco: null, categoria: "Kids", colecao: "kids", foto: "fotos/umbrella-spinner.webp", personalizavel: false, opcoes: ["Purple & blue", "Pink"], destaque: true, rascunho: false },
  { id: "veggie-garden", nome: "Little Veggie Garden", descricao: "Pull-and-play garden with carrot, radish, corn and broccoli.", preco: null, categoria: "Kids", colecao: "kids", foto: "fotos/veggie-garden.webp", personalizavel: false, opcoes: [], destaque: true, rascunho: false },
  { id: "egg-set", nome: "Surprise Egg & Fried Egg Coaster", descricao: "Opening egg keepsake box with a sunny-side-up coaster.", preco: null, categoria: "Gifts", colecao: "kids", foto: "fotos/egg-set.webp", personalizavel: false, opcoes: [], destaque: false, rascunho: false },
  { id: "kitty-planter", nome: "Kitty Planter", descricao: "Cat-ear pot for succulents, pens or makeup brushes.", preco: null, categoria: "Home", colecao: "home-gifts", foto: "fotos/kitty-planter.webp", personalizavel: true, opcoes: ["White"], destaque: false, rascunho: false },
  { id: "pink-jar", nome: "Pink Lidded Jar", descricao: "Sweet little jar for treats, jewelry or hair ties.", preco: null, categoria: "Home", colecao: "home-gifts", foto: "", personalizavel: true, opcoes: [], destaque: false, rascunho: false }
];
