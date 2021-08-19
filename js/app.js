'use strict';

let container = document.getElementById('');
let firstImage = document.getElementById('firstImg')
let secondImage = document.getElementById('secondImg')
let thirdImage = document.getElementById('thirdImg')

let result = document.getElementById('results');

let arrayOfImages  = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let displayImage = [];
let voteImageArray = [];
let viewImageArray = [];
let product = [];
let nameImage = [];

function saveLocalStorage()
{
    let data1 = JSON.stringify(product);
    localStorage.setItem('product',data1);
}
function readLocalStorage()
{
    let stringObj1 = localStorage.getItem('product');
  
    
    let normalObj1 = JSON.parse(stringObj1);
 

    if(normalObj1)
    {  
        product = normalObj1;
    }
    
}
readLocalStorage();
function Image(productName) {
    this.pName = productName.split('.')[0];
    this.imgPath = `Images/${productName}`;
    this.Votes = 0;
    this.Views = 0;
    product.push(this);
    nameImage.push(this.pName);

}

for (let i = 0; i < arrayOfImages .length; i++) {
    new Image(arrayOfImages [i])
}



function randomImage() {
    return Math.floor(Math.random() * arrayOfImages .length) 
}



let firstIndex;
let scondIndex;
let thirdIndex;

function renderImg() {
    firstIndex = randomImage();
    scondIndex = randomImage();
    thirdIndex = randomImage();

    while (firstIndex === scondIndex || scondIndex == thirdIndex || firstIndex === thirdIndex || displayImage.includes(firstIndex) || displayImage.includes(scondIndex) || displayImage.includes(thirdIndex)) {
        firstIndex = randomImage();
        scondIndex = randomImage();
        thirdIndex = randomImage();
    }
    firstImage.setAttribute('src', product[firstIndex].imgPath);
    secondImage.setAttribute('src', product[scondIndex].imgPath);
    thirdImage.setAttribute('src', product[thirdIndex].imgPath);
    product[firstIndex].Views++;
    product[scondIndex].Views++;
    product[thirdIndex].Views++;

    displayImage[0]=firstIndex;
    displayImage[1]=scondIndex;
    displayImage[2]=thirdIndex;


}
renderImg();

firstImage.addEventListener('click', clickHandle);
secondImage.addEventListener('click', clickHandle)
thirdImage.addEventListener('click', clickHandle);

function clickHandle(event) {
    if (attempt <= maxAttempts) {

        let clickedImage = event.target.id;

        if (clickedImage === 'firstImg') {

            product[firstIndex].Votes++;
        } else if (clickedImage === 'secondImg') {

            product[scondIndex].Votes++
        } else if (clickedImage === 'thirdImg') {

            product[thirdIndex].Votes++
        }
        renderImg();
        attempt++;
    }



}

let btnEl = document.getElementById('button');
btnEl.addEventListener('click', showResult)

function showResult(event) {
    for (let i = 0; i < product.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
        voteImageArray.push(product[i].Votes);
        viewImageArray.push(product[i].Views);
    }
    chartRender()
    saveLocalStorage

    btnEl.removeEventListener('click', showResult)
}
function chartRender() {
    let ctx = document.getElementById('theChart').getContext('2d');
    let theChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nameImage,
            datasets: [{
                label: '# Votes',
                data: voteImageArray,
                backgroundColor: [
                    'rgba(255, 0, 0, 0.3)'
                ],
               
            }, {
                label: '# views',
                data: viewImageArray,
                backgroundColor: [
                    'rgb(60, 179, 113)'
                ],
               
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


