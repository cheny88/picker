import * as React from 'react';
import Header from '../Header';
import { GenerateConfig } from '../../generate';
import { YEAR_DECADE_COUNT } from '.';

export interface YearHeaderProps<DateType> {
  prefixCls: string;
  viewDate: DateType;
  value: DateType;
  generateConfig: GenerateConfig<DateType>;

  onPrevDecade: () => void;
  onNextDecade: () => void;
  onDecadeClick: () => void;
}

function YearHeader<DateType>(props: YearHeaderProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    viewDate,
    onPrevDecade,
    onNextDecade,
    onDecadeClick,
  } = props;
  const headerPrefixCls = `${prefixCls}-header`;

  const yearNumber = generateConfig.getYear(viewDate);
  const startYear =
    Math.floor(yearNumber / YEAR_DECADE_COUNT) * YEAR_DECADE_COUNT;
  const endYear = startYear + YEAR_DECADE_COUNT - 1;

  return (
    <Header
      prefixCls={headerPrefixCls}
      onSuperPrev={onPrevDecade}
      onSuperNext={onNextDecade}
    >
      <button type="button" key="year" onClick={onDecadeClick}>
        {startYear}-{endYear}
      </button>
    </Header>
  );
}

export default YearHeader;