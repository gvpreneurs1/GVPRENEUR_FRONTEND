import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function StaticFaqSection() {
  return (
    <MDBContainer>
      <section>
        <MDBTypography
          tag="h3"
          className="text-center mb-4 pb-2 text-primary fw-bold"
        >
          FAQ
        </MDBTypography>
        <p className="text-center mb-5">
          Find the answers for the most frequently asked questions below
        </p>

        <MDBRow>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 text-primary">
              <MDBIcon far icon="paper-plane text-primary pe-2" /> What makes GVPrenuer unique?
            </MDBTypography>
            <p>
            GVPrenuer offers tailored business training focusing on entrepreneurship, financial literacy, marketing, and leadership for youths.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 text-primary">
              <MDBIcon fas icon="pen-alt text-primary pe-2" /> How long is the program?
            </MDBTypography>
            <p>
              <strong>
                <u>Program durations vary</u>
              </strong>{" "}
              typically spanning from days to week according to the potential of individuals
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 text-primary">
              <MDBIcon fas icon="user text-primary pe-2" /> Are there prerequisites?
            </MDBTypography>
            <p>
            No strict prerequisites; passion for entrepreneurship and a desire to learn are encouraged.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 text-primary">
              <MDBIcon fas icon="rocket text-primary pe-2" /> What support is available post-training?
            </MDBTypography>
            <p>
            GVPrenuer provides ongoing support through networking, resources, and mentorship opportunities.
            </p>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBTypography tag="h6" className="mb-3 text-primary">
              <MDBIcon fas icon="home text-primary pe-2" /> Are there affiliations?
            </MDBTypography>
            <p>
            Yes, GVPrenuer collaborates with industry partners, and passionate youths.
            </p>
          </MDBCol>
        </MDBRow>
      </section>
    </MDBContainer>
  );
}