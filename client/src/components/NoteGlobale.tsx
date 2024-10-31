export default function StarRating({ popularity }: { popularity: number }) {
  // Ensure the popularity is within the 0-500 range
  const clampedPopularity = Math.min(Math.max(popularity, 0), 500);
  const starRating = clampedPopularity / 100;

  // Calculate the number of full and half stars
  const fullStars = Math.floor(starRating);
  const halfStar = starRating % 1 >= 0.5;

  return (
    <div className="rating rating-lg rating-half">
      {[...Array(5)].map((_, index) => (
        <>
          {/* First half of the star */}
          <input
            key={`${index}-half-1`}
            type="radio"
            name={`rating-${popularity}`}
            className={`mask mask-star-2 mask-half-1 ${
              index < fullStars || (index === fullStars && halfStar)
                ? "bg-bloodRed"
                : "bg-bloodRed bg-opacity-20"
            }`}
            checked={index < fullStars || (index === fullStars && halfStar)}
            readOnly
          />
          {/* Second half of the star */}
          <input
            key={`${index}-half-2`}
            type="radio"
            name={`rating-${popularity}`}
            className={`mask mask-star-2 mask-half-2 ${
              index < fullStars ? "bg-bloodRed" : "bg-bloodRed bg-opacity-20"
            }`}
            checked={index < fullStars}
            readOnly
          />
        </>
      ))}
    </div>
  );
}
