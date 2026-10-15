import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LanguageTransition } from "@/components/portfolio/language-transition";

export type Lang = "pl" | "en" | "ua";
export const LANGS: Lang[] = ["pl", "en", "ua"];

type Job = { period: string; role: string; company: string; text: string };
type Project = { title: string; text: string; stack: string[] };

type Dict = {
  nav: { history: string; projects: string; contact: string };
  hero: { line1: string; line2: string; lead: string; cta: string; secondary: string };
  about: { title: string; lines: string[]; stats: { value: string; label: string }[] };
  history: { title: string; jobs: Job[] };
  projects: { title: string; items: Project[]; view: string };
  contact: {
    title: string; lead: string; name: string; email: string; message: string;
    send: string; sending: string; sent: string; direct: string; errName: string; errEmail: string; errMessage: string;
  };
  footer: { rights: string; top: string };
  transition: string;
};

const projectStacks: [string[], string[], string[], string[], string[], string[]] = [
  ["xx", "xx", "xx", "xx"],
  ["Next.js", "PostgreSQL", "tRPC", "Tailwind"],
  ["Node.js", "Redis", "WebSockets", "Docker"],
  ["React Native", "GraphQL", "Expo"],
  ["Three.js", "GLSL", "Vite"],
  ["Rust", "WASM", "TypeScript"],
];

