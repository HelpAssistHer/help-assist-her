# Getting Started with Development

## Install Homebrew (Or Update)
````
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
````

````
	brew update
````

## Install Git

````
brew install git
````
## Install Node
We are using versions: node v6.9.4 (npm v3.10.10)

````
brew install node
````

## Install n
````
sudo npm install -g n
````

## Install Yarn

````
npm install -g yarn
````

## Install Node Modules and Global Dependencies
````
yarn
yarn global add jest@v16.0.2
yarn global add nodemon
yarn global add webpack@v2.1.0-beta.25
````

## Install Mongo
````
brew link makedepend
brew install mongodb
````
export NODE_CONFIG_DIR=[INSERT PATH]
export NODE_ENV='localhost'

## Start Mongo
````
mkdir -p ~/.hah/data
mongod --dbpath ~/.hah/data
````

## Start Server
````
npm start
````
