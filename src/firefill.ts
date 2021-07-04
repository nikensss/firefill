import { askForProject } from './actions/askForProject';
import { listProjects } from './actions/list';
import { useProject } from './actions/useProject';

export interface FirefillOptions {
  project: string | undefined;
  list: boolean;
  ask: boolean;
}

export const firefill = async (options: FirefillOptions): Promise<void> => {
  const { project, list, ask } = options;

  if (list) return await listProjects();

  if (ask) return await askForProject();

  await useProject(project);
};
