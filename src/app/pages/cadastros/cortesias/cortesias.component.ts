import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cortesia } from '../../../models/Cortesia';

@Component({
  selector: 'app-cortesias',
  templateUrl: './cortesias.component.html',
  styleUrls: ['./cortesias.component.scss']
})
export class CortesiasComponent implements OnInit {
    exibir_novo: Boolean = false;
    exibir_editar: Boolean = false;

    estado_temporario: Number;
    cidade_temporaria: Number;

    capilaridades = [
        { id: 1, nome: 'Nacional', },
        { id: 2, nome: 'Estados', },
        { id: 3, nome: 'Cidades', },
    ];

    estados = [
        { id: 1, nome: 'Minas Gerais', },
        { id: 2, nome: 'São Paulo', },
        { id: 3, nome: 'Rio de Janeiro', },
    ];

    cidades = [
        { id: 1, estado: 1, nome: 'Belo Horizonte', },
        { id: 2, estado: 1, nome: 'Uberlandia', },
        { id: 3, estado: 1, nome: 'Contagem', },
        { id: 4, estado: 2, nome: 'São Paulo', },
        { id: 5, estado: 2, nome: 'Guarulhos', },
        { id: 6, estado: 2, nome: 'Campinas', },
        { id: 7, estado: 3, nome: 'Rio de Janeiro', },
        { id: 8, estado: 3, nome: 'São Gonçalo', },
        { id: 9, estado: 3, nome: 'Duque de Caxias', },
    ];

    cortesias: Cortesia[] = [];
    new_cortesia: Cortesia = {
        id: 0,
        nome: null,
        logo: null,
        site: null,
        descricao: null,
        link_appstore: null,
        link_googleplay: null,
        imagens: [],
        capilaridade: null,
        estados: [],
        cidades: [],
    };
    edit_cortesia: Cortesia = {
        id: 0,
        nome: null,
        logo: null,
        site: null,
        descricao: null,
        link_appstore: null,
        link_googleplay: null,
        imagens: [],
        capilaridade: null,
        estados: [],
        cidades: [],
    };

    constructor() { }

    ngOnInit(): void {
        this.estado_temporario = 0;
        this.cidade_temporaria = 0;

        if (localStorage.getItem('cortesias')) {
            this.cortesias = JSON.parse(localStorage.getItem('cortesias'));
        } else {
            this.cortesias = [
                {
                    id: 1,
                    nome: 'Cortesia Teste 1',
                    logo: null,
                    site: 'http://www.cortesiateste1.com.br',
                    descricao: 'Cortesia Teste',
                    link_appstore: null,
                    link_googleplay: null,
                    imagens: [],
                    capilaridade: null,
                    estados: [],
                    cidades: [],
                },
                {
                    id: 2,
                    nome: 'Cortesia Teste 2',
                    logo: null,
                    site: 'http://www.cortesiateste2.com.br',
                    descricao: 'Cortesia Teste',
                    link_appstore: null,
                    link_googleplay: null,
                    imagens: [],
                    capilaridade: null,
                    estados: [],
                    cidades: [],
                },
                {
                    id: 3,
                    nome: 'Cortesia Teste 3',
                    logo: null,
                    site: 'http://www.cortesiateste3.com.br',
                    descricao: 'Cortesia Teste',
                    link_appstore: null,
                    link_googleplay: null,
                    imagens: [],
                    capilaridade: null,
                    estados: [],
                    cidades: [],
                },
            ];

            localStorage.setItem('cortesias', JSON.stringify(this.cortesias));
        }
    }

