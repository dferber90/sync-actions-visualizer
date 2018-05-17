import * as types from '@commercetools/sync-actions';

export const format = data => JSON.stringify(data, null, 2);

export const parseAndFormat = str => {
  try {
    const parsed = parse(str);
    return format(parsed);
  } catch (e) {
    return str;
  }
};

// Use "eval" instead of JSON.parse so that we don't need the quotes
// Using "eval" is okay here, as this site is static and there is
// nothing to hack.
// eval('({ foo: true })') returns { foo: true }
// eslint-disable-next-line no-eval
export const parse = str => eval('(' + str + ')');

export const exampleDataMap = {
  createSyncProducts: {
    name: { en: 'Party Parrot', de: 'Partypapagei' },
    categories: [{ id: 'category-id-toys', type: 'category' }],
    description: { en: 'Nice hats', de: 'Tolle Hüte' },
    slug: { en: 'party-parrt', de: 'party-papagei' },
    masterVariant: { id: 'variant-1', sku: 'party-parrot-master-sku' },
    variants: [],
  },
};

export const getSyncActions = ({ now, before, type, actionGroups, config }) => {
  if (!types[type]) return { error: `Unknown service "${type}"` };

  // createSyncCategories,
  // createSyncCustomers,
  // createSyncInventories,
  // createSyncOrders,
  // createSyncProducts,
  // createSyncProductTypes,
  // createSyncProductDiscounts,
  // createSyncDiscountCodes,
  // createSyncCustomerGroup,
  // createSyncCartDiscounts,
  try {
    const sync = types[type](actionGroups, config);
    const data = sync.buildActions(now, before);
    return { data };
  } catch (error) {
    // keep this console.error as it helps debug errors in sync-actions
    console.log(error);
    return { error };
  }
};
