import React from "react";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import ScatterPlot from './Scatterplot';
import BackEndConnection from '../BackEndConnection';

const backend = BackEndConnection.INSTANCE();

class Gravity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceSize: 100,
            count: 50,
            objectData: []
        }
    }

    getSpaceSize(e) {
        this.setState({ spaceSize: e.target.value * 1 });
    }

    getParticleCount(e) {
        this.setState({ count: e.target.value * 1 });
    }

    drawGraph() {
        backend.get_initial_space(this.state.spaceSize, this.state.count, (data) => {
            this.setState({ data: data.particles }, () => {
                let objectData = this.state.data.map(x => ({ x: x[0], y: x[1], m: x[2] }));
                let toBeMerged = data.tobeMerged;
                this.setState({ objectData: [], toBeMerged:[] }, () => {
                    this.setState({ objectData, toBeMerged });
                });
            });
        })
    }

    tickMerge() {
        backend.get_tick_merge((data) => {
            this.setState({ data: data.particles }, () => {
                let objectData = this.state.data.map(x => ({ x: x[0], y: x[1], m: x[2] }));
                let toBeMerged = data.tobeMerged;
                this.setState({ objectData: [], toBeMerged:[] }, () => {
                    this.setState({ objectData, toBeMerged });
                });
            });
        })
    }

    render() {
        return (
            <Box style={{ display: 'flex', flexDirection: 'column', margin: 5, padding: 20 }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField label="Space Size" variant="outlined" onChange={(e) => this.getSpaceSize(e)} value={this.state.spaceSize} sx={{ width: 120 }} />
                    <TextField label="Particle Count" variant="outlined" sx={{ ml: 2, width: 120, mr: 2 }} onChange={(e) => this.getParticleCount(e)} value={this.state.count} />
                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box flexGrow={1} />
                        <Button variant="outlined" onClick={() => this.drawGraph()}>Draw</Button>
                    </Box>
                </Box>
                <Divider sx={{ mt: 1 }} />
                {this.state.objectData.length > 0 &&
                    <Box style={{ display: 'flex', flexDirection: 'row' }}>
                        <ScatterPlot
                            objectData={this.state.objectData}
                            toBeMerged={this.state.toBeMerged}
                            maxMass={this.state.count}
                            spaceSize={this.state.spaceSize} />
                        <Box style={{ marginTop: 20 }}>
                            <Button variant="outlined" onClick={() => this.tickMerge()}>Tick</Button>
                        </Box>
                    </Box>}
            </Box>
        );
    }
}
export default Gravity;