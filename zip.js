const fs = require("fs");
const { name: themeName } = JSON.parse(
  fs.readFileSync(__dirname + "/package.json")
);

const DirArchiver = require("dir-archiver");

const excludes = [
  themeName + ".zip",
  "node_modules",
  ".git",
  ".gitattributes",
  ".github",
  ".gitignore",
  "package-lock.json",
  "README.md",
];

const archive = new DirArchiver(".", themeName + ".zip", excludes);

// Create the zip file.
archive.createZip();
