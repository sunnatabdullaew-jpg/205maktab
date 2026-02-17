import { useEffect, useMemo, useState } from 'react'
import './App.css'

const navImages = Array.from({ length: 13 }, (_, index) => {
  const num = String(index + 1).padStart(2, '0')
  return `/images/nav/img-${num}.png`
})

const certificates = [
  { id: 1, title: 'TKT (Module 1, 2, 3)', level: 'C1', year: '2024', status: 'active' },
  { id: 2, title: 'IELTS Academic', level: 'B2', year: '2023', status: 'renew' },
  { id: 3, title: 'TOEFL iTP', level: 'C1', year: '2025', status: 'active' },
  { id: 4, title: 'Cambridge CELTA', level: 'B2', year: '2022', status: 'active' },
  { id: 5, title: 'TEFL 120', level: 'B1', year: '2021', status: 'archive' },
  { id: 6, title: 'TESOL', level: 'C1', year: '2024', status: 'active' },
]

const teachers = [
  {
    id: 1,
    hudud: 'Toshkent',
    tuman: "Mirzo Ulug'bek",
    maktab: '205',
    sinf: '11',
    familiya: 'Turdiyeva',
    ism: 'Muhayyo',
    otasiningIsmi: 'Narzulloyevna',
    seriya: 'AD',
    raqam: '7375097',
    jshshir: '43006805350013',
    til: 'English',
    sertifikat: 'TKT (Module 1; Module 2; Module 3)',
    daraja: 'C1',
    toifa: 'Oliy',
  },
  {
    id: 2,
    hudud: 'Toshkent',
    tuman: "Mirzo Ulug'bek",
    maktab: '205',
    sinf: '11',
    familiya: 'Jumabayeva',
    ism: 'Nilufar',
    otasiningIsmi: 'Ibroximovna',
    seriya: 'AD',
    raqam: '4057164',
    jshshir: '41310830060019',
    til: 'English',
    sertifikat: 'TKT (Module 1; Module 2; Module 3)',
    daraja: 'C1',
    toifa: 'Oliy',
  },
  {
    id: 3,
    hudud: 'Toshkent',
    tuman: "Mirzo Ulug'bek",
    maktab: '205',
    sinf: '11',
    familiya: 'Raxmonova',
    ism: 'Lola',
    otasiningIsmi: 'Anvarovna',
    seriya: 'AD',
    raqam: '3655751',
    jshshir: '41711726600027',
    til: 'English',
    sertifikat: 'TKT (Module 1; Module 2; Module 3)',
    daraja: 'C1',
    toifa: 'Oliy',
  },
  {
    id: 4,
    hudud: 'Toshkent',
    tuman: "Mirzo Ulug'bek",
    maktab: '205',
    sinf: '11',
    familiya: 'Mirzakarimova',
    ism: 'Saodat',
    otasiningIsmi: 'Abdunabiyevna',
    seriya: 'AD',
    raqam: '2022591',
    jshshir: '42511870560041',
    til: 'English',
    sertifikat: 'TOEFL iTP',
    daraja: 'C1',
    toifa: 'II',
  },
  {
    id: 5,
    hudud: 'Toshkent',
    tuman: "Mirzo Ulug'bek",
    maktab: '205',
    sinf: '11',
    familiya: 'Mustafoyeva',
    ism: 'Mashhura',
    otasiningIsmi: 'Uktamovna',
    seriya: 'AD',
    raqam: '4027368',
    jshshir: '42205843920092',
    til: 'English',
    sertifikat: 'IELTS (Academic)',
    daraja: 'B2',
    toifa: 'I',
  },
]

const updates = [
  { id: 1, date: '2026-02-15', title: 'STEM haftaligi boshlandi' },
  { id: 2, date: '2026-02-12', title: 'Ingliz tili bo‘yicha ochiq darslar' },
  { id: 3, date: '2026-02-10', title: 'Robototexnika to‘garagi uchun qabul' },
]

const schoolPassport = [
  { id: 1, value: '1950', suffix: '-yilda qurilgan' },
  { id: 2, value: '960', suffix: "o‘rinli" },
  { id: 3, value: '1474', suffix: "nafar o‘quvchi" },
  { id: 4, value: '47', suffix: 'sinf' },
  { id: 5, value: '1.0', suffix: 'koeffitsiyent' },
  { id: 6, value: '72', suffix: 'nafar pedagog' },
]

