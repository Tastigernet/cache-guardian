# Conceal Node Guardian Installation Instructions

## 1. Getting the executables and meeting prerequisites

First you need to download the correct release for your OS. You can find the latest releases [here](https://github.com/ConcealNetwork/conceal-guardian/releases)
Once the executables are donwloaded you simply extract them to directory of your choice.

If you are running o Windows you are fine, you don't need to do anything more in terms of prerequisites. But on linux you need to install "libboost".

On Debiand based system (Debian, Ubuntu, Mint...) you can simply do it like this:

```
sudo apt-get update
sudo apt-get install libboost-all-dev
```

Then you are ready to go.

## 2. Options setup

You can run the Guardian in two ways. You can simply run the executable and it will start and lift up the node daemon and the monitor it. But this way if you restart your computer or kill the seesion, it will not automaticall start again.
In order to persist reboots you need to install it as a system service. Luckily the Guardian make this extremly easy for you. But first we need to configure it. The Guardian has build in interactive setup so its easy to do and you don't need to edit confi.json.

Just run it with ```guardian-linux64.exe --setup``` or on windows simply click in ```setup.bat```. Each OS has the executable of a different name so please use the appropriate on for your OS (I am using the linux one here).
You will get something like this:

![Guardian setup](https://raw.githubusercontent.com/ConcealNetwork/conceal-guardian/master/setup/guardian_setup.jpg)

## 3. Installation as service

As alread said you can install the Guardian as a system service. This is very easy with build in commands. (you can always see the list of all commands with ```guardian-linux64.exe --help```).

The command to install the service is:

```guardian-linux64.exe --service install```

Once the service is installed you can simply run it with:

```guardian-linux64.exe --service start```

To stop the service use the command:

```guardian-linux64.exe --service stop```

And to remove it just use: 

```guardian-linux64.exe --service remove```

To see if the service is running correctly and what happening with it you can use the command:

```guardian-linux64.exe --service statuis```

As I said its very easy and that is all you need to work with Guardian as a system service. The commands are the same for Windows and Linux OS. Take note that on Windows and Linux you need **administrative** rights for working with service commands.

## 4. Updating to the latest node daemon

The Guardian supports two mode of operations:

1. You don't have a daemon (conceald) preinstalled, the Guardian takes care of everything
2. You have the daemon preinstalled and the Guardian monitors that instance

If you have a type 1 of installation you can use the build in updater for the daemon. First make sure that the Guardian service is not running with:

```guardian-linux64.exe --service stop```

Then simply do: 

```guardian-linux64.exe --node update```

The Guardian will download and update the latest stable daemon (conceald).