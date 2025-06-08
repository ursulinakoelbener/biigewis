export function prepareBevoelkerungData(data) {
  return data.map(entry => ({
    label: entry.INDIKATOR_JAHR.toString(),
    value: entry.INDIKATOR_VALUE,
    bezirk: entry.BEZIRK,
  }));
}
