function showWaterAnalysis() {
    fetch('/api/water_data')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#water-quality-table tbody');
            tableBody.innerHTML = ''; // Clear existing data

            data.forEach(reading => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${reading.location}</td>
                    <td>${reading.parameter}</td>
                    <td>${reading.value}</td>
                    <td>${reading.timestamp}</td>
                `;
                tableBody.appendChild(row);
            });

            document.getElementById('water-analysis-data').style.display = 'block';
        })
        .catch(error => console.error('Error fetching water data:', error));
}

function showReports() {
    // Implement report generation and display logic here
}

// Fetch pollution sources and display remediation information
$.get('/api/pollution_sources')
    .done(function(data) {
        const remediationList = document.getElementById("remediation-list");
        data.forEach(source => {
            if (source.status === "Remediation Ongoing") {
                const listItem = document.createElement("li");
                listItem.textContent = `Source: ${source.source}, Location: ${source.location}, Type: ${source.type}`;
                remediationList.appendChild(listItem);
            }
        });
    })
    .fail(function() {
        console.error("Error fetching pollution sources.");
    });

// Track Water functionality (Basic example)
function trackWater() {
    const sourceLocation = document.getElementById("source-location").value;
    const mapDiv = document.getElementById("track-and-trace-map");
    mapDiv.style.display = "block";

    // Initialize Leaflet map
    const map = L.map('map').setView([37.7749, -122.4194], 13); // Initial view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add source location marker (example)
    L.marker([37.7749, -122.4194]).addTo(map)
        .bindPopup("Water Source: " + sourceLocation)
        .openPopup();

    // **(Placeholder)**: 
    // - Fetch water flow path data from your backend API based on 
    //   sourceLocation.
    // - Display the path on the map using Leaflet's polylines 
    //   (e.g., L.polyline(pathCoordinates).addTo(map))

    // Example (placeholder):
    const pathCoordinates = [
        [37.7749, -122.4194], 
        [37.7649, -122.4294], 
        [37.7549, -122.4194] 
    ]; 
    L.polyline(pathCoordinates).addTo(map); 
}