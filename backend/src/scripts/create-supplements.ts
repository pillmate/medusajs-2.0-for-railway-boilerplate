import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { createProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import supplements from './supplements.json';

export default async function createSupplements({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Creating supplements data...');

  const { result } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: supplements.map((supplement) => ({
        ...supplement,
        parent_category_id: 'pcat_01K82GG2V4J1102JHJK3AMFE4W',
      })),
    }
  });

  logger.info(result.map((s) => `Created supplement: ${s.id}`).join("\n"));

  logger.info('Finished creating supplements data.');
}
