import { Grid, Row, Col } from "rsuite";

import "rsuite/dist/rsuite.min.css";

const NAMES = [
    "Steven James",
    "Julia Olsen",
    "Ana Mcbride",
    "Caylee Preston",
    "Kaiya Mccall",
    "Xiomara Thompson",
    "Parker Willis",
    "Nathanial Quinn",
    "Madden Boyer",
    "Kali Roy",
    "Aydan Blevins",
    "Chaz Perry",
];

export default function RSuiteGrid() {
    return (
        <div style={{ margin: 'auto' }}>
            <Grid>
                <Row>
                    {NAMES.map((n, i) => (
                        <Col
                            key={i}
                            xs={24}
                            sm={8}
                            md={6}
                            lg={4}
                            style={{ backgroundColor: "wheat", border: 'solid 1px #FAD7A1', textAlign: 'center', marginRight: 5, marginBottom: 5 }}>
                            {n}
                        </Col>
                    ))}
                </Row>
            </Grid>
        </div>
    );
};