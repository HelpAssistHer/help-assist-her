# Getting Started with Development on Mac OS X

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
We are using versions: node v7.9.0

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
yarn global add body-parser
````

## Install Mongo
````
brew link makedepend
brew install mongodb
export NODE_CONFIG_DIR=[INSERT PATH]
export NODE_ENV='localhost'
````

## Start Mongo
````
mkdir -p ~/.hah/data
mongod --dbpath ~/.hah/data
````

## Start Server
````
npm start
````


# Getting Started with Development on Ubuntu or GalliumOS (Linux for Chromebooks)

## Install Git
`sudo apt-get install git` 

## Clone the Repo
`git clone https://github.com/HelpAssistHer/help-assist-her.git`

`cd help-assist-her`

## Install Node
~~~~
sudo apt-get install build-essential checkinstall
sudo apt-get install libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install 7.9.0
nvm use 7.9.0
nvm alias default node
~~~~

## Install Yarn
`npm install -g yarn`

## Install Node Packages with Yarn
`yarn install` 

`yarn global add nodemon`

## Install MongoDB
`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927`

`echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list`

`sudo apt-get update`

`sudo apt-get install -y mongodb-org`

## Add configs

`export NODE_CONFIG_DIR=/home/katelynsills/help-assist-her/config`

`export NODE_ENV='localhost'`

## Start MongoDB
`mkdir -p ~/.hah/data`

`yarn startdb`

## Populate MongoDB
`yarn data`

`yarn geocode`

## Start Server
In a new tab, run `yarn start`

## Rebuild front-end if necessary
`yarn webpack`

## View website
Go to `http://127.0.0.1:4000/` in your browser