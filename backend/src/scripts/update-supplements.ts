import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { updateProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import supplements from './supplements.json';

export default async function updateSupplements({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Updating supplements data...');

  for (const supplement of supplements) {
    const { result } = await updateProductCategoriesWorkflow(
      container
    ).run({
      input: {
        selector: {
          id: supplement.id,
        },
        update: {
          is_active: true,
        }
      }
    });

    logger.info(result.map((s) => `Updated supplement: ${s.name}`).join("\n"));
  }

  logger.info('Finished updating supplements data.');
}
