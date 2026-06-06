const year = new Date().getFullYear();

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    home: {
      greetingPrefix: "Hi, I'm",
      subtitle1: "Front-end Developer",
      subtitle2: "I build modern, scalable and high-performance web interfaces.",
      stats: {
        monthsLabel: "Year",
        projectsLabel: "Projects",
        responsiveLabel: "Responsive",
      },
    },
    about: {
      title: "About Me",
      p1: "I'm a front-end developer focused on building modern, scalable and high-performance web interfaces.",
      p2: "I enjoy crafting smooth animations, optimized architecture and clean user experiences.",
      cards: [
        { title: "Clean Architecture", text: "Structured, scalable and maintainable project structure." },
        { title: "Performance First", text: "Optimized rendering, smooth animation and fast load time." },
        { title: "Modern UI/UX", text: "Minimal dark design with premium motion interactions." },
      ],
      qualities: [
        { title: "AI-Powered Dev",     desc: "Claude, ChatGPT, Copilot" },
        { title: "Problem Solving",    desc: "Creative & logical approach" },
        { title: "Clean Code",         desc: "Readable & maintainable" },
        { title: "Responsive Design",  desc: "Pixel-perfect on all screens" },
        { title: "Fast Learner",       desc: "Quick tech adaptation" },
      ],
    },
    skills: {
      title: "Tech Stack",
      learningTitle: "Currently Learning",
      catTitles: ["Frontend", "Tools", "Styling"],
    },
    projects: {
      title: "Projects",
      items: [
        {
          title: "Kerakli.uz",
          desc: "Uzbekistan's Telegram bot directory — categories, ratings and custom bot development services.",
          tags: ["React", "Next.js", "Tailwind"],
          url: "https://kerakkliuz.netlify.app/",
        },
        {
          title: "Mock-Interview.uz",
          desc: "Online mock interview preparation platform for IT specialists — real Q&A format.",
          tags: ["React", "Node.js", "TypeScript"],
          url: "https://mock-interview.uz",
        },
        {
          title: "Portfolio",
          desc: "Interactive personal portfolio built with Three.js, Framer Motion and React.",
          tags: ["React", "Three.js", "Framer Motion"],
          url: "https://ulugbeknurmatov.uz",
        },
        {
          title: "HRM System",
          desc: "Corporate HRM system for employee management, time tracking and detailed reporting.",
          tags: ["React", "Redux", "Ant Design"],
          url: "https://hrm.ulugbeknurmatov.uz",
        },
        {
          title: "Finance Manager",
          desc: "Personal finance management app to track income, expenses and financial goals.",
          tags: ["React", "Chart.js"],
          url: "https://financemanagern1.netlify.app/",
        },
        {
          title: "Password Vault",
          desc: "Secure password vault app to safely store and manage all your passwords.",
          tags: ["React", "Crypto API"],
          url: "https://passwordvault1.netlify.app/",
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      available: "Available for work",
      subtitle: "Open to new projects and collaborations.",
      labels: {
        gitlab: "GitLab",
        telegram: "Telegram",
        phone: "Phone",
        instagram: "Instagram",
      },
      copy: "Click to copy",
      copied: "Copied!",
    },
    footer: {
      copy: `© ${year} Ulug'bek. All rights reserved.`,
    },
  },

  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Men haqimda",
      skills: "Ko'nikmalar",
      projects: "Loyihalar",
      contact: "Aloqa",
    },
    home: {
      greetingPrefix: "Salom, men",
      subtitle1: "Front-end Dasturchi",
      subtitle2: "Men zamonaviy, kengaytiriladigan va yuqori samarali veb interfeyslar yarataman.",
      stats: {
        monthsLabel: "Yil",
        projectsLabel: "Loyihalar",
        responsiveLabel: "Adaptiv",
      },
    },
    about: {
      title: "Men haqimda",
      p1: "Men zamonaviy, kengaytiriladigan va yuqori samarali veb interfeyslar yaratishga ixtisoslashgan front-end dasturchiman.",
      p2: "Silliq animatsiyalar, optimallashtirilgan arxitektura va qulay foydalanuvchi tajribasini yaratishni yaxshi ko'raman.",
      cards: [
        { title: "Toza Arxitektura", text: "Tartibli, kengaytiriladigan va saqlanadigan loyiha tuzilmasi." },
        { title: "Samaradorlik", text: "Optimallashtirilgan render, silliq animatsiya va tez yuklash." },
        { title: "Zamonaviy UI/UX", text: "Minimal qora dizayn va premium harakat animatsiyalari." },
      ],
      qualities: [
        { title: "AI bilan ishlash",   desc: "Claude, ChatGPT, Copilot" },
        { title: "Muammo yechish",     desc: "Ijodiy va mantiqiy yondashuv" },
        { title: "Toza kod",           desc: "O'qilishi va saqlanishi oson" },
        { title: "Adaptiv dizayn",     desc: "Barcha ekranlarda mukammal" },
        { title: "Tez o'rganish",      desc: "Yangi texnologiyalarni tez o'zlashtirish" },
      ],
    },
    skills: {
      title: "Texnologiyalar",
      learningTitle: "O'rganmoqdaman",
      catTitles: ["Frontend", "Vositalar", "Stilizatsiya"],
    },
    projects: {
      title: "Loyihalar",
      items: [
        {
          title: "Kerakli.uz",
          desc: "O'zbekistondagi Telegram botlar katalogi — kategoriyalar, reyting va maxsus bot ishlab chiqish xizmatlari.",
          tags: ["React", "Next.js", "Tailwind"],
          url: "https://kerakkliuz.netlify.app",
        },
        {
          title: "Mock-Interview.uz",
          desc: "IT mutaxassislar uchun online mock interview tayyorgarlik platformasi — real savol-javob formatida.",
          tags: ["React", "Node.js", "TypeScript"],
          url: "https://mock-interview.uz",
        },
        {
          title: "Portfolio",
          desc: "Three.js, Framer Motion va React bilan qurilgan interaktiv shaxsiy portfolio sayt.",
          tags: ["React", "Three.js", "Framer Motion"],
          url: "https://ulugbeknurmatov.uz",
        },
        {
          title: "HRM System",
          desc: "Xodimlarni boshqarish, ish vaqtini kuzatish va batafsil hisobotlar uchun korporativ HRM tizimi.",
          tags: ["React", "Redux", "Ant Design"],
          url: "https://hrm.ulugbeknurmatov.uz",
        },
        {
          title: "Finance Manager",
          desc: "Daromad, xarajat va moliyaviy maqsadlarni kuzatish uchun shaxsiy moliya boshqaruv ilovasi.",
          tags: ["React", "Chart.js"],
          url: "https://financemanagern1.netlify.app/",
        },
        {
          title: "Password Vault",
          desc: "Barcha parollaringizni xavfsiz saqlash va boshqarish uchun shifrlangan parol xazinasi.",
          tags: ["React", "Crypto API"],
          url: "https://passwordvault1.netlify.app/",
        },
      ],
    },
    contact: {
      title: "Bog'laning",
      available: "Ishga tayyor",
      subtitle: "Yangi loyihalar va hamkorlikka ochiqman.",
      labels: {
        gitlab: "GitLab",
        telegram: "Telegram",
        phone: "Telefon",
        instagram: "Instagram",
      },
      copy: "Nusxalash uchun bosing",
      copied: "Nusxalandi!",
    },
    footer: {
      copy: `© ${year} Ulug'bek. Barcha huquqlar himoyalangan.`,
    },
  },
};
