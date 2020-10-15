import { extractDatewiseData } from '../utils';
import models from '../data/models';

export async function storePerformances() {
  const { success, rows } = await extractDatewiseData();
  if (!success) {
    setTimeout(storePerformances, 300000);
    return;
  }
  const { Performance } = models;
  // eslint-disable-next-line consistent-return
  return Performance.bulkCreate(rows).then(() => {
    console.log('performances Added');
    return {
      success: true,
    };
  }).catch(error => {
    console.error(error);
    return {
      success: false
    };
  });
}
