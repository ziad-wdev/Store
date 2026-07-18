# 🛒 Store — Modern E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Discover a high-performance, responsive e-commerce storefront web application designed with the modern web stack. Built using the **Next.js App Router**, **React 19**, **Tailwind CSS v4**, and **Redux Toolkit**, this application delivers a fast, interactive shopping experience.

The application integrates with the reliable, real-world [DummyJSON API](https://dummyjson.com/) to fetch dynamic product lists, review details, categorize goods, search products, and paginate results instantly.

---

## 🚀 Key Features

- **⚡ Real-time Data Integration**: Directly connects to the DummyJSON API via **RTK Query** for instant product retrieval, filtering, and searches.
- **📦 Client-Side Persistent Cart**: Easily add, update, and remove items from the shopping cart. Quantities and totals are recalculated dynamically.
- **❤️ Wishlist / Likes Management**: Save favorite products across page refreshes, managed through a persisted global Redux store.
- **🔍 Advanced Search & Category Filtering**: Browse specific collections, search by text queries, and step through paginated results gracefully.
- **🎨 Tailwind CSS v4 Styling**: Features a sleek, modern visual palette with beautiful transition colors, responsive layouts, and skeleton loading states.
- **📱 Responsive & Interactive UX**: Leverages `embla-carousel` for gorgeous carousels on the home page, interactive product cards, and instant toast feedback via `sonner`.

---

## 🛠️ Architecture & Folder Structure

This project follows standard Next.js App Router and Redux best practices:

```text
/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── cart/               # Cart page
│   │   ├── products/           # Main products list & search routing
│   │   │   └── [id]/           # Dynamic product details page
│   │   ├── layout.tsx          # App-wide providers, header, footer, toast
│   │   ├── page.tsx            # Interactive homepage (carousel, services, discounts)
│   │   └── globals.css         # Tailwind v4 import & custom styles
│   │
│   ├── components/             # Reusable UI & Layout Components
│   │   ├── ui/                 # Basic building blocks (buttons, badge, inputs, carousel)
│   │   └── web/                # High-level page-specific blocks (header, footer, filters)
│   │
│   ├── lib/                    # Common helper utilities
│   │   └── utils.ts            # Dynamic Tailwind class merges (clsx + tailwind-merge)
│   │
│   └── store/                  # Redux Toolkit Global State
│       ├── store.ts            # Store config with persisted user slice
│       ├── provider.tsx        # Redux provider for App Router layout wrapping
│       ├── apis/               # RTK Query service declarations
│       │   └── productsApi.ts  # DummyJSON products & category endpoints
│       └── slices/             # Redux slices
│           └── userSlice.ts    # Wishlist and cart persistence logic
```

---

## 🏁 Getting Started

Follow these instructions to set up the project locally for development and production.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- `npm` (v9.x or higher) or your preferred package manager (Yarn, pnpm, Bun)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/store.git
   cd store
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to view the application.

---

## ⚙️ Available Scripts

In the project root, you can execute the following commands:

| Command         | Description                                                                  |
| :-------------- | :--------------------------------------------------------------------------- |
| `npm run dev`   | Runs the app in development mode at `http://localhost:3000`.                 |
| `npm run build` | Builds the optimized production application inside the `.next` directory.    |
| `npm run start` | Starts the Next.js production server (requires `npm run build` first).       |
| `npm run lint`  | Runs the ESLint checker to identify code formatting and code quality issues. |

---

## 💡 Tech Stack Highlights & Usage Examples

### RTK Query Integration

The products, categories, search queries, and individual details are fetched via RTK Query (`src/store/apis/productsApi.ts`):

```typescript
// Define endpoints in RTK Query
getProducts: builder.query<{ products: Product[]; totalPages: number }, GetProductsParams | void>({
  query: (params) => {
    // Dynamically handles queries for categories, text search, and pagination skipping
  },
})
```

### Local Storage Cart & Wishlist Persistence

The shopping cart state and wishlist items are kept persistent across browser sessions using `redux-persist`:

```typescript
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'user',
  storage,
}
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

To contribute:

1. **Fork** the project repository.
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes following clean code conventions (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

Please make sure to run the lint check before opening your pull request to keep code clean and uniform:

```bash
npm run lint
```

---

## 🙋 Getting Help

If you run into issues, need assistance, or want to discuss enhancements:

- Check out our **GitHub Issues** section to search for similar questions or open a new issue.
- Read through the [CLAUDE.md](CLAUDE.md)/`AGENTS.md` rules for agent instructions, if you are developing or using an AI-assisted toolchain on this workspace.

---

## 👥 Maintainers & Authors

- **Portfolio Owner / Creator** - [Ziad](https://github.com/ziad)
- Initial templates and bootsrapping from Vercel next-app.

---

## 📄 License

This project is open-source software licensed under the **[MIT License](https://opensource.org/licenses/MIT)**. Feel free to use and customize it!
