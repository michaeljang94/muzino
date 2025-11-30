# muzino

Muzino is a frontend app for the online gaming platform.

# Requirements

### NodeJS

#### Ubuntu

```
sudo apt update
sudo apt install nodejs npm
```

### Yarn

```
npm install --global yarn
```

### Nvm

https://github.com/nvm-sh/nvm

Nvm is used to define versions in this project. 

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

# Development

## Bootstrap
```
nvm use
yarn install
yarn start
```

# Testing


# Deployment

`gh-pages` is used to deploy the react application to GitHub pages. Once the code is committed to the repo, the deploy script must be run as the page is hosted on the `gh-pages` branch.

```
yarn run deploy
```