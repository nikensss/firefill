import { getProjectsList } from '../gcloud';

export const listProjects = async (): Promise<void> => {
  (await getProjectsList()).forEach((p) => console.log(p));
};
