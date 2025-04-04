// Replace with your Flask API deployed on Render
const API_URL = "https://your-flask-api-domain.com";

// Function to fetch the last compliment from the backend
async function fetchLastCompliment() {
  try {
    const response = await fetch(`${API_URL}/compliment`);
    if (!response.ok) throw new Error("Network response was not ok");
    const complimentData = await response.json();
    const { name, compliment } = complimentData;
    document.getElementById("compliment-text").innerText = `${name} says: "${compliment}"`;
  } catch (error) {
    console.error("Error fetching compliment: ", error);
    document.getElementById("compliment-text").innerText = "Error loading compliment.";
  }
}

// Function to submit a new compliment to the backend
async function submitCompliment(event) {
  event.preventDefault();
  const name = document.getElementById("name-input").value.trim();
  const compliment = document.getElementById("compliment-input").value.trim();

  if (!name || !compliment) {
    alert("Please fill in both your name and compliment.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/compliment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, compliment })
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    // Refresh the compliment display after submission
    fetchLastCompliment();
    // Clear input fields
    document.getElementById("name-input").value = "";
    document.getElementById("compliment-input").value = "";
  } catch (error) {
    console.error("Error submitting compliment: ", error);
    alert("Failed to send compliment. Please try again.");
  }
}

// Set event listener for compliment form submission
document.getElementById("compliment-form").addEventListener("submit", submitCompliment);

// Fetch the last compliment on page load
fetchLastCompliment();
