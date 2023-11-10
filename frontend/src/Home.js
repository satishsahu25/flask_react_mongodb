import React,{useEffect,useState} from 'react'
import {
    Navbar,Table,Container,Row,Col,Button,ButtonGroup, Form
} from 'react-bootstrap'

import {useDispatch,useSelector} from 'react-redux'
import { adduser, deleteuser, loadUsers, loadsingleuser, userupdate } from './redux/actions';
import { toast } from 'react-toastify';


const Home = () => {

    const [email,setemail]=useState("");
    const [name,setname]=useState("");
    const [address,setaddress]=useState("");
    const [contact,setcontact]=useState("");
    const [editmode,seteditmode]=useState(false);
    const {users,user,msg}=useSelector(state=>state.data);
    const [userid,setuserid]=useState(null);

    const dispatch = useDispatch();
    const handlesubmit=(e)=>{

        e.preventDefault();
        if(!editmode){
            if(name&&email&&address&&contact){
                dispatch(adduser({name,email,address,contact}));
                console.log(msg);
                setname("");
                setemail("");
                setaddress("");
                setcontact("");
            }else{
                alert("Please fill all the fields");
            }

        }else{
            if(name&&email&&address&&contact){
                dispatch(userupdate({name,email,address,contact},userid));
                setname("");
                setemail("");
                setaddress("");
                setcontact("");
                seteditmode(false);
                setuserid(null)
            }else{
                alert("Please fill all the fields");
            }
            
        }
       
    }

    const handledelete=(id)=>{
        if(window.confirm("Are you sure that you wanted to delete that user")){
            dispatch(deleteuser(id));
        }
    }

    const handleupdate=(id)=>{
        seteditmode(true);
        dispatch(loadsingleuser(id));
        setuserid(id);
    }

    useEffect(()=>{
        if(msg){
            toast.success(msg,{
                position:toast.POSITION.TOP_RIGHT
            });
        }
    },[msg]);

    useEffect(()=>{
        if(user){
            setaddress(user.address);
            setname(user.name);
            setcontact(user.contact);
            setemail(user.email);
        }
    },[user]);

    useEffect(()=>{
        //dispactched the action from here
        dispatch(loadUsers());
    },[]);

 

  return (
    <>
        <Navbar bg='primary' variant='dark' className='justify-content-center'>
            <Navbar.Brand>Dendrite.ai</Navbar.Brand>
        </Navbar>
        <Container style={{marginTop:"70px"}}>
            <Row>
                <Col md={4}>
                    <Form onSubmit={handlesubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="Name"
                                value={name}
                                onChange={(e)=>setname(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="Email"
                                value={email}
                                onChange={(e)=>setemail(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Contact"
                                name="Contact"
                                value={contact}
                                onChange={(e)=>setcontact(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                name="Address"
                                value={address}
                                onChange={(e)=>setaddress(e.target.value)}
                            />
                        </Form.Group>
                    <div className='d-grid gap-2 mt-2'>
                    <Button type='submit' variant='primary' size='lg'>
                    {editmode ?"Update":"Submit"}
                    </Button>
                    </div>
                    </Form>
                </Col>
                <Col md={8}>
                    <Table border hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        users&&users.map((item,ind)=>(
                            <tbody key={ind}>
                            <tr>
                                <td>{ind+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.address}</td>
                                <td>{item.contact}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button style={{marginRight:"5px"}} variant='danger' onClick={()=>handledelete(item._id)}>Delete</Button>
                                        <Button  variant='secondary'
                                        onClick={()=>handleupdate(item._id)}
                                        >Update</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>

                            </tbody>
                        ))
                    }
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Home