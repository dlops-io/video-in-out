import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import ReactPlayer from 'react-player'


import DataService from "../../services/DataService";
import { BASE_API_URL } from "../../services/Common";
import styles from './styles';


const Home = (props) => {
    const { classes } = props;

    console.log("================================== Home ======================================");


    // Component States
    const [inputs, setInputs] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const loadInputs = () => {
        DataService.GetVideosList()
            .then(function (response) {
                setInputs(response.data);
            })
    }

    // Setup Component
    useEffect(() => {
        loadInputs();
    }, []);

    // Handlers
    const handleOnVideoClick = () => {

    }



    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth={false} className={classes.container}>
                    {/* <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' /> */}
                    <video width="350" controls muted="muted">
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" type="video/mp4" />
                    </video>

                    <ReactPlayer url='http://localhost:9000/get_video?path=Clean11.mp4' />
                    <video width="350" controls muted="muted">
                        <source src="http://localhost:9000/get_video?path=Clean11.mp4" type="video/mp4" />
                    </video>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {inputs && inputs.map((item, idx) =>
                                    <TableRow key={idx}>
                                        <TableCell>
                                            <video width="350" controls muted="muted">
                                                <source src={BASE_API_URL + "/video?path=" + item} type="video/mp4" />
                                            </video>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </main>
        </div>
    );
};

export default withStyles(styles)(Home);