export const firestore = async (db: FirebaseFirestore.Firestore): Promise<void> => {
  // get all collections at root level
  const collections = (await db.listCollections()).map((c) => c.id);
  console.log('Reconstructing firestore tree structure...');

  const r: Record<string, Record<string, unknown>> = {};
  for (const collection of collections) {
    r[collection] = await getCollections(db, collection);
  }

  console.log(JSON.stringify(r, null, 2));
};

async function getCollections(
  db: FirebaseFirestore.Firestore,
  path: string
): Promise<Record<string, Record<string, unknown>>> {
  const documents = await db.collection(path).listDocuments();
  const collections: Record<string, Record<string, unknown>> = {};

  for (const document of documents) {
    // register document
    collections[document.id] = collections[document.id] || {};
    // get collections under this document
    const subcollections = await document.listCollections();
    for (const subcollection of subcollections) {
      collections[document.id][subcollection.id] = await getCollections(
        db,
        `${path}/${document.id}/${subcollection.id}`
      );
    }
  }

  return collections;
}
