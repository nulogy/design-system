import * as DL from './DataList'
const {  default: DataListDefault, ...rest } = DL;

export const DataList = {
  DataList: DataListDefault,
  ...rest,
}