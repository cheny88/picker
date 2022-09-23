import { isSameWeek, isWeekInRange} from '../utils/dateUtil';
import type {GenerateConfig} from '../generate';
import type {RangeValue, NullableDateType} from '../interface';
import {getValue} from '../utils/miscUtil';

export default function useRowClassName<DateType>({
                                                       rowPrefixCls,
                                                       generateConfig,
                                                       rangedValue,
                                                       locale,
                                                       hoverRangedValue,
                                                       value,
                                                   }: {
    rowPrefixCls: string;
    generateConfig: GenerateConfig<DateType>;
    rangedValue?: RangeValue<DateType>;
    locale;
    hoverRangedValue?: RangeValue<DateType>;
    value?: NullableDateType<DateType>;
}) {
    function getClassName(currentDate: DateType) {
        const rangeStart = getValue(rangedValue, 0);
        const rangeEnd = getValue(rangedValue, 1);

        const hoverStart = getValue(hoverRangedValue, 0);
        const hoverEnd = getValue(hoverRangedValue, 1);

        const isRangeHovered = isWeekInRange(
            generateConfig,
            locale,
            hoverStart,
            hoverEnd,
            currentDate,
        );

        function isRangeStart(date: DateType) {
            return isSameWeek(generateConfig,locale,rangeStart, date);
        }

        function isRangeEnd(date: DateType) {
            return isSameWeek(generateConfig,locale,rangeEnd, date);
        }

        const isHoverStart = isSameWeek(generateConfig,locale,hoverStart, currentDate);
        const isHoverEnd = isSameWeek(generateConfig,locale,hoverEnd, currentDate);
        return {
            //Range
            [`${rowPrefixCls}-in-range`]: isWeekInRange<DateType>(
                generateConfig,
                locale,
                rangeStart,
                rangeEnd,
                currentDate,
            ),
            [`${rowPrefixCls}-range-start`]: isRangeStart(currentDate),
            [`${rowPrefixCls}-range-end`]: isRangeEnd(currentDate),

            // Range Hover
            [`${rowPrefixCls}-range-hover`]: isRangeHovered,
            [`${rowPrefixCls}-range-hover-start`]: isHoverStart,
            [`${rowPrefixCls}-range-hover-end`]: isHoverEnd,

            // Others
            [`${rowPrefixCls}-selected`]: isSameWeek(generateConfig,locale,value, currentDate),
        };
    }

    return getClassName;
}
