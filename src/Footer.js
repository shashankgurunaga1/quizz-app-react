import { Container,Row,Col,Stack,Nav,NavLink,Image } from "react-bootstrap";

function Footer(){
    return(
        <footer id="footer1">
            <Container fluid>
                <Row className="bg-primary text-white p-4">
                    <Col className="mx-5">
                        <Stack>
                        <Image
                            src="Untitled.jpg"
                            alt="company logo"
                            width={150}
                            height={150}

                        />
                        <p>Quiz Application</p>
                        </Stack>

                    </Col>
                    <Col>
                    <Nav className="flex-column fs-5">
                        Useful Links
                        <NavLink href="#" className="text-white">Home</NavLink>
                        <NavLink href="#" className="text-white">About</NavLink>
                    </Nav>
                    </Col>
                    <Col>
                    <h4>Contact Us</h4>
                    <p>email@teamuvce.com</p>
                    <p>Phone : 91-987654321</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
export default Footer;