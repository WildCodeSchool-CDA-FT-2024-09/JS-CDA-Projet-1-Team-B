import type { CodegenConfig } from "@graphql-codegen/cli";

const { VITE_API_URL } = import.meta.env;

export const config: CodegenConfig = {
  schema: VITE_API_URL,
  documents: ["../schema/*.ts"],
  generates: {
    "../generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
  overwrite: true,
};
