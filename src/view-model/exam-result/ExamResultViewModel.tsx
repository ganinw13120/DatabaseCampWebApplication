import React from 'react';
import IProfileViewModel from './IExamResultViewModel';
import BaseView from '@view/BaseView';
import { FormInstance } from 'antd/es/form';

import { ExamResult } from '@model/Learning';

export default class ActivityViewModel implements IProfileViewModel {
  private baseView?: BaseView;
  public formRef?: React.RefObject<FormInstance<any>>;
  public data : ExamResult | null;

  constructor () {
    this.data = null;
    this.formRef = React.createRef<FormInstance>();
  }

  public attachView = async (baseView: BaseView): Promise<any> => {
    this.baseView = baseView;
    const search = baseView.props.location.search
    const exam_id = new URLSearchParams(search).get('id');
    if (!exam_id) baseView.props.history.push('/examination');
    baseView?.props.appStore?.setPercent(40)
    const res = await baseView?.props.examinationStore.FetchResult(exam_id)
    this.baseView?.props.appStore?.setPercent(100)
    this.data = res;
    this.baseView?.onViewModelChanged();
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

}
