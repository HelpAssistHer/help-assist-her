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

## Install Python
````
brew install python3
````

## Install Yarn
````
brew install yarn --without-node
````

## Install NVM

````
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
````

## Install Node
We are using node v9.0.0

````
nvm install 9.0.0
````

## Install Node Modules and Global Dependencies
````
yarn
yarn global add nodemon
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
nvm install 9.0.0
nvm use 9.0.0
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