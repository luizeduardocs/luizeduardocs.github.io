import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cluster } from '../../../models/Cluster';

@Component({
    selector: 'app-clusters',
    templateUrl: './clusters.component.html',
    styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    clusters: Cluster[] = [];
    new_cluster: Cluster = {
        id: 0,
        nome: null,
    };
    edit_cluster: Cluster = {
        id: null,
        nome: null,
    };

    constructor() { }

    ngOnInit(): void {
        if (localStorage.getItem('clusters')) {
            this.clusters = JSON.parse(localStorage.getItem('clusters'));
        } else {
            this.clusters = [
                {
                    id: 1,
                    nome: 'Cluster Exemplo 1',
                },
                {
                    id: 2,
                    nome: 'Cluster Exemplo 2',
                },
                {
                    id: 3,
                    nome: 'Cluster Exemplo 3',
                },
            ];
            localStorage.setItem('clusters', JSON.stringify(this.clusters));
        }
    }

    deleteCluster = (cluster) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do Cluster <br/><strong>" + cluster.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.clusters.indexOf(cluster);
                this.clusters.splice(index, 1);
                localStorage.setItem('clusters', JSON.stringify(this.clusters));
                Swal.fire(
                    'Sucesso!',
                    'Cluster excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newCluster = () => {
        this.new_cluster = {
            id: this.clusters.length ? Math.max.apply(0, this.clusters.map(cluster => cluster.id)) + 1 : 1,
            nome: null,
        };

        this.exibir_novo = true;
    }

    addCluster = () => {
        this.clusters.push(this.new_cluster);
        localStorage.setItem('clusters', JSON.stringify(this.clusters));
        Swal.fire(
            'Sucesso!',
            'Cluster cadastrado com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editCluster = (cluster) => {
        this.edit_cluster = { ...cluster };

        this.exibir_editar = true;
    }

    saveCluster = () => {
        this.clusters.forEach(cluster => {
            if(cluster.id === this.edit_cluster.id){
                cluster.nome = this.edit_cluster.nome;
            }
        });

        localStorage.setItem('clusters', JSON.stringify(this.clusters));
        Swal.fire(
            'Sucesso!',
            'Cluster atualizado com sucesso!',
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
