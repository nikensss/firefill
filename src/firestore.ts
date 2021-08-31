import { nora } from './nora';

export interface FirestoreCoffee {
  origins: CoffeeOrigin[];
}

export interface CoffeeOrigin {
  label: string;
  value: string;
  weight: Weight;
  price: Price;
}

export interface Weight {
  amount: number;
  unit: string;
}

export interface Price {
  amount: number;
  unit: string;
}

export const firestore = async (db: FirebaseFirestore.Firestore): Promise<void> => {
  const spinner = nora('Running update operation...');

  try {
    await addPricesToCoffeeOrigins(db);
    spinner.succeed('Update operation finished!');
  } catch (ex) {
    spinner.fail('Update operation failed!');
    console.error(`Caught exception: ${ex.message}`);
  }
};

// function addPricesToCoffeeOrigins(db: FirebaseFirestore.Firestore) {
//   const coffeeDoc = db.collection('general').doc('coffee');
//   const { origins } = (await coffeeDoc.get()).data();
// }

async function addPricesToCoffeeOrigins(db: FirebaseFirestore.Firestore) {
  const coffeeDoc = db.collection('general').doc('coffee');
  const coffee = (await coffeeDoc.get()).data() as FirestoreCoffee;

  if (!coffee) throw new Error('No coffee data!');

  const { origins } = coffee;
  const withPrices = origins.reduce((result, current) => {
    const {
      label,
      weight: { amount, unit }
    } = current;
    result.push({
      ...current,
      value: `${label}-${amount}${unit}`.toLowerCase()
    });

    return result;
  }, [] as FirestoreCoffee['origins']);

  await coffeeDoc.set({ origins: withPrices }, { merge: true });
}
