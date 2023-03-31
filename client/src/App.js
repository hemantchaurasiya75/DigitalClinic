import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/Auth/LoginPage";
import PatientPage from "./pages/PatientPage";
import PatientDetails from "./pages/PatientDetails";
import UpdatePatient from "./pages/UpdatePatient";
import AddMedicine from "./pages/AddMedicine";
import MedicineList from "./pages/MedicineList";
import MedicineDetails from "./pages/MedicineDetails";
import UpdateMedicine from "./pages/UpdateMedicine";
import Footer from "./components/Footer";

import AddClinic from "./pages/AddClinic";
import ClinicPage from "./pages/ClinicPage";
import DoctorPage from "./pages/DoctorPage";
import ClinicDetails from "./pages/ClinicDetails";
import DoctorDetails from "./pages/DoctorsDetails";
import UpdateClinic from "./pages/UpdateClinic";
import UpdateDoctor from "./pages/UpdateDoctor";

import Home from "./pages/Home";
import { useSelector } from 'react-redux';
import RegisterDoctor from "./pages/Auth/RegisterDoctor";
import RegisterPatient from "./pages/Auth/RegisterPatient";
import Consultant from "./pages/Consultant";


function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/register-doctor" element={
        <RegisterDoctor />
        } />

        <Route exact path="/register-patient" element={
        <RegisterPatient />
        } />

        <Route exact path="/login" element={<LoginPage />} />

        <Route exact path="/add-medicine/:patientId" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <AddMedicine /> : <Navigate to="/" />
        } />

        <Route exact path="/add-clinic" element={
          <AddClinic />
        } />

        <Route exact path="/patient-list" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <PatientPage /> : <Navigate to="/" />
        } />

        <Route exact path="/medicine-list/:patientId" element={
          <MedicineList />
        } />

        <Route exact path="/doctor-list/:clinicId" element={
          <DoctorPage />
        } />

        <Route exact path="/clinic-list" element={
          <ClinicPage />
        } />

        <Route exact path="/patient-details/:patientId" element={
          <PatientDetails />
        } />

        <Route exact path="/doctor-details/:doctorId" element={
          <DoctorDetails />
        } />

        <Route exact path="/medicine-details/:medicineId" element={
          <MedicineDetails />
        } />

        <Route exact path="/clinic-details/:clinicId" element={
          <ClinicDetails />
        } />


        <Route exact path="/update-patient/:patientId" element={
          <UpdatePatient />
        } />

        <Route exact path="/update-doctor/:doctorId" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <UpdateDoctor /> : <Navigate to="/" />

        } />


        <Route exact path="/update-medicine/:medicineId" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <UpdateMedicine /> : <Navigate to="/" />

        } />

        <Route exact path="/update-clinic/:clinicId" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <UpdateClinic /> : <Navigate to="/" />

        } />

        <Route exact path="/consultant/:consultantId" element={
          !user ? <Navigate to="/" /> : user.role === "DOCTOR" ? <Consultant /> : <Navigate to="/" />

        } />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;