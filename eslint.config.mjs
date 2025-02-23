// import { FlatCompat } from "@eslint/eslintrc";
// import eslintPluginBoundaries from "eslint-plugin-boundaries";
// import checkFile from "eslint-plugin-check-file";
// import eslintPluginN from "eslint-plugin-n";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });
// // Configuration borrowed from:
// // https://www.youtube.com/watch?v=xyxrB2Aa7KE&t=1136s
// // https://www.youtube.com/watch?v=dLRKV-bajS4&t=1639s
// /** @type {import('eslint').Linter.Config[]} */
// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals"),
//   ...compat.extends("next/typexscript"),
//   ...compat.extends("prettier"),
//   {
//     files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
//     //files: ["src/**/*.*"],
//     plugins: {
//       "check-file": checkFile,
//       n: eslintPluginN,
//       boundaries: eslintPluginBoundaries,
//     },
//     processor: "check-file/eslint-processor-check-file",
//     rules: {
//       "prefer-arrow-callback": "error",
//       "prefer-template": "error",
//       semi: "error",
//       quotes: ["error", "double"],
//       "n/no-process-env": "error",
//       "n/no-missing-import": "error",
//       "boundaries/no-unknown": "error",
//       "boundaries/no-unknown-files": "error",
//       "boundaries/element-types": [
//         "error",
//         {
//           default: "disallow",
//           rules: [
//             {
//               from: "[shared]",
//               allow: ["shared"],
//             },
//             {
//               from: ["feature"],
//               allow: [
//                 "shared",
//                 ["feature", { featureName: "${from.featureName" }],
//               ],
//             },
//             {
//               from: ["app", "neverImport"],
//               allow: ["shared", "feature"],
//             },
//             {
//               from: ["app"],
//               allow: [["app", { filename: "*.css" }]],
//             },
//           ],
//         },
//       ],
//       "check-file/filename-naming-convention": [
//         "error",
//         {
//           "**/*.{jsx,tsx}": "KEBAB_CASE",
//           "**/*.{js,ts}": "KEBAB_CASE",
//         },
//         {
//           ignoreMiddleExtensions: true,
//         },
//       ],
//       "check-file/folder-naming-convention": [
//         "error",
//         {
//           "src/**/": "KEBAB_CASE",
//         },
//       ],
//     },
//     settings: {
//       boundaries: {
//         rootDir: __dirname,
//         ignore: ["**/node_modules/**"],
//         include: ["src/**/*"],
//         elements: [
//           {
//             mode: "full",
//             type: "shared",
//             pattern: [
//               "src/components/**/*",
//               "src/providers/**/*",
//               "src/lib/**/*",
//               "src/utils/**/*",
//               "src/db/***",
//               "src/hooks/***",
//               "src/api/**/*",
//               "src/env/**/*",
//             ],
//           },
//           {
//             mode: "full",
//             type: "feature",
//             capture: ["featureName"],
//             pattern: ["src/features/*/**/*"],
//           },
//           {
//             mode: "full",
//             type: "app",
//             capture: ["_", "filename"],
//             pattern: ["src/app/**/*"],
//           },
//           {
//             mode: "full",
//             type: "neverImport",
//             pattern: ["src/*", "src/features/*/**/*"],
//           },
//         ],
//       },
//     },
//   },
// ];
//export default eslintConfig;
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginBoundaries from "eslint-plugin-boundaries";
import checkFilePlugin from "eslint-plugin-check-file";
import nPlugin from "eslint-plugin-n";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "check-file": checkFilePlugin,
      n: nPlugin,
      boundaries: eslintPluginBoundaries,
    },
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "n/no-process-env": ["error"],
      "@typescript-eslint/no-empty-object-type": ["warn"],
      "@typescript-eslint/no-unused-vars": ["error"],
      "react/no-unescaped-entities": ["off"],
      // "check-file/filename-naming-convention": [
      //   "error",
      //   {
      //     "**/*.{ts,tsx,js,jsx}": "kebab-case"
      //   },
      //   {
      //     "ignoreMiddleExtensions": true
      //   }
      // ],
      // "check-file/folder-naming-convention": [
      //   "error",
      //   {
      //     "src/**/": "kebab-case"
      //   }
      // ],
      "boundaries/no-unknown": ["warn"],
      "boundaries/no-unknown-files": ["warn"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "[shared]",
              allow: ["shared"],
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName" }],
              ],
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"],
            },
            {
              from: ["app"],
              allow: [["app", { filename: "*.css" }]],
            },
          ],
        },
      ],
    },
    settings: {
      boundaries: {
        rootDir: __dirname,
        ignore: ["**/node_modules/**"],
        include: ["src/**/*"],
        elements: [
          {
            mode: "full",
            type: "shared",
            pattern: [
              "src/components/**/*",
              "src/providers/**/*",
              "src/lib/**/*",
              "src/utils/**/*",
              "src/db/**/*",
              "src/hooks/**/*",
              "src/api/**/*",
              "src/env/**/*",
              "src/config/**/*",
              "src/types/**/*",
            ],
          },
          {
            mode: "full",
            type: "feature",
            capture: ["featureName"],
            pattern: ["src/features/*/**/*"],
          },
          {
            mode: "full",
            type: "app",
            capture: ["_", "filename"],
            pattern: ["src/app/**/*"],
          },
          {
            mode: "full",
            type: "neverImport",
            pattern: ["src/*", "src/features/*/**/*"],
          },
        ],
      },
    },
  },
];

export default eslintConfig;
