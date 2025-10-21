import { ExecArgs } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';
import { createProductsWorkflow } from '@medusajs/medusa/core-flows';
import products from './products.json';

const DEFAULT_SALES_CHANNEL_ID = 'sc_01K7R4587VPHZKPV6365T3XV9F';

export default async function createProducts({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info('Creating products...');

  const { result } = await createProductsWorkflow(
    container
  ).run({
    input: {
      products: products.map((product) => ({
        ...product,
        status: 'published',
        options: [{
          title: 'Size',
          values: ['Default']
        }],
        sales_channels: [{ id: DEFAULT_SALES_CHANNEL_ID }],
      }))
    },
  });

  logger.info(result.map((product) => `Created product: ${product.title}`).join("\n"));

  logger.info('Finished creating products.');
}