export const dict: Record<Lang, Dict> = {
  pl: {
    nav: { about: "O mnie", history: "Historia", projects: "Projekty", contact: "Kontakt" },
    hero: {
      line1: "Czysty design,",
      line2: "wydajny kod.",
      lead: "Tworzę interfejsy, które po prostu działają, bez zbędnych bajerów.",
      cta: "Skontaktuj się",
      secondary: "Zobacz projekty",
    },
    about: {
      title: "Detal to nie dodatek. To produkt.",
      lines: [
        "Od 7 lat buduję strony i aplikacje webowe.",
        "Łączę trudny i pomysłowy design z wydajnym kodem.",
        "Wierzę że dobre podejście wygeneruje dobre zyski.",
        "Pracuję wiele godzin dziennie co przynosi rezultaty.",
      ],
      stats: [
        { value: "7+", label: "lat doświadczenia" },
        { value: "10+", label: "stworzonych projektów" },
      ],
    },
    history: {
      title: "Droga zawodowa",
      jobs: [
        { period: "2024 – Dziś", role: "Senior Fullstack Developer", company: "Freelance", text: "Buduję własne modele AI, zarządzam oraz buduję zaawansowane strony internetowe." },
        { period: "2022 – 2024", role: "Fullstack Developer", company: "7Scripts", text: "Tworzenie frameworków, skryptów, UI i wiele więcej w społeczności FiveM." },
        { period: "2021 – 2022", role: "Backend Developer", company: "Freelance", text: "Budowanie własnych narzędzi do platform typu Discord oraz życia codziennego." },
        { period: "2020 – 2021", role: "Junior Web Developer", company: "Freelance", text: "Tworzenie własnych stron internetowych." },
        { period: "2019 – 2020", role: "Self-Study & Open Source", company: "Freelance", text: "Początki programowania - edytowanie skryptów FiveM, pierwsze bazy danych na MySQL." },
      ],
    },
    projects: {
      title: "Wybrane realizacje",
      view: "Szczegóły",
      items: [
        { title: "xx", text: "xx.", stack: projectStacks[0] },
      ],
    },
    contact: {
      title: "Porozmawiajmy.",
      lead: "Masz projekt, rolę lub pomysł? Odpowiem tobie jak najszybciej tylko mogę.",
      name: "Imię i nazwisko", email: "Adres e-mail", message: "Wiadomość",
      send: "Wyślij wiadomość", sending: "Wysyłanie…", sent: "Dziękuję. Wiadomość została wysłana.",
      direct: "Bezpośrednio",
      errName: "Podaj imię.", errEmail: "Podaj poprawny e-mail.", errMessage: "Wiadomość jest za krótka.",
    },
    footer: { rights: "Wszelkie prawa zastrzeżone.", top: "Do góry" },
    transition: "Zmienianie języka",
  },
  en: {
    nav: { about: "About", history: "History", projects: "Projects", contact: "Contact" },
    hero: {
      line1: "I design interfaces",
      line2: "you can feel.",
      lead: "I build precise, fast and refined web applications where engineering meets design.",
      cta: "Contact Me",
      secondary: "View projects",
    },
    about: {
      title: "Detail is not an extra. It is the product.",
      lines: [
        "I have been building websites and web applications for 7 years.",
        "I combine complex and creative design with efficient code.",
        "I believe that a good approach will generate good profits.",
        "I work many hours a day, which brings results.",
      ],
      stats: [
        { value: "7+", label: "years of experience" },
        { value: "10+", label: "created projects" },
      ],
    },
    history: {
      title: "Career path",
      jobs: [
        { period: "2024 – Present", role: "Senior Fullstack Developer", company: "Freelance", text: "Building my own AI models, managing and building advanced websites." },
        { period: "2022 – 2024", role: "Fullstack Developer", company: "7Scripts", text: "Creating frameworks, scripts, UI, and much more in the FiveM community." },
        { period: "2021 – 2022", role: "Backend Developer", company: "Freelance", text: "Building custom tools for platforms like Discord and everyday life." },
        { period: "2020 – 2021", role: "Junior Web Developer", company: "Freelance", text: "Creating custom websites." },
        { period: "2019 – 2020", role: "Self-Study & Open Source", company: "Freelance", text: "The beginnings of programming - editing FiveM scripts, first MySQL databases." },
      ],
    },
    projects: {
      title: "Selected work",
      view: "Details",
      items: [
        { title: "xx", text: "xx.", stack: projectStacks[0] },
      ],
    },
    contact: {
      title: "Let's talk.",
      lead: "Have a project, role or idea? I reply within 24 hours.",
      name: "Full name", email: "Email address", message: "Message",
      send: "Send message", sending: "Sending…", sent: "Thank you. Your message has been sent.",
      direct: "Direct",
      errName: "Please enter your name.", errEmail: "Please enter a valid email.", errMessage: "Message is too short.",
    },
    footer: { rights: "All rights reserved.", top: "Back to top" },
    transition: "Changing language",
  },
  ua: {
    nav: { about: "Про мене", history: "Історія", projects: "Проєкти", contact: "Контакт" },
    hero: {
      line1: "Я створюю інтерфейси,",
      line2: "які відчуваються.",
      lead: "Будую точні, швидкі та довершені вебзастосунки на перетині інженерії та дизайну.",
      cta: "Зв'язатися",
      secondary: "Дивитися проєкти",
    },
    about: {
      title: "Деталь — не доповнення. Це продукт.",
      lines: [
        "Вже 7 років я створюю вебсайти та вебдодатки.",
        "Я поєдную складний та креативний дизайн з ефективним кодом.",
        "Я вірю, що хороший підхід принесе хороші прибутки.",
        "Я працюю багато годин на день, що приносить результати.",
      ],
      stats: [
        { value: "7+", label: "років досвіду" },
        { value: "10+", label: "створених проектів" },
      ],
    },
    history: {
      title: "Професійний шлях",
      jobs: [
        { period: "2024 – Сьогодні", role: "Senior Fullstack Developer", company: "позаштатний", text: "Створюю власні моделі ШІ, керую та розробляю передові вебсайти." },
        { period: "2022 – 2024", role: "Fullstack Developer", company: "7Scripts", text: "Створення фреймворків, скриптів, UI та багато іншого у спільноті FiveM." },
        { period: "2021 – 2022", role: "Backend Developer", company: "позаштатний", text: "Створення власних інструментів для платформ типу Discord та повсякденного життя." },
        { period: "2020 – 2021", role: "Junior Web Developer", company: "позаштатний", text: "Створення власних вебсайтів." },
        { period: "2019 – 2020", role: "Self-Study & Open Source", company: "позаштатний", text: "Початок програмування - редагування скриптів FiveM, перші бази даних на MySQL." },
      ],
    },
    projects: {
      title: "Вибрані роботи",
      view: "Детальніше",
      items: [
        { title: "xx", text: "xx.", stack: projectStacks[0] },
      ],
    },
    contact: {
      title: "Поговорімо.",
      lead: "Маєте проєкт, вакансію чи ідею? Відповідаю протягом 24 годин.",
      name: "Ім'я та прізвище", email: "Електронна пошта", message: "Повідомлення",
      send: "Надіслати", sending: "Надсилання…", sent: "Дякую. Повідомлення надіслано.",
      direct: "Напряму",
      errName: "Вкажіть ім'я.", errEmail: "Вкажіть коректний e-mail.", errMessage: "Повідомлення надто коротке.",
    },
    footer: { rights: "Усі права захищено.", top: "Нагору" },
    transition: "Зміна мови",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const I18nContext = createContext<Ctx | null>(null);
export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pl");
  const [transition, setTransition] = useState<{ phase: "loading" | "exiting"; lang: Lang } | null>(null);

  useEffect(() => {
    if (!transition || transition.phase !== "loading") return;
    const exitTimer = window.setTimeout(() => setTransition((current) => current && { ...current, phase: "exiting" }), 2000);
    return () => {
      window.clearTimeout(exitTimer);
    };
  }, [transition]);

  useEffect(() => {
    if (!transition || transition.phase !== "exiting") return;
    const clearTimer = window.setTimeout(() => setTransition(null), 750);
    return () => window.clearTimeout(clearTimer);
  }, [transition]);

  const setLang = (nextLang: Lang) => {
    if (nextLang === lang) return;
    setLangState(nextLang);
    setTransition({ phase: "loading", lang: nextLang });
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
      {transition && <LanguageTransition phase={transition.phase} label={dict[transition.lang].transition} />}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
