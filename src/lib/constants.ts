export const COMMITTEES = [
  'Security Council',
  'Economic and Social Council',
  'Historical Crisis',
  'Commission on Crime Prevention and Criminal Justice',
  'Special Political and Decolonization Committee',
  'Human Rights Committee',
  'International Criminal Police Organization',
  'World Health Assembly',
] as const;

export const MIDDLE_SCHOOL_COMMITTEES = [
  'Human Rights Committee',
] as const;

export type Committee = typeof COMMITTEES[number];
export type MiddleSchoolCommittee = typeof MIDDLE_SCHOOL_COMMITTEES[number]; 