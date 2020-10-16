import { extractDatewiseData, logger } from '../utils';
import models from '../data/models';

export async function storePerformances() {
  const { success, rows } = await extractDatewiseData();
  if (!success) {
    logger.error("scraping failed, retrying");
    setTimeout(storePerformances, 300000);
    return;
  }
  const { Performance } = models;
  // eslint-disable-next-line consistent-return
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
