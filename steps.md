# steps to start a TypeScript project

## step 1 - npm init -y

## step 2 - npm install typescript @types/node --save-dev

## step 3 - npm install lodash (optional)

## step 4 - npx tsc --init [creates the typescript config file]

## step 5 - change TS configuration file

### uncomment below

````"rootDir": "./src",
    "outDir": "./dist",
    ```
````

## step 6 - create root directory / folder (src)

## step 7 - create ts file in src folder

## step 8 - write code in TS file

## step 9 - compile ts file

`npx tsc`

## step 10 - Run JS code in dist folder

` node dist/test.js`

## step 11 - Change the TS configs again (optional) - if you dont want the extra files being generated in dist folder

(comment out sourceMap, declaration, and declarationMap under the “Other Outputs” section)

```
"sourceMap": true,
"declaration": true,
"declarationMap": true,
```

## step 12 - (OPTIONAL): Create a .gitignore (if you are creating a repository)

### write a list of files or folders that you want to ignore

```
node_modules
dist
```

### rule - change TS file, compile and run the JS in dist folder
