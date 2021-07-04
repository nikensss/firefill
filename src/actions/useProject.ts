import { red as r, yellow as y } from 'chalk';
import * as admin from 'firebase-admin';
import { firestore } from '../firestore';
import { getActiveGCP, setActiveGCP } from '../gcloud';

export const useProject = async (project?: string): Promise<void> => {
  if (!project) throw new Error('No project ID provided!');

  const gcpStart = await getActiveGCP();
  console.log(y(`GCP at start: ${gcpStart}`));

  try {
    await setActiveGCP(project);

    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });

    const db = admin.firestore();
    await firestore(db);
  } catch (ex) {
    console.log(r(`\n${ex.stack}`));
  } finally {
    if (gcpStart) {
      console.log(y(`\nSetting GCP project back to ${gcpStart}`));
      await setActiveGCP(gcpStart);
      console.log(y(`Reverted back to ${await getActiveGCP()}`));
    }
  }
};
