'use strict';

const displayProductsElem = document.getElementById('product_display');
const leftProductImg = document.getElementById('leftproduct_img');
const leftProductH2 = document.getElementById('leftproduct_h2');
const centerProductImg = document.getElementById('centerproduct_img');
const centerProductH2 = document.getElementById('centerproduct_h2');
const rightProductImg = document.getElementById('rightproduct_img');
const rightProductH2 = document.getElementById('rightproduct_h2');
const productVotes = document.getElementById('productVotes');


let totalVotes = 0;
Product.allProducts = [];

let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

function Product(product, image) {
  this.product = product;
  this.votes = 0;
  this.image = image;
  this.timesShown = 0;
  Product.allProducts.push(this);
}

Product.prototype.renderOneProduct = function(h2Position, imgPosition) {
  imgPosition.src = this.image;
  h2Position.textContent = this.product;
  this.timesShown++
}

function renderThreeProducts() {
  let leftIndex = Math.floor(Math.random() * Product.allProducts.length);
  leftProduct = Product.allProducts[leftIndex];

  let rightIndex = Math.floor(Math.random() * Product.allProducts.length);
  rightProduct = Product.allProducts[rightIndex];

  let centerIndex = Math.floor(Math.random() * Product.allProducts.length);
  centerProduct = Product.allProducts[centerIndex];

   while (centerProduct === leftProduct || centerProduct === rightProduct || rightProduct === leftProduct) {
     leftIndex = Math.floor(Math.random() * Product.allProducts.length);
     leftProduct = Product.allProducts[leftIndex];
   }

   leftProduct.renderOneProduct(leftProductH2, leftProductImg);
   centerProduct.renderOneProduct(centerProductH2, centerProductImg);
   rightProduct.renderOneProduct(rightProductH2, rightProductImg);
}

function renderVoteResult() {
  productVotes.innerHTML="";

  for (let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.product}: ${product.votes}`;
    productVotes.appendChild(liElem);
  }
}

function handleClick(event) {
  let id = event.target.id;
  console.log(id, 'id');
  console.log(totalVotes);

  if (id === 'leftproduct_img' || id === 'rightproduct_img' || id === 'centerproduct_img') {
    totalVotes++
    if (id === 'rightproduct_img') {
      rightProduct.votes++
    } else if (id === 'leftproduct_img') {
      leftProduct.votes++
    } else {
      centerProduct.votes++
    }
    renderThreeProducts();
  }  else {
    alert('Please click on an image to vote.');
  }
  if (totalVotes === 25) {
    renderVoteResult();
    displayProductsElem.removeEventListener('click', handleClick);
  }
}

displayProductsElem.addEventListener('click', handleClick);




new Product('Robot Bag', './images/bag.jpg');
new Product('Banana Slicer', './images/banana.jpg');
new Product('Toilet Tablet', './images/bathroom.jpg');
new Product('Rainboot Sandals', './images/boots.jpg');
new Product('Toaster Roaster Station', './images/breakfast.jpg');
new Product('Meatball Bubblegum', './images/bubblegum.jpg');
new Product('Cthulhu', './images/cthulhu.jpg');
new Product('Duck Lips', './images/dog-duck.jpg');
new Product('Dragon Meat', './images/dragon.jpg');
new Product('Corporate Picnic', './images/pen.jpg');
new Product('Pet Sweep', './images/pet-sweep.jpg');
new Product('Scissor Slicer', './images/scissors.jpg');
new Product('Snuggle Shark', './images/shark.jpg');
new Product('Baby Duster', './images/sweep.png');
new Product('Tauntaun Sleeper', './images/tauntaun.jpg');
new Product('Sparkle Spam', './images/unicorn.jpg');
new Product('Self-Watering Water Can', './images/water-can.jpg');
new Product('Terrari-Yum', './images/wine-glass.jpg');

renderThreeProducts();
