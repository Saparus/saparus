const fs = require("fs")
const path = require("path")

const imagesDirectory = path.join(__dirname, "./images/news_images")
const imageFiles = fs.readdirSync(imagesDirectory)
const imageList = imageFiles.map((file) => {
  const filePath = path.join(imagesDirectory, file)
  const imageData = fs.readFileSync(filePath).toString("base64")
  return `data:image/jpeg;base64,${imageData}`
})

const newsArticles = [
  {
    id: 0,
    date: 1722965659109,
    title: {
      en: "News article 0",
      ka: "ახალი სტატია 0",
      ru: "Новостная статья 0",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით. ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით. ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[2]],
  },
  {
    id: 1,
    date: 1722965659109,
    title: {
      en: "News article 1",
      ka: "ახალი სტატია 1",
      ru: "Новостная статья 1",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[2]],
  },
  {
    id: 2,
    date: 1722965659110,
    title: {
      en: "News article 2",
      ka: "ახალი სტატია 2",
      ru: "Новостная статья 2",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით. ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით. ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1]],
  },
  {
    id: 3,
    date: 1722965659111,
    title: {
      en: "News article 3",
      ka: "ახალი სტატია 3",
      ru: "Новостная статья 3",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [],
  },
  {
    id: 4,
    date: 1722965659112,
    title: {
      en: "News article 4",
      ka: "ახალი სტატია 4",
      ru: "Новостная статья 4",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
      imageList[2],
    ],
  },
  {
    id: 44,
    date: 1722965659112,
    title: {
      en: "News article 4",
      ka: "ახალი სტატია 4",
      ru: "Новостная статья 4",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [
      imageList[0],
      imageList[1],
      imageList[0],
      imageList[1],
      imageList[0],
      imageList[1],
      imageList[0],
      imageList[1],
      imageList[0],
      imageList[1],
      imageList[0],
    ],
  },
  {
    id: 5,
    date: 1722965659113,
    title: {
      en: "News article 5",
      ka: "ახალი სტატია 5",
      ru: "Новостная статья 5",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [],
  },
  {
    id: 6,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 7,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 8,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 9,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 10,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 11,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 12,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
  {
    id: 13,
    date: 1722965659114,
    title: {
      en: "News article 6",
      ka: "ახალი სტატია 6",
      ru: "Новостная статья 6",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    images: [imageList[1], imageList[2]],
  },
]

module.exports = newsArticles
