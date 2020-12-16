var images = [];

images[0] = "https://capitalprints.com.au/wp-content/uploads/uniform.jpg";
images[1] = "https://capitalprints.com.au/wp-content/uploads/promotion.jpg";
images[2] = "https://capitalprints.com.au/wp-content/uploads/graphic_design.jpg";
images[3] = "https://capitalprints.com.au/wp-content/uploads/sublimation.jpg";
images[4] = "https://capitalprints.com.au/wp-content/uploads/business_card.jpg";
images[5] = "https://capitalprints.com.au/wp-content/uploads/coffee.jpg";

function startTimer(){
    setInterval(displayNextImage, 3000)
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function displayNextImage(){

    var aImg = 0;
    var a = Math.floor(Math.random() * (6-0));
    var imgId = "";
    
		imgId = "img"+a;
	
    if(a === 0 || a === 4){
        aImg = Math.floor(Math.random() * 2);
        imgElement = document.getElementById(imgId);
        imgElement.className = "img-landscape";
        await sleep(200);
        imgElement.classList.add("flip-in-hor-bottom");
        imgElement.src = images[aImg];
    }
    else{
        aImg = Math.floor(Math.random() * (5-2) + 2);
        imgElement = document.getElementById(imgId);
        imgElement.className = "img-portrait";
        await sleep(200);
        imgElement.classList.add("flip-in-hor-bottom");
        imgElement.src = images[aImg];
    }

}

function goContacts(){
	var elmnt = document.getElementsByClassName("contact-content")[0];
	elmnt.scrollIntoView(false);
}

function Redirect(relevantURL) {
    window.location=relevantURL;
  }