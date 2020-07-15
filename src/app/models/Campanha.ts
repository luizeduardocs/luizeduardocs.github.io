import { Pontuacao } from './Pontuacao';
import { RangeCashback } from './RangeCashback';

export interface Campanha {
    id: Number;
    nome: String;

    tipo_motor_pontos: Number;
    pontuacao_debito: Pontuacao;
    pontuacao_credito: Pontuacao;

    porcentagem_cashback_debito: Number;
    possui_range_cashback_credito: Boolean;
    porcentagem_cashback_credito: RangeCashback[];

    possui_meta_spending: Boolean;
    valor_meta_spendig: Number;
    pontuacao_meta_spending: Number;
    possui_bonus_spending: Boolean;
    valor_bonus_spendig: Number;
    pontuacao_bonus_spending: Number;

    data_inicio: Date;
    data_fim: Date;

    pacotes_beneficios: Number[];
};
