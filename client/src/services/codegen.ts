import type { CodegenConfig } from "@graphql-codegen/cli";

// const { VITE_GRAPHQL_API_URL } = import.meta.env;

export const config: CodegenConfig = {
  schema: "http://localhost:4000",
  documents: ["src/**/*.ts", "src/**/*.tsx"],
  generates: {
    "src/generated/graphql-types.ts": {
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

export default config;
