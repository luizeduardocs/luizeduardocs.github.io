import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Mcc } from '../../../models/Mcc';

@Component({
  selector: 'app-mcc',
  templateUrl: './mcc.component.html',
  styleUrls: ['./mcc.component.scss']
})
export class MccComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    mccs: Mcc[] = [];
    new_mcc: Mcc = {
        id: 0,
        nome: null,
        codigo: null,
    };
    edit_mcc: Mcc = {
        id: 0,
        nome: null,
        codigo: null,
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('mccs')) {
            this.mccs = JSON.parse(localStorage.getItem('mccs'));
        } else {
            this.mccs = [
                {
                    id: 1,
                    nome: 'MCC Teste 1',
                    codigo: '123456789',
                },
                {
                    id: 2,
                    nome: 'MCC Teste 2',
                    codigo: '987654321',
                },
                {
                    id: 3,
                    nome: 'MCC Teste 3',
                    codigo: '789456123',
                },
            ];

            localStorage.setItem('mccs', JSON.stringify(this.mccs));
        }
    }

    deleteMcc = (mcc) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do MCC <br/><strong>" + mcc.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.mccs.indexOf(mcc);
                this.mccs.splice(index, 1);
                localStorage.setItem('mccs', JSON.stringify(this.mccs));
                Swal.fire(
                    'Sucesso!',
                    'MCC excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newMcc = () => {
        this.new_mcc = {
            id: this.mccs.length ? Math.max.apply(0, this.mccs.map(mcc => mcc.id)) + 1 : 1,
            nome: null,
            codigo: null,
        };

        this.exibir_novo = true;
    }

    addMcc = () => {
        this.mccs.push(this.new_mcc);
        localStorage.setItem('mccs', JSON.stringify(this.mccs));
        Swal.fire(
            'Sucesso!',
            'MCC cadastrada com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editMcc = (mcc) => {
        this.edit_mcc = { ...mcc };

        this.exibir_editar = true;
    }

    saveMcc = () => {
        this.mccs.forEach(mcc => {
            if(mcc.id === this.edit_mcc.id){
                mcc.nome = this.edit_mcc.nome;
                mcc.codigo = this.edit_mcc.codigo;
            }
        });

        localStorage.setItem('mccs', JSON.stringify(this.mccs));
        Swal.fire(
            'Sucesso!',
            'MCC atualizada com sucesso!',
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
