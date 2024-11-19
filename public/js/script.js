//control image carousel 
function startCarousel() {
    let activeImage = 0;

    const images = document.querySelectorAll("#carousel img");

    function cycleImages() {
        if (!images[activeImage]) {
            clearInterval(intervalId)
            return;
        }

        //Loops the images
        images[activeImage].classList.remove('active');
        activeImage = (activeImage + 1) % images.length;
        images[activeImage].classList.add('active')
    }

    let intervalId = setInterval(cycleImages, 3000)
}
//handle edit requests
function editItem(id, name, description) {
  document.getElementById('updateId').value = id

  document.getElementById('updateName');
  document.getElementById('updateDescription').value = description

  document.getElementById('updateForm').action = `/item/update/${id}`
}

//handle delete requests
async function deleteItem(id) {
  try {
    const response = await fetch(`http://localhost:3500/item/delete/${id}`, {
      method:`DELETE`
    })
    if (response.ok) {
      location.reload()
    } else {
      console.log('failed to delete item')
    }
  } catch(error) {
    console.log('error occurred: ', error)  
  }
}

//handle errors from server if unable to write data (optional)
function checkForError() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('error')) {
    alert("Validation failed. Name and description are required.");
  }
}

window.onload = function() {
  startCarousel();
  checkForError();
}