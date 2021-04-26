import { Chance } from 'chance';

const chance = new Chance();

export function mockUserEmail() {
  return chance.email();
}

export function mockUserPassword() {
  return chance.string({ alpha: true, numeric: true, symbols: true, length: 16 });
}

export function mockAuthToken() {
  return chance.string({ alpha: true, numeric: true, length: 50 });
}
