import { configNamespace } from '@intentjs/core';

export default configNamespace('settings', () => ({
  user: {
    status: {
      ACTIVE: 1,
      INACTIVE: 2,
    },
    statusMap: {
      1: 'ACTIVE',
      2: 'INACTIVE',
    }
  },
  blog: {
    status: {
      ACTIVE: 1,
      INACTIVE: 2,
    },
    statusMap: {
      1: 'ACTIVE',
      2: 'INACTIVE',
    }
  }
}));
