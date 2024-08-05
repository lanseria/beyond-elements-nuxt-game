module.exports = {
  apps: [
    {
      name: 'DataMapCollectionNuxtApp',
      port: '19996',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}
