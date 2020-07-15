import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ValorPonto } from '../../../models/ValorPonto';
import { PacoteBeneficio } from 'src/app/models/PacoteBeneficio';

@Component({
  selector: 'app-valores-pontos',
  templateUrl: './valores-pontos.component.html',
  styleUrls: ['./valores-pontos.component.scss']
})
export class ValoresPontosComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    pacotes_beneficios: PacoteBeneficio[];
    pacote_beneficios_temporario: Number;
    valores_pontos: ValorPonto[] = [];
    new_valor_pontos: ValorPonto = {
        id: 0,
        valor: null,
        pacotes_beneficios: [],
    };
    edit_valor_pontos: ValorPonto = {
        id: 0,
        valor: null,
        pacotes_beneficios: [],
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('valores_pontos')) {
            this.valores_pontos = JSON.parse(localStorage.getItem('valores_pontos'));
        } else {
            this.valores_pontos = [
                {
                    id: 1,
                    valor: 1,
                    pacotes_beneficios: [],
                },
            ];

            localStorage.setItem('valores_pontos', JSON.stringify(this.valores_pontos));
        }
        this.pacote_beneficios_temporario = null;
        this.pacotes_beneficios = [];
        if (localStorage.getItem('pacotes_beneficios')) {
            this.pacotes_beneficios = JSON.parse(localStorage.getItem('pacotes_beneficios'));
        }
    }

    deleteValorPontos = (valor_pontos) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do valor de pontos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.valores_pontos.indexOf(valor_pontos);
                this.valores_pontos.splice(index, 1);
                localStorage.setItem('valores_pontos', JSON.stringify(this.valores_pontos));
                Swal.fire(
                    'Sucesso!',
                    'Valor de pontos excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newValorPontos = () => {
        this.new_valor_pontos = {
            id: this.valores_pontos.length ? Math.max.apply(0, this.valores_pontos.map(valor_pontos => valor_pontos.id)) + 1 : 1,
            valor: null,
            pacotes_beneficios: [],
        };

        this.exibir_novo = true;
    }

    addValorPontos = () => {
        this.valores_pontos.push(this.new_valor_pontos);
        localStorage.setItem('valores_pontos', JSON.stringify(this.valores_pontos));
        Swal.fire(
            'Sucesso!',
            'Valor de pontos cadastrado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editValorPontos = (valor_pontos) => {
        this.edit_valor_pontos = { ...valor_pontos };

        this.exibir_editar = true;
    }

    saveValorPontos = () => {
        this.valores_pontos.forEach(valor_pontos => {
            if(valor_pontos.id === this.edit_valor_pontos.id){
                valor_pontos.valor = this.edit_valor_pontos.valor;
                valor_pontos.pacotes_beneficios = this.edit_valor_pontos.pacotes_beneficios;
            }
        });

        localStorage.setItem('valores_pontos', JSON.stringify(this.valores_pontos));
        Swal.fire(
            'Sucesso!',
            'Valor de pontos atualizado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    consultarNome = (itens, id) => {
        let nome = null;

        itens.forEach(item => {
            if(item.id === id) nome = item.nome;
        });

        return nome;
    }

    deletePacoteBeneficios = (pacotes, pacote) => {
        let index = pacotes.indexOf(pacote);
        pacotes.splice(index, 1);
    }

    addPacoteBeneficios = (pacotes) => {
        pacotes.push(this.pacote_beneficios_temporario);
        this.pacote_beneficios_temporario = null;
    }

    retornarAoInicio = () => {
        this.exibir_novo = false;
        this.exibir_editar = false;
    }
}
