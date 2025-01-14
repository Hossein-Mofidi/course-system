const coursesData = [
  { id: 1, title: "دوره آموزش Node.js", category: "backend", price: 150, students: 0, author: "حسین مفیدی" },
  { id: 2, title: "دوره آموزش زبان جاوا", category: "backend", price: 237, students: 0, author: "ابوالفضل هادی نژاد" },
  { id: 3, title: "دوره آموزش زبان پایتون", category: "backend", price: 200, students: 0, author: "مسیح مصطفیی" },
  { id: 4, title: "دوره آموزش پی اچ پی", category: "backend", price: 222, students: 0, author: "امیرحسین حمیدی" },
  // { id: 5, title: "دوره آموزش اچ تی ام ال", category: "frontend", price: 256, students: 0, author: "ابوالفضل هادی نژاد" },
  // { id: 6, title: "دوره آموزش سی اس اس", category: "frontend", price: 985, students: 0, author: "مسیح مصطفیی" },
  // { id: 7, title: "دوره آموزش جاوا اسکریپت", category: "frontend", price: 545, students: 0, author: "حسین مفیدی" },
  // { id: 8, title: "دوره آموزش ", category: "frontend", price: 633, students: 0, author: "امیرحسین حمیدی" },
];


// ایجاد عنصر کارت دوره
coursesData.forEach(function(res) {
  const courseCard = document.createElement('div');
courseCard.classList.add('course-card', `card-${res.id}`);

// تصویر کارت دوره
const cardImage = document.createElement('div');
cardImage.classList.add('card-image');
const courseImg = document.createElement('img');
courseImg.setAttribute('src', 'course-image.svg');
courseImg.setAttribute('alt', 'تصویر دوره');
cardImage.appendChild(courseImg);
courseCard.appendChild(cardImage);

// محتوا کارت دوره
const cardContent = document.createElement('div');
cardContent.classList.add('card-content');

const courseTitle = document.createElement('h3');
courseTitle.classList.add('course-title');
courseTitle.textContent = `${res.title}`;
cardContent.appendChild(courseTitle);

const courseDescription = document.createElement('p');
courseDescription.classList.add('course-description');
courseDescription.textContent = 'لورم ایپسوم متن ساختگی است که با تولید سادگی نامفهوم';
cardContent.appendChild(courseDescription);

// فوتر کارت دوره
const courseFooter = document.createElement('div');
courseFooter.classList.add('course-footer');

// بخش نویسنده
const authorSection = document.createElement('div');
authorSection.classList.add('author-section');

const likeButton = document.createElement('button');
likeButton.classList.add('like-button');
const likeImg = document.createElement('img');
likeImg.setAttribute('src', 'like.svg');
likeImg.setAttribute('alt', 'لایک');
likeButton.appendChild(likeImg);
authorSection.appendChild(likeButton);

const authorName = document.createElement('span');
authorName.classList.add('author-name');
authorName.textContent = `${res.author}`;
authorSection.appendChild(authorName);

const authorIcon = document.createElement('img');
authorIcon.setAttribute('src', 'author.svg');
authorIcon.setAttribute('alt', 'آیکون مدرس');
authorIcon.classList.add('author-icon');
authorSection.appendChild(authorIcon);

courseFooter.appendChild(authorSection);

// خط جداکننده
const footerLine = document.createElement('div');
footerLine.classList.add('footer-line');
courseFooter.appendChild(footerLine);

// بخش آمار دوره
const courseStats = document.createElement('div');
courseStats.classList.add('course-stats');

const coursePrice = document.createElement('span');
coursePrice.classList.add('course-price');
coursePrice.textContent =  "هزار تومن" + `${res.price}`;
courseStats.appendChild(coursePrice);

const studentsInfo = document.createElement('div');
studentsInfo.classList.add('students-info');

const studentsCount = document.createElement('span');
studentsCount.classList.add('students-count');
studentsCount.textContent = `نفر ${res.students}`;
studentsInfo.appendChild(studentsCount);

const studentsIcon = document.createElement('img');
studentsIcon.setAttribute('src', 'students.svg');
studentsIcon.setAttribute('alt', 'آیکون دانشجو');
studentsIcon.classList.add('students-icon');
studentsInfo.appendChild(studentsIcon);

courseStats.appendChild(studentsInfo);
courseFooter.appendChild(courseStats);
cardContent.appendChild(courseFooter);

courseCard.appendChild(cardContent);


const container = document.getElementById('courses-section');
container.appendChild(courseCard);


courseCard.addEventListener('click', function() {

      let mainPage = document.querySelector('.mainpage')
      mainPage.classList.add('displaynone')



    // ساختن عناصر اصلی
    const mainWrapper = document.createElement("div");
    mainWrapper.classList.add("main-wrapper");

    document.body.appendChild(mainWrapper);

    // ایجاد بخش ویدیو
    const videoContainer = document.createElement("section");
    videoContainer.classList.add("video-container");

    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("video-wrapper");

    const videoElement = document.createElement("video");
    videoElement.classList.add("video-element");

    const sourceMp4 = document.createElement("source");
    sourceMp4.setAttribute("src", "video.mp4");
    sourceMp4.setAttribute("type", "video/mp4");

    const sourceWebm = document.createElement("source");
    sourceWebm.setAttribute("src", "video.webm");
    sourceWebm.setAttribute("type", "video/webm");

    videoElement.appendChild(sourceMp4);
    videoElement.appendChild(sourceWebm);
    videoElement.innerHTML += "مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.";

    const playTrigger = document.createElement("div");
    playTrigger.classList.add("play-trigger");

    const playImage = document.createElement("img");
    playImage.setAttribute("src", "play.svg");
    playImage.setAttribute("alt", "Play Icon");

    playTrigger.appendChild(playImage);

    videoWrapper.appendChild(videoElement);
    videoWrapper.appendChild(playTrigger);
    videoContainer.appendChild(videoWrapper);
    mainWrapper.appendChild(videoContainer);

    // ایجاد بخش اطلاعات دوره
    const courseOverview = document.createElement("section");
    courseOverview.classList.add("course-overview");

    const overviewBox = document.createElement("div");
    overviewBox.classList.add("overview-box");

    const priceHeading = document.createElement("p");
    priceHeading.classList.add("price-heading");
    priceHeading.textContent = "قیمت دوره :";

    const priceTag = document.createElement("span");
    priceTag.classList.add("price-tag");
    priceTag.textContent = "هزار تومن" + `${res.price}`;

    const overviewSeparator = document.createElement("div");
    overviewSeparator.classList.add("separator", "overview-separator");

    const addToBasket = document.createElement("button");
    addToBasket.classList.add("add-to-basket");

    const basketImage = document.createElement("img");
    basketImage.setAttribute("src", "basket.svg");
    basketImage.setAttribute("alt", "Shopping Bag Icon");

    addToBasket.appendChild(basketImage);
    addToBasket.appendChild(document.createTextNode("افزودن به سبد خرید"));

    const markFavorite = document.createElement("button");
    markFavorite.classList.add("mark-favorite");

    const favoriteImage = document.createElement("img");
    favoriteImage.setAttribute("src", "like.svg");
    favoriteImage.setAttribute("alt", "Add to Favorites");

    markFavorite.appendChild(favoriteImage);

    overviewBox.appendChild(priceHeading);
    overviewBox.appendChild(priceTag);
    overviewBox.appendChild(overviewSeparator);
    overviewBox.appendChild(addToBasket);
    overviewBox.appendChild(markFavorite);
    courseOverview.appendChild(overviewBox);
    mainWrapper.appendChild(courseOverview);

    // ایجاد جزئیات دوره
    const detailsContainer = document.createElement("section");
    detailsContainer.classList.add("details-container");

    const detailsList = [
      { icon: "clock.svg", title: "مدت زمان دوره:", value: "22 ساعت" },
      { icon: "sessions.svg", title: "تعداد جلسات دوره:", value: "91 جلسه" },
      { icon: "download.svg", title: "نحوه دیدن دوره:", value: "به صورت دانلودی" },
      { icon: "prerequisite.svg", title: "پیش نیاز دوره:", value: "پیش نیازی ندارد" },
      { icon: "students.svg", title: "تعداد دانشجویان دوره:", value: "129 نفر" },
    ];

    detailsList.forEach((detail, index) => {
      const detailItem = document.createElement("div");
      detailItem.classList.add("details-item");

      const detailIcon = document.createElement("img");
      detailIcon.setAttribute("src", detail.icon);
      detailIcon.setAttribute("alt", `${detail.title} Icon`);
      detailIcon.classList.add("details-icon");

      const detailTitle = document.createElement("span");
      detailTitle.classList.add("details-title");
      detailTitle.textContent = detail.title;

      const detailValue = document.createElement("span");
      detailValue.classList.add("details-value");
      detailValue.textContent = detail.value;

      const separator = document.createElement("div");
      separator.classList.add("separator", `details-separator-${index + 1}`);

      detailItem.appendChild(detailIcon);
      detailItem.appendChild(detailTitle);
      detailItem.appendChild(detailValue);
      detailsContainer.appendChild(detailItem);
      detailsContainer.appendChild(separator);
    });

    mainWrapper.appendChild(detailsContainer);

    // ایجاد توضیحات دوره
    const descriptionWrapper = document.createElement("section");
    descriptionWrapper.classList.add("description-wrapper");

    const descriptionContainer = document.createElement("div");
    descriptionContainer.classList.add("description-container");

    const descriptionHeading = document.createElement("h2");
    descriptionHeading.classList.add("description-heading");
    descriptionHeading.textContent = `${res.title}`;

    const introText = document.createElement("p");
    introText.classList.add("intro-text");
    introText.textContent =
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

    const sectionTitle = document.createElement("h3");
    sectionTitle.classList.add("section-title");
    sectionTitle.textContent = "توضیحات دوره";

    const contentTextOne = document.createElement("p");
    contentTextOne.classList.add("content-text");
    contentTextOne.textContent =
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";

    const contentTextTwo = document.createElement("p");
    contentTextTwo.classList.add("content-text");
    contentTextTwo.textContent =
      "کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.";

    descriptionContainer.appendChild(descriptionHeading);
    descriptionContainer.appendChild(introText);
    descriptionContainer.appendChild(sectionTitle);
    descriptionContainer.appendChild(contentTextOne);
    descriptionContainer.appendChild(contentTextTwo);
    descriptionWrapper.appendChild(descriptionContainer);
    mainWrapper.appendChild(descriptionWrapper);

    window.scrollTo({
      top: 0,       
      behavior: 'smooth'
    });







    




    
  })
})
