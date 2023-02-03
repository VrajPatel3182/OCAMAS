import * as React from "react";
//import { useEffect,useState } from "react";

const CustomerProfile = () => {

   
   
  return (
    <div>
        <div className="container rounded bg-white mt-3 mb-5 border">
            <div className="row border-top" >
            <div className="col-md-3 border-right">
                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" alt="name" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">SAMPLE</span><span className="text-black-50">sample123@gmail.com</span><span> </span></div>
            </div>
            <div className="col-md-8 border-right">
                <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" /></div>
                    <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1"  /></div>
                    <div className="col-md-12"><label className="labels">Country</label><input type="text" className="form-control" placeholder="Country"  /></div>
                    <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2"  /></div>
                    <div className="col-md-12"><label className="labels">City</label><input type="text" className="form-control" placeholder="enter address line 2"  /></div>
                    <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id"  /></div>
                    <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education"  /></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button">Save Profile</button></div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default CustomerProfile;
