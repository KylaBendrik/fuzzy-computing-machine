module.exports = {
  packagerConfig: {
    icon: "./buildResources/icon.png"
  },
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "caz-payroll_converter"
      }
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: [
        "darwin"
      ]
    },
    {
      name: "@electron-forge/maker-deb",
      config: {}
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {}
    }
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/views/index.html",
              js: "./src/renderer.js",
              name: "main_window"
            }
          ]
        }
      }
    ]
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'KylaBendrik',
          name: 'fuzzy-computing-machine'
        },
        prerelease: true
      }
    }
  ]
}