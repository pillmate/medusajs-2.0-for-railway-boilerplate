import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { createProductCategoriesWorkflow } from '@medusajs/medusa/core-flows';
import guides from './guides.json';

export default async function createGuides({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Creating guides data...');

  const { result } = await createProductCategoriesWorkflow(
    container
  ).run({
    input: {
      product_categories: guides.map((guide) => ({
        ...guide,
        parent_category_id: 'pcat_01K82GGZMR3D086ED8YHJNM44Z',
      })),
    }
  });

  logger.info(result.map((g) => `Created guide: ${g.id}`).join("\n"));

  logger.info('Finished creating guides data.');
}
