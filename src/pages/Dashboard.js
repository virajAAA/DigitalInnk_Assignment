import React from "react";
import { connect } from "react-redux";

function Dashboard(props) {
  return (
    <div>
      <h1>You are in Application</h1>
      <h2> Your Login Id : {props.userDetails.email}</h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps)(Dashboard);
