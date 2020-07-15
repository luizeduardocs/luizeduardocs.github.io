import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Moeda } from '../../../models/Moeda';

@Component({
  selector: 'app-moedas',
  templateUrl: './moedas.component.html',
  styleUrls: ['./moedas.component.scss']
})
export class MoedasComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    moedas: Moeda[] = [];
    new_moeda: Moeda = {
        id: 0,
        nome: null,
        sigla: null,
    };
    edit_moeda: Moeda = {
        id: 0,
        nome: null,
        sigla: null,
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('moedas')) {
            this.moedas = JSON.parse(localStorage.getItem('moedas'));
        } else {
            this.moedas = [
                {
                    id: 1,
                    nome: 'Real',
                    sigla: 'BRL',
                },
                {
                    id: 2,
                    nome: 'Dolar',
                    sigla: 'USD',
                },
                {
                    id: 3,
                    nome: 'Euro',
                    sigla: 'EUR',
                },
            ];

            localStorage.setItem('moedas', JSON.stringify(this.moedas));
        }
    }

    deleteMoeda = (moeda) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do Moeda <br/><strong>" + moeda.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.moedas.indexOf(moeda);
                this.moedas.splice(index, 1);
                localStorage.setItem('moedas', JSON.stringify(this.moedas));
                Swal.fire(
                    'Sucesso!',
                    'Moeda excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newMoeda = () => {
        this.new_moeda = {
            id: this.moedas.length ? Math.max.apply(0, this.moedas.map(moeda => moeda.id)) + 1 : 1,
            nome: null,
            sigla: null,
        };

        this.exibir_novo = true;
    }

    addMoeda = () => {
        this.moedas.push(this.new_moeda);
        localStorage.setItem('moedas', JSON.stringify(this.moedas));
        Swal.fire(
            'Sucesso!',
            'Moeda cadastrada com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editMoeda = (moeda) => {
        this.edit_moeda = { ...moeda };

       this.exibir_editar = true;
    }

    saveMoeda = () => {
        this.moedas.forEach(moeda => {
            if(moeda.id === this.edit_moeda.id){
                moeda.nome = this.edit_moeda.nome;
                moeda.sigla = this.edit_moeda.sigla;
            }
        });

        localStorage.setItem('moedas', JSON.stringify(this.moedas));
        Swal.fire(
            'Sucesso!',
            'Moeda atualizada com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    retornarAoInicio = () => {
        this.exibir_novo = false;
        this.exibir_editar = false;
    }
}
