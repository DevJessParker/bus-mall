'use strict';

const productDisplayElem = document.getElementById("product_display");
const leftImgElem = document.getElementById("leftproduct_img");
const leftH2Elem = document.getElementById("leftproduct_h2");
const leftPElem = document.getElementById("leftproduct_p");
const centerImgElem = document.getElementById("centerproduct_img");
const centerH2Elem = document.getElementById("centerproduct_h2");
const centerPElem = document.getElementById("centerproduct_p");
const rightImgElem = document.getElementById("rightproduct_img");
const rightH2Elem = document.getElementById("rightproduct_h2");
const rightPElem = document.getElementById("rightproduct_p");
const productVotes = document.getElementById("productVotes");

let voteCounter = 0;
Product.allProducts = [];

let leftProduct = null;
let centerProduct = null;
let rightProduct = null;

function Product(product, image, description) {
  this.product = product;
  this.image = image;
  this.description = description;
  this.timesShown = 0;
  this.votes = 0;

  Product.allProducts.push(this);
}

Product.prototype.renderSingleProduct = function(imgPosition, h2Position, pPosition) {
  imgPosition.src = this.image;
  imgPosition.alt = `${this.name}`;
  h2Position.textContent = this.name;
  pPosition.textContent = this.description;
  this.timesShown++;
}

function displayThreeProducts() {
  let leftProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  leftProduct = Product.allProducts[leftProductIndex];
  
  let centerProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  centerProduct = Product.allProducts[centerProductIndex];

  let rightProductIndex = Math.floor(Math.random() * Product.allProducts.length);
  rightProduct = Product.allProducts[rightProductIndex];
 
  while (centerProduct === leftProduct || centerProduct === rightProduct || rightProduct === leftProduct) {
    leftProductIndex = Math.floor(Math.random() * Product.allProducts.length);
    leftProduct = Product.allProducts[leftProductIndex];
  }

  rightProduct.renderSingleProduct(rightImgElem, rightH2Elem, rightPElem);
  centerProduct.renderSingleProduct(centerImgElem, centerH2Elem, centerPElem);
  leftProduct.renderSingleProduct(leftImgElem, leftH2Elem, leftPElem);
}

function renderVoteCount() {
  productVotes.innerHTML="";

  for (let product of Product.allProducts) {
    let liElem = document.createElement('li');
    liElem.textContent = `${product.product}: ${product.votes}`;
    productVotes.appendChild(liElem);
  }
}

function handleClick(event) {
  let id = event.target.id
  console.log(voteCounter);

  if (voteCounter === 0) {
    for (let i = 0; i < Product.allProducts.length; i++) { 
      if (event.target.alt === Product.allProducts[i].product) {
        Product.allProducts[i].votes++
      }
    }
    voteCounter++;
    displayThreeProducts();
  } else {

    if (id === 'rightproduct_img' || id === 'centerproduct_img' || id === 'leftproduct_img') {
      voteCounter++
      if (id === 'rightproduct_img') {
        rightProduct.votes++;
      } else if (id === 'centerproduct_img') {
        centerProduct.votes++;
      } else {
        leftProduct.votes++;
      } 
      displayThreeProducts(); 
    } else {
      alert('Please click on an image to vote.');
    } 
    if (voteCounter === 25) {
      renderVoteCount();
      productDisplayElem.removeEventListener('click', handleClick);
    }
  }
}



productDisplayElem.addEventListener('click', handleClick);


new Product('Robot Bag', './images/bag.jpg', 'Carry your valuables far, far away with this robot luggage bag.');
new Product('Banana Slicer', './images/banana.jpg', 'Knife or banana? How about a slicer?');
new Product('Toilet Tablet', './images/bathroom.jpg', 'Need to shop on the go while you go?');
new Product('Rainboot Sandals', './images/boots.jpg', 'Show of your pedicure, even in inclement weather with these stylish all-weather sandals.');
new Product('Toaster Roaster Station', './images/breakfast.jpg', 'Lazy in the mornings? Buy this Easy Bake Oven for people with mortgages.');
new Product('Meatball Bubblegum', './images/bubblegum.jpg', 'This one really writes itself.');
new Product('Cthulhu', './images/cthulhu.jpg', 'Need a flying spaghetti monster to go with your Bubblegum Meatballs? Look no further.');
new Product('Duck Lips', './images/dog-duck.jpg', 'Take the ultimate dog selfies with these duck lips.');
new Product('Dragon Meat', './images/dragon.jpg', 'Are you a Dungeon Master hosting a cookout? Serve your guests the ultimate in canned wyvern chops');
new Product('Corporate Picnic', './images/pen.jpg', 'Eat your lunch, even in the middle of a Q4 earnings report with this office cutlery set.');
new Product('Pet Sweep', './images/pet-sweep.jpg', 'Make your freeloading pets earn their keep with these mopping dust boots');
new Product('Scissor Slicer', './images/scissors.jpg', 'The only crusty scissors that won\'t give you tetanus.');
new Product('Snuggle Shark', './images/shark.jpg', 'Love scary hugs? This shark snuggle sleeping bag is for you!');
new Product('Baby Duster', './images/sweep.png', 'Is a baby keeping you up all night? Then put them to work all day with this sweeper onesie.');
new Product('Tauntaun Sleeper', './images/tauntaun.jpg', 'Want to be warm as a Tauntaun\'s insides without the horrid smell? Beat Hoth\'s icy temps in this cozy sleeper.');
new Product('Sparkle Spam', './images/unicorn.jpg', 'Greet your morning with an air of majesty with some fried pegasus-in-a-can.');
new Product('Self-Watering Water Can', './images/water-can.jpg', 'The ultimate in self-watering self-care. Who says recycling is hard?');
new Product('Terrari-Yum', './images/wine-glass.jpg', 'Want to make your party guests leave in a hurry? Serve them wine in a terrarium for lushes.');

// displayThreeProducts();