import { Module } from '../../database';

export async function generateModuleAsync(userId: string) {
  const user = await Module.create({
    module_name: 'test module',
    module_leader_id: userId,
  });

  return user;
}
