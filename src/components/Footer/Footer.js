import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import logo from "../../assets/circles.png";

const Footer = () => {
  return (
    <MDBFooter color="unique-color-dark" className="font-medium pt-4 mt-4">
      <MDBContainer className="text-center text-md-left">
        <MDBRow className="text-center text-md-left mt-3 pb-3">
          <MDBCol md="3" lg="3" xl="4" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <img src={logo} alt="Book Store App" height="50px" />
              <strong>Book-Store</strong>
            </h6>
            
          </MDBCol>
          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="2" lg="2" xl="2" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <strong>Products</strong>
            </h6>
            <p>
              <a href="#">Book-Store</a>
            </p>
            <p>
              
            </p>
          </MDBCol>

          <hr className="w-100 clearfix d-md-none" />
          <MDBCol md="4" lg="3" xl="3" className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 font-weight-bold">
              <strong>Contact</strong>
            </h6>
            <p>
              <i className="fa fa-envelope mr-3" /> &nbsp;Team One D
            </p>
            
          </MDBCol>
        </MDBRow>
        <hr />
        <MDBRow className="d-flex align-items-center">
          <MDBCol md="8" lg="8">
            <p className="text-center text-md-left grey-text">
              &copy; {new Date().getFullYear()} Made by
              <a href=""> Team OneD </a>
            </p>
          </MDBCol>
          <MDBCol md="4" lg="4" className="ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                
                
                
              </ul>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
