import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';

export default modelExtend(model, {
  namespace: 'home',
  state: {
    msg: 'test',
  }
});