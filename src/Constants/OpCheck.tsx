import { TOpCheck, TOpCheckZh } from '../Types/OpCheck';

export const opCheckNameMap: Record<TOpCheckZh, TOpCheck> = {
    動火: 'fire',
    高架: 'scafold',
    侷限空間: 'confined',
    電力: 'electric',
    吊籠: 'cage',
    起重吊掛: 'lift',
    施工架: 'assemble',
    管線拆離: 'pipe',
    開口: 'hole',
    化學: 'chemical',
};

export const opCheckArray: TOpCheckZh[] = [
    '動火',
    '化學',
    '開口',
    '管線拆離',
    '施工架',
    '起重吊掛',
    '吊籠',
    '電力',
    '侷限空間',
    '高架',
];
