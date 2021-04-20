import { buildQueries, within, isInaccessible, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

interface SelectedItemOptions {
  name?: string | RegExp;
}

function queryAllBySelectedItem(container: HTMLElement, { name }: SelectedItemOptions = {}) {
  return Array.from(container.querySelectorAll<HTMLElement>('.select-selection-item'))
    .filter((element) => !isInaccessible(element))
    .filter((element) => {
      if (name) {
        return typeof name === 'string'
          ? element.textContent === name
          : element.textContent && name.test(element.textContent);
      }

      return true;
    });
}

function getSelectedItemMultipleError(_: HTMLElement, { name }: SelectedItemOptions = {}) {
  let nameHint = '';
  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = ` with the name "${name}"`;
  } else {
    nameHint = ` with the name \`${name}\``;
  }

  return `Found multiple selected item elements${nameHint}`;
}

function getSelectedItemMissingError(_: HTMLElement, { name }: SelectedItemOptions = {}) {
  let nameHint = '';
  if (name === undefined) {
    nameHint = '';
  } else if (typeof name === 'string') {
    nameHint = ` with the name "${name}"`;
  } else {
    nameHint = ` with the name \`${name}\``;
  }

  return `Unable to find a selected item element${nameHint}`;
}

const [
  queryBySelectSelection,
  getAllBySelectSelection,
  getBySelectSelection,
  findAllBySelectSelection,
  findBySelectSelection,
] = buildQueries(queryAllBySelectedItem, getSelectedItemMultipleError, getSelectedItemMissingError);

export {
  queryBySelectSelection,
  getAllBySelectSelection,
  getBySelectSelection,
  findAllBySelectSelection,
  findBySelectSelection,
};

function queryAllBySelectDropdown(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>('.select-dropdown')).filter(
    (element) => !isInaccessible(element)
  );
}

const [
  queryBySelectDropdown,
  getAllBySelectDropdown,
  getBySelectDropdown,
  findAllBySelectDropdown,
  findBySelectDropdown,
] = buildQueries(
  queryAllBySelectDropdown,
  (_: HTMLElement) => 'Found multiple select dropdown elements',
  (_: HTMLElement) => 'Unable to find a select dropdown element'
);

const querySelectDropdown = () => queryBySelectDropdown(document.body);
const getAllSelectDropdown = () => getAllBySelectDropdown(document.body);
const getSelectDropdown = () => getBySelectDropdown(document.body);
const findAllSelectDropdown = () => findAllBySelectDropdown(document.body, undefined);
const findSelectDropdown = () => findBySelectDropdown(document.body, undefined);

export {
  querySelectDropdown,
  getAllSelectDropdown,
  getSelectDropdown,
  findAllSelectDropdown,
  findSelectDropdown,
};

export function selectOption(container: HTMLElement, name: string | RegExp) {
  userEvent.click(within(container).getByRole('combobox'));
  userEvent.click(getByText(getSelectDropdown(), name));
}
