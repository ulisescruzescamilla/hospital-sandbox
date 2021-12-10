import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // styles
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import API from './api'; // TODO move api.js to new folder
import Navbar from 'react-bootstrap/Navbar';
import {Form, Button, Modal, Toast, Spinner, Alert} from 'react-bootstrap';

function App() {

    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialties, setSpecialties] = useState('');
    const [cedula, setCedula] = useState('');
    const [handlerCedula, setHandlerCedula] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [doctorSelected, setDoctor] = useState(null);
    const [show, setShow] = useState(false);
    const [showDanger, setDangerShow] = useState(false);
    const [showSuccess, setSuccessToast] = useState(false);
    const [showValidationError, setValidationError] = useState(false);
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        API.get(`doctors`)
        .then(res => {
            setDoctors(res.data);
        }).catch(err => {
            console.error(err);
        });
    }, []);

    const handlerEdit = (doctor) => {
        console.debug("doctor to edit", doctor);
        setIsEdit(true);
        setDoctor(doctor);
        // update values
        setName(doctor.name);
        setLastName(doctor.last_name);
        setSpecialties(doctor.specialties);
        setCedula(doctor.cedula);
        window.location.href = '#create';
    }

    const handlerVerify = (doctor) => {
        console.debug("doctor to delete", doctor);
        setDoctor(doctor);
        setShow(true);
    }

    const handlerDelete = (e) => {
        e.preventDefault();
        API.delete(`doctors/${doctorSelected.id}`)
        .then(res => {
            console.debug(res);
            setDoctors(res.data);
            setIsEdit(false);
            handleClose();

            showDangerToast(true);
        }).catch(err => {
            console.error(err);
        });
    }

    const handleDoctorSumbit = (e) => {
        e.preventDefault();
        setValidationError(false);
        // validate

        let payload = {
            name: name,
            last_name: lastName,
            specialties: specialties,
            cedula: cedula
        };
        console.debug("payload", payload);

        let endpoint = null;

        if (isEdit) {
            endpoint = API.put(`doctors/${doctorSelected.id}`, payload)
        } else {
            endpoint = API.post(`doctors`, payload);
        }

        endpoint
        .then(res => {
            console.debug(res);
            setDoctors(res.data);
            setIsEdit(false);
            setSuccessToast(true);
        }).catch(err => {
            // console.error(err);
            let errors = [err.response.data.errors];
            console.error(errors);
            setValidationError(true);
            setError(JSON.stringify(errors));// TODO beautify this response
        });
    }

    const showDangerToast = (flag) => {
        setDangerShow(flag);
    }

    const table = () => {
        return (
            <Table striped bordered hover id="all">
            <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Specialties</th>
                <th>Cedula</th>
                <th>Manage</th>
                </tr>
            </thead>
            <tbody>
                    { doctors.map( (doctor, i) => 
                        <tr key={i}>
                        <td>{doctor.id}</td>
                        <td>{doctor.name}</td>
                        <td>{doctor.last_name}</td>
                        <td>{doctor.specialties}</td>
                        <td>{doctor.cedula}</td>
                        <td >
                            <Button onClick={() => handlerEdit(doctor)} style={{margin: '1%'}} variant="success">Edit</Button>
                            <Button onClick={() => handlerVerify(doctor)} style={{margin: '1%'}} variant="danger">Delete</Button>
                        </td>
                        </tr>
                    )}
            </tbody>
            </Table>
        )
    }

    if (!doctors) return null;

  return (
      
    <div className="App">
      <Navbar expand="lg" variant="light" bg="light" style={{marginBottom: '10px'}}>
            <Container>
            <Navbar.Brand href="#create">
                New
            </Navbar.Brand>
            <Navbar.Brand href="#create">All</Navbar.Brand>
            </Container>
      </Navbar>

      {/* MODAL */}

      <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please check</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this doctor?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button type="button" variant="danger" onClick={handlerDelete}>Delete</Button>
        </Modal.Footer>
        </Modal>
        </>
      {/* FORM */}

      {/* DANGER TOAST */}
        <Toast onClose={() => setDangerShow(false)} show={showDanger} delay={3000} autohide className="d-inline-block m-1" bg={'danger'}>
            <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
            />
            <strong className="me-auto">Deleted</strong>
            </Toast.Header>
            <Toast.Body className={'text-white'}>
                Doctor deleted.
            </Toast.Body>
        </Toast>

        {/* SUCCESS TOAST */}
        <Toast onClose={() => setSuccessToast(false)} show={showSuccess} delay={3000} autohide className="d-inline-block m-1" bg={'success'}>
            <Toast.Header>
            <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
            />
            <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className={'text-white'}>
                Success
            </Toast.Body>
        </Toast>

      <Form style={{padding: '10%'}} id="create">
      {showValidationError && (
            <Alert variant="danger" onClose={() => setValidationError(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                {error}
                </p>
            </Alert>
            )}
      <h1>DOCTOR</h1>
        <Row style={{marginBottom: '2%'}}>
            <Col>
            <Form.Control value={name} onChange={(e) => setName(e.currentTarget.value)} required placeholder="First name" />
            </Col>
            <Col>
            <Form.Control value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} required placeholder="Last name" />
            </Col>
        </Row>
        <Row style={{marginBottom: '2%'}}>
            <Col>
                <Form.Control
                value={specialties}
                onChange={(e) => setSpecialties(e.currentTarget.value)}
                required
                type="text"
                placeholder="Specialties"
                />
            </Col>
            <Col>
                <Form.Control
                value={cedula}
                onChange={(e) => {
                    setHandlerCedula(!e.currentTarget.value.match(/^\d{8}$/));
                    setCedula(e.currentTarget.value);
                }}
                required
                isInvalid={handlerCedula}
                type="text"
                placeholder="Cedula"
                />
            </Col>
        </Row>
        {/* TODO maybe use Formik to manage validations? */}
        <Button variant="primary" type="submit" onClick={handleDoctorSumbit}>
            Submit
        </Button>
        </Form>

        {/* TABLE */}
        <h1>ALL DOCTORS</h1>
      <Container>
      {/* TODO refactor to a component */}
      {doctors.length ? table() : (<Spinner animation="border" variant="primary" />)}

      </Container>
    </div>
  );
}

export default App;
