## 🧠 Desafio Técnico - Tray (Jogo da Memória)

[![Deploy](https://img.shields.io/badge/Ver%20Online-Netlify-brightgreen?style=for-the-badge&logo=netlify)](https://tray-desafio-vue.netlify.app)

Este projeto consiste em um jogo da memória desenvolvido com **Vue 3**, **TypeScript**, **Vite**, **TailwindCSS** e **Pinia**, como parte de um desafio técnico para a vaga de Programador Front-End II. O jogo inclui autenticação com Google, lógica de tentativa/erro, contagem de tempo e histórico de partidas.

---

## 🚀 Instruções para rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/lucasroncolato/desafio-tecnico-tray.git
   cd desafio-tecnico-tray
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Você pode **criar manualmente** o arquivo `.env` na raiz do projeto **ou** utilizar o exemplo disponível:

   ```bash
   cp .env.example .env

   VITE_GOOGLE_CLIENT_ID=1068659230657-mcbr68dh1mejnv0lhmqot27vdv7f4la1.apps.googleusercontent.com
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/login/callback
   VITE_PEXELS_API_KEY=LBIrMKUGxK8sSnLwRTFMncJL2BTdLdaLydlUgdbzYvaiKACnmYr6rER6
   ```

   Para ambientes como Vercel, configure as mesmas variáveis diretamente no painel da plataforma.

4. **Execute o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   O app estará disponível em [http://localhost:5173](http://localhost:5173)

---

## ✅ Funcionalidades Implementadas

- Autenticação com Google via OAuth 2.0
- Tela inicial com botão "Iniciar Jogo"
- Grid de cartas dinâmico (4x4)
- Cartas viradas inicialmente
- Lógica de pares (virar 2 cartas por vez)
- Feedback visual em caso de acerto/erro
- Tempo total de jogo
- Contagem de tentativas
- Histórico de partidas do usuário autenticado
- Tema claro/escuro com botão de alternância
- Responsividade total para mobile e desktop

---

## 🛠️ Tecnologias e Ferramentas

- **Vue 3 + TypeScript** — Framework principal com tipagem estática
- **Vite** — Bundler moderno e rápido
- **Pinia** — Gerenciador de estado oficial para Vue 3
- **TailwindCSS** — Estilização rápida e responsiva
- **OAuth Google** — Login seguro via conta Google
- **Vitest** — Testes unitários e interativos com ótima performance

---

## 🧪 Testes

### Executar todos os testes:

```bash
npm run test
```

### Executar testes com interface:

```bash
npm run test:ui
```

Os testes cobrem:

- Renderização do grid
- Lógica de virar cartas
- Validação de pares
- Persistência de histórico

---

## 📁 Estrutura de Pastas

```plaintext
src/
├── assets/               # Imagens e ícones do jogo
├── components/           # Componentes Vue (Header, Card, GameBoard etc.)
├── router/               # Rotas com Vue Router
├── store/                # Store global com Pinia (auth, game, history)
├── views/                # Views principais (Home, Game, History)
├── composables/          # Funções reutilizáveis (ex: useTheme)
├── tests/                # Testes com Vitest
└── App.vue / main.ts     # Arquivos principais da aplicação
```

---

## 📌 Considerações Técnicas

- O jogo foi desenvolvido com foco em performance e organização de código (atomic design + composition API).
- A autenticação com Google foi feita via `response_type=token` (implícito), sendo ideal para SPAs.
- O histórico de partidas é salvo no `localStorage` associado ao usuário autenticado.
- O layout foi feito pensando em UX mobile-first e adaptação para desktop.

---

## 🔐 Observações de Segurança

- O fluxo de autenticação não expõe client secret no frontend.
- Em produção, recomenda-se realizar a troca de token em backend seguro (Authorization Code Flow).

---

## 📷 Screenshot

![preview](https://raw.githubusercontent.com/lucasroncolato/desafio-tecnico-tray/main/public/preview.png)

---

## 📜 Licença

Este projeto foi desenvolvido como parte de um desafio técnico e está sob a licença MIT.
