import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PacoteBeneficio } from '../../../models/PacoteBeneficio';
import { Mcc } from 'src/app/models/Mcc';
import { Moeda } from 'src/app/models/Moeda';
import { Cortesia } from 'src/app/models/Cortesia';
import { Cluster } from 'src/app/models/Cluster';
import { RangeCashback } from 'src/app/models/RangeCashback';
import { RangeIsencao } from 'src/app/models/RangeIsencao';
import { ListaCortesia } from 'src/app/models/ListaCortesia';
import { PontuacaoMcc } from 'src/app/models/PontuacaoMcc';
import { RangeCluster } from 'src/app/models/RangeCluster';

@Component({
    selector: 'app-pacotes-beneficios',
    templateUrl: './pacotes-beneficios.component.html',
    styleUrls: ['./pacotes-beneficios.component.scss']
})
export class PacotesBeneficiosComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    mccs: Mcc[];
    moedas: Moeda[];
    cortesias: Cortesia[];
    clusters: Cluster[];
    range_cashback_temporario: RangeCashback;
    range_isencao_temporario: RangeIsencao;
    pontuacao_mcc_temporario: PontuacaoMcc;
    isencao_clustes_temporario: RangeCluster;
    cortesia_temporaria: ListaCortesia;

    tipos_motores_pontos = [
        {
            id: 1, nome: 'Pontos',
        },
        {
            id: 2, nome: 'Cashback'
        }
    ];

    tipos_cashback_online = [
        {
            id: 1, nome: 'Turbo',
        },
        {
            id: 2, nome: 'Light'
        }
    ];

    tipos_inclusao = [
        {
            id: 1, nome: 'Incluso',
        },
        {
            id: 2, nome: 'Selecionável'
        }
    ];

    pacotes_beneficios: PacoteBeneficio[] = [];
    new_pacote_beneficio: PacoteBeneficio = {
        id: 0,
        nome: null,
        possui_motor_pontos: false,
        tipo_motor_pontos: null,
        pontuacao_debito: { moeda: null, pontuacao: 0 },
        pontuacao_credito: { moeda: null, pontuacao: 0 },
        possui_pontuacao_mcc: false,
        lista_pontuacao_mcc: [],
        porcentagem_cashback_debito: 0,
        possui_range_cashback_credito: false,
        porcentagem_cashback_credito: [],
        lancar_cashback_fatura: false,
        valor_mensalidade: 0,
        possui_isencao_gasto: false,
        possui_isencao_gasto_valor: false,
        lista_isencao_gastos : [],
        possui_isencao_cluster: false,
        lista_isencao_cluster: [],
        tipo_cashback_online: null,
        possui_cashback_loja_voucher: false,
        valor_cashback_loja_voucher: 0,
        possui_cortesia: false,
        cortesias: [],
    };

    edit_pacote_beneficio: PacoteBeneficio = {
        id: 0,
        nome: null,
        possui_motor_pontos: false,
        tipo_motor_pontos: null,
        pontuacao_debito: { moeda: null, pontuacao: 0 },
        pontuacao_credito: { moeda: null, pontuacao: 0 },
        possui_pontuacao_mcc: false,
        lista_pontuacao_mcc: [],
        porcentagem_cashback_debito: 0,
        possui_range_cashback_credito: false,
        porcentagem_cashback_credito: [],
        lancar_cashback_fatura: false,
        valor_mensalidade: 0,
        possui_isencao_gasto: false,
        possui_isencao_gasto_valor: false,
        lista_isencao_gastos : [],
        possui_isencao_cluster: false,
        lista_isencao_cluster: [],
        tipo_cashback_online: null,
        possui_cashback_loja_voucher: false,
        valor_cashback_loja_voucher: 0,
        possui_cortesia: false,
        cortesias: [],
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('pacotes_beneficios')) {
            this.pacotes_beneficios = JSON.parse(localStorage.getItem('pacotes_beneficios'));
        }

        if (localStorage.getItem('mccs')) this.mccs = JSON.parse(localStorage.getItem('mccs'));
        if (localStorage.getItem('moedas')) this.moedas = JSON.parse(localStorage.getItem('moedas'));
        if (localStorage.getItem('cortesias')) this.cortesias = JSON.parse(localStorage.getItem('cortesias'));
        if (localStorage.getItem('clusters')) this.clusters = JSON.parse(localStorage.getItem('clusters'));
    }

    deletePacoteBeneficio = (pacote_beneficio) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do Pacote de Benefícios <br/><strong>" + pacote_beneficio.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.pacotes_beneficios.indexOf(pacote_beneficio);
                this.pacotes_beneficios.splice(index, 1);
                localStorage.setItem('pacotes_beneficios', JSON.stringify(this.pacotes_beneficios));
                Swal.fire(
                    'Sucesso!',
                    'Pacote de Benefícios excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newPacoteBeneficio = () => {
        this.new_pacote_beneficio = {
            id: this.pacotes_beneficios.length ?
            Math.max.apply(0, this.pacotes_beneficios.map(pacote_beneficio => pacote_beneficio.id)) + 1 : 1,
            nome: null,
            possui_motor_pontos: false,
            tipo_motor_pontos: null,
            pontuacao_debito: { moeda: null, pontuacao: 0 },
            pontuacao_credito: { moeda: null, pontuacao: 0 },
            possui_pontuacao_mcc: false,
            lista_pontuacao_mcc: [],
            porcentagem_cashback_debito: 0,
            possui_range_cashback_credito: false,
            porcentagem_cashback_credito: [],
            lancar_cashback_fatura: false,
            valor_mensalidade: 0,
            possui_isencao_gasto: false,
            possui_isencao_gasto_valor: false,
            lista_isencao_gastos : [],
            possui_isencao_cluster: false,
            lista_isencao_cluster: [],
            tipo_cashback_online: null,
            possui_cashback_loja_voucher: false,
            valor_cashback_loja_voucher: 0,
            possui_cortesia: false,
            cortesias: [],
        }

        this.mudarTipoCashbackCredito(this.new_pacote_beneficio);
        this.mudarTipoIsencao(this.new_pacote_beneficio);

        this.range_cashback_temporario = this.limparRangeCashbackTemporario();
        this.range_isencao_temporario = this.limparRangeIsencaoTemporario();
        this.cortesia_temporaria = { cortesia:null, tipo_inclusao: null };
        this.pontuacao_mcc_temporario = { mcc:null, moeda: null, pontuacao: null };
        this.isencao_clustes_temporario = { cluster:null, porcentagem: null };

        this.exibir_novo = true;
    }

    addPacoteBeneficio = () => {
        this.pacotes_beneficios.push(this.new_pacote_beneficio);
        localStorage.setItem('pacotes_beneficios', JSON.stringify(this.pacotes_beneficios));
        Swal.fire(
            'Sucesso!',
            'Pacote de Benefícios cadastrado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editPacoteBeneficio = (pacote_beneficio) => {
        this.edit_pacote_beneficio = { ...pacote_beneficio };

        this.range_cashback_temporario = this.limparRangeCashbackTemporario();
        this.range_isencao_temporario = this.limparRangeIsencaoTemporario();
        this.cortesia_temporaria = { cortesia:null, tipo_inclusao: null };

        this.exibir_editar = true;
    }

    showPacoteBeneficio = (pacote_beneficio, modal) => {
        this.edit_pacote_beneficio = { ...pacote_beneficio };
        modal.show();
    }

    savePacoteBeneficio = () => {
        this.pacotes_beneficios.forEach(pacote_beneficio => {
            if(pacote_beneficio.id === this.edit_pacote_beneficio.id){
                pacote_beneficio.nome = this.edit_pacote_beneficio.nome;
                // MOTOR DE PONTOS
                pacote_beneficio.possui_motor_pontos  = this.edit_pacote_beneficio.possui_motor_pontos;
                pacote_beneficio.tipo_motor_pontos  = this.edit_pacote_beneficio.tipo_motor_pontos;
                // PONTOS
                pacote_beneficio.pontuacao_debito  = this.edit_pacote_beneficio.pontuacao_debito;
                pacote_beneficio.pontuacao_credito  = this.edit_pacote_beneficio.pontuacao_credito;
                pacote_beneficio.possui_pontuacao_mcc  = this.edit_pacote_beneficio.possui_pontuacao_mcc;
                pacote_beneficio.lista_pontuacao_mcc  = this.edit_pacote_beneficio.lista_pontuacao_mcc;
                // CASHBACK
                pacote_beneficio.porcentagem_cashback_debito  = this.edit_pacote_beneficio.porcentagem_cashback_debito;
                pacote_beneficio.possui_range_cashback_credito = this.edit_pacote_beneficio.possui_range_cashback_credito;
                pacote_beneficio.porcentagem_cashback_credito  = this.edit_pacote_beneficio.porcentagem_cashback_credito;
                pacote_beneficio.lancar_cashback_fatura  = this.edit_pacote_beneficio.lancar_cashback_fatura;

                // PRICING E ISENÇÃO
                pacote_beneficio.valor_mensalidade  = this.edit_pacote_beneficio.valor_mensalidade;
                pacote_beneficio.possui_isencao_gasto  = this.edit_pacote_beneficio.possui_isencao_gasto;
                pacote_beneficio.lista_isencao_gastos   = this.edit_pacote_beneficio.lista_isencao_gastos;
                pacote_beneficio.possui_isencao_cluster  = this.edit_pacote_beneficio.possui_isencao_cluster;
                pacote_beneficio.lista_isencao_cluster  = this.edit_pacote_beneficio.lista_isencao_cluster;

                // OUTROS BENEFÍCIOS
                pacote_beneficio.tipo_cashback_online  = this.edit_pacote_beneficio.tipo_cashback_online;
                pacote_beneficio.possui_cashback_loja_voucher  = this.edit_pacote_beneficio.possui_cashback_loja_voucher;
                pacote_beneficio.valor_cashback_loja_voucher  = this.edit_pacote_beneficio.valor_cashback_loja_voucher;
                pacote_beneficio.possui_cortesia  = this.edit_pacote_beneficio.possui_cortesia;
                pacote_beneficio.cortesias  = this.edit_pacote_beneficio.cortesias;
            }
        });

        localStorage.setItem('pacotes_beneficios', JSON.stringify(this.pacotes_beneficios));
        Swal.fire(
            'Sucesso!',
            'Pacote de Benefícios atualizado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    consultarNome = (items, id) => {
        let nome = null;

        items.forEach(item => {
            if(item.id === id) nome = item.nome;
        });

        return nome;
    }

    consultarSigla = (items, id) => {
        let sigla = null;

        items.forEach(item => {
            if(item.id == id) sigla = item.sigla;
        });

        return sigla;
    }

    mudarTipoCashbackCredito = (pacote_beneficio) => {
        pacote_beneficio.porcentagem_cashback_credito = [];
        if(!pacote_beneficio.possui_range_cashback_credito){
            pacote_beneficio.porcentagem_cashback_credito.push({ valor_minimo: 0, valor_maximo: 0, porcentagem: 0 });
        }
    }

    deleteRangeCashback = (ranges, range) => {
        let index = ranges.indexOf(range);
        ranges.splice(index, 1);
    }

    addRangeCashback = (ranges) => {
        ranges.push({ ...this.range_cashback_temporario });
        this.range_cashback_temporario = this.limparRangeCashbackTemporario();
    }

    limparRangeCashbackTemporario = () => {
        return {
            valor_minimo: null,
            valor_maximo: null,
            porcentagem: 0,
        }
    }

    mudarTipoIsencao = (pacote_beneficio) => {
        pacote_beneficio.lista_isencao_gastos = [];
        if(!pacote_beneficio.possui_isencao_gasto_valor){
            pacote_beneficio.lista_isencao_gastos.push({ valor_minimo: 0, valor_maximo: 0, porcentagem: 100 });
        }
    }

    deleteRangeIsencao = (ranges, range) => {
        let index = ranges.indexOf(range);
        ranges.splice(index, 1);
    }

    addRangeIsencao = (ranges) => {
        ranges.push({ ...this.range_isencao_temporario });
        this.range_isencao_temporario = this.limparRangeIsencaoTemporario();
    }

    limparRangeIsencaoTemporario = () => {
        return {
            valor_minimo: null,
            valor_maximo: null,
            porcentagem: 0,
        }
    }

    deleteCortesia = (cortesias, cortesia) => {
        let index = cortesias.indexOf(cortesia);
        cortesias.splice(index, 1);
    }

    addCortesia = (cortesias) => {
        let encontrado = false;
        if(cortesias.length){
            cortesias.forEach(cortesia => {
                if(cortesia.cortesia === this.cortesia_temporaria.cortesia){
                    encontrado = true;
                }
            });
        }

        if(!encontrado){
            cortesias.push({ ...this.cortesia_temporaria });
        }

        this.cortesia_temporaria = { cortesia:null, tipo_inclusao: null };
    }

    deletePontuacaoMcc = (mccs, mcc) => {
        let index = mccs.indexOf(mcc);
        mccs.splice(index, 1);
    }

    addPontuacaoMcc = (mccs) => {
        let encontrado = false;
        if(mccs.length){
            mccs.forEach(mcc => {
                if(mcc.mcc === this.pontuacao_mcc_temporario.mcc){
                    encontrado = true;
                }
            });
        }

        if(!encontrado){
            mccs.push({ ...this.pontuacao_mcc_temporario });
        }

        this.pontuacao_mcc_temporario = { mcc:null, moeda: null, pontuacao: null };
    }

    deleteIsencaoCluster = (clusters, cluster) => {
        let index = clusters.indexOf(cluster);
        clusters.splice(index, 1);
    }

    addIsencaoCluster = (clusters) => {
        let encontrado = false;
        if(clusters.length){
            clusters.forEach(cluster => {
                if(cluster.cluster === this.isencao_clustes_temporario.cluster){
                    encontrado = true;
                }
            });
        }

        if(!encontrado){
            clusters.push({ ...this.isencao_clustes_temporario });
        }

        this.isencao_clustes_temporario = { cluster:null, porcentagem: null };
    }

    retornarAoInicio = () => {
        this.exibir_novo = false;
        this.exibir_editar = false;
    }
}
