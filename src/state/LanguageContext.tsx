import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'en' | 'uz' | 'ru'

type LanguageCopy = {
  initializing: string
  ready: string
  steps: string[]
  enterWorld: string
  startDemo: string
  portfolio: string
  beta: string
  languageLabel: string
  demoTour: string
  viewWork: string
  viewLiveProject: string
  noPublicDeployment: string
  selectedWork: string
  selectedWorkLead: string
  stack: string
  stackLead: string
  missionLog: string
  missionLead: string
  process: string
  processLead: string
  lab: string
  fieldNotes: string
  contact: string
  viewAllNotes: string
  read: string
  open: string
  close: string
  returnToBay: string
  backToLab: string
  next: string
  selectTechnology: string
  tapToExplore: string
  interact: string
  dragMove: string
  swipeLook: string
  tapInteract: string
  sound: string
  muteAmbience: string
  enableAmbience: string
  liveAt: string
  stackLabel: string
  keyboardMove: string
  keyboardLook: string
}

type Localized = { en: string; uz: string; ru: string }

const localized = (en: string, uz: string, ru: string): Localized => ({ en, uz, ru })

const content: Record<string, Localized> = {
  'project:turon:category': localized('Food Delivery / Telegram Mini App', 'Ovqat yetkazib berish / Telegram Mini App', 'Доставка еды / Telegram Mini App'),
  'project:turon:description': localized('A digital ordering and food delivery platform built for Turon Kafesi. The platform brings the cafe menu, food ordering and delivery experience into a simple and accessible digital interface. Customers can browse available meals, fast food, pizza, drinks and desserts, select products, build an order and request delivery without relying on manual phone-based ordering. The system is designed around a Telegram Mini App experience, making the ordering process fast and familiar for local customers while providing a foundation for future order management, delivery tracking and business automation.', 'Turon Kafesi uchun yaratilgan raqamli buyurtma va ovqat yetkazib berish platformasi. Mijozlar menyuni ko‘radi, taom tanlaydi, buyurtma tuzadi va telefon qilmasdan yetkazib berishni so‘raydi. Tizim Telegram Mini App asosida qurilgan bo‘lib, buyurtmalarni boshqarish, yetkazib berishni kuzatish va biznesni avtomatlashtirish uchun asos yaratadi.', 'Цифровая платформа заказов и доставки для Turon Kafesi. Клиент может открыть меню, выбрать блюда, оформить заказ и запросить доставку без телефонного звонка. Система построена как Telegram Mini App и создаёт основу для управления заказами, отслеживания доставки и автоматизации бизнеса.'),
  'project:pyzone:category': localized('Online Compiler / Developer Platform', 'Onlayn kompilyator / Dasturchilar platformasi', 'Онлайн-компилятор / Платформа для разработчиков'),
  'project:pyzone:description': localized('A professional online code editor and compiler designed for developers and programming learners. Pyzone.uz allows users to write, execute and test code directly from the browser without installing additional development software. The platform supports multiple programming languages including Python, JavaScript, C++, Java and Go, providing an accessible environment for experimenting with code and seeing execution results instantly. The project focuses on making development and programming practice available from any modern device through a fast, browser-based coding experience.', 'Dasturchilar va o‘rganuvchilar uchun professional onlayn kod muharriri va kompilyator. Pyzone.uz brauzerning o‘zida kod yozish, ishga tushirish va tekshirish imkonini beradi. Python, JavaScript, C++, Java va Go tillari qo‘llanadi, natija esa darhol ko‘rsatiladi.', 'Профессиональный онлайн-редактор и компилятор для разработчиков и учащихся. Pyzone.uz позволяет писать, запускать и проверять код прямо в браузере. Поддерживаются Python, JavaScript, C++, Java и Go, а результат выполнения виден сразу.'),
  'project:pyzone-zone:category': localized('Algorithmic Problem Solving Platform', 'Algoritmik masalalar yechish platformasi', 'Платформа алгоритмических задач'),
  'project:pyzone-zone:description': localized('An algorithmic problem-solving platform developed as part of the Pyzone ecosystem. Pyzone Zone provides a structured environment where programmers can solve algorithmic and programming problems, submit their solutions and evaluate their results through an online judge system. The platform is focused on developing problem-solving skills, algorithmic thinking and practical programming ability through challenges with different levels of difficulty.', 'Pyzone ekotizimining bir qismi sifatida yaratilgan algoritmik masalalar platformasi. Foydalanuvchilar turli qiyinchilikdagi masalalarni yechadi, kod yuboradi va online judge orqali natijasini tekshiradi. Platforma algoritmik fikrlash va amaliy dasturlash ko‘nikmalarini rivojlantirishga qaratilgan.', 'Платформа алгоритмических задач, созданная как часть экосистемы Pyzone. Пользователи решают задачи разной сложности, отправляют решения и получают проверку через online judge. Проект развивает алгоритмическое мышление и практические навыки программирования.'),
  'about:statement': localized('I build digital products, web applications, systems and interactive experiences.', 'Men raqamli mahsulotlar, web ilovalar, tizimlar va interaktiv tajribalar yarataman.', 'Я создаю цифровые продукты, веб-приложения, системы и интерактивные решения.'),
  'about:body': localized('I work across frontend, backend, databases, APIs, infrastructure, automation and AI integrations.', 'Men frontend, backend, ma’lumotlar bazasi, API, infratuzilma, avtomatlashtirish va AI integratsiyalari bilan ishlayman.', 'Я работаю с frontend, backend, базами данных, API, инфраструктурой, автоматизацией и AI-интеграциями.'),
  'about:closing0': localized("I don't just write code.", 'Men shunchaki kod yozmayman.', 'Я не просто пишу код.'),
  'about:closing1': localized('I build complete products.', 'Men to‘liq mahsulot yarataman.', 'Я создаю полноценные продукты.'),
  'zone:about:label': localized('ABOUT', 'MEN HAQIMDA', 'ОБО МНЕ'),
  'zone:projects:label': localized('PROJECTS', 'LOYIHALAR', 'ПРОЕКТЫ'),
  'zone:skills:label': localized('SKILLS', 'KO‘NIKMALAR', 'НАВЫКИ'),
  'zone:experience:label': localized('EXPERIENCE', 'TAJRIBA', 'ОПЫТ'),
  'zone:process:label': localized('PROCESS', 'JARAYON', 'ПРОЦЕСС'),
  'zone:lab:label': localized('LAB', 'LABORATORIYA', 'ЛАБОРАТОРИЯ'),
  'zone:contact:label': localized('CONTACT', 'ALOQA', 'КОНТАКТЫ'),
  'zone:about:caption': localized('IDENTITY', 'SHAXSIYAT', 'ЛИЧНОСТЬ'),
  'zone:projects:caption': localized('EXHIBITS', 'EKSPONATLAR', 'ЭКСПОНАТЫ'),
  'zone:skills:caption': localized('SYSTEMS', 'TIZIMLAR', 'СИСТЕМЫ'),
  'zone:experience:caption': localized('MISSION LOG', 'TAJRIBA JURNALI', 'ЖУРНАЛ РАБОТ'),
  'zone:process:caption': localized('IDEA → PRODUCTION', 'G‘OYA → PRODUCTION', 'ИДЕЯ → ПРОДАКШЕН'),
  'zone:lab:caption': localized('FIELD NOTES', 'AMALIY QAYDLAR', 'ПРАКТИЧЕСКИЕ ЗАМЕТКИ'),
  'zone:contact:caption': localized('UPLINK', 'ALOQA KANALI', 'КАНАЛ СВЯЗИ'),
}

