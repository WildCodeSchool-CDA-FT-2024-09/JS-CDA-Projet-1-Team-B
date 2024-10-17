import { AppDataSource } from "./data-source";

(async () => {
  try {
    await AppDataSource.initialize();

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.startTransaction();

    // Supprimer les anciennes données des tables
    await queryRunner.query("DELETE FROM user_comments");
    await queryRunner.query("DELETE FROM user_favorites");
    await queryRunner.query("DELETE FROM user_rating");
    await queryRunner.query("DELETE FROM film");
    await queryRunner.query("DELETE FROM user");
    await queryRunner.query("DELETE FROM avatar");

    // Réinitialiser les identifiants auto-incrémentés
    await queryRunner.query(
      'DELETE FROM sqlite_sequence WHERE name = "film" OR name = "user" OR name = "user_comments" OR name = "user_favorites" OR name = "user_rating" OR name = "avatar"'
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation de la base de données :",
      error
    );
  } finally {
    await AppDataSource.destroy();
  }
})();
