import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { updateProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import guides from './guides.json';

export default async function updateGuides({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Updating guides data...');

  for (const guide of guides) {
    const { result } = await updateProductCategoriesWorkflow(
      container
    ).run({
      input: {
        selector: {
          id: guide.id,
        },
        update: {
          is_active: true,
        }
      }
    });

    logger.info(result.map((g) => `Updated guide: ${g.name}`).join("\n"));
  }

  logger.info('Finished updating guides data.');
}
