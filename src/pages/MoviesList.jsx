import React, { Component } from 'react'
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import styled from 'styled-components';
import api from '../api';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMovie extends Component {
    updateUser = e => {
        e.preventDefault();
        window.location.href = `/movies/update/${this.props.id}`;
    };

    render() {
        return (
            <Update onClick={this.updateUser}>
                Update
            </Update>
        );
    }
}

class DeleteMovie extends Component {
    deleteUser = e => {
        e.preventDefault();
        
        if(window.confirm(`Do you want to delete the movie ${this.props.name} permanently?`)) {
            api.deleteMovieById(this.props.id);
            window.location.reload();
        }
    };

    render() {
        return (
            <Delete onClick={this.deleteUser}>
                Delete
            </Delete>
        );
    }
}

export default class MoviesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            columns: [],
            isLoading: false
        };
    }

    componentDidMount = async () => {
        this.setState({isLoading: true});
        await api.getAllMovies()
        .then((movies) => {
            this.setState({
                movies: movies.data.data,
                isLoading: false
            });
        });
    };

    render() {
        const {movies, isLoading} = this.state;
        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    console.log(props);
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    );
                }
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie name={props.original.name} id={props.original._id} />
                        </span>
                    );
                }
            }
        ];

        let showTable = true;
        if(!movies.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable 
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}
