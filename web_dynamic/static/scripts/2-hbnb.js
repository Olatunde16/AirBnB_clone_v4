/* eslint-env jquery */ // => (we are using jQuery)
/* Adding a listener that adds/removes amenities in an object */
document.addEventListener('DOMContentLoaded', function () {
    // Request API status
    fetch('http://0.0.0.0:5001/api/v1/status/')
        .then(response => response.json())
        .then(data => {
            const apiStatusElement = document.getElementById('api_status');
            if (data.status === 'OK') {
                apiStatusElement.classList.add('available');
            } else {
                apiStatusElement.classList.remove('available');
            }
        })
        .catch(error => {
            console.error('Error fetching API status:', error);
        });
});
