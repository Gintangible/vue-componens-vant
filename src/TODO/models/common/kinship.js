const KINSHIP_MAP = {
  SELF: {
    name: '本人',
    value: 'SELF',
  },
  PARENT: {
    name: '父母',
    value: 'PARENT',
  },
  CHILD: {
    name: '子女',
    value: 'CHILD',
  },
  SPOUSE: {
    name: '配偶',
    value: 'SPOUSE',
  },
  OTHER: {
    name: '其他',
    value: 'OTHER',
  }
};

const KINSHIPS = Object.values(KINSHIP_MAP);

export function kinshipFilter(kinship) {
  return KINSHIP_MAP[kinship]?.name;
}

export {
  KINSHIPS
};
