const images = require.context("../assets/news_images", true)
const imageList = images.keys().map((image) => images(image))

const news = [
  {
    id: 1,
    date: 1722965659109,
    title: {
      en: "Lorem ipsum dolor sit",
      ka: "ლორემ იფსუმ დოლორ სით",
      ru: "Лорем ипсум долор сит",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    image: imageList[0],
  },
  {
    id: 2,
    date: 1722965659109,
    title: {
      en: "Lorem ipsum dolor sit amet",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ",
      ru: "Лорем ипсум долор сит амет",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    image: imageList[0],
  },
  {
    id: 3,
    date: 1722965659109,
    title: {
      en: "Lorem ipsum dolor sit",
      ka: "ლორემ იფსუმ დოლორ სით",
      ru: "Лорем ипсум долор сит",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    image: imageList[0],
  },
  {
    id: 4,
    date: 1722965659109,
    title: {
      en: "Lorem ipsum dolor sit",
      ka: "ლორემ იფსუმ დოლორ სით",
      ru: "Лорем ипсум долор сит",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    image: imageList[0],
  },
  {
    id: 5,
    date: 1722965659109,
    title: {
      en: "Lorem ipsum dolor sit",
      ka: "ლორემ იფსუმ დოლორ სით",
      ru: "Лорем ипсум долор сит",
    },
    text: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse",
      ka: "ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.ლორემ იფსუმ დოლორ სით ამეთ, ყუი მეის ალიენუმ ცომფრეჰენსამ ინ. დიცთას მედიოცრითათემ ად ჰის. ან ჰას დიცო ლუფთათუმ ინსოლენს, თე ვის დიამ სუმმო ჰაბემუს. ეუ ვიმ საეფე ომნესყუე, სონეთ დიცთას ეამ ან, ეხ ფერ ალია იუდიცო ლაუდემ. იდ სოლუმ ათყუი ეოს, ეი მოდუს ფოსიდონიუმ სით.",
      ru: "Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит. Лорем ипсум долор сит амет, меа фуиссет аццусам пхаедрум ех, хас еу граецо денияуе перципитур. Видит еурипидис ат яуо, сит еу долор мелиус интегре. Нам ин фиерент цопиосае тхеопхрастус. Ан про бонорум продессет, ид ипсум аудиам витуператорибус про, пробо сонет апериам ин сит.",
    },
    image: imageList[0],
  },
]

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAllNews = async (currentLanguage) => {
  await simulateDelay(200)

  const newsToSend = news.map((newsItem) => {
    const newNewsItem = { ...newsItem }

    newNewsItem.text = newsItem.text[currentLanguage]
    newNewsItem.title = newsItem.title[currentLanguage]

    return newNewsItem
  })

  return newsToSend
}
