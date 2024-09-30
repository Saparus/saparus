const images = require.context("../assets/about_images", true)
const imageList = images.keys().map((image) => images(image))

export const aboutList = [
  {
    id: 1,
    position: 0,
    title: { en: "Origins of Saparus", ka: "საპარუსის წარმოშობა", ru: "Происхождение Сапаруса" },
    text: {
      en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa! Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam labore!",
      ka: "ლორემი იპსუმ დოლორ სით ამეტ კონსექტეტურ ადიპისიცინგ ელიტ. დესერუნტ აუტემ ეიუს კვა მინიმა ნულა quibusdam molestiae დიქტა, რემ molestias recusandae სინტ ასუმენდა ექსცეპტური. ატ ეუმ პარიათურ სით დოლორეს დუკიმუს, დიგნიტას დოთემ რეპელლატ ცულპა! ერორ ნეკე რეკუსანდე, კვომნის ბეატე რეპელლატ? კვა სუსციპიტ nobis ლაბორუმ დოლორემ ამეტ დოლორ, დოლორეს ნეკე ექსცეპტური quos კუმ ბეატე. ვიტაე დუკიმუს ად ტემპორიპუს დოლორემკვე კონსეკუატურ სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია",
      ru: "Лорем ипсум долор сит амет консектетур адиписициинг элит. Десерунт аутем еиус квас минима nullа quibusdam molestiae дикта, рем molestias recusandae синт ассуменда эксцептури. Ат эум париатур сит долорес дуциумус, дигнитас дотем репеллат цульпа! Эррор неке рекусанде, квомнис беатэ репеллат? Квас сусципит nobis laborum долорем амет долор, долорес неке эксцептури quos кум беатэ. Витае дуциумус ад темпорапус долоремкве консекуатур секуи, тенетур апериам моллития темпора фасцере non ат эксцептури аспериорес еиарум магнам аликуид веритатис консектетур волуптатем кваос! Эт nobis синт possimus quidem лабораториум факере, велит, презентсиум солута ратио, necessitatibus консекуатур магни еиус. Кваэ тенетур нумкуам веро? Ассуменда эссе маиорес кюискуам лабораториум!",
      "Our Values": "Наши ценности",
    },
    image: imageList[0],
  },
  {
    id: 2,
    position: 1,
    title: { en: "Our Values", ka: "ჩვენი ღირებულებები", ru: "Наши ценности" },
    text: {
      en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa! Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam labore!",
      ka: "ლორემი იპსუმ დოლორ სით ამეტ კონსექტეტურ ადიპისიცინგ ელიტ. დესერუნტ აუტემ ეიუს კვა მინიმა ნულა quibusdam molestiae დიქტა, რემ molestias recusandae სინტ ასუმენდა ექსცეპტური. ატ ეუმ პარიათურ სით დოლორეს დუკიმუს, დიგნიტას დოთემ რეპელლატ ცულპა! ერორ ნეკე რეკუსანდე, კვომნის ბეატე რეპელლატ? კვა სუსციპიტ nobis ლაბორუმ დოლორემ ამეტ დოლორ, დოლორეს ნეკე ექსცეპტური quos კუმ ბეატე. ვიტაე დუკიმუს ად ტემპორიპუს დოლორემკვე კონსეკუატურ სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია",
      ru: "Лорем ипсум долор сит амет консектетур адиписициинг элит. Десерунт аутем еиус квас минима nullа quibusdam molestiae дикта, рем molestias recusandae синт ассуменда эксцептури. Ат эум париатур сит долорес дуциумус, дигнитас дотем репеллат цульпа! Эррор неке рекусанде, квомнис беатэ репеллат? Квас сусципит nobis laborum долорем амет долор, долорес неке эксцептури quos кум беатэ. Витае дуциумус ад темпорапус долоремкве консекуатур секуи, тенетур апериам моллития темпора фасцере non ат эксцептури аспериорес еиарум магнам аликуид веритатис консектетур волуптатем кваос! Эт nobis синт possimus quidem лабораториум факере, велит, презентсиум солута ратио, necessitatibus консекуатур магни еиус. Кваэ тенетур нумкуам веро? Ассуменда эссе маиорес кюискуам лабораториум!",
      "Our Values": "Наши ценности",
    },
    image: imageList[1],
  },
  {
    id: 3,
    position: 2,
    title: { en: "Our Values 2", ka: "ჩვენი ღირებულებები 2", ru: "Наши ценности 2" },
    text: {
      en: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa! Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam labore! Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt autem eius quas minima nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa! Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam labore! a nulla quibusdam molestiae dicta, rem molestias recusandae sint assumenda excepturi. At eum pariatur sit dolores ducimus, dignissimos dolorem repellat culpa! Error neque recusandae, quo omnis beatae repellat? Quas suscipit nobis laborum dolorem amet dolore, dolores neque excepturi quos cum beatae. Vitae ducimus ad temporibus doloremque consequatur sequi, tenetur aperiam mollitia tempora facere non at excepturi asperiores earum magnam aliquid veritatis consectetur voluptatem quos! Et nobis sint possimus quidem labore facere, velit, praesentium soluta ratione, necessitatibus consequatur magni eius. Quae tenetur numquam vero? Assumenda esse maiores quisquam labore! ",
      ka: "ლორემი იპსუმ დოლორ სით ამეტ კონსექტეტურ ადიპისიცინგ ელიტ. დესერუნტ აუტემ ეიუს კვა მინიმა ნულა quibusdam molestiae დიქტა, რემ molestias recusandae სინტ ასუმენდა ექსცეპტური. ატ ეუმ პარიათურ სით დოლორეს დუკიმუს, დიგნიტას დოთემ რეპელლატ ცულპა! ერორ ნეკე რეკუსანდე, კვომნის ბეატე რეპელლატ? კვა სუსციპიტ nobis ლაბორუმ დოლორემ ამეტ დოლორ, დოლორეს ნეკე ექსცეპტური quos კუმ ბეატე. ვიტაე დუკიმუს ად ტემპორიპუს დოლორემკვე კონსეკუატურ სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია, საჭიროებათა კონსეკუატურ მაგნი ეიუს. ქვა ტენეტურ ნუმკუამ ვერო? ასუმენდა ესსე მაჯორეს კუისკუამ ლაბორატორიუმ! ლორემი იპსუმ დოლორ სით ამეტ კონსექტეტურ ადიპისიცინგ ელიტ. დესერუნტ აუტემ ეიუს კვა მინიმა ნულა quibusdam molestiae დიქტა, რემ molestias recusandae სინტ ასუმენდა ექსცეპტური. ატ ეუმ პარიათურ სით დოლორეს დუკიმუს, დიგნიტას დოთემ რეპელლატ ცულპა! ერორ ნეკე რეკუსანდე, კვომნის ბეატე რეპელლატ? კვა სუსციპიტ nobis ლაბორუმ დოლორემ ამეტ დოლორ, დოლორეს ნეკე ექსცეპტური quos კუმ ბეატე. ვიტაე დუკიმუს ად ტემპორიპუს დოლორემკვე კონსეკუატურ სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია, საჭიროებათა კონსეკუატურ მაგნი ეიუს. ქვა ტენეტურ ნუმკუამ ვერო? ასუმენდა ესსე მაჯორეს კუისკუამ ლაბორატორიუმ! სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია, საჭიროებათა კონსეკუატურ მაგნი ეიუს. ქვა ტენეტურ ნუმკუამ ვერო? ასუმენდა ესსე მაჯორეს კუისკუამ ლაბორატორიუმ!სეკუი, ტენეტურ აპერიამ მოლლიტია ტემპორა ფაცერე non ატ ექსცეპტური ასპერიორესი ეიარუმ მაგნამ ალიქვიდ ვერიტატის კონსექტეტურ ვოლუპტატემ კვოს! ეტ nobis სინტ possimus quidem ლაბორატორიუმ ფაკერე, ველიტ, პრეზენტსიუმ სოლუტა რაცია, საჭიროებათა კონსეკუატურ მაგნი ეიუს. ქვა ტენეტურ ნუმკუამ ვერო? ასუმენდა ესსე მაჯორეს კუისკუამ ლაბორატორიუმ! ",
      ru: "Лорем ипсум долор сит амет консектетур адиписициинг элит. Десерунт аутем еиус квас минима nullа quibusdam molestiae дикта, рем molestias recusandae синт ассуменда эксцептури. Ат эум париатур сит долорес дуциумус, дигнитас дотем репеллат цульпа! Эррор неке рекусанде, квомнис беатэ репеллат? Квас сусципит nobis laborum долорем амет долор, долорес неке эксцептури quos кум беатэ. Витае дуциумус ад темпорапус долоремкве консекуатур секуи, тенетур апериам моллития темпора фасцере non ат эксцептури аспериорес еиарум магнам аликуид веритатис консектетур волуптатем кваос! Эт nobis синт possimus quidem лабораториум факере, велит, презентсиум солута ратио, necessitatibus консекуатур магни еиус. Кваэ тенетур нумкуам веро? Ассуменда эссе маиорес кюискуам лабораториум!",
      "Our Values":
        "Наши ценности Лорем ипсум долор сит амет консектетур адиписициинг элит. Десерунт аутем еиус квас минима nullа quibusdam molestiae дикта, рем molestias recusandae синт ассуменда эксцептури. Ат эум париатур сит долорес дуциумус, дигнитас дотем репеллат цульпа! Эррор неке рекусанде, квомнис беатэ репеллат? Квас сусципит nobis laborum долорем амет долор, долорес неке эксцептури quos кум беатэ. Витае дуциумус ад темпорапус долоремкве консекуатур секуи, тенетур апериам моллития темпора фасцере non ат эксцептури аспериорес еиарум магнам аликуид веритатис консектетур волуптатем кваос! Эт nobis синт possimus quidem лабораториум факере, велит, презентсиум солута ратио, necessitatibus консекуатур магни еиус. Кваэ тенетур нумкуам веро? Ассуменда эссе маиорес кюискуам лабораториум!",
      "Our Values":
        "Наши ценности Лорем ипсум долор сит амет консектетур адиписициинг элит. Десерунт аутем еиус квас минима nullа quibusdam molestiae дикта, рем molestias recusandae синт ассуменда эксцептури. Ат эум париатур сит долорес дуциумус, дигнитас дотем репеллат цульпа! Эррор неке рекусанде, квомнис беатэ репеллат? Квас сусципит nobis laborum долорем амет долор, долорес неке эксцептури quos кум беатэ. Витае дуциумус ад темпорапус долоремкве консекуатур секуи, тенетур апериам моллития темпора фасцере non ат эксцептури аспериорес еиарум магнам аликуид веритатис консектетур волуптатем кваос! Эт nobis синт possimus quidem лабораториум факере, велит, презентсиум солута ратио, necessitatibus консекуатур магни еиус. Кваэ тенетур нумкуам веро? Ассуменда эссе маиорес кюискуам лабораториум!",
      "Our Values": "Наши ценности",
    },
    image: imageList[0],
  },
]

const simulateDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const getAboutItems = async (language) => {
  await simulateDelay(200)

  return aboutList.map((aboutItem) => {
    const { title, text } = aboutItem

    return { ...aboutItem, title: title[language], text: text[language] }
  })
}

export const getEditAboutItems = async () => {
  await simulateDelay(200)

  return aboutList
}
