const carSelect = document.getElementById('car-select');
const url = 'http://localhost:3000/cars'; 

// Improved fetch with error handling
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    populateCarSelect(data.cars); // Access the 'cars' array from the fetched data
  })
  .catch(error => {
    console.error('Error fetching car data:', error);
    // Handle the error gracefully by displaying a message or using default data
    carSelect.innerHTML = '<option value="">Error fetching cars</option>';
  });

// Function to populate the car selection dropdown
function populateCarSelect(cars) {
  carSelect.innerHTML = '<option value="">Select a car</option>'; // Reset options
  if (!cars || cars.length === 0) {
    carSelect.appendChild(new Option('No cars available', '')); // Inform user of no cars
    return; // Exit function if no cars
  }
  cars.forEach(car => {
    const option = document.createElement('option');
    option.value = car.name; // Set the value to the car name
    option.textContent = car.name + ' - $' + car.price + ' per day'; // Display car name and price
    carSelect.appendChild(option);
  });
}

// Event listener for form submission (assuming form ID is 'rent-form')
const rentForm = document.getElementById('rent-form');
rentForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const selectedCar = carSelect.value;
  const rentalDuration = document.getElementById('rental-duration').value;
  if (selectedCar === '') {
    alert('Please select a car to rent.');
    return; // Prevent form submission if no car is selected
  }
  alert(`You have rented ${selectedCar} for ${rentalDuration} days!`);
});

// Similar event listener for review form submission (assuming form ID is 'review-form')
const reviewForm = document.getElementById('review-form');
reviewForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const reviewerName = document.getElementById('review-name').value;
  const reviewText = document.getElementById('review-text').value;
  alert(`Thank you, ${reviewerName}! Your review has been submitted: "${reviewText}"`);
});