const copy: Record<Language, LanguageCopy> = {
  en: {
    initializing: 'INITIALIZING DIGITAL SPACE…',
    ready: 'SYSTEM READY',
    steps: ['ESTABLISHING UPLINK', 'BUILDING STATION GEOMETRY', 'CALIBRATING OPTICS', 'SYNCHRONISING EXHIBITS'],
    enterWorld: 'ENTER THE WORLD',
    startDemo: 'START THE DEMO',
    portfolio: '← PORTFOLIO',
    beta: 'BETA',
    languageLabel: 'LANGUAGE',
    demoTour: 'DEMO TOUR', viewWork: 'VIEW THE WORK', viewLiveProject: 'VIEW LIVE PROJECT', noPublicDeployment: 'NO PUBLIC DEPLOYMENT', selectedWork: 'SELECTED WORK', selectedWorkLead: 'Things I built, and still maintain.', stack: 'STACK', stackLead: 'What I build with.', missionLog: 'MISSION LOG', missionLead: 'Where the work happened.', process: 'PROCESS', processLead: 'From idea to production.', lab: 'LAB', fieldNotes: 'FIELD NOTES', contact: 'UPLINK', viewAllNotes: 'ALL NOTES', read: 'READ', open: 'OPEN', close: 'Close', returnToBay: 'RETURN TO BAY', backToLab: 'BACK TO THE LAB', next: 'NEXT', selectTechnology: 'Select a technology.', tapToExplore: 'TAP TO EXPLORE', interact: 'INTERACT', dragMove: 'DRAG MOVE', swipeLook: 'SWIPE LOOK', tapInteract: 'TAP INTERACT', keyboardMove: 'W A S D MOVE', keyboardLook: 'DRAG LOOK', sound: 'SOUND', muteAmbience: 'Mute ambience', enableAmbience: 'Enable ambience', liveAt: 'LIVE AT', stackLabel: 'STACK',
  },
  uz: {
    initializing: 'RAQAMLI MAKON YUKLANMOQDA…',
    ready: 'TIZIM TAYYOR',
    steps: ['ALOQA O‘RNATILMOQDA', 'STANSIYA TUZILMOQDA', 'OPTIKA SOZLANMOQDA', 'EKSPONATLAR SINXRONLANMOQDA'],
    enterWorld: 'DEMO SAYOHATIGA KIRISH',
    startDemo: 'DEMO SAYOHATINI BOSHLASH',
    portfolio: '← PORTFOLIO',
    beta: 'BETA',
    languageLabel: 'TIL',
    demoTour: 'DEMO SAYOHATI', viewWork: 'ISHLARNI KO‘RISH', viewLiveProject: 'LOYIHANI KO‘RISH', noPublicDeployment: 'OCHIQ DEPLOY YO‘Q', selectedWork: 'TANLANGAN ISHLAR', selectedWorkLead: 'Men yaratgan va hozir ham qo‘llab-quvvatlayotgan loyihalar.', stack: 'STEK', stackLead: 'Qaysi texnologiyalar bilan ishlayman.', missionLog: 'TAJRIBA JURNALI', missionLead: 'Ishlar qayerda bajarilgan.', process: 'JARAYON', processLead: 'G‘oyadan productiongacha.', lab: 'LABORATORIYA', fieldNotes: 'AMALIY QAYDLAR', contact: 'ALOQA', viewAllNotes: 'BARCHA QAYDLAR', read: 'O‘QISH', open: 'OCHISH', close: 'Yopish', returnToBay: 'KO‘RGAZMA ZALIGA QAYTISH', backToLab: 'LABORATORIYAGA QAYTISH', next: 'KEYINGI', selectTechnology: 'Texnologiyani tanlang.', tapToExplore: 'KO‘RISH UCHUN BOSING', interact: 'O‘ZARO TA’SIR', dragMove: 'SURING — HARAKAT', swipeLook: 'SURING — QARANG', tapInteract: 'BOSING — O‘ZARO TA’SIR', keyboardMove: 'W A S D HARAKAT', keyboardLook: 'SURISH — QARASH', sound: 'OVOZ', muteAmbience: 'Fon ovozini o‘chirish', enableAmbience: 'Fon ovozini yoqish', liveAt: 'MANZIL', stackLabel: 'TEXNOLOGIYALAR',
  },
  ru: {
    initializing: 'ЦИФРОВОЕ ПРОСТРАНСТВО ЗАПУСКАЕТСЯ…',
    ready: 'СИСТЕМА ГОТОВА',
    steps: ['СОЕДИНЕНИЕ УСТАНОВЛЕНО', 'СТАНЦИЯ СОЗДАЁТСЯ', 'ОПТИКА КАЛИБРУЕТСЯ', 'ЭКСПОНАТЫ СИНХРОНИЗИРУЮТСЯ'],
    enterWorld: 'НАЧАТЬ ДЕМО-ТУР',
    startDemo: 'НАЧАТЬ ДЕМО-ТУР',
    portfolio: '← ПОРТФОЛИО',
    beta: 'БЕТА',
    languageLabel: 'ЯЗЫК',
    demoTour: 'ДЕМО-ТУР', viewWork: 'ПОСМОТРЕТЬ РАБОТЫ', viewLiveProject: 'ОТКРЫТЬ ПРОЕКТ', noPublicDeployment: 'ПУБЛИЧНОГО ДЕПЛОЯ НЕТ', selectedWork: 'ИЗБРАННЫЕ РАБОТЫ', selectedWorkLead: 'Проекты, которые я создал и продолжаю поддерживать.', stack: 'СТЕК', stackLead: 'С чем я работаю.', missionLog: 'ЖУРНАЛ РАБОТ', missionLead: 'Где выполнялась работа.', process: 'ПРОЦЕСС', processLead: 'От идеи до продакшена.', lab: 'ЛАБОРАТОРИЯ', fieldNotes: 'ПРАКТИЧЕСКИЕ ЗАМЕТКИ', contact: 'СВЯЗЬ', viewAllNotes: 'ВСЕ ЗАМЕТКИ', read: 'ЧИТАТЬ', open: 'ОТКРЫТЬ', close: 'Закрыть', returnToBay: 'ВЕРНУТЬСЯ В ЗАЛ', backToLab: 'ВЕРНУТЬСЯ В ЛАБОРАТОРИЮ', next: 'ДАЛЕЕ', selectTechnology: 'Выберите технологию.', tapToExplore: 'НАЖМИТЕ ДЛЯ ПРОСМОТРА', interact: 'ВЗАИМОДЕЙСТВОВАТЬ', dragMove: 'СВАЙП — ДВИЖЕНИЕ', swipeLook: 'СВАЙП — ОБЗОР', tapInteract: 'НАЖМИТЕ — ВЗАИМОДЕЙСТВИЕ', keyboardMove: 'W A S D ДВИЖЕНИЕ', keyboardLook: 'СВАЙП — ОБЗОР', sound: 'ЗВУК', muteAmbience: 'Выключить фоновый звук', enableAmbience: 'Включить фоновый звук', liveAt: 'АДРЕС', stackLabel: 'ТЕХНОЛОГИИ',
  },
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  copy: LanguageCopy
  t: (key: string, fallback?: string) => string
}>({
  language: 'en',
  setLanguage: () => undefined,
  copy: copy.en,
  t: (key, fallback) => content[key]?.en ?? fallback ?? key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string, fallback = key) => content[key]?.[language] ?? fallback

  return <LanguageContext.Provider value={{ language, setLanguage, copy: copy[language], t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
