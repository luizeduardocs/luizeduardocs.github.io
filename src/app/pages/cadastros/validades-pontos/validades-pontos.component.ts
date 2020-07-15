import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ValidadePonto } from '../../../models/ValidadePonto';
import { PacoteBeneficio } from 'src/app/models/PacoteBeneficio';

@Component({
  selector: 'app-validades-pontos',
  templateUrl: './validades-pontos.component.html',
  styleUrls: ['./validades-pontos.component.scss']
})
export class ValidadesPontosComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    pacotes_beneficios: PacoteBeneficio[];
    pacote_beneficios_temporario: Number;
    validades_pontos: ValidadePonto[] = [];
    new_validade_pontos: ValidadePonto = {
        id: 0,
        validade: null,
        pacotes_beneficios: [],
    };
    edit_validade_pontos: ValidadePonto = {
        id: 0,
        validade: null,
        pacotes_beneficios: [],
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('validades_pontos')) {
            this.validades_pontos = JSON.parse(localStorage.getItem('validades_pontos'));
        } else {
            this.validades_pontos = [
                {
                    id: 1,
                    validade: 1,
                    pacotes_beneficios: [],
                },
            ];

            localStorage.setItem('validades_pontos', JSON.stringify(this.validades_pontos));
        }
        this.pacote_beneficios_temporario = null;
        this.pacotes_beneficios = [];
        if (localStorage.getItem('pacotes_beneficios')) {
            this.pacotes_beneficios = JSON.parse(localStorage.getItem('pacotes_beneficios'));
        }
    }

    deleteValidadePontos = (validade_pontos) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do validade de pontos?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.validades_pontos.indexOf(validade_pontos);
                this.validades_pontos.splice(index, 1);
                localStorage.setItem('validades_pontos', JSON.stringify(this.validades_pontos));
                Swal.fire(
                    'Sucesso!',
                    'Validade de pontos excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newValidadePontos = () => {
        this.new_validade_pontos = {
            id: this.validades_pontos.length ? Math.max.apply(0, this.validades_pontos.map(validade_pontos => validade_pontos.id)) + 1 : 1,
            validade: null,
            pacotes_beneficios: [],
        };

        this.exibir_novo = true;
    }

    addValidadePontos = () => {
        this.validades_pontos.push(this.new_validade_pontos);
        localStorage.setItem('validades_pontos', JSON.stringify(this.validades_pontos));
        Swal.fire(
            'Sucesso!',
            'Validade de pontos cadastrado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editValidadePontos = (validade_pontos) => {
        this.edit_validade_pontos = { ...validade_pontos };

        this.exibir_editar = true;
    }

    saveValidadePontos = () => {
        this.validades_pontos.forEach(validade_pontos => {
            if(validade_pontos.id === this.edit_validade_pontos.id){
                validade_pontos.validade = this.edit_validade_pontos.validade;
                validade_pontos.pacotes_beneficios = this.edit_validade_pontos.pacotes_beneficios;
            }
        });

        localStorage.setItem('validades_pontos', JSON.stringify(this.validades_pontos));
        Swal.fire(
            'Sucesso!',
            'Validade de pontos atualizado com sucesso!',
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
