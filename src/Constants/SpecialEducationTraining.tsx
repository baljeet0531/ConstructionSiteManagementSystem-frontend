import { TItem } from '../Types/SpecialEducationTraining';

export const Items: TItem[] = [
    '缺氧作業',
    '有機溶劑',
    '高空車作業',
    '電銲作業',
];
export const ItemsOptions = Items.map((item, index) => (
    <option key={index} value={item}>
        {item}
    </option>
));
