import { prompt } from 'inquirer';
import { getProjectsList } from '../gcloud';
import { useProject } from './useProject';

export const askForProject = async (): Promise<void> => {
  const selectedProject = await promptUser();
  if (!selectedProject) throw new Error('No project selected!');
  return await useProject(selectedProject);
};

const promptUser = async (): Promise<string> => {
  const { project } = await prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Available projects:',
      choices: await getProjectsList()
    }
  ]);

  if (typeof project !== 'string') throw new Error(`Invalid project: ${project}`);

  return project;
};
