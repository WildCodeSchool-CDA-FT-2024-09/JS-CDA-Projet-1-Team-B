export default function StarRating({ popularity }: { popularity: number }) {
  const clampedPopularity = Math.min(Math.max(popularity, 0), 500);
  const starRating = clampedPopularity / 100;

  // Calculate the number of stars based on the clamped popularity
  const fullStars = Math.floor(starRating);
  const halfStar = starRating % 1 >= 0.5;

  //console.log("Clamped Popularity:", clampedPopularity);
  //console.log("Star Rating (out of 5):", starRating);
  //console.log("Full Stars:", fullStars);
  //console.log("Half Star:", halfStar);

  return (
    <div className="rating rating-lg rating-half">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex">
          {/* First half of the star */}
          <input
            type="radio"
            name={`rating-${popularity}`} // Unique name for each rating
            className={`mask mask-star-2 mask-half-1 ${
              index < fullStars || (index === fullStars && halfStar)
                ? "bg-bloodRed"
                : "bg-transparent" // Background for empty stars
            }`}
            checked={index < fullStars || (index === fullStars && halfStar)}
            readOnly
          />
          {/* Second half of the star */}
          <input
            type="radio"
            name={`rating-${popularity}`} // Unique name for each rating
            className={`mask mask-star-2 mask-half-2 ${
              index < fullStars || (index === fullStars && halfStar)
                ? "bg-bloodRed"
                : "bg-transparent" // Background for empty stars
            }`}
            checked={index < fullStars || (index === fullStars && halfStar)}
            readOnly
          />
        </div>
      ))}
    </div>
  );
}
