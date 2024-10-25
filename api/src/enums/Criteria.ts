import { registerEnumType } from "type-graphql";

// Enumération des critères de recherche
export enum Criteria {
  Title = "title",
  Actor = "actor",
  Director = "director",
}

// Enregistrement de l'énumération dans GraphQL
registerEnumType(Criteria, {
  name: "Criteria", // Le nom de l'énumération dans le schéma GraphQL
  description: "Les critères de recherche...",
});