const teacherPower = [
  { id: 1, title: 'Oliy toifa', percent: 27.7, count: 20 },
  { id: 2, title: 'Birinchi toifa', percent: 16.7, count: 12 },
  { id: 3, title: 'Ikkinchi toifa', percent: 29.2, count: 21 },
  { id: 4, title: 'Mutaxassis', percent: 26, count: 19 },
]

const mockPerformance = [
  { id: 1, label: 'Listening', percent: 57.5 },
  { id: 2, label: 'Reading', percent: 64.9 },
  { id: 3, label: 'Grammar & Vocabulary', percent: 64 },
  { id: 4, label: 'Average score', percent: 74.6 },
]

const studentCertificates = [
  { id: 1, value: 16, text: '11-sinf o‘quvchilar' },
  { id: 2, value: 6, text: 'sertifikatga ega o‘quvchilar' },
  { id: 3, value: 21, text: 'kutilayotgan o‘quvchilar' },
  { id: 4, value: 10, text: "ro‘yxatdan o‘tgan o‘quvchilar" },
  { id: 5, value: '81%', text: "oxirida sertifikatga ega bo‘ladi" },
]

const schoolInfoRows = [
  { no: '1', indicator: 'Maktabning yuridik manzili', value: "Mirzo Ulug'bek tumani Feruza MFY, Feruza 31 uy" },
  { no: '2', indicator: 'Direktorning F.I.Sh. tayinlangan sanasi', value: 'Raximova Nargiza Xushvaqtovna, 01.08.2019' },
  { no: '3', indicator: 'Direktorning menejerlik sertifikati', value: 'Mavjud' },
  { no: '4', indicator: 'Telefon raqami (ish va mobil)', value: '+99893-577-63-82' },
  { no: '5', indicator: 'Maktab joylashgan hududi', value: 'Shahar' },
  { no: '6', indicator: 'Maktabning qurilgan yili', value: 'Asosiy bino 1950-yil' },
  { no: '7', indicator: "Dastur asosida ta'mirlangan yili", value: "2019-yil, kapital ta'mirlangan" },
  { no: '8', indicator: 'Maktabning umumiy yer maydoni', value: '16815 kv.m' },
  { no: '9', indicator: "O'quvchi o'rni (quvvati)", value: "960 o'rinli" },
  { no: '10', indicator: 'Koeffitsiyenti', value: '1,4' },
  { no: '11', indicator: "Ta'lim tili", value: "O'zbek / rus" },
  { no: '12', indicator: "O'quvchilar soni", value: '1474 nafar' },
  { no: '13', indicator: "O'zbek sinfidagi o'quvchilar soni", value: '621 nafar' },
  { no: '14', indicator: "Rus sinfidagi o'quvchilar soni", value: '853 nafar' },
  { no: '15', indicator: "Ta'lim qardosh tillardagi sinflarda o'quvchilar", value: '0 nafar' },
  { no: '16', indicator: 'Sinflar soni', value: '47 ta' },
  { no: '17', indicator: "O'zbek sinflar soni", value: '20 ta' },
  { no: '18', indicator: 'Rus sinflar soni', value: '27 ta' },
  { no: '19', indicator: "Navbatchiligi (smenasi)", value: "2-smenali, I-smena 33 ta, II-smena 14 ta" },
  { no: '20', indicator: "I-smenadagi sinflar o'quvchilari soni", value: '1060 nafar' },
  { no: '21', indicator: "II-smenadagi sinflar o'quvchilari soni", value: '414 nafar' },
  { no: '22', indicator: 'Pedagog xodimlar soni', value: '72 nafar (71 oliy, 1 o‘rta maxsus)' },
  { no: '23', indicator: 'Toifasi bo‘yicha (oliy)', value: '20 nafar' },
  { no: '24', indicator: 'I-toifa / II-toifa / mutaxassis', value: '12 / 21 / 19 nafar' },
  { no: '25', indicator: 'Milliy va xalqaro sertifikatga ega pedagoglar', value: '30 nafar' },
  { no: '26', indicator: '11-sinf bitiruvchilari soni', value: '2025-yil: 82 nafar' },
  { no: '27', indicator: "OTMga kirishning o'rtacha bali", value: '2025-yil: 91' },
  { no: '28', indicator: 'OTMga kirganlar soni', value: '2025-yil: 65 nafar (79%)' },
  { no: '29', indicator: "Yangi baholash tizimiga kiritilganligi", value: "2023-2024 o'quv yili" },
]

