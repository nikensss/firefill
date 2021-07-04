
# firefill

Easily interact with the firestore database of any GCP you have access to.

Set the project directly from the CLI, or select one from the list of available projects.

# Disclaimer

The `gcloud` CLI must be installed in order for this project to work. For more information: [gcloud](https://cloud.google.com/sdk/gcloud)
## Installation 

To install `firefill`, first clone the repo, install the dependencies, and then make it available globally as a `bash` command by running `npm i -g` from the repo's folder.

```bash 
  git clone [...]
  cd [...]
  npm i
  npm i -g
```

The last command will enable a new command-line command: `firefill`.
## Usage

Once installed, modify `src/firestore.ts` to interact with firestore. That functions receives one input argument: a `firestore` instance.

Then, you can either do:
```bash
npm run start -- --project project-name
```
or
```bash
npm run build # will automatically install it as "firefill"
firefill --project project-name
```
## API Reference

#### List available projects

```bash
  firefill -l
  firefill --list
```

It will output something like:

```bash
firefill --list # or "npm run start -- --list"
project1
project2
[...]
projectN
```
#### Ask for project

```bash
  firefill -a
  firefill --ask
```

It will prompt you to choose one project from the projects you have access to.
Use the arrow keys to move up and down, and hit enter to select a project.

#### Use a specific project

```bash
  firefill -p project-name
  firefill --project project-name
```

`firefill` will automatically set the `gcloud` project to the given one, and if you have access to it, it will run the `firestore.ts` script.
If you don't have access to the project, or the project doesn't exist, it will run nothing and switch your `gcloud` project to the one that was set before starting this program.
