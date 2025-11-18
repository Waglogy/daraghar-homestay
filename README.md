# 🏔️ Daraghar Maila - Luxury Mountain Retreat

<div align="center">

![Daraghar Maila](https://img.shields.io/badge/Daraghar%20Maila-Luxury%20Retreat-4CAF50?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)

**Premium glamping and homestay experience in Sikkim near Gangtok**

*Developed with ❤️ by [Waglogy](https://waglogy.com)*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Deployment](#-deployment)

</div>

---

## 📖 About

**Daraghar Maila** is a luxury mountain retreat offering premium glamping tents, authentic homestays, and modern wellness pods in the beautiful region of Sikkim, near Gangtok. This website provides a seamless booking experience for travelers seeking an immersive mountain getaway with modern amenities and cultural experiences.

### 🌟 Key Highlights

- **Luxury Glamping Tents** - Premium safari-style tents with en-suite bathrooms and heated beds
- **Authentic Homestays** - Experience local culture with warm family hospitality
- **Mountain Wellness Pods** - Modern eco-friendly pods with panoramic views
- **Cultural Experiences** - Organic meals, local guides, and cultural immersion
- **Admin Dashboard** - Complete booking and guest management system

---

## ✨ Features

### 🎨 User-Facing Features

- **🏠 Accommodations** - Browse and explore different accommodation options
- **📅 Booking System** - Easy-to-use booking interface with date selection
- **📸 Gallery** - Beautiful image gallery showcasing the property and experiences
- **💬 Testimonials** - Guest reviews and testimonials display
- **🌄 Experiences** - Discover local activities and cultural experiences
- **📧 Contact Form** - Direct communication with the property
- **🌓 Dark Mode** - Theme support for better user experience

### 🔐 Admin Features

- **📊 Dashboard** - Overview of bookings, guests, and payments
- **📝 Booking Management** - View and manage all reservations
- **👥 Guest Management** - Track guest information and preferences
- **💰 Payment Tracking** - Monitor payments and transactions
- **📞 Contact Management** - Handle inquiries and messages
- **⭐ Review Management** - Moderate and display guest reviews

---

## 🛠️ Tech Stack

### Core Technologies

- **[Next.js 16.0](https://nextjs.org/)** - React framework with App Router
- **[React 19.2](https://react.dev/)** - UI library
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI

### Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries

- **[date-fns](https://date-fns.org/)** - Date utility library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Daraghar-maila
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Daraghar-maila/
├── app/                      # Next.js App Router pages
│   ├── accommodations/       # Accommodation pages
│   │   ├── glamping/        # Glamping tent details
│   │   └── homestay/        # Homestay details
│   ├── admin/               # Admin dashboard
│   │   ├── bookings/        # Booking management
│   │   ├── guests/          # Guest management
│   │   ├── payments/        # Payment tracking
│   │   ├── contacts/        # Contact management
│   │   ├── reviews/         # Review management
│   │   └── login/           # Admin login
│   ├── booking/             # Booking page
│   ├── contact/             # Contact page
│   ├── gallery/             # Gallery page
│   ├── testimonials/        # Testimonials page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── accommodations.tsx   # Accommodations section
│   ├── booking-cta.tsx      # Booking call-to-action
│   ├── experiences.tsx      # Experiences section
│   ├── footer.tsx           # Footer component
│   ├── gallery.tsx          # Gallery component
│   ├── hero.tsx             # Hero section
│   ├── navigation.tsx       # Navigation bar
│   ├── testimonial-form.tsx # Testimonial form
│   └── testimonials-display.tsx # Testimonials display
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
├── public/                  # Static assets
└── styles/                  # Global styles
```

---

## 🎨 Customization

### Theme Configuration

The project uses Tailwind CSS with a custom theme. You can customize colors, fonts, and other design tokens in:

- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.js` - Tailwind configuration (if exists)

### Adding New Accommodations

1. Add accommodation data in `app/accommodations/page.tsx`
2. Create a new page in `app/accommodations/[type]/page.tsx`
3. Update the accommodations component as needed

---

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, accommodations, experiences, and gallery |
| `/accommodations` | All accommodation options |
| `/accommodations/glamping` | Luxury glamping tent details |
| `/accommodations/homestay` | Authentic homestay details |
| `/booking` | Booking form and reservation |
| `/contact` | Contact form |
| `/gallery` | Photo gallery |
| `/testimonials` | Guest testimonials |
| `/admin` | Admin dashboard (protected) |
| `/admin/bookings` | Booking management |
| `/admin/guests` | Guest management |
| `/admin/payments` | Payment tracking |
| `/admin/contacts` | Contact inquiries |
| `/admin/reviews` | Review management |

---

## 🔒 Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
# Example:
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
```

---

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** (if configured) for code formatting

---

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Deployment Options

- **Netlify** - Configure build command: `npm run build` and publish directory: `.next`
- **AWS Amplify** - Connect your repository and configure build settings
- **Docker** - Create a Dockerfile for containerized deployment

---

## 🤝 Contributing

This project is developed and maintained by **Waglogy**. For contributions or inquiries, please contact the development team.

---

## 📄 License

This project is proprietary and confidential. All rights reserved.

---

## 👨‍💻 Developed By

<div align="center">

**Waglogy**

*Building beautiful digital experiences*

[Website](https://waglogy.com) • [Contact](mailto:info@waglogy.com)

</div>

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Radix UI** - For accessible component primitives
- **shadcn** - For the beautiful component library
- **Tailwind CSS** - For the utility-first CSS framework

---

<div align="center">

**Made with ❤️ by Waglogy for Daraghar Maila**

⭐ Star this repo if you find it helpful!

</div>

