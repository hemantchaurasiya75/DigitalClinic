import axios from 'axios';

const url = 'http://localhost:5000/api/v1';

export const registerPatient = async(patient)=>{
    try {
        return await axios.post(`${url}/patient/register`, patient);
    } catch (error) {
        console.log('Error while register user API ', error);
    }
}

export const login = async(user)=>{
    try {
        return await axios.post(`${url}/login`, user);
    } catch (error) {
        console.log('Error while login user API ', error);
    }
}

export const createMedicine = async (patientId,medicine) => {
    try {
        return await axios.post(`${url}/medicine/${patientId}`, medicine);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const getPatientById = async (patientId) => {
    try {
        let response = await axios.get(`${url}/patient/${patientId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const updatePatientById = async (patientId,patient) => {
    try {
        let response = await axios.put(`${url}/patient/${patientId}`,patient);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}


export const getAllPatients = async () => {
    try {
        let response = await axios.get(`${url}/patient`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const getAllMedicineOfPatient = async (patientId) => {
    try {
        let response = await axios.get(`${url}/medicine/patient-all-medicines/${patientId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const getMedicineById = async (medicineId) => {
    try {
        let response = await axios.get(`${url}/medicine/${medicineId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const updateMedicineById = async (medicineId,medicine) => {
    try {
        let response = await axios.put(`${url}/medicine/${medicineId}`,medicine);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const searchPatient = async (phone) => {
    try {
        let response = await axios.get(`${url}/patient/search-by-phone/${phone}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const searchMedicine = async (search) => {
    try {
        let response = await axios.get(`${url}/medicine/${search}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const registerClinic = async(clinic)=>{
    try {
        return await axios.post(`${url}/clinic`, clinic);
    } catch (error) {
        console.log('Error while register user API ', error);
    }
}

export const getClinicById = async (clinicId) => {
    try {
        let response = await axios.get(`${url}/clinic/${clinicId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const getAllClinic = async () => {
    try {
        let response = await axios.get(`${url}/clinic`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const updateClinicById = async (clinicId,clinic) => {
    try {
        return await axios.put(`${url}/clinic/${clinicId}`, clinic);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const deleteClinic = async (clinicId) => {
    try {
        return await axios.delete(`${url}/clinic/${clinicId}`);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const registerDoctor = async(clinicId,doctor)=>{
    try {
        return await axios.post(`${url}/doctor/register/${clinicId}`, doctor);
    } catch (error) {
        console.log('Error while register user API ', error);
    }
}

export const getDoctorById = async (doctorId) => {
    try {
        let response = await axios.get(`${url}/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const updateDoctorById = async (doctorId,doctor) => {
    try {
        let response = await axios.put(`${url}/doctor/${doctorId}`,doctor);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const deleteDoctor = async (doctorId) => {
    try {
        return await axios.delete(`${url}/doctor/${doctorId}`);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}


export const getAllDoctors = async () => {
    try {
        let response = await axios.get(`${url}/doctor`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const searchDoctorsByPhone = async (phone) => {
    try {
        let response = await axios.get(`${url}/doctor/search-by-phone/${phone}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const searchDoctorsByName = async (name) => {
    try {
        let response = await axios.get(`${url}/doctor/search-by-name/${name}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const searchClinicByClinicName = async (clinicName) => {
    try {
        let response = await axios.get(`${url}/clinic/search-by-clinic-name/${clinicName}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const createConsultant = async (patientId,doctorId,medicineId,clinicId) => {
    try {
        let response = await axios.get(`${url}/consultant/${patientId}/${doctorId}/${medicineId}/${clinicId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

export const getConsultantById = async (consultantId) => {
    try {
        let response = await axios.get(`${url}/consultant/get/${consultantId}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}