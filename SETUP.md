# Getting Started with Development on Mac OS X

## Install Homebrew (Or Update)

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

```
brew update
```

## Install Git

```
brew install git
```

## Install Python

```
brew install python3
```

## Install Yarn

```
brew install yarn --ignore-dependencies
```

## Install NVM

Make sure that you have a .bash_profile file already, the script will write to it

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh | bash
```

## Install Node

We are using node v10.16.3

```
nvm install 10.16.3
```

## Install Node Modules and Global Dependencies

```
yarn
yarn global add nodemon
yarn install
```

## Install Mongo

```
brew install mongodb
export NODE_CONFIG_DIR=[insert local path for help-assist-her/config]
export NODE_ENV='localhost'
```

## Start Mongo

```
mkdir -p ~/.hah/data
```

Make sure you are in the help-assist-her directory

```
yarn startdb
```

## Populate MongoDB

`yarn overwrite-pc-data`

`yarn geocode`

## Start Server

```
yarn start
```

## Run Client

```
yarn run watch
```

# Getting Started with Development on Ubuntu or GalliumOS (Linux for Chromebooks)

## Install Git

`sudo apt-get install git`

## Clone the Repo

`git clone https://github.com/HelpAssistHer/help-assist-her.git`

`cd help-assist-her`

## Install Node

```
sudo apt-get install build-essential checkinstall
sudo apt-get install libssl-dev
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
nvm install 10.16.3
nvm use 10.16.3
nvm alias default node
```

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

Add the following configurations to your bash profile (make sure to change the path appropriately):
`export NODE_CONFIG_DIR=/home/katelynsills/help-assist-her/config`

`export NODE_ENV='localhost'`

## Start MongoDB

`mkdir -p ~/.hah/data`

`yarn startdb`

## Populate MongoDB

`yarn overwrite-pc-data`

`yarn geocode`

## Start Server

In a new tab, run `yarn start`

## Run Client

```
yarn run watch
```

## View website

Go to `http://localhost:4000/` in your browser
