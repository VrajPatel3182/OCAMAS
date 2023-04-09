import * as React from "react";
//import { useEffect,useState } from "react";

const CustomerProfile = () => {

  const name = localStorage.getItem('user');

  return (
    <div className="container" style={{ marginBottom:"40px"}}>
      <div className="row">
        <div className="col-12" style={{background:"white"}}>
          {/* Page title */}
          <div className="my-5">
            <h3>{JSON.parse(name).name}'s Profile</h3>
            <hr />
          </div>
          {/* Form START */}
          <form className="file-upload">
            <div className="row mb-5 gx-5">
              {/* Contact detail */}
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Contact detail</h4>
                    {/* First Name */}
                    <div className="col-md-6">
                      <label className="form-label">First Name *</label>
                      <input type="text" className="form-control" placeholder aria-label="First name" defaultValue="Scaralet" />
                    </div>
                    {/* Last name */}
                    <div className="col-md-6">
                      <label className="form-label">Last Name *</label>
                      <input type="text" className="form-control" placeholder aria-label="Last name" defaultValue="Doe" />
                    </div>
                    {/* Phone number */}
                    <div className="col-md-6">
                      <label><i className='fa-solid fa-phone-flip'></i>Phone number *</label>
                      <input type="text" className="form-control" placeholder aria-label="Phone number" defaultValue="(333) 000 555" />
                    </div>
                    {/* Mobile number */}
                    <div className="col-md-6">
                      <label className="form-label">Mobile number *</label>
                      <input type="text" className="form-control" placeholder aria-label="Phone number" defaultValue="+91 9852 8855 252" />
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                      <label htmlFor="inputEmail4" className="form-label">Email (Also a Username) *</label>
                      <input type="email" className="form-control" id="inputEmail4" defaultValue="example@homerealty.com" />
                    </div>
                  </div> {/* Row END */}
                </div>
              </div>
              {/* Upload profile */}
              <div className="col-xxl-4">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Upload your profile photo</h4>
                    <div className="text-center">
                      
                      <div className="square position-relative display-2 mb-3">
                        <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary" />
                      </div>
                      
                      {/* <input type="file" id="customFile" name="file" hidden />
                      <label className="btn btn-success-soft btn-block" htmlFor="customFile">Upload</label>
                      <button type="button" className="btn btn-danger-soft">Remove</button>
                
                      <p className="text-muted mt-3 mb-0"><span className="me-1">Note:</span>Minimum size 300px x 300px</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            {/* Social media detail */}
            <div className="row mb-5 gx-5">
              <div className="col-xxl-6 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Shipping-address and Address</h4>
                    {/* Facebook */}
                    <div className="col-md-12">
                      <label className="form-label"><i className="fa fa-home me-2" />Address *</label>
                      <textarea type="text" className="form-control" placeholder aria-label="Facebook" defaultValue="http://www.facebook.com" />
                    </div>
                    {/* Linkedin */}
                    <div className="col-md-12">
                      <label className="form-label"><i className="fas fa-shipping-fast  me-2"></i>Shipping Address *</label>
                      <textarea type="text" className="form-control" placeholder aria-label="Linkedin" defaultValue="http://www.linkedin.com" />
                    </div>
                    {/* Instragram */}
                    <div className="col-md-6">
                      <label className="form-label"><i className="fas fa-flag me-2" />Country *</label>
                      <input type="text" className="form-control" placeholder aria-label="Instragram" defaultValue="http://www.instragram.com" />
                    </div>
                    {/* Pinterest */}
                    <div className="col-md-6">
                      <label className="form-label"><i className="fas fa-map-marked-alt me-2" />State *</label>
                      <input type="text" className="form-control" placeholder aria-label="Pinterest" defaultValue="http://www.pinterest.com" />
                    </div>
                    {/* Dribble */}
                    <div className="col-md-6">
                      <label className="form-label"><i className="fas fa-city me-2" />city *</label>
                      <input type="text" className="form-control" placeholder aria-label="Dribble" defaultValue="http://www.dribble.com" />
                    </div>
                    
                  </div> {/* Row END */}
                </div>
              </div>
              {/* change password */}
              <div className="col-xxl-6">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="my-4">Change Password</h4>
                    {/* Old password */}
                    <div className="col-md-12">
                      <label htmlFor="exampleInputPassword1" className="form-label"><i class='fa fa-unlock me-2'></i>Old password *</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    {/* New password */}
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword2" className="form-label"><i class='fa fa-lock me-2'></i>New password *</label>
                      <input type="password" className="form-control" id="exampleInputPassword2" />
                    </div>
                    {/* Confirm password */}
                    <div className="col-md-6">
                      <label htmlFor="exampleInputPassword3" className="form-label"><i class='fa fa-lock me-2'></i>Confirm Password *</label>
                      <input type="password" className="form-control" id="exampleInputPassword3" />
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* Row END */}
            {/* button */}
            <div className="gap-3 d-md-flex justify-content-md-end text-center">
              <button type="button" className="btn btn-primary btn-lg">Update profile</button>
            </div>
          </form> {/* Form END */}
        </div>
      </div>
    </div>

  );
};

export default CustomerProfile;
