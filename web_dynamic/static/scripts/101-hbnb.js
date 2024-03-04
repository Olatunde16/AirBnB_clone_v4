$(document).ready(function(){
    var reviewsVisible = false;

    // Function to fetch and display reviews
    function fetchAndDisplayReviews() {
        // Fetch reviews
        $.ajax({
            type: "GET",
            url: "http://0.0.0.0:5001/api/v1/reviews/",
            success: function(data) {
                // Clear existing reviews
                $('section.reviews').empty();
                
                // Loop through the result and create review elements
                $.each(data, function(index, review) {
                    var reviewElement = '<div class="review">' +
                                            '<p><strong>' + review.place_name + '</strong></p>' +
                                            '<p>' + review.text + '</p>' +
                                        '</div>';
                    $('section.reviews').append(reviewElement);
                });
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    // Initial fetch and display of reviews
    fetchAndDisplayReviews();

    // Function to handle toggle of reviews
    $('#toggle_reviews').click(function(){
        if (reviewsVisible) {
            // Hide reviews
            $('section.reviews').empty();
            $(this).text('show');
            reviewsVisible = false;
        } else {
            // Show reviews
            fetchAndDisplayReviews();
            $(this).text('hide');
            reviewsVisible = true;
        }
    });
});
