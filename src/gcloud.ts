import { yellow as y } from 'chalk';
import * as child_process from 'child_process';
import { promisify } from 'util';

const exec = promisify(child_process.exec);

export async function getProjectsList(): Promise<string[]> {
  const { stdout } = await exec('gcloud projects list');
  return stdout
    .split('\n') // separate lines
    .map((l) => l.split(' ').shift() || '') // separate columns
    .filter((e) => e) // make sure it is truthy
    .slice(1); // remove the title row
}
export async function isProjectAvailable(project: string): Promise<boolean> {
  const projects = await getProjectsList();
  return projects.includes(project);
}

export async function getActiveGCP(): Promise<string> {
  const { stdout } = await exec('gcloud config get-value project');
  return stdout.replace(/[^a-zA-Z0-9- ]/g, '');
}

export async function setActiveGCP(project: string): Promise<void> {
  if (!isProjectAvailable(project)) {
    throw new Error(`Project [${project}] not available. Is the id correct?`);
  }

  console.log(y('Changing project'));
  const { stderr } = await exec(`gcloud config set project ${project}`);
  const error = `You do not appear to have access to project [${project}] or it does not exist`;
  if (stderr.includes(error)) throw new Error(error);

  const gcp = await getActiveGCP();
  if (gcp !== project) throw new Error('Project could not be changed!');
  console.log(y(`Changed to ${gcp}`));
}
