module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  semi: false,
  plugins: [
    require.resolve('prettier-plugin-tailwindcss'),
    require.resolve('@trivago/prettier-plugin-sort-imports'),
  ],
  tailwindAttributes: ['className'],
  importOrder: [
    '^react$',
    '^react-dom$',
    '<THIRD_PARTY_MODULES>',
    '^(components|containers|screens)/',
    '^(hooks|utils|services|api|store|data)/',
    '^(types|interfaces|constants|config)/',
    '^(assets|styles)/',
    '^[./]',
  ],
  importOrderSortSpecifiers: true,
}
