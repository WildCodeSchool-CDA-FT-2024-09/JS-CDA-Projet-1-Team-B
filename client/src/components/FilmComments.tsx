import { useFilmCommentsQuery } from "../generated/graphql-types";

interface FilmCommentsProps {
  filmId: number;
}

const FilmComments: React.FC<FilmCommentsProps> = ({ filmId }) => {
  const { loading, error, data } = useFilmCommentsQuery({
    variables: { filmId },
  });

  if (loading) return <p>Chargement des commentaires...</p>;
  if (error)
    return <p>Erreur lors du chargement des commentaires : {error.message}</p>;

  const comments = data?.filmComments;

  if (!comments || comments.length === 0) {
    return <p>Aucun commentaire disponible pour ce film.</p>;
  }
  const baseAvatarPath = "/avatar/";
  return (
    <section className="comments-section space-y-6">
      {comments.map((comment, index) => {
        const avatarPath = `${baseAvatarPath}${comment.user.avatar.image}`;

        return (
          <div
            key={index}
            className="comment flex items-start space-x-4 rounded p-6  border border-bloodRed"
          >
            <img
              src={avatarPath}
              alt={`${comment.user.username}'s avatar`}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `${baseAvatarPath}default.png`;
              }}
            />
            <div className="comment-content flex flex-col space-y-2">
              <p className="username text-xl font-semibold text-white">
                {comment.user.username}
              </p>
              <p className="text-white">{comment.content}</p>
              <p className="text-sm text-white">
                Publié le {new Date(comment.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default FilmComments;
