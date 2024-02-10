
const accessKey = 'FU7B8CBOI79-nEpEfsZpgsp2y-kJ6xyZ3QzuoonlJW4'; // Replace with your Unsplash access key

const count = 10; // Number of images to fetch
// Function to load a random image
async function loadRandomImage() {
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const randomIndex = Math.floor(Math.random() * count);
    const randomImageUrl = data[randomIndex].urls.regular;

    const imgElement = document.getElementById('randomImage');
    imgElement.src = randomImageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
  }
}

// Event listener for button click
document.getElementById('loadImageBtn').addEventListener('click', loadRandomImage);
