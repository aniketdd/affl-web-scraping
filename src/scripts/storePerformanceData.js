import { extractDatewiseData, logger } from '../utils';
import models from '../data/models';

export async function storePerformances() {
  const { success, rows } = await extractDatewiseData('2019-04-15', '2019-04-30');
  if (!success) {
    logger.error('scraping failed, retrying');
    setTimeout(storePerformances, 300000);
    return null;
  }
  const { Performance } = models;
  return Performance.bulkCreate(rows).then(() => {
    logger.info('performances Added');
    return {
      success: true,
    };
  }).catch(error => {
    logger.error(error);
    return {
      success: false
    };
  });
}
