import { Grid, Row, Col } from "rsuite";

import "rsuite/dist/rsuite.min.css";

export default function RSuiteGrid() {
    return (
        <div>
            <Grid>
                <Row>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#A0F962", textAlign: 'center' }}
                    >
                        1
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#D97BFC", textAlign: 'center' }}
                    >
                        2
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#96FEF2", textAlign: 'center' }}
                    >
                        3
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#FC7B96", textAlign: 'center' }}
                    >
                        4
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#FEAF96", textAlign: 'center' }}
                    >
                        1
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#CAFF83", textAlign: 'center' }}
                    >
                        2
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#FEED96 ", textAlign: 'center' }}
                    >
                        3
                    </Col>
                    <Col
                        xs={24}
                        sm={8}
                        md={6}
                        lg={4}
                        style={{ backgroundColor: "#D6D8FF", textAlign: 'center' }}
                    >
                        4
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};