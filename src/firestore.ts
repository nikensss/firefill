import { blue as b } from 'chalk';

export const firestore = async (db: FirebaseFirestore.Firestore): Promise<void> => {
  const root = (await db.listCollections()).map((c) => c.id);
  console.log(b(JSON.stringify(root)));
  for (const collection of root) {
    console.log(b(`${collection}: ${await getCollections(db, collection)}`));
  }
};

async function getCollections(db: FirebaseFirestore.Firestore, path: string): Promise<string[]> {
  const documents = await db.collection(path).listDocuments();
  const collections: string[] = [];
  for (const document of documents) {
    if ((await document.listCollections()).length === 0) continue;
    collections.push(document.id);
  }

  return collections;
}
