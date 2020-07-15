import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PacoteBeneficio } from 'src/app/models/PacoteBeneficio';
import { Campanha } from 'src/app/models/Campanha';
import { RangeCashback } from 'src/app/models/RangeCashback';
import { RangeIsencao } from 'src/app/models/RangeIsencao';
import { Moeda } from 'src/app/models/Moeda';

@Component({
    selector: 'app-campanhas',
    templateUrl: './campanhas.component.html',
    styleUrls: ['./campanhas.component.scss']
})
export class CampanhasComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    range_cashback_temporario: RangeCashback;
    range_isencao_temporario: RangeIsencao;
    pacote_beneficios_temporario: Number;

    moedas: Moeda[];
    pacotes_beneficios: PacoteBeneficio[];

    campanhas: Campanha[];
    campanhas_ativas: Campanha[];
    campanhas_inativas: Campanha[];

    new_campanha: Campanha = {
        id: 0,
        nome: null,
        tipo_motor_pontos: null,
        pontuacao_debito: { moeda: null, pontuacao: 0 },
        pontuacao_credito: { moeda: null, pontuacao: 0 },
        porcentagem_cashback_debito: 0,
        possui_range_cashback_credito: false,
        porcentagem_cashback_credito: [],

        possui_meta_spending: false,
        valor_meta_spendig: 0,
        pontuacao_meta_spending: 0,
        possui_bonus_spending: false,
        valor_bonus_spendig: 0,
        pontuacao_bonus_spending: 0,

        data_inicio: null,
        data_fim: null,
        pacotes_beneficios: [],
    };

    edit_campanha: Campanha = {
        id: 0,
        nome: null,
        tipo_motor_pontos: null,
        pontuacao_debito: { moeda: null, pontuacao: 0 },
        pontuacao_credito: { moeda: null, pontuacao: 0 },
        porcentagem_cashback_debito: 0,
        possui_range_cashback_credito: false,
        porcentagem_cashback_credito: [],

        possui_meta_spending: false,
        valor_meta_spendig: 0,
        pontuacao_meta_spending: 0,
        possui_bonus_spending: false,
        valor_bonus_spendig: 0,
        pontuacao_bonus_spending: 0,

        data_inicio: null,
        data_fim: null,
        pacotes_beneficios: [],
    };

    tipos_motores_pontos = [
        {
            id: 1, nome: 'Pontos',
        },
        {
            id: 2, nome: 'Cashback'
        }
    ];


    data_atual: Date;

    constructor() { }

    ngOnInit() {
        const data = new Date();
        this.data_atual = new Date();
        if (localStorage.getItem('moedas')) this.moedas = JSON.parse(localStorage.getItem('moedas'));
        if (localStorage.getItem('pacotes_beneficios')) this.pacotes_beneficios = JSON.parse(localStorage.getItem('pacotes_beneficios'));

        this.campanhas = [];
        this.campanhas_ativas = [];
        this.campanhas_inativas = [];
        if (localStorage.getItem('campanhas')) {
            this.campanhas = JSON.parse(localStorage.getItem('campanhas'));

            this.verificarValidadeCampanhas();
        }

    }

    consultarNome = (items, id) => {
        let nome = null;

        items.forEach(item => {
            if (item.id === id) nome = item.nome;
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

    verificarValidadeCampanhas = () => {
        this.campanhas_ativas = [];
        this.campanhas_inativas = [];

        this.campanhas.forEach(campanha => {
            const data_fim = new Date(campanha.data_fim);
            if (data_fim > this.data_atual) {
                this.campanhas_ativas.push(campanha);
            } else {
                this.campanhas_inativas.push(campanha);
            }
        });
    }

    newCampanha = () => {
        this.new_campanha = {
            id: this.campanhas.length ?
            Math.max.apply(0, this.campanhas.map(pacote_beneficio => pacote_beneficio.id)) + 1 : 1,
            nome: null,
            tipo_motor_pontos: null,
            pontuacao_debito: { moeda: null, pontuacao: 0 },
            pontuacao_credito: { moeda: null, pontuacao: 0 },
            porcentagem_cashback_debito: 0,
            possui_range_cashback_credito: false,
            porcentagem_cashback_credito: [],

            possui_meta_spending: false,
            valor_meta_spendig: 0,
            pontuacao_meta_spending: 0,
            possui_bonus_spending: false,
            valor_bonus_spendig: 0,
            pontuacao_bonus_spending: 0,

            data_inicio: null,
            data_fim: null,
            pacotes_beneficios: [],
        }

        this.mudarTipoCashbackCredito(this.new_campanha);
        this.mudarTipoIsencao(this.new_campanha);

        this.range_cashback_temporario = this.limparRangeCashbackTemporario();
        this.range_isencao_temporario = this.limparRangeIsencaoTemporario();

        this.exibir_novo = true;
    }

    editCampanha = (campanha) => {
        this.edit_campanha = { ...campanha };

        this.exibir_editar = true;
    }

    deleteCampanha = (campanha) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão da campanha <br/><strong>" + campanha.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.campanhas.indexOf(campanha);
                this.campanhas.splice(index, 1);
                localStorage.setItem('campanhas', JSON.stringify(this.campanhas));
                this.verificarValidadeCampanhas();

                Swal.fire(
                    'Sucesso!',
                    'Campanha excluída com sucesso!',
                    'success'
                );
            }
        })
    }

    saveCampanha = () => {
        this.campanhas.forEach(campanha => {
            if(campanha.id === this.edit_campanha.id){
                campanha.nome = this.edit_campanha.nome;
                campanha.tipo_motor_pontos = this.edit_campanha.tipo_motor_pontos;
                campanha.pontuacao_debito = this.edit_campanha.pontuacao_debito;
                campanha.pontuacao_credito = this.edit_campanha.pontuacao_credito;
                campanha.porcentagem_cashback_debito = this.edit_campanha.porcentagem_cashback_debito;
                campanha.possui_range_cashback_credito = this.edit_campanha.possui_range_cashback_credito;
                campanha.porcentagem_cashback_credito = this.edit_campanha.porcentagem_cashback_credito;

                campanha.possui_meta_spending = this.edit_campanha.possui_meta_spending;
                campanha.valor_meta_spendig = this.edit_campanha.valor_meta_spendig;
                campanha.pontuacao_meta_spending = this.edit_campanha.pontuacao_meta_spending;
                campanha.possui_bonus_spending = this.edit_campanha.possui_bonus_spending;
                campanha.valor_bonus_spendig = this.edit_campanha.valor_bonus_spendig;
                campanha.pontuacao_bonus_spending = this.edit_campanha.pontuacao_bonus_spending;

                campanha.data_inicio = this.edit_campanha.data_inicio;
                campanha.data_fim = this.edit_campanha.data_fim;
                campanha.pacotes_beneficios = this.edit_campanha.pacotes_beneficios;
            }
        });

        localStorage.setItem('campanhas', JSON.stringify(this.campanhas));
        Swal.fire(
            'Sucesso!',
            'Campanha atualizada com sucesso!',
            'success'
        ).then((result) => {
            this.verificarValidadeCampanhas();
            this.retornarAoInicio();
        });
    }

    showCampanha = (campanha, modal) => {
        this.edit_campanha = { ...campanha };
        modal.show();
    }

    retornarAoInicio = () => {
        this.exibir_novo = false;
        this.exibir_editar = false;
    }

    mudarTipoCashbackCredito = (campanha) => {
        campanha.porcentagem_cashback_credito = [];
        if(!campanha.possui_range_cashback_credito){
            campanha.porcentagem_cashback_credito.push({ valor_minimo: 0, valor_maximo: 0, porcentagem: 0 });
        }
    }

    mudarTipoIsencao = (campanha) => {
        campanha.lista_isencao_gastos = [];
        if(!campanha.possui_isencao_gasto_valor){
            campanha.lista_isencao_gastos.push({ valor_minimo: 0, valor_maximo: 0, porcentagem: 100 });
        }
    }

    limparRangeCashbackTemporario = () => {
        return {
            valor_minimo: null,
            valor_maximo: null,
            porcentagem: 0,
        }
    }

    limparRangeIsencaoTemporario = () => {
        return {
            valor_minimo: null,
            valor_maximo: null,
            porcentagem: 0,
        }
    }

    addCampanha = () => {
        this.campanhas.push(this.new_campanha);
        localStorage.setItem('campanhas', JSON.stringify(this.campanhas));
        Swal.fire(
            'Sucesso!',
            'Campanha cadastrada com sucesso!',
            'success'
        ).then((result) => {
            this.verificarValidadeCampanhas();
            this.retornarAoInicio();
        });
    }

    addRangeCashback = (ranges) => {
        ranges.push({ ...this.range_cashback_temporario });
        this.range_cashback_temporario = this.limparRangeCashbackTemporario();
    }

    deleteRangeCashback = (ranges, range) => {
        let index = ranges.indexOf(range);
        ranges.splice(index, 1);
    }

    deletePacoteBeneficios = (pacotes, pacote) => {
        let index = pacotes.indexOf(pacote);
        pacotes.splice(index, 1);
    }

    addPacoteBeneficios = (pacotes) => {
        pacotes.push(this.pacote_beneficios_temporario);
        this.pacote_beneficios_temporario = null;
    }
}