const navIds = [
  'bosh-sahifa',
  'statistika',
  'maktab-malumot',
  'sertifikatlar',
  'jadval',
  'yangiliklar',
  'aloqa',
]

const i18n = {
  uz: {
    langLabel: 'Til',
    schoolLabel: '205-maktab',
    title: '205-maktab',
    subtitle: 'Zamonaviy taʼlim, xalqaro sertifikatlar va ochiq maʼlumotlar maydoni.',
    contactBtn: 'Bogʻlanish',
    controlsShow: "Ko'rsatish",
    controlsHide: 'Yigʻish',
    themeBtnDark: 'Dark mode',
    themeBtnLight: 'Light mode',
    nav: {
      'bosh-sahifa': 'Bosh sahifa',
      statistika: 'Statistika',
      'maktab-malumot': "Maktab ma'lumoti",
      sertifikatlar: 'Sertifikatlar',
      jadval: 'Jadval',
      yangiliklar: 'Yangiliklar',
      aloqa: 'Aloqa',
    },
    galleryAria: 'Maktab hayotidan rasmlar',
    carouselPause: 'To‘xtatish',
    carouselPlay: 'Boshlash',
    carouselHint: 'Faol rasm ustiga bosing: katta ko‘rinish ochiladi',
    imageAltPrefix: 'Maktab rasmi',
    modalClose: 'Yopish',
    modalPrev: 'Oldingi',
    modalNext: 'Keyingi',
    heroTitle: 'Kelajak uchun sifatli taʼlim muhiti',
    heroText:
      'Oʻqituvchilarimiz xalqaro sertifikatlarga ega, dars jarayonlari ochiq, natijalar tahlil asosida yuritiladi.',
    heroCta: 'Oʻqituvchilar jadvalini koʻrish',
    stats: ['faol sinf xonalari', 'oʻquvchi', 'sertifikatlangan ustoz'],
    statTitle: 'Maktab Pasporti va Natijalar',
    statText:
      'Rasmda yuborgan ko‘rsatkichlaringiz asosida umumiy statistika bloklari.',
    statTeacherTitle: 'Pedagoglar salohiyatini oshirish',
    statMockTitle: 'Mock test natijalari',
    statStudentTitle: 'Sertifikatga ega o‘quvchilar',
    schoolInfoTitle: "Maktab bo'yicha ma'lumot",
    schoolInfoText: "Pasport hujjatidagi asosiy ko'rsatkichlar jadvali.",
    schoolInfoColumns: ["T/r", "Ko'rsatkichlar", "Ma'lumotlar"],
    certTitle: 'Sertifikatlar',
    certText: 'Ingliz tili yoʻnalishidagi ustozlar sertifikatlari namunasi.',
    certLevel: 'Daraja',
    certYear: 'Yil',
    certStatus: { active: 'Faol', renew: 'Yangilanish kutilmoqda', archive: 'Arxiv' },
    tableTitle: 'Oʻqituvchilar jadvali',
    tableText: 'Taʼlim muassasasi va oʻqituvchi maʼlumotlari.',
    tableAria: 'Maʼlumotlar jadvali',
    tableSearch: 'Qidiruv (familiya, ism, sertifikat)',
    columns: ['T/r', 'Hudud', 'Tuman', 'Maktab raqami', 'Sinf', 'Familiyasi', 'Ismi', 'Otasining ismi', 'Seriyasi', 'Raqami', 'JShShIR', 'Xorijiy til', 'Sertifikati', 'Darajasi', 'Toifasi'],
    updatesTitle: 'Eng soʻnggi yangiliklar',
    updatesText: 'Maktabdagi tadbirlar va eʼlonlar.',
    readMore: 'Batafsil',
    contactModalTitle: "Bog'lanish ma'lumotlari",
    contactModalText: "Quyida maktabning aloqa ma'lumotlari berilgan.",
    footerEmail: 'Email',
    footerAddress: 'Manzil',
    footerExtra: 'Qoʻshimcha maʼlumot',
    footerEmailValue: 'info@205maktab.uz',
    footerHours: 'Dushanba - Shanba: 08:00 - 18:00',
    footerSocial:
      'Instagram: mirzo_ulugbek205 | Telegram kanal: @umumtalim205maktab | YouTube kanal: @205-IDUMMirzoUlugbektuman',
    footerCopy: '2026 205-maktab. Barcha huquqlar himoyalangan.',
    topBtn: 'Yuqoriga',
  },
  en: {
    langLabel: 'Language',
    schoolLabel: 'School 205',
    title: 'School 205',
    subtitle: 'Modern education, international certificates, and transparent data space.',
    contactBtn: 'Contact',
    controlsShow: 'Show',
    controlsHide: 'Collapse',
    themeBtnDark: 'Dark mode',
    themeBtnLight: 'Light mode',
    nav: {
      'bosh-sahifa': 'Home',
      statistika: 'Statistics',
      'maktab-malumot': 'School info',
      sertifikatlar: 'Certificates',
      jadval: 'Table',
      yangiliklar: 'Updates',
      aloqa: 'Contact',
    },
    galleryAria: 'School life gallery',
    carouselPause: 'Pause',
    carouselPlay: 'Play',
    carouselHint: 'Click an active image to open large view',
    imageAltPrefix: 'School image',
    modalClose: 'Close',
    modalPrev: 'Previous',
    modalNext: 'Next',
    heroTitle: 'Quality learning environment for the future',
    heroText:
      'Our teachers hold international certifications, classes are open, and outcomes are tracked by analytics.',
    heroCta: 'View teachers table',
    stats: ['active classrooms', 'students', 'certified teachers'],
    statTitle: 'School Passport and Results',
    statText: 'General stat blocks adapted from your infographic references.',
    statTeacherTitle: 'Teacher development',
    statMockTitle: 'Mock test results',
    statStudentTitle: 'Students with certificates',
    schoolInfoTitle: 'School information',
    schoolInfoText: 'Table of key indicators from the school passport.',
    schoolInfoColumns: ['No.', 'Indicators', 'Details'],
    certTitle: 'Certificates',
    certText: 'Sample certificates of English language teachers.',
    certLevel: 'Level',
    certYear: 'Year',
    certStatus: { active: 'Active', renew: 'Renewal pending', archive: 'Archived' },
    tableTitle: 'Teachers Table',
    tableText: 'School and teacher details.',
    tableAria: 'Teacher data table',
    tableSearch: 'Search (last name, first name, certificate)',
    columns: ['No.', 'Region', 'District', 'School No.', 'Grade', 'Last Name', 'First Name', 'Middle Name', 'Series', 'Number', 'PINFL', 'Foreign Language', 'Certificate', 'Level', 'Category'],
    updatesTitle: 'Latest updates',
    updatesText: 'School events and announcements.',
    readMore: 'Read more',
    contactModalTitle: 'Contact details',
    contactModalText: 'School contact details are provided below.',
    footerEmail: 'Email',
    footerAddress: 'Address',
    footerExtra: 'Additional info',
    footerEmailValue: 'info@205maktab.uz',
    footerHours: 'Monday - Saturday: 08:00 - 18:00',
    footerSocial:
      'Instagram: mirzo_ulugbek205 | Telegram channel: @umumtalim205maktab | YouTube channel: @205-IDUMMirzoUlugbektuman',
    footerCopy: '2026 School 205. All rights reserved.',
    topBtn: 'Top',
  },
  ru: {
    langLabel: 'Язык',
    schoolLabel: 'Школа 205',
    title: 'Школа 205',
    subtitle: 'Современное образование, международные сертификаты и открытые данные.',
    contactBtn: 'Связаться',
    controlsShow: 'Показать',
    controlsHide: 'Свернуть',
    themeBtnDark: 'Темный режим',
    themeBtnLight: 'Светлый режим',
    nav: {
      'bosh-sahifa': 'Главная',
      statistika: 'Статистика',
      'maktab-malumot': 'Данные школы',
      sertifikatlar: 'Сертификаты',
      jadval: 'Таблица',
      yangiliklar: 'Новости',
      aloqa: 'Контакты',
    },
    galleryAria: 'Галерея школьной жизни',
    carouselPause: 'Пауза',
    carouselPlay: 'Старт',
    carouselHint: 'Нажмите на активное фото для увеличения',
    imageAltPrefix: 'Фото школы',
    modalClose: 'Закрыть',
    modalPrev: 'Назад',
    modalNext: 'Вперед',
    heroTitle: 'Качественная среда обучения для будущего',
    heroText:
      'Наши учителя имеют международные сертификаты, занятия открыты, результаты анализируются.',
    heroCta: 'Посмотреть таблицу учителей',
    stats: ['активных кабинетов', 'учеников', 'сертифицированных учителей'],
    statTitle: 'Паспорт школы и результаты',
    statText: 'Блоки статистики, адаптированные по вашим инфографикам.',
    statTeacherTitle: 'Развитие потенциала педагогов',
    statMockTitle: 'Результаты mock теста',
    statStudentTitle: 'Ученики с сертификатами',
    schoolInfoTitle: 'Информация о школе',
    schoolInfoText: 'Таблица ключевых показателей из паспорта школы.',
    schoolInfoColumns: ['№', 'Показатели', 'Данные'],
    certTitle: 'Сертификаты',
    certText: 'Примеры сертификатов учителей английского языка.',
    certLevel: 'Уровень',
    certYear: 'Год',
    certStatus: { active: 'Активен', renew: 'Ожидает продления', archive: 'Архив' },
    tableTitle: 'Таблица учителей',
    tableText: 'Данные об учреждении и преподавателях.',
    tableAria: 'Таблица данных',
    tableSearch: 'Поиск (фамилия, имя, сертификат)',
    columns: ['№', 'Регион', 'Район', 'Номер школы', 'Класс', 'Фамилия', 'Имя', 'Отчество', 'Серия', 'Номер', 'ПИНФЛ', 'Иностранный язык', 'Сертификат', 'Уровень', 'Категория'],
    updatesTitle: 'Последние новости',
    updatesText: 'События и объявления школы.',
    readMore: 'Подробнее',
    contactModalTitle: 'Контактные данные',
    contactModalText: 'Ниже указаны контактные данные школы.',
    footerEmail: 'Email',
    footerAddress: 'Адрес',
    footerExtra: 'Дополнительно',
    footerEmailValue: 'info@205maktab.uz',
    footerHours: 'Понедельник - Суббота: 08:00 - 18:00',
    footerSocial:
      'Instagram: mirzo_ulugbek205 | Telegram канал: @umumtalim205maktab | YouTube канал: @205-IDUMMirzoUlugbektuman',
    footerCopy: '2026 Школа 205. Все права защищены.',
    topBtn: 'Наверх',
  },
}

