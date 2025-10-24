# Resumify 🎯

**Create stunning ATS-friendly resumes in minutes with our free resume builder**

Resumify is a modern, privacy-first resume builder that helps you create professional, ATS-optimized resumes without any registration or hidden costs. Built with Next.js and featuring beautiful animations, it's designed to get you past Applicant Tracking Systems and land your dream job.

![Resumify Hero](https://img.shields.io/badge/Status-Active-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-purple)

## ✨ Features

### 🎯 **ATS Optimized**
- Templates designed to pass Applicant Tracking Systems
- Clean formatting that robots can read
- Industry-standard structure and keywords

### ⚡ **Lightning Fast**
- Create your resume in just 5 minutes
- Intuitive step-by-step interface
- Auto-save progress as you build
- One-click PDF generation

### 🎨 **Professional Templates**
- Modern, clean designs that stand out
- Customizable header colors
- Industry-specific layouts
- Mobile-responsive design

### 💾 **Instant Download**
- High-quality PDF generation
- No watermarks or branding
- Unlimited downloads
- No registration required

### 🔒 **100% Free Forever**
- No hidden costs or premium features
- No credit card required
- All features unlocked from day one
- No time limits or usage restrictions

### 📱 **Mobile Responsive**
- Perfect experience on all devices
- Touch-friendly interface
- Cross-device compatibility
- Offline editing support

### 🛡️ **Privacy First**
- Your data stays private
- Local processing only
- No data mining or tracking
- GDPR compliant

### 📊 **Real-time Preview**
- See exactly how your resume looks
- WYSIWYG editing experience
- Print-ready view
- Live updates as you type

### 🎓 **Expert Guidance**
- Built-in tips and suggestions
- Industry-specific insights
- Best practices guidance
- Professional writing tips

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resumify.git
   cd resumify
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see Resumify in action!

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 4.0
- **Animations**: GSAP (GreenSock Animation Platform)
- **PDF Generation**: jsPDF
- **Canvas**: html2canvas
- **Linting**: ESLint with Next.js config

## 📁 Project Structure

```
resumify/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.js            # Homepage
│   │   ├── cv-builder/        # Resume builder interface
│   │   ├── contact/           # Contact page
│   │   ├── login/             # Login page
│   │   ├── pricing/           # Pricing page
│   │   └── layout.js          # Root layout
│   ├── components/             # Reusable React components
│   │   ├── Navigation.js      # Site navigation
│   │   ├── HeroSection.js    # Landing page hero
│   │   ├── FeaturesSection.js # Features showcase
│   │   ├── CTASection.js     # Call-to-action
│   │   ├── Footer.js          # Site footer
│   │   └── index.js           # Component exports
│   └── utils/
│       └── pdfGenerator.js    # PDF generation utilities
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── next.config.mjs            # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── README.md                  # This file
```

## 🎨 Key Components

### CV Builder (`/cv-builder`)
A comprehensive 6-step resume builder featuring:
- **Step 1**: Personal Information & Customization
- **Step 2**: Professional Summary
- **Step 3**: Skills with proficiency levels
- **Step 4**: Work Experience with project details
- **Step 5**: Education history
- **Step 6**: Review & PDF Generation

### PDF Generator (`src/utils/pdfGenerator.js`)
Professional PDF generation with:
- ATS-friendly formatting
- Customizable header colors
- Multi-page support
- Clean typography and spacing
- Project and experience details

### Animation System
Smooth GSAP animations throughout:
- Scroll-triggered animations
- Mouse-following effects
- Hover interactions
- Page transitions

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Why Resumify?

| Feature | Resumify | Others |
|---------|----------|--------|
| 100% Free | ✅ | ❌ |
| No Registration | ✅ | ❌ |
| No Watermarks | ✅ | ❌ |
| ATS Optimized | ✅ | ⚠️ |
| Mobile Friendly | ✅ | ⚠️ |
| Privacy First | ✅ | ❌ |
| Instant Download | ✅ | ⚠️ |
| Professional Templates | ✅ | ✅ |

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting passes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚀 Deployment

The easiest way to deploy Resumify is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/resumify)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/resumify/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/resumify/discussions)
- **Email**: support@resumify.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [GSAP](https://greensock.com/gsap/)
- PDF generation with [jsPDF](https://github.com/parallax/jsPDF)

---

**Made with ❤️ for job seekers everywhere**

*Start building your professional resume today at [resumify.com](https://resumify.com)*