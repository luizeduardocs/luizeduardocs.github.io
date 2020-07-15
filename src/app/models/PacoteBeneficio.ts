import { PontuacaoMcc } from './PontuacaoMcc';
import { RangeCashback } from './RangeCashback';
import { RangeCluster } from './RangeCluster';
import { RangeIsencao } from './RangeIsencao';
import { Pontuacao } from './Pontuacao';
import { ListaCortesia } from './ListaCortesia';

export interface PacoteBeneficio {
    id: Number;
    nome: String;

    // MOTOR DE PONTOS
    possui_motor_pontos: Boolean;
    tipo_motor_pontos: Number;
    // PONTOS
    pontuacao_debito: Pontuacao;
    pontuacao_credito: Pontuacao;
    possui_pontuacao_mcc: Boolean;
    lista_pontuacao_mcc: PontuacaoMcc[];
    // CASHBACK
    porcentagem_cashback_debito: Number;
    possui_range_cashback_credito: Boolean;
    porcentagem_cashback_credito: RangeCashback[];
    lancar_cashback_fatura: Boolean;

    // PRICING E ISENÇÃO
    valor_mensalidade: Number;
    possui_isencao_gasto: Boolean;
    possui_isencao_gasto_valor: Boolean;
    lista_isencao_gastos : RangeIsencao[];
    possui_isencao_cluster: Boolean;
    lista_isencao_cluster: RangeCluster[];

    // OUTROS BENEFÍCIOS
    tipo_cashback_online: Number;
    possui_cashback_loja_voucher: Boolean;
    valor_cashback_loja_voucher: Number;
    possui_cortesia: Boolean;
    cortesias: ListaCortesia[];
};

