import { ColumnTypes, TaskTypes, ColumnDataTypes } from './interfaces';

export function arrayToObject<T extends ColumnTypes | TaskTypes>(
  columns: Array<T>
): { [x: string]: T } {
  return columns.map((column) => ({ [column.id]: column })).reduce((a, b) => ({ ...a, ...b }), {});
}

export function objectToArray<T extends ColumnDataTypes>(object: T | undefined) {
  return (
    (object &&
      Object.keys(object)
        .map((item) => object[item])
        .sort((a, b) => a.order - b.order)) ||
    []
  );
}

export function reassignOrder<T extends ColumnTypes | TaskTypes>(list: Array<T>): Array<T> {
  return list.map((item, index) => {
    const copyItem = { ...item };
    copyItem.order = index;
    return copyItem;
  });
}

export function reorder<T extends ColumnTypes | TaskTypes>(
  list: Array<T>,
  startIndex: number,
  endIndex: number
): Array<T> {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return reassignOrder(result);
}

export function constructSortedArray(columns: ColumnTypes[], ...additions: ColumnTypes[]) {
  return columns.concat(additions).sort((a, b) => a.order - b.order);
}
