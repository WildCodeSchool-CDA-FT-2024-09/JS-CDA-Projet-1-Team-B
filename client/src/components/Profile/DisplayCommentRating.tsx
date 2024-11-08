import { useGetUserCommentQuery, useGetUserRatingQuery, User } from "../../generated/graphql-types.ts";
import StarRating from "../NoteGlobale.tsx";

export default function DisplayCommentRating({ user, activeTab }: { user: User, activeTab: string }) {
  const basePosterUrl = "https://image.tmdb.org/t/p/original/"; // Base URL for TMDB posters
  const {
    data: userComment,
    loading: loadingComment,
  } = useGetUserCommentQuery({
    variables: {
      getUserCommentId: parseInt(user?.id as string),
    }, skip: !user && activeTab !== "comments",
  });
  
  const {
    data: userRating,
    loading: loadingRating,
  } = useGetUserRatingQuery({
    variables: {
      getUserRatingId: parseInt(user?.id as string),
    }, skip: !user && activeTab !== "ratings",
  });
  
  
  return (
    <div
      className="overflow-scroll no-scrollbar text-white">{activeTab === "comments" && userComment?.getUserComment &&
      (userComment?.getUserComment?.length > 0 ? userComment?.getUserComment?.map((e, index) =>
          <section
            className={`grid grid-cols-[auto,1fr] gap-4 p-4 ${loadingComment ? "skeleton" : ""}`} key={index}>
            <img
              src={`${basePosterUrl}${e.film.posterPath}`}
              alt={`Film poster of ${e.film.title}`}
              className="w-[80px] h-[100px] object-cover rounded-lg"
            />
            <div className="flex flex-col justify-start space-y-2 text-ellipsis overflow-hidden">
              <h2 className="font-bold">{e.film.title} ({new Date(e.film.releaseDate).getUTCFullYear()}),
                le {new Date(e.created_at).toLocaleDateString("fr-FR")}</h2>
              <p
                className="max-h-16 break-words">{e.content}</p>
            </div>
          </section>) :
        <div className="flex min-h-[50dvh] justify-center align-middle"><span
          className="h-full w-full text-center my-auto">Vous n'avez aucun commentaire pour le moment.</span></div>)}
      {activeTab === "ratings" && userRating?.getUserRating &&
        (userRating?.getUserRating?.length > 0 ? userRating?.getUserRating?.map((e, index) =>
            <section
              className={`grid grid-cols-[auto,1fr] gap-4 p-4 ${loadingRating ? "skeleton" : ""}`} key={index}>
              <img
                src={`${basePosterUrl}${e.film.posterPath}`}
                alt={`Film poster of ${e.film.title}`}
                className="w-[80px] h-[100px] object-cover rounded-lg"
              />
              <div className="flex flex-col justify-start space-y-2 text-ellipsis overflow-hidden">
                <h2 className="font-bold">{e.film.title} ({new Date(e.film.releaseDate).getUTCFullYear()})</h2>
                <StarRating popularity={e.rating * 100} />
              </div>
            </section>) :
          <div className="flex min-h-[50dvh] justify-center align-middle"><span
            className="h-full w-full text-center my-auto">Vous n'avez aucune évaluation pour le moment.</span>
          </div>)}
    </div>
  );
}