    deleteCortesia = (cortesia) => {
        Swal.fire({
            title: 'Confirmar Exclusão?',
            html: "Você confirma a exclusão do Cortesia <br/><strong>" + cortesia.nome + "</strong>?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                const index = this.cortesias.indexOf(cortesia);
                this.cortesias.splice(index, 1);
                localStorage.setItem('cortesias', JSON.stringify(this.cortesias));
                Swal.fire(
                    'Sucesso!',
                    'Cortesia excluído com sucesso!',
                    'success'
                );
            }
        })
    }

    newCortesia = () => {
        this.new_cortesia = {
            id: this.cortesias.length ? Math.max.apply(0, this.cortesias.map(cortesia => cortesia.id)) + 1 : 1,
            nome: null,
            logo: null,
            site: null,
            descricao: null,
            link_appstore: null,
            link_googleplay: null,
            imagens: [],
            capilaridade: null,
            estados: [],
            cidades: [],
        };

        this.exibir_novo = true;
    }

    addCortesia = () => {
        this.cortesias.push(this.new_cortesia);
        localStorage.setItem('cortesias', JSON.stringify(this.cortesias));
        Swal.fire(
            'Sucesso!',
            'Cortesia cadastrada com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    editCortesia = (cortesia) => {
        this.edit_cortesia = { ...cortesia };

        this.exibir_editar = true;
    }

    saveCortesia = () => {
        this.cortesias.forEach(cortesia => {
            if(cortesia.id === this.edit_cortesia.id){
                cortesia.nome = this.edit_cortesia.nome;
                cortesia.logo = this.edit_cortesia.logo;
                cortesia.site = this.edit_cortesia.site;
                cortesia.descricao = this.edit_cortesia.descricao;
                cortesia.link_appstore = this.edit_cortesia.link_appstore;
                cortesia.link_googleplay = this.edit_cortesia.link_googleplay;
                cortesia.imagens = this.edit_cortesia.imagens;
                cortesia.capilaridade = this.edit_cortesia.capilaridade;
                cortesia.estados = this.edit_cortesia.estados;
                cortesia.cidades = this.edit_cortesia.cidades;
            }
        });

        localStorage.setItem('cortesias', JSON.stringify(this.cortesias));
        Swal.fire(
            'Sucesso!',
            'Cortesia atualizada com sucesso!',
            'success'
        ).then((result) => {
            this.retornarAoInicio();
        });
    }

    carregarLogo = (event, cortesia) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cortesia.logo = reader.result;
        };
    }

    carregarImagem = (event, cortesia) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cortesia.imagens.push(reader.result);
        };
    }

    deleteImagem = (imagens, imagem) => {
        const index = imagens.indexOf(imagem);
        imagens.splice(index, 1);
    }

    retornarAoInicio = () => {
        this.exibir_novo = false;
        this.exibir_editar = false;
    }

    deleteEstado = (estados, estado) => {
        const index = estados.indexOf(estado);
        estados.splice(index, 1);
    }

    addEstado = (estados) => {
        let encontrado = false;

        estados.forEach(estado => {
            if(estado == this.estado_temporario){
                encontrado = true;
            }
        });

        if(!encontrado){
            estados.push(this.estado_temporario);
        }

        this.estado_temporario = 0;
        this.cidade_temporaria = 0;
    }

    deleteCidade = (cidades, cidade) => {
        const index = cidades.indexOf(cidade);
        cidades.splice(index, 1);
    }

    addCidade = (cidades) => {
        let encontrado = false;

        cidades.forEach(cidade => {
            if(cidade == this.cidade_temporaria){
                encontrado = true;
            }
        });

        if(!encontrado){
            cidades.push(this.cidade_temporaria);
        }

        this.estado_temporario = 0;
        this.cidade_temporaria = 0;
    }

    consultarNome = (itens, id) => {
        let nome = null;

        itens.forEach(item => {
            if(item.id == id) nome = item.nome;
        });

        return nome;
    }

    consultarEstado = (id) => {
        let nome = null;
        let estado_cidade = null;

        this.cidades.forEach(cidade => {
            if(cidade.id == id){
                estado_cidade = cidade.estado;
            }
        });

        if(estado_cidade){
            this.estados.forEach(estado => {
                if(estado.id == estado_cidade) nome = estado.nome;
            });
        }

        return nome;
    }

    limparCapilaridade = (cortesia) => {
        cortesia.estados = [];
        cortesia.cidade = [];

        this.estado_temporario = 0;
        this.cidade_temporaria = 0;
    }

}
