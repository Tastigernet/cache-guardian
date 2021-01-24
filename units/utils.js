// Copyright (c) 2019-2021, Taegus Cromis, The Conceal Developers, Cache
//
// Please see the included LICENSE file for more information.

const UUID = require("pure-uuid");
const shell = require("shelljs");
const path = require("path");
const fs = require("fs");

module.exports = {
  ensureUserDataDir: function () {
    var userDataDir = process.env.APPDATA || (process.platform === "darwin" ? process.env.HOME + "/Library/Application Support" : process.env.HOME + "/.local/share");
    userDataDir = path.join(userDataDir, "cxcheNodeGuard");

    if (!fs.existsSync(userDataDir)) {
      shell.mkdir('-p', userDataDir);
    }

    return userDataDir;
  },
  ensureNodeUniqueId: function () {
    var nodeDataFile = path.join(this.ensureUserDataDir(), "nodedata.json");
    var nodeData = null;

    if (fs.existsSync(nodeDataFile)) {
      nodeData = JSON.parse(fs.readFileSync(nodeDataFile));
      return nodeData.id;
    } else {
      nodeData = {
        id: new UUID(4).format()
      };
      fs.writeFileSync(nodeDataFile, JSON.stringify(nodeData), "utf8");
      return nodeData.id;
    }
  },
  getNodeActualPath: function (cmdOptions, configOpts, rootPath) {
    const daemonPath = cmdOptions.daemon || path.join(rootPath, this.getNodeExecutableName());
    return (configOpts.node.path || daemonPath);
  },
  getNodeExecutableName: function () {
    if (process.platform === "win32") {
      return 'cache-daemon.exe';
    } else {
      return 'cache-daemon';
    }
  },
  getGuardianExecutableName: function () {
    if (process.platform === "win32") {
      return 'guardian-win64.exe';
    } else if (process.platform === "linux") {
      return 'guardian-linux64';
    }
    else {
      return 'guardian-macos64';
    }
  }
};
