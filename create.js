function create(pri,name,loc,info,des)
{
 // Create a section element
var section = document.createElement("section");
var infg = "img"+(parseInt(info)+1)+".jpg";
// Create an image element
var image = document.createElement("img");
image.setAttribute("src", infg);
image.setAttribute("alt", "");

// Create an h1 element
var h1 = document.createElement("h1");
h1.textContent = name+"  in "+loc;

// Create an h5 element
var h5 = document.createElement("h5");
h5.textContent = des;

// Create another section element
var innerSection = document.createElement("section");

// Create an h3 element
var h3 = document.createElement("h3");
h3.textContent = "Price ";

// Create a span element
var span = document.createElement("span");
span.textContent = "$ "+pri;

// Append the span to the h3
h3.appendChild(span);

// Create two button elements
var buyButton = document.createElement("button");
buyButton.setAttribute("type", "button");
buyButton.textContent = "Buy";
buyButton.addEventListener('click', function() {
    buyProperty(info);
});

var verifyButton = document.createElement("button");
verifyButton.setAttribute("type", "button");
verifyButton.textContent = "verify";
verifyButton.addEventListener('click', function() {
    verify(info);
});

// Append all elements to their respective parent elements

innerSection.appendChild(buyButton);
innerSection.appendChild(verifyButton);

section.appendChild(image);
section.appendChild(h1);
section.appendChild(h5);
section.appendChild(h3);
section.appendChild(innerSection);

// Append the section to the document body or any other parent element
document.body.appendChild(section);
const res = document.getElementById("content");
    // Append the section to the document body or any desired parent element
    res.appendChild(section);

}

function createown(pri,name,loc,info,des)
{
 // Create a section element
var section = document.createElement("section");

var infg = "img"+(parseInt(info)+1)+".jpg";
// Create an image element
var img = "img"+info+".jpeg";
console.log(infg);
var image = document.createElement("img");
image.setAttribute("src",infg);
image.setAttribute("alt", "");

// Create an h1 element
var h1 = document.createElement("h1");
h1.textContent = name+"  in "+loc;

// Create an h5 element
var h5 = document.createElement("h5");
h5.textContent = des;

// Create another section element
var innerSection = document.createElement("section");

// Create an h3 element
var h3 = document.createElement("h3");
h3.textContent = "  ";

// Create a span element
var span = document.createElement("span");
span.textContent = " ";

// Append the span to the h3
h3.appendChild(span);

// Create two button elements
var buyButton = document.createElement("button");
buyButton.setAttribute("type", "button");
buyButton.textContent = "Buy";
buyButton.addEventListener('click', function() {
    buy(info);
});

var verifyButton = document.createElement("button");
verifyButton.setAttribute("type", "button");
verifyButton.textContent = "verify";
verifyButton.addEventListener('click', function() {
    verify(info);
});

// Append all elements to their respective parent elements

//innerSection.appendChild(buyButton);
innerSection.appendChild(verifyButton);

section.appendChild(image);
section.appendChild(h1);
section.appendChild(h5);
section.appendChild(h3);
section.appendChild(innerSection);

// Append the section to the document body or any other parent element
document.body.appendChild(section);
const res = document.getElementById("own");
    // Append the section to the document body or any desired parent element
    res.appendChild(section);

}