const pickRandomIndexes = (length, count) => {
  const pool = Array.from({ length }, (_, idx) => idx)

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, count)
}

const getInitialTheme = () => {
  const saved = localStorage.getItem('school-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getInitialLanguage = () => {
  const saved = localStorage.getItem('school-language')
  if (saved === 'uz' || saved === 'en' || saved === 'ru') return saved
  return 'uz'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)
  const [isHeaderCompact, setIsHeaderCompact] = useState(false)
  const [activeNav, setActiveNav] = useState('bosh-sahifa')
  const [activeImageIndexes, setActiveImageIndexes] = useState(() =>
    pickRandomIndexes(navImages.length, 5),
  )
  const [brokenImages, setBrokenImages] = useState(() => new Set())
  const [showTopButton, setShowTopButton] = useState(false)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [tableQuery, setTableQuery] = useState('')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isHeaderToolsCollapsed, setIsHeaderToolsCollapsed] = useState(false)

  const t = i18n[language]
  const marqueeImages = useMemo(() => [...navImages, ...navImages], [])
  const filteredTeachers = useMemo(() => {
    const query = tableQuery.trim().toLowerCase()
    if (!query) return teachers

    return teachers.filter((teacher) =>
      [teacher.familiya, teacher.ism, teacher.sertifikat]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }, [tableQuery])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('school-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
    localStorage.setItem('school-language', language)
  }, [language])

  useEffect(() => {
    const onScroll = () => {
      setIsHeaderCompact(window.scrollY > 36)
      setShowTopButton(window.scrollY > 500)

      const currentSection = navIds
        .map((id) => {
          const section = document.getElementById(id)
          if (!section) return null
          const rect = section.getBoundingClientRect()
          return { id, topDistance: Math.abs(rect.top - 140) }
        })
        .filter(Boolean)
        .sort((a, b) => a.topDistance - b.topDistance)[0]

      if (currentSection) setActiveNav(currentSection.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view')
        })
      },
      { threshold: 0.2 },
    )

    revealElements.forEach((element) => observer.observe(element))
    return () => revealElements.forEach((element) => observer.unobserve(element))
  }, [])

  useEffect(() => {
    if (isCarouselPaused) return undefined

    const intervalId = window.setInterval(() => {
      setActiveImageIndexes(pickRandomIndexes(navImages.length, 5))
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [isCarouselPaused])

  useEffect(() => {
    if (selectedImageIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImageIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => ((prev ?? 0) + 1) % navImages.length)
      }
      if (event.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) =>
          ((prev ?? 0) - 1 + navImages.length) % navImages.length,
        )
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedImageIndex])

  useEffect(() => {
    if (!isContactModalOpen) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsContactModalOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isContactModalOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileNavOpen(false)
        setIsHeaderToolsCollapsed(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleImageError = (index) => {
    setBrokenImages((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const openImageViewer = (index) => {
    if (!activeImageIndexes.includes(index)) return
    setSelectedImageIndex(index)
  }

  return (
    <div className="page">
      <header className={`header ${isHeaderCompact ? 'header--compact' : ''}`}>
        <div className="container header__inner">
          <div>
            <p className="header__eyebrow">{t.schoolLabel}</p>
            <h1 className="header__title">{t.title}</h1>
            <p className="header__subtitle">{t.subtitle}</p>
          </div>
          <div
            className={`header__actions ${
              isHeaderToolsCollapsed ? 'header__actions--collapsed' : ''
            }`}
          >
            <a className="btn btn--primary" href="#aloqa">
              {t.contactBtn}
            </a>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={toggleTheme}
              aria-label="Theme mode toggle"
            >
              {theme === 'light' ? t.themeBtnDark : t.themeBtnLight}
            </button>
            <label className="lang-switch">
              <span className="lang-switch__label">{t.langLabel}</span>
              <select
                className="lang-switch__select"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                aria-label={t.langLabel}
              >
                <option value="uz">UZ</option>
                <option value="en">ENG</option>
                <option value="ru">RUS</option>
              </select>
            </label>
          </div>
          <button
            type="button"
            className="header__tools-toggle"
            onClick={() => setIsHeaderToolsCollapsed((prev) => !prev)}
            aria-expanded={!isHeaderToolsCollapsed}
          >
            {isHeaderToolsCollapsed ? `▾ ${t.controlsShow}` : `▴ ${t.controlsHide}`}
          </button>
        </div>
      </header>

      <nav className="nav" aria-label="Primary sections navigation">
        <div className="container nav__inner">
          <button
            type="button"
            className="nav__menu-btn"
            aria-expanded={isMobileNavOpen}
            aria-controls="main-nav-list"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            {isMobileNavOpen ? '✕' : '☰'}
          </button>

          <ul
            id="main-nav-list"
            className={`nav__list ${isMobileNavOpen ? 'nav__list--open' : ''}`}
          >
            {navIds.map((id) => (
              <li key={id}>
                <a
                  className={`nav__link ${activeNav === id ? 'nav__link--active' : ''}`}
                  href={`#${id}`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-gallery" aria-label={t.galleryAria}>
            <div className="nav-gallery__controls">
              <p>{t.carouselHint}</p>
              <button
                type="button"
                className="btn btn--ghost nav-gallery__toggle"
                onClick={() => setIsCarouselPaused((prev) => !prev)}
              >
                {isCarouselPaused ? t.carouselPlay : t.carouselPause}
              </button>
            </div>
            <div className={`nav-gallery__track ${isCarouselPaused ? 'is-paused' : ''}`}>
              {marqueeImages.map((imagePath, idx) => {
                const sourceIndex = idx % navImages.length
                const isBroken = brokenImages.has(sourceIndex)
                const isActive = activeImageIndexes.includes(sourceIndex)

                return (
                  <article
                    className={`nav-gallery__card ${isActive ? 'is-active-card' : ''}`}
                    key={`${sourceIndex}-${idx}`}
                    aria-hidden={idx >= navImages.length}
                  >
                    {isBroken ? (
                      <div className="nav-gallery__fallback">Image</div>
                    ) : (
                      <button
                        type="button"
                        className="nav-gallery__button"
                        onClick={() => openImageViewer(sourceIndex)}
                        disabled={!isActive}
                        aria-label={`${t.imageAltPrefix} ${sourceIndex + 1}`}
                      >
                        <img
                          src={imagePath}
                          alt={`${t.imageAltPrefix} ${sourceIndex + 1}`}
                          loading="lazy"
                          onError={() => handleImageError(sourceIndex)}
                        />
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section id="bosh-sahifa" className="section section--hero reveal">
          <div className="container hero-grid">
            <div>
              <h2>{t.heroTitle}</h2>
              <p>{t.heroText}</p>
              <a className="btn btn--primary" href="#jadval">
                {t.heroCta}
              </a>
            </div>
            <div className="hero-stats">
              <article>
                <h3>20+</h3>
                <p>{t.stats[0]}</p>
              </article>
              <article>
                <h3>1500+</h3>
                <p>{t.stats[1]}</p>
              </article>
              <article>
                <h3>40+</h3>
                <p>{t.stats[2]}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="statistika" className="section reveal">
          <div className="container">
            <div className="section__head">
              <h2>{t.statTitle}</h2>
              <p>{t.statText}</p>
            </div>

            <div className="passport-chips">
              {schoolPassport.map((item) => (
                <article key={item.id} className="passport-chip">
                  <strong>{item.value}</strong>
                  <span>{item.suffix}</span>
                </article>
              ))}
            </div>

            <div className="insight-grid">
              <article className="insight-card">
                <h3>{t.statTeacherTitle}</h3>
                <div className="teacher-bars">
                  {teacherPower.map((item) => (
                    <div key={item.id} className="teacher-bars__row">
                      <p>{item.title}</p>
                      <div className="teacher-bars__line">
                        <span style={{ width: `${item.percent}%` }} />
                      </div>
                      <strong>{item.percent}%</strong>
                      <small>{item.count} nafar</small>
                    </div>
                  ))}
                </div>
              </article>

              <article className="insight-card">
                <h3>{t.statMockTitle}</h3>
                <div className="mock-circles">
                  {mockPerformance.map((item) => (
                    <div key={item.id} className="mock-circles__item">
                      <div
                        className="circle-meter"
                        style={{
                          background: `conic-gradient(var(--accent) ${item.percent}%, var(--bg-soft) ${item.percent}% 100%)`,
                        }}
                      >
                        <div>{item.percent}%</div>
                      </div>
                      <p>{item.label}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <article className="insight-card insight-card--students">
              <h3>{t.statStudentTitle}</h3>
              <div className="student-counters">
                {studentCertificates.map((item) => (
                  <div key={item.id} className="student-counters__item">
                    <strong>{item.value}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="maktab-malumot" className="section reveal">
          <div className="container">
            <div className="section__head">
              <h2>{t.schoolInfoTitle}</h2>
              <p>{t.schoolInfoText}</p>
            </div>
            <div className="table-wrap info-table-wrap" role="region" aria-label={t.schoolInfoTitle}>
              <table className="info-table">
                <thead>
                  <tr>
                    {t.schoolInfoColumns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schoolInfoRows.map((row) => (
                    <tr key={row.no}>
                      <td>{row.no}</td>
                      <td>{row.indicator}</td>
                      <td>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="sertifikatlar" className="section reveal">
          <div className="container">
            <div className="section__head">
              <h2>{t.certTitle}</h2>
              <p>{t.certText}</p>
            </div>
            <div className="cert-grid">
              {certificates.map((item) => (
                <article className="cert-card" key={item.id}>
                  <div className="cert-card__top">
                    <h3>{item.title}</h3>
                    <span>{t.certStatus[item.status]}</span>
                  </div>
                  <p>{t.certLevel}: {item.level}</p>
                  <p>{t.certYear}: {item.year}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="jadval" className="section reveal">
          <div className="container">
            <div className="section__head">
              <h2>{t.tableTitle}</h2>
              <p>{t.tableText}</p>
            </div>
            <div className="table-search">
              <input
                type="search"
                value={tableQuery}
                onChange={(event) => setTableQuery(event.target.value)}
                placeholder={t.tableSearch}
              />
            </div>
            <div className="table-wrap" role="region" aria-label={t.tableAria}>
              <table>
                <thead>
                  <tr>
                    {t.columns.map((column) => (
                      <th key={column}>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>{teacher.id}</td>
                      <td>{teacher.hudud}</td>
                      <td>{teacher.tuman}</td>
                      <td>{teacher.maktab}</td>
                      <td>{teacher.sinf}</td>
                      <td>{teacher.familiya}</td>
                      <td>{teacher.ism}</td>
                      <td>{teacher.otasiningIsmi}</td>
                      <td>{teacher.seriya}</td>
                      <td>{teacher.raqam}</td>
                      <td>{teacher.jshshir}</td>
                      <td>{teacher.til}</td>
                      <td>{teacher.sertifikat}</td>
                      <td>{teacher.daraja}</td>
                      <td>{teacher.toifa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="yangiliklar" className="section reveal">
          <div className="container">
            <div className="section__head">
              <h2>{t.updatesTitle}</h2>
              <p>{t.updatesText}</p>
            </div>
            <div className="updates-grid">
              {updates.map((item) => (
                <article key={item.id} className="update-card">
                  <time dateTime={item.date}>{item.date}</time>
                  <h3>{item.title}</h3>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    {t.readMore}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="aloqa" className="footer">
        <div className="container footer__grid">
          <article>
            <h3>{t.footerEmail}</h3>
            <p>{t.footerEmailValue}</p>
          </article>
          <article>
            <h3>{t.footerAddress}</h3>
            <p>{t.footerEmailValue}</p>
          </article>
          <article>
            <h3>{t.footerExtra}</h3>
            <p>{t.footerHours}</p>
            <p>{t.footerSocial}</p>
          </article>
        </div>
        <div className="footer__bottom">
          <p>{t.footerCopy}</p>
        </div>
      </footer>

      {showTopButton ? (
        <button
          type="button"
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {t.topBtn}
        </button>
      ) : null}

      {isContactModalOpen ? (
        <div
          className="contact-modal"
          role="dialog"
          aria-modal="true"
          aria-label={t.contactModalTitle}
          onClick={() => setIsContactModalOpen(false)}
        >
          <div className="contact-modal__content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="contact-modal__close"
              onClick={() => setIsContactModalOpen(false)}
            >
              {t.modalClose}
            </button>
            <h3>{t.contactModalTitle}</h3>
            <p>{t.contactModalText}</p>
            <div className="contact-modal__grid">
              <article>
                <h4>{t.footerEmail}</h4>
                <p>{t.footerEmailValue}</p>
              </article>
              <article>
                <h4>{t.footerAddress}</h4>
                <p>{t.footerEmailValue}</p>
              </article>
              <article>
                <h4>{t.footerExtra}</h4>
                <p>{t.footerHours}</p>
                <p>{t.footerSocial}</p>
              </article>
            </div>
          </div>
        </div>
      ) : null}

      {selectedImageIndex !== null ? (
        <div
          className="image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label={`${t.imageAltPrefix} ${selectedImageIndex + 1}`}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div className="image-viewer__content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="image-viewer__close"
              onClick={() => setSelectedImageIndex(null)}
            >
              {t.modalClose}
            </button>
            <img
              src={navImages[selectedImageIndex]}
              alt={`${t.imageAltPrefix} ${selectedImageIndex + 1}`}
            />
            <div className="image-viewer__actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() =>
                  setSelectedImageIndex(
                    (prev) => ((prev ?? 0) - 1 + navImages.length) % navImages.length,
                  )
                }
              >
                {t.modalPrev}
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setSelectedImageIndex((prev) => ((prev ?? 0) + 1) % navImages.length)}
              >
                {t.modalNext}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
