// import React from "react";
// import { useFilmCommentsQuery } from "../generated/graphql-types"; // Adjust the path if needed

// interface FilmCommentsProps {
//   filmId: number;
// }

// const FilmComments: React.FC<FilmCommentsProps> = ({ filmId }) => {
//   const { loading, error, data } = useFilmCommentsQuery({
//     variables: { filmId },
//   });

//   if (loading) return <p>Loading comments...</p>;
//   if (error) return <p>Error loading comments: {error.message}</p>;

//   const comments = data?.filmComments;

//   if (!comments || comments.length === 0) {
//     return <p>No comments available for this film.</p>;
//   }

//   return (
//     <section className="comments-section space-y-6">
//       {comments.map((comment, index) => (
//         <div
//           key={index}
//           className="comment flex items-start space-x-4 p-4 border border-bloodRed"
//         >
//           <img
//             src={comment.user.avatar.image}
//             alt={`${comment.user.username}'s avatar`}
//             className="w-12 h-12 rounded-full object-cover"
//           />
//           <div className="comment-content flex flex-col space-y-2">
//             <p className="username text-xl font-semibold text-white">
//               {comment.user.username}
//             </p>
//             <p className="text-white">{comment.content}</p>
//             <p className="text-sm text-white">
//               Posted on {new Date(comment.created_at).toLocaleDateString()}
//             </p>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// };

// export default FilmComments;
