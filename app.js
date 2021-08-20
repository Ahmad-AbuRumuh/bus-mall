'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let result = document.getElementById('results');
let Images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let imgs = [];
let votes = [];
let views = [];
let names = [];

function image(imgName) {
    this.imgName = imgName.split('.')[0];
    this.Img = `img/${imgName}`;
    this.votes = 0;
    this.views = 0;
    names.push(this.imgName);
    imgs.push(this);
}

for (let i = 0; i < Images.length; i++) {
    new image(Images[i]);
}

// console.log(imgs);
function randomImage() {
    return Math.floor(Math.random() * imgs.length);
}
let index1;
let index2;
let index3;

function saveToLocalStorage() {
    let data = JSON.stringify(imgs);
    localStorage.setItem('product', data);
}
function readFromLocalStorage() {
    let stringObj = localStorage.getItem('product');
    let normalObj = JSON.parse(stringObj);
  
    if (normalObj) {
        imgs = normalObj;
        renderImg();
    }
}
readFromLocalStorage();

function renderImg() {
    index1 = randomImage();
    index2 = randomImage();
    index3 = randomImage();
    while (index1 === index2 || index1 === index3 || index3 === index2) {
        if (index1 === index2) {
            index1 = randomImage();
        }
        if (index1 === index3) {
            index1 = randomImage();
        }
        if (index3 === index2) {
            index2 = randomImage();
        }
    }
    img1.setAttribute('src', imgs[index1].Img);
    img2.setAttribute('src', imgs[index2].Img);
    img3.setAttribute('src', imgs[index3].Img);
    imgs[index1].views++;
    imgs[index2].views++;
    imgs[index3].views++;
}
renderImg();

img1.addEventListener('click', clickHandler);
img2.addEventListener('click', clickHandler);
img3.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'img1') {
            imgs[index1].votes++;
        } else if (clickedImage === 'img2') {
            imgs[index2].votes++
        } else if (clickedImage === 'img3') {
            imgs[index3].votes++
        }
        renderImg();
        // console.log(imgs);
        attempt++;
    } else {
        document.getElementById('btn').onclick = function() {showResult()};        
        // btnEl.addEventListener('click', showResult);
        function showResult() {
            for (let i = 0; i < imgs.length; i++) {
                let liEl = document.createElement('li');
                result.appendChild(liEl);
                liEl.textContent = `${imgs[i].imgName} has ${imgs[i].votes} votes and  ${imgs[i].views} views.`;
                votes.push(imgs[i].votes);
                views.push(imgs[i].views);
                names.push(imgs[i].imgName);
            }
            saveToLocalStorage();
            img1.removeEventListener('click', clickHandler);
            img2.removeEventListener('click', clickHandler);
            img3.removeEventListener('click', clickHandler);
            chartRender();
        }
    }
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgs,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: views,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
    );
}